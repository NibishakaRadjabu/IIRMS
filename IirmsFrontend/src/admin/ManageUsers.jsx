import { useState, useEffect } from "react";
import api from "../utils/axios";
import CrudTable from "./CrudTable";

const empty = { name: "", email: "", password: "", role: "student", can_manage_department: false };

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => { fetch(); }, []);

  const fetch = async () => {
    try { const r = await api.get("/admin/users"); setUsers(r.data); }
    catch (e) { setError(e.response?.data?.message || "Failed to load users"); }
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault(); setError("");
    try {
      if (editing) await api.put(`/admin/users/${editing}`, form);
      else await api.post("/admin/users", form);
      setForm(empty); setEditing(null); fetch();
    } catch (e) { setError(e.response?.data?.message || "Failed to save"); }
  };

  const handleEdit = row => { setEditing(row.user_id); setForm({ name: row.name, email: row.email, password: "", role: row.role, can_manage_department: Boolean(row.can_manage_department) }); };

  const handleDelete = async row => {
    if (!confirm(`Delete user "${row.name}"?`)) return;
    setError("");
    try {
      await api.delete(`/admin/users/${row.user_id}`);
      fetch();
    } catch (e) {
      setError(e.response?.data?.message || "Failed to delete user");
    }
  };

  const setApproval = async (row, approval_status) => {
    setError("");
    try {
      await api.patch(`/admin/users/${row.user_id}/approval`, { approval_status });
      fetch();
    } catch (e) {
      setError(e.response?.data?.message || "Failed to update approval status");
    }
  };

  const inputClass = "w-full border border-gray-300 p-2 rounded text-sm";

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-3">
        <h2 className="col-span-2 font-semibold">{editing ? "Edit User" : "Add User"}</h2>
        {error && <p className="col-span-2 text-red-500 text-sm">{error}</p>}
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className={inputClass} required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className={inputClass} required />
        <input name="password" value={form.password} onChange={handleChange} placeholder={editing ? "New password (leave blank to keep)" : "Password"} type="password" className={inputClass} required={!editing} />
        <select name="role" value={form.role} onChange={handleChange} className={inputClass}>
          <option value="student">Student</option>
          <option value="scientific_staff">Scientific Staff</option>
          <option value="researcher">Researcher</option>
          <option value="admin">Admin</option>
        </select>
        {form.role === "scientific_staff" && (
          <label className="col-span-2 flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.can_manage_department} onChange={e => setForm({ ...form, can_manage_department: e.target.checked })} />
            Allow this Scientific Staff member to manage their department
          </label>
        )}
        <div className="col-span-2 flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
            {editing ? "Update" : "Add User"}
          </button>
          {editing && <button type="button" onClick={() => { setEditing(null); setForm(empty); }} className="border px-4 py-2 rounded text-sm">Cancel</button>}
        </div>
      </form>

      <div className="bg-white rounded shadow p-4">
        <CrudTable
          columns={[
            { key: "user_id", label: "ID" },
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "role", label: "Role" },
            { key: "approval_status", label: "Access", render: r => <span className={r.approval_status === 'approved' ? 'text-green-700 font-medium' : r.approval_status === 'rejected' ? 'text-red-700 font-medium' : 'text-amber-700 font-medium'}>{r.approval_status || 'approved'}</span> },
            { key: "created_at", label: "Registered", render: r => new Date(r.created_at).toLocaleDateString() },
          ]}
          data={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
          extraActions={row => row.approval_status !== 'approved' && <button onClick={() => setApproval(row, 'approved')} className="text-green-700 hover:underline">Approve</button>}
        />
      </div>
    </div>
  );
}
