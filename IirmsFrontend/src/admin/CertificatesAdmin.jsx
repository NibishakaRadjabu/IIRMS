import { useState, useEffect } from "react";
import api from "../utils/axios";
import CrudTable from "./CrudTable";

export default function CertificatesAdmin() {
  const [certs, setCerts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ payment_status: "pending", certificate_url: "" });

  useEffect(() => { fetch(); }, []);

  const fetch = async () => {
    try { const r = await api.get("/admin/certificates"); setCerts(r.data); }
    catch (e) { console.error(e); }
  };

  const handleEdit = row => {
    setEditing(row.certificate_id);
    setForm({ payment_status: row.payment_status, certificate_url: row.certificate_url || "" });
  };

  const handleUpdate = async e => {
    e.preventDefault();
    await api.put(`/admin/certificates/${editing}`, form);
    setEditing(null); fetch();
  };

  const handleDelete = async row => {
    if (!confirm("Delete this certificate?")) return;
    await api.delete(`/admin/certificates/${row.certificate_id}`); fetch();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Certificates</h1>

      {editing && (
        <form onSubmit={handleUpdate} className="bg-white p-4 rounded shadow mb-4 grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium">Payment Status</label>
            <select value={form.payment_status} onChange={e => setForm({ ...form, payment_status: e.target.value })} className="block border p-2 rounded text-sm mt-1 w-full">
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Certificate URL</label>
            <input value={form.certificate_url} onChange={e => setForm({ ...form, certificate_url: e.target.value })} className="block border p-2 rounded text-sm mt-1 w-full" />
          </div>
          <div className="col-span-2 flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded text-sm">Update</button>
            <button type="button" onClick={() => setEditing(null)} className="border px-4 py-2 rounded text-sm">Cancel</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded shadow p-4">
        <CrudTable
          columns={[
            { key: "certificate_id", label: "ID" },
            { key: "submission_id", label: "Submission ID" },
            { key: "payment_status", label: "Payment" },
            { key: "issue_date", label: "Issue Date", render: r => r.issue_date || "—" },
            { key: "certificate_url", label: "URL", render: r => r.certificate_url ? <a href={r.certificate_url} className="text-blue-500 hover:underline" target="_blank">View</a> : "—" },
          ]}
          data={certs}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
