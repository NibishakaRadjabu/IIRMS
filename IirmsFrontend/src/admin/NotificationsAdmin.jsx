import { useState, useEffect } from "react";
import api from "../utils/axios";
import CrudTable from "./CrudTable";

export default function NotificationsAdmin() {
  const [notifications, setNotifications] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ user_id: "", message: "" });
  const [error, setError] = useState("");

  useEffect(() => { fetch(); }, []);

  const fetch = async () => {
    try {
      const [notificationsResponse, usersResponse] = await Promise.all([
        api.get("/admin/notifications"),
        api.get("/admin/users"),
      ]);
      setNotifications(notificationsResponse.data);
      setUsers(usersResponse.data);
    }
    catch (e) { console.error(e); }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/admin/notifications", { ...form, user_id: Number(form.user_id) });
      setForm({ user_id: "", message: "" });
      fetch();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to send notification.');
    }
  };

  const handleDelete = async row => {
    if (!confirm("Delete this notification?")) return;
    await api.delete(`/admin/notifications/${row.notification_id}`); fetch();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Notifications</h1>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-3">
        <h2 className="col-span-2 font-semibold">Send Notification</h2>
        <select name="user_id" value={form.user_id} onChange={e => setForm({ ...form, user_id: e.target.value })} className="border p-2 rounded text-sm" required>
          <option value="">Select a user</option>
          {users.map(user => <option key={user.user_id} value={user.user_id}>{user.name} ({user.email})</option>)}
        </select>
        <input name="message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Message" className="border p-2 rounded text-sm" required />
        <button type="submit" className="col-span-2 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">Send</button>
      </form>

      <div className="bg-white rounded shadow p-4">
        <CrudTable
          columns={[
            { key: "notification_id", label: "ID" },
            { key: "user", label: "User", render: r => r.user?.name || "—" },
            { key: "message", label: "Message" },
            { key: "created_at", label: "Date", render: r => new Date(r.created_at).toLocaleDateString() },
          ]}
          data={notifications}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
