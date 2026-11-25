import { useEffect, useState } from "react";
import api from "../utils/axios";

const STATUS_OPTIONS = ["submitted", "under_review", "approved", "certificate_issued"];

export default function FacultyPanel() {
  const [tab, setTab] = useState("department");
  const [department, setDepartment] = useState(null);
  const [students, setStudents] = useState([]);
  const [users, setUsers] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [notifForm, setNotifForm] = useState({ user_id: "", message: "" });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/faculty/department").then(r => setDepartment(r.data)).catch(() => {});
    api.get("/faculty/students").then(r => {
      setStudents(r.data);
      setUsers(r.data.map(s => s.user).filter(Boolean));
    }).catch(() => {});
    api.get("/faculty/submissions").then(r => setSubmissions(r.data)).catch(() => {});
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const updated = await api.put(`/faculty/submissions/${id}`, { status });
      setSubmissions(prev => prev.map(s => s.submission_id === id ? { ...s, status: updated.data.status } : s));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status");
    }
  };

  const sendNotification = async (e) => {
    e.preventDefault();
    setMsg(""); setError("");

    // Basic validation: ensure a user_id is selected and message is provided
    if (!notifForm.user_id) {
      setError('Please select a student to notify.');
      return;
    }
    if (!notifForm.message || !notifForm.message.trim()) {
      setError('Please enter a message.');
      return;
    }

    try {
      const payload = await resolveNotificationPayload();
      if (!payload) return; // resolveNotificationPayload sets error when needed

      await api.post("/faculty/notifications", payload);
      setMsg("Notification sent.");
      setNotifForm({ user_id: "", message: "" });
    } catch (err) {
      const status = err?.response?.status;
      const body = err?.response?.data;
      // Common helpful messages
      if (status === 403) {
        setError('Access denied: you are not authorized to send notifications.');
      } else if (status === 404) {
        setError('Notifications endpoint not found on server.');
      } else if (status === 500) {
        // handle foreign key or server DB errors specially
        const msgText = body?.message || JSON.stringify(body) || err.message;
        if (typeof msgText === 'string' && msgText.toLowerCase().includes('foreign key')) {
          setError('Server error: invalid user selected. The recipient does not exist on the server.');
        } else {
          setError('Server error sending notification: ' + (body?.message || err.message || JSON.stringify(body)));
        }
      } else {
        setError(err.response?.data?.message || "Failed to send notification");
      }
    }
  };

  // Helper to resolve payload consistently (used by send and debug)
  const resolveNotificationPayload = async () => {
    const payload = { ...notifForm };

    // First, try to resolve selection from authoritative users list if available
    let resolvedUserId = null;
    let foundFromUsers = null;
    if (Array.isArray(users) && users.length > 0) {
      foundFromUsers = users.find(u => String(u.user_id) === String(payload.user_id) || String(u.user_id) === String(payload.user_id));
      if (foundFromUsers) resolvedUserId = foundFromUsers.user_id;
    }

    // If not resolved via users list, try to resolve from students list (fallback)
    let foundFromStudents = null;
    if (!resolvedUserId) {
      foundFromStudents = students.find(s => {
        const candidates = [
          s?.user?.user_id,
          s?.user_id,
          s?.user?.id,
          s?.profile_id,
          s?.id
        ];
        return candidates.some(c => c !== undefined && c !== null && String(c) === String(payload.user_id));
      });
      if (foundFromStudents) resolvedUserId = foundFromStudents?.user?.user_id ?? foundFromStudents?.user_id ?? null;
    }

    if (!resolvedUserId) {
      setError('Selected recipient does not match any known user. Please re-select.');
      return null;
    }

    // Normalize to number when numeric
    if (typeof resolvedUserId === 'string' && /^[0-9]+$/.test(resolvedUserId)) {
      payload.user_id = Number(resolvedUserId);
    } else {
      payload.user_id = resolvedUserId;
    }

    return payload;
  };

  // Debug helper: copy resolved payload and selected objects to clipboard & console
  const handleDebugCopy = async (e) => {
    e?.preventDefault();
    setMsg(""); setError("");
    try {
      const payload = await resolveNotificationPayload();
      if (!payload) return;

      // Find resolved student/user objects for debug
      const selectedStudent = students.find(s => {
        const candidates = [
          s?.user?.user_id,
          s?.user_id,
          s?.user?.id,
          s?.profile_id,
          s?.id
        ];
        return candidates.some(c => c !== undefined && c !== null && String(c) === String(payload.user_id));
      }) || null;

      const selectedUser = (Array.isArray(users) ? users.find(u => String(u.user_id) === String(payload.user_id)) : null) || null;

      const debugObj = { payload, selectedStudent, selectedUser };
      const text = JSON.stringify(debugObj, null, 2);

      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setMsg('Payload copied to clipboard.');
      } else {
        console.log('Debug payload:', debugObj);
        setMsg('Debug data logged to console.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to prepare debug payload: ' + (err?.message || String(err)));
    }
  };

  const tabClass = (t) =>
    `px-4 py-2 font-semibold rounded-t border-b-2 transition ${tab === t ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-blue-500"}`;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">Faculty Panel</h1>

        {/* Tabs */}
        <div className="flex gap-2 border-b mb-6">
          <button className={tabClass("department")} onClick={() => setTab("department")}>🏛 Department</button>
          <button className={tabClass("students")} onClick={() => setTab("students")}>👥 Students</button>
          <button className={tabClass("submissions")} onClick={() => setTab("submissions")}>📄 Submissions</button>
          <button className={tabClass("notify")} onClick={() => setTab("notify")}>🔔 Notify</button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {msg && <p className="text-green-600 text-sm mb-4">{msg}</p>}

        {/* Department Info */}
        {tab === "department" && (
          <div>
            {department ? (
              <div className="space-y-2">
                <p><span className="font-semibold">Faculty:</span> {department.faculties}</p>
                <p><span className="font-semibold">Department:</span> {department.depertment}</p>
                <p><span className="font-semibold">Speciality:</span> {department.speciality}</p>
                <p><span className="font-semibold">ID:</span> {department.department_id}</p>
              </div>
            ) : <p className="text-gray-500">Loading department info...</p>}
          </div>
        )}

        {/* Students */}
        {tab === "students" && (
          <div className="overflow-x-auto">
            {students.length === 0 ? (
              <p className="text-gray-500">No students or researchers in your department yet.</p>
            ) : (
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3 border">Name</th>
                    <th className="p-3 border">Email</th>
                    <th className="p-3 border">Role</th>
                    <th className="p-3 border">University</th>
                    <th className="p-3 border">Trade</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(s => (
                    <tr key={s.profile_id} className="hover:bg-gray-50">
                      <td className="p-3 border">{s.user?.name}</td>
                      <td className="p-3 border">{s.user?.email}</td>
                      <td className="p-3 border">{s.user?.role === 'researcher' ? 'Researcher' : 'Student'}</td>
                      <td className="p-3 border">{s.university || "—"}</td>
                      <td className="p-3 border">{s.trade || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Submissions */}
        {tab === "submissions" && (
          <div className="overflow-x-auto">
            {submissions.length === 0 ? (
              <p className="text-gray-500">No submissions in your department yet.</p>
            ) : (
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3 border">Title</th>
                    <th className="p-3 border">Submitted By</th>
                    <th className="p-3 border">Status</th>
                    <th className="p-3 border">Update Status</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map(s => (
                    <tr key={s.submission_id} className="hover:bg-gray-50">
                      <td className="p-3 border">{s.title}</td>
                      <td className="p-3 border">{s.user?.name}</td>
                      <td className="p-3 border">
                        <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700">{s.status}</span>
                      </td>
                      <td className="p-3 border">
                        <select
                          value={s.status}
                          onChange={e => updateStatus(s.submission_id, e.target.value)}
                          className="border rounded p-1 text-sm"
                        >
                          {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Send Notification */}
        {tab === "notify" && (
          <form onSubmit={sendNotification} className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
              <select
                value={notifForm.user_id}
                onChange={e => setNotifForm({ ...notifForm, user_id: e.target.value })}
                className="w-full border rounded p-2"
                required
              >
                <option value="">Select student</option>
                {Array.isArray(users) && users.length > 0 ? (
                  users
                    .filter(u => u.role === 'student' || u.role === 'researcher')
                    .map(u => (
                      <option key={String(u.user_id)} value={u.user_id}>{`${u.name} (${u.role}, id: ${u.user_id})`}</option>
                    ))
                ) : (
                  students.map(s => {
                    // Choose the most likely id field that backend expects (prefer users.user_id)
                    const candidate = s?.user?.user_id ?? s?.user_id ?? s?.user?.id ?? s?.profile_id ?? s?.id;
                    // Only include options with a defined, non-empty candidate
                    if (candidate === undefined || candidate === null || candidate === '') return null;
                    const displayName = s?.user?.name || s?.name || `User ${candidate}`;
                    // Show the resolved candidate id next to the name for debugging/clarity
                    const display = `${displayName} (id: ${candidate})`;
                    return (
                      <option key={String(candidate)} value={candidate}>{display}</option>
                    );
                  })
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                value={notifForm.message}
                onChange={e => setNotifForm({ ...notifForm, message: e.target.value })}
                className="w-full border rounded p-2"
                rows={3}
                required
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Send Notification
              </button>
              <button type="button" onClick={handleDebugCopy} className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
                Copy Debug Payload
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
