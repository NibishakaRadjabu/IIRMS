import { useEffect, useState } from "react";
import api from "../utils/api";

const statuses = [
  { value: "pending", label: "Pending" },
  { value: "accepted", label: "Accept" },
  { value: "minor_revisions", label: "Minor revisions" },
  { value: "major_revisions", label: "Major revisions" },
  { value: "rejected", label: "Reject" },
];

const statusLabel = (value) => statuses.find((s) => s.value === value)?.label || value;

export default function ReviewerApplicationsAdmin() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [selected, setSelected] = useState(null);
  const [decision, setDecision] = useState({ status: "pending", comments: "" });

  const fetchRows = async () => {
    try {
      const { data } = await api.get("/reviewer/applications");
      setRows(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows();
  }, []);

  const startReview = (row) => {
    setEditing(row.application_id);
    setDecision({ status: row.status || "pending", comments: row.comments || "" });
  };

  const saveDecision = async () => {
    if (!editing) return;
    try {
      await api.put(`/reviewer/applications/${editing}/status`, decision);
      setEditing(null);
      fetchRows();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update reviewer decision.");
    }
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <h1 className="text-2xl font-bold mb-4">Reviewer Applications</h1>

      {loading ? (
        <p>Loading...</p>
      ) : rows.length === 0 ? (
        <p className="text-gray-500">No reviewer applications yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Department</th>
                <th className="border p-2">Discipline</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Files</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.application_id}>
                  <td className="border p-2">{row.full_name}</td>
                  <td className="border p-2">{row.email}</td>
                  <td className="border p-2">{row.department}</td>
                  <td className="border p-2">{row.discipline_field}</td>
                  <td className="border p-2">{statusLabel(row.status)}</td>
                  <td className="border p-2">
                    <div className="space-y-1">
                      <a href={row.resume_path} target="_blank" rel="noreferrer" className="text-blue-600 underline">CV</a><br />
                      <a href={row.qualification_proof_path} target="_blank" rel="noreferrer" className="text-blue-600 underline">Qualification</a><br />
                      <a href={row.identity_proof_path} target="_blank" rel="noreferrer" className="text-blue-600 underline">Identity</a>
                    </div>
                  </td>
                  <td className="border p-2">
                    {editing === row.application_id ? (
                      <div className="space-y-2">
                        <select value={decision.status} onChange={(e) => setDecision({ ...decision, status: e.target.value })} className="border rounded p-1 w-full">
                          {statuses.map((status) => (
                            <option key={status.value} value={status.value}>{status.label}</option>
                          ))}
                        </select>
                        <textarea value={decision.comments} onChange={(e) => setDecision({ ...decision, comments: e.target.value })} rows={3} className="w-full border rounded p-1" placeholder="Review comments" />
                        <div className="flex gap-2">
                          <button onClick={saveDecision} className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
                          <button onClick={() => setEditing(null)} className="border px-3 py-1 rounded">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => setSelected(row)} className="border border-blue-600 text-blue-700 px-3 py-1 rounded">View form</button>
                        <button onClick={() => startReview(row)} className="bg-green-600 text-white px-3 py-1 rounded">Review</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label="Reviewer application details">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b pb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Reviewer Application</h2>
                <p className="mt-1 text-slate-600">{selected.full_name} · <span className="capitalize">{statusLabel(selected.status)}</span></p>
              </div>
              <button onClick={() => setSelected(null)} className="rounded border px-3 py-1 text-slate-600 hover:bg-slate-100">Close</button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Salutation" value={selected.salutation} />
              <Field label="Full name" value={selected.full_name} />
              <Field label="Email" value={selected.email} />
              <Field label="Mobile number" value={selected.mobile_number} />
              <Field label="Qualification" value={selected.qualification} />
              <Field label="Designation" value={selected.designation} />
              <Field label="Department" value={selected.department} />
              <Field label="Organisation" value={selected.organization} />
              <Field label="Discipline / field" value={selected.discipline_field} />
              <Field label="Research areas" value={selected.research_areas} />
              <Field label="Country" value={selected.country} />
              <Field label="State / province" value={selected.state_province} />
              <Field label="City / district" value={selected.city_district} />
              <Field label="Postal code" value={selected.postal_code} />
              <Field label="Address" value={selected.address} />
              <Field label="Submitted" value={selected.created_at ? new Date(selected.created_at).toLocaleString() : "—"} />
              {selected.comments && <Field label="Admin comments" value={selected.comments} />}
            </div>

            <div className="mt-6 border-t pt-5">
              <h3 className="font-semibold text-slate-800">Supporting documents</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                <a href={selected.resume_path} target="_blank" rel="noreferrer" className="rounded bg-blue-700 px-4 py-2 text-sm font-semibold text-white">Open CV</a>
                <a href={selected.qualification_proof_path} target="_blank" rel="noreferrer" className="rounded bg-blue-700 px-4 py-2 text-sm font-semibold text-white">Open qualification proof</a>
                <a href={selected.identity_proof_path} target="_blank" rel="noreferrer" className="rounded bg-blue-700 px-4 py-2 text-sm font-semibold text-white">Open identity proof</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value }) {
  return <div className="rounded-lg bg-slate-50 p-3"><dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt><dd className="mt-1 whitespace-pre-wrap text-sm text-slate-800">{value || "—"}</dd></div>;
}
