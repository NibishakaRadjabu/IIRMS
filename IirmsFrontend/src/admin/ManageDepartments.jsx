import { useState, useEffect } from "react";
import api from "../utils/axios";
import CrudTable from "./CrudTable";

const empty = { faculties: "", depertment: "", speciality: "" };

export default function ManageDepartments() {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => { fetch(); }, []);

  const fetch = async () => {
    try { const r = await api.get("/admin/departments"); setDepartments(r.data); }
    catch (e) { setError("Failed to load departments"); }
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault(); setError("");
    try {
      if (editing) await api.put(`/admin/departments/${editing}`, form);
      else await api.post("/admin/departments", form);
      setForm(empty); setEditing(null); fetch();
    } catch (e) { setError(e.response?.data?.message || "Failed to save"); }
  };

  const handleEdit = row => { setEditing(row.department_id); setForm({ faculties: row.faculties, depertment: row.depertment || "", speciality: row.speciality || "" }); };

  const handleDelete = async row => {
    if (!confirm(`Delete department "${row.name}"?`)) return;
    await api.delete(`/admin/departments/${row.department_id}`); fetch();
  };

  const inputClass = "w-full border border-gray-300 p-2 rounded text-sm";

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Academics Programs Management</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-3 gap-3">
        <h2 className="col-span-3 font-semibold">{editing ? "Edit Department" : "Add Department"}</h2>
        {error && <p className="col-span-3 text-red-500 text-sm">{error}</p>}
        <input name="faculties" value={form.faculties} onChange={handleChange} placeholder="Faculty Name" className={inputClass} required />
        <input name="depertment" value={form.depertment} onChange={handleChange} placeholder="Department (e.g. Engineering)" className={inputClass} />
        <input name="speciality" value={form.speciality} onChange={handleChange} placeholder="Speciality" className={inputClass} />
        <div className="col-span-3 flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
            {editing ? "Update" : "Add Department"}
          </button>
          {editing && <button type="button" onClick={() => { setEditing(null); setForm(empty); }} className="border px-4 py-2 rounded text-sm">Cancel</button>}
        </div>
      </form>

      <div className="bg-white rounded shadow p-4">
        <CrudTable
          columns={[
            { key: "department_id", label: "ID" },
            { key: "faculties", label: "Faculty" },
            { key: "depertment", label: "Department" },
            { key: "speciality", label: "Speciality" },
          ]}
          data={departments}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
