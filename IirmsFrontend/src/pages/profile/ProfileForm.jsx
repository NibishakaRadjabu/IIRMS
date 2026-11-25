// ProfileForm.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

function ProfileForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    // common
    real_name: "",
    university_name: "",
    trades: "",
    lessons: "",
    combination: "",
    profile_image: null,
    role: "",
    // student
    studentProfile: { profileName: "", universityName: "", faculty: "" },
    // scientific staff
    scientificStaff: { profileName: "", specialisation: "", facultyName: "", studentCount: "" },
    // research
    research: { profileName: "", university: "", faculty: "", published: "" },
    // admin
    admin: { profileName: "" }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [profileId, setProfileId] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  useEffect(() => {
    // If current user has a profile id stored, fetch it and prefill the form for editing.
    // If not, prefill the form from the registered user info (allow user to add image and save as profile)
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    // Use the authenticated user's user_id when fetching profiles (backend expects userId)
    const pid = user?.user_id || user?.id; // backend profile endpoints are keyed by user_id, not profile_id

    const prefillFromUser = () => {
      if (!user) return;
      setIsEditing(false);
      setForm((prev) => ({
        ...prev,
        real_name: user.name || prev.real_name,
        university_name: user.university || user.university_name || prev.university_name,
        trades: user.trade || user.trades || prev.trades,
        lessons: user.lesson || user.lessons || prev.lessons,
        combination: user.combination || prev.combination,
      }));
    };

    if (!pid) {
      prefillFromUser();
      return;
    }

    const fetchProfile = async () => {
      try {
        let res = null;
        // Try the most likely profile endpoints first (prefer plural)
        const tryPaths = [`/profiles/${pid}`, `/profile/${pid}`];
        for (const p of tryPaths) {
          try {
            const r = await api.get(p);
            if (r && r.status >= 200 && r.status < 300) {
              res = r;
              break;
            }
          } catch (e) {
            // try next
          }
        }

        // If not found, try listing profiles and match by id or user relation
        if (!res) {
          try {
            const listRes = await api.get('/profiles');
            const list = Array.isArray(listRes?.data) ? listRes.data : [];
            const match = list.find((item) => {
              const ids = [item.id, item.profile_id, item._id, item.profileId];
              if (ids.some(x => x && String(x) === String(pid))) return true;
              if (item.user_id && String(item.user_id) === String(pid)) return true;
              if (item.user && (String(item.user.id) === String(pid) || String(item.user.user_id) === String(pid))) return true;
              return false;
            });
            if (match) res = { data: match };
          } catch (e) {
            // ignore — will fall back to prefill from user
            prefillFromUser();
            return;
          }
        }

        const data = res?.data;
        if (data) {
          setIsEditing(true);
          const returnedId = data.id || data.profile_id || data._id || pid;
          setProfileId(returnedId);
          setForm({
            real_name: data.real_name || "",
            university_name: data.university_name || "",
            trades: data.trades || "",
            lessons: data.lessons || "",
            combination: data.combination || "",
            profile_image: null
          });
          setExistingImage(data.profile_image || data.profile_image_url || null);
        } else {
          // fallback to prefill from user
          prefillFromUser();
        }
      } catch (err) {
        // ignore — user can create instead
        prefillFromUser();
      }
    };

    fetchProfile();
  }, []);

  // generic handler for top-level fields
  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  // handlers for nested role-specific fields
  const handleNestedChange = (group, key, value) => setForm(prev => ({ ...prev, [group]: { ...prev[group], [key]: value } }));
  const handleFile = (e) => setForm(prev => ({ ...prev, profile_image: e.target.files[0] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    // Common fields
    if (form.real_name) data.append('real_name', form.real_name);
    // attach file if present
    if (form.profile_image) data.append('profile_image', form.profile_image);

    // Attach role explicitly if known
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null') || {};
    const role = storedUser.role || form.role || '';
    if (role) data.append('role', role);

    // Build role-specific payloads as JSON strings
    if (role === 'student') {
      data.append('studentProfile', JSON.stringify(form.studentProfile));
    } else if (role === 'scientific_staff' || role === 'Scientific Staff' || role === 'scientific') {
      data.append('scientificStaff', JSON.stringify(form.scientificStaff));
    } else if (role === 'researcher' || role === 'research' || role === 'Researcher') {
      data.append('research', JSON.stringify(form.research));
    } else if (role === 'admin') {
      data.append('admin', JSON.stringify(form.admin));
    } else {
      // fallback: include other top-level values if present
      Object.keys(form).forEach((key) => {
        const val = form[key];
        if (val && typeof val !== 'object') data.append(key, val);
      });
    }

    // Backend exposes a single createOrUpdate endpoint: POST /api/profiles (protected). Prefer that.
    const tryCreateEndpoints = [
      { method: 'post', path: '/profiles' }
    ];

    // Do not attempt PUT/PATCH update endpoints — backend uses POST /profiles and identifies user from the token.
    const tryUpdateEndpoints = (id) => [
      { method: 'post', path: '/profiles' }
    ];

    try {
      let res = null;

      // Always call POST /profiles (createOrUpdate) — backend uses the token to identify the user
      for (const ep of (isEditing ? tryUpdateEndpoints(profileId) : tryCreateEndpoints)) {
        try {
          res = await api.request({ method: ep.method, url: ep.path, data });
          if (res && (res.status >= 200 && res.status < 300)) break;
        } catch (e) {
          // try next
        }
      }

      // If FormData attempts failed, try JSON-only fallback (exclude file)
      if (!res) {
        const payload = {};
        Object.keys(form).forEach((key) => {
          const val = form[key];
          // skip file/Blob values
          if (val instanceof File) return;
          if (val !== null && val !== undefined) payload[key] = val;
        });

        if (isEditing && profileId) {
          const endpoints = tryUpdateEndpoints(profileId);
          for (const ep of endpoints) {
            try {
              res = await api.request({ method: ep.method, url: ep.path, data: payload });
              if (res && (res.status >= 200 && res.status < 300)) break;
            } catch (e) {
              // try next
            }
          }
        } else {
          for (const ep of tryCreateEndpoints) {
            try {
              res = await api.request({ method: ep.method, url: ep.path, data: payload });
              if (res && (res.status >= 200 && res.status < 300)) break;
            } catch (e) {
              // try next
            }
          }
        }
      }

      if (!res) {
        throw new Error('No endpoint handled the request (404 or network error)');
      }

      const returned = res?.data || {};
      const imageUrl = returned.profile_image || returned.profile?.profile_image || returned.profile_image_url || returned.image || existingImage;

      // Update stored user with profile_image and profile_id if present
      const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
      if (storedUser) {
        const updatedUser = { ...storedUser };
        if (imageUrl) updatedUser.profile_image = imageUrl;
        const returnedId = returned?.profile_id || returned?.id || returned?.profile?.id || returned?._id || profileId;
        if (returnedId) updatedUser.profile_id = returnedId;
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

      // Update stored user and navigate to a profile view keyed by user_id (backend GET /api/profiles/:userId)
      const createdProfileId = returned?.profile_id || returned?.id || returned?.profile?.id || returned?._id || profileId;
      if (storedUser) {
        const current = JSON.parse(localStorage.getItem('user') || 'null') || {};
        if (createdProfileId) current.profile_id = createdProfileId;
        localStorage.setItem('user', JSON.stringify(current));
      }

      const userIdForView = (storedUser && (storedUser.user_id || storedUser.id)) || undefined;
      if (userIdForView) {
        navigate(`/profile/${userIdForView}`);
      } else if (createdProfileId) {
        // fallback if we don't have user_id: navigate by profile id and let ProfileView try to resolve
        navigate(`/profile/${createdProfileId}`);
      } else {
        alert(isEditing ? "Profile updated." : "Profile created successfully!");
      }
    } catch (err) {
      console.error("Error saving profile:", err);
      // Show a helpful message to the user
      alert('Failed to save profile. Server did not accept request. Check API endpoints or server logs.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Profile' : 'Create Profile'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="real_name" placeholder="Full Name" value={form.real_name} onChange={handleChange} className="w-full border p-2 rounded" required />

        {/* Role-specific UI */}
        {(() => {
          const storedUser = JSON.parse(localStorage.getItem('user') || 'null') || {};
          const role = storedUser.role || form.role || '';
          if (role === 'student') {
            return (
              <>
                <input type="text" name="student_profileName" placeholder="Profile Name" value={form.studentProfile.profileName} onChange={(e) => handleNestedChange('studentProfile','profileName', e.target.value)} className="w-full border p-2 rounded" required />
                <input type="text" name="student_universityName" placeholder="University" value={form.studentProfile.universityName} onChange={(e) => handleNestedChange('studentProfile','universityName', e.target.value)} className="w-full border p-2 rounded" />
                <input type="text" name="student_faculty" placeholder="Faculty" value={form.studentProfile.faculty} onChange={(e) => handleNestedChange('studentProfile','faculty', e.target.value)} className="w-full border p-2 rounded" />
              </>
            );
          } else if (role === 'scientific_staff' || role === 'Scientific Staff' || role === 'scientific') {
            return (
              <>
                <input type="text" name="staff_profileName" placeholder="Profile Name" value={form.scientificStaff.profileName} onChange={(e) => handleNestedChange('scientificStaff','profileName', e.target.value)} className="w-full border p-2 rounded" required />
                <input type="text" name="staff_specialisation" placeholder="Specialisation" value={form.scientificStaff.specialisation} onChange={(e) => handleNestedChange('scientificStaff','specialisation', e.target.value)} className="w-full border p-2 rounded" />
                <input type="text" name="staff_facultyName" placeholder="Faculty Name" value={form.scientificStaff.facultyName} onChange={(e) => handleNestedChange('scientificStaff','facultyName', e.target.value)} className="w-full border p-2 rounded" />
                <input type="number" name="staff_studentCount" placeholder="Number of Students in Faculty" value={form.scientificStaff.studentCount} onChange={(e) => handleNestedChange('scientificStaff','studentCount', e.target.value)} className="w-full border p-2 rounded" />
              </>
            );
          } else if (role === 'researcher' || role === 'research' || role === 'Researcher') {
            return (
              <>
                <input type="text" name="research_profileName" placeholder="Profile Name" value={form.research.profileName} onChange={(e) => handleNestedChange('research','profileName', e.target.value)} className="w-full border p-2 rounded" required />
                <input type="text" name="research_university" placeholder="University" value={form.research.university} onChange={(e) => handleNestedChange('research','university', e.target.value)} className="w-full border p-2 rounded" />
                <input type="text" name="research_faculty" placeholder="Faculty" value={form.research.faculty} onChange={(e) => handleNestedChange('research','faculty', e.target.value)} className="w-full border p-2 rounded" />
                <input type="text" name="research_published" placeholder="Published Works (comma-separated)" value={form.research.published} onChange={(e) => handleNestedChange('research','published', e.target.value)} className="w-full border p-2 rounded" />
              </>
            );
          } else if (role === 'admin') {
            return (
              <>
                <input type="text" name="admin_profileName" placeholder="Profile Name" value={form.admin.profileName} onChange={(e) => handleNestedChange('admin','profileName', e.target.value)} className="w-full border p-2 rounded" required />
              </>
            );
          }

          // fallback
          return (
            <>
              <input type="text" name="university_name" placeholder="University" value={form.university_name} onChange={handleChange} className="w-full border p-2 rounded" />
              <textarea name="trades" placeholder="Trades" value={form.trades} onChange={handleChange} className="w-full border p-2 rounded"></textarea>
              <textarea name="lessons" placeholder="Lessons" value={form.lessons} onChange={handleChange} className="w-full border p-2 rounded"></textarea>
              <textarea name="combination" placeholder="Combination" value={form.combination} onChange={handleChange} className="w-full border p-2 rounded"></textarea>
            </>
          );
        })()}

        {existingImage && (
          <div className="mb-2">
            <p className="text-sm text-gray-600">Current Image:</p>
            <img src={existingImage} alt="Current" className="h-24 w-24 object-cover rounded" />
          </div>
        )}

        <input type="file" name="profile_image" onChange={handleFile} className="w-full border p-2 rounded" />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">{isEditing ? 'Update Profile' : 'Save Profile'}</button>
      </form>
    </div>
  );
}

export default ProfileForm;
