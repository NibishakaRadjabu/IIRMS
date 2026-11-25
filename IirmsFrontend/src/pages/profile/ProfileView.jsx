// ProfileView.js
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useParams, useNavigate } from "react-router-dom";

function ProfileView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      // Backend expects GET /api/profiles/:userId (user_id). Try interpreting the route param as user_id first.
      try {
        const res = await api.get(`/profiles/${id}`);
        const data = res?.data;
        if (data) {
          // returned object is likely the profile
          setProfile(!Array.isArray(data) ? (data.profile || data) : data[0]);
          return;
        }
      } catch (err) {
        // not found as user_id — fallback to list and try to match by profile_id or user relation
      }

      // Fallback: fetch list of profiles and match by profile_id or user_id
      try {
        const listRes = await api.get('/profiles');
        const list = Array.isArray(listRes?.data) ? listRes.data : [];
        const match = list.find((p) => String(p.profile_id) === String(id) || String(p.id) === String(id) || String(p._id) === String(id) || String(p.user_id) === String(id) || (p.user && (String(p.user.user_id) === String(id) || String(p.user.id) === String(id))));
        if (match) {
          setProfile(match);
          return;
        }
      } catch (e) {
        // ignore
      }

      // If not found, set profile to null and stop — Profile component will show not-found message
      setProfile(undefined);
    };
    fetchProfile();
  }, [id]);

  if (profile === undefined) return <p className="text-center mt-8">Profile not found.</p>;
  if (!profile) return <p>Loading...</p>;

  const isOwn = (() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const uid = user?.user_id || user?.id || user?.userId;
    return uid && (profile.user_id == uid || profile.userId == uid || profile.id == uid || profile._id == uid);
  })();

  const handleDelete = async () => {
    // Deleting profiles is not supported by the backend (createOrUpdate is exposed via POST /profiles).
    // Offer a clearer message so users/developers don't get a 404/500.
    alert('Deleting profiles is not supported on the server. If you need to remove your profile, contact an administrator.');
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-2xl font-bold">{profile.real_name}</h1>
        {isOwn && (
          <div className="flex items-center space-x-2">
            <button onClick={() => navigate('/profile/create')} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
            <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
          </div>
        )}
      </div>
      <p><strong>University:</strong> {profile.university_name}</p>
      <p><strong>Trades:</strong> {profile.trades}</p>
      <p><strong>Lessons:</strong> {profile.lessons}</p>
      <p><strong>Combination:</strong> {profile.combination}</p>
      {profile.profile_image && (
        <img src={profile.profile_image} alt="Profile" className="mt-4 rounded" />
      )}
    </div>
  );
}

export default ProfileView;
