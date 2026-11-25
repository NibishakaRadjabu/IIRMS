// import { useState, useEffect } from "react";
// import api from "../utils/axios";
// import CrudTable from "./CrudTable";

// export default function SubmissionsAdmin() {
//   const [submissions, setSubmissions] = useState([]);
//   const [editing, setEditing] = useState(null);
//   const [form, setForm] = useState({ status: "" });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => { fetch(); }, []);

//   const fetch = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const r = await api.get("/admin/submissions");
//       setSubmissions(r.data);
//     } catch (e) {
//       console.error(e);
//       setError(e.response?.data?.message || e.message || "Failed to fetch submissions");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = row => { setEditing(row.submission_id); setForm({ status: row.status }); };

//   const handleUpdate = async e => {
//     e.preventDefault();
//     try {
//       await api.put(`/admin/submissions/${editing}`, form);
//       setEditing(null);
//       fetch();
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to update submission");
//     }
//   };

//   const handleDelete = async row => {
//     if (!confirm(`Delete submission "${row.title}"?`)) return;
//     try {
//       await api.delete(`/admin/submissions/${row.submission_id}`);
//       fetch();
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to delete submission");
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">Manage Submissions</h1>

//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}

//       {loading && (
//         <div className="bg-white p-4 rounded shadow text-center text-gray-500">
//           Loading submissions...
//         </div>
//       )}

//       {!loading && (
//         <>
//           {editing && (
//             <form onSubmit={handleUpdate} className="bg-white p-4 rounded shadow mb-4 flex gap-3 items-end">
//               <div>
//                 <label className="text-sm font-medium">Status</label>
//                 <select value={form.status} onChange={e => setForm({ status: e.target.value })} className="block border p-2 rounded text-sm mt-1">
//                   <option value="submitted">Submitted</option>
//                   <option value="under_review">Under Review</option>
//                   <option value="approved">Approved</option>
//                   <option value="certificate_issued">Certificate Issued</option>
//                 </select>
//               </div>
//               <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded text-sm">Update</button>
//               <button type="button" onClick={() => setEditing(null)} className="border px-4 py-2 rounded text-sm">Cancel</button>
//             </form>
//           )}

//           <div className="bg-white rounded shadow p-4">
//             <CrudTable
//               columns={[
//                 { key: "submission_id", label: "ID" },
//                 { key: "title", label: "Title" },
//                 { key: "status", label: "Status" },
//                 { key: "user", label: "Student", render: r => r.user?.name || "—" },
//                 { key: "submitted_at", label: "Date", render: r => new Date(r.submitted_at).toLocaleDateString() },
//               ]}
//               data={submissions}
//               onEdit={handleEdit}
//               onDelete={handleDelete}
//             />
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import api from "../utils/axios";
import CrudTable from "./CrudTable";

export default function SubmissionsAdmin() {
  const [submissions, setSubmissions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ status: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { fetch(); }, []);

  const fetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const r = await api.get("/admin/submissions");
      setSubmissions(r.data);
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.message || e.message || "Failed to fetch submissions");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = row => { 
    setEditing(row.submission_id); 
    setForm({ status: row.status }); 
  };

  const handleUpdate = async e => {
    e.preventDefault();
    try {
      await api.put(`/admin/submissions/${editing}`, form);
      setEditing(null);
      fetch();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update submission");
    }
  };

  const handleDelete = async row => {
    if (!confirm(`Delete submission "${row.title}"?`)) return;
    try {
      await api.delete(`/admin/submissions/${row.submission_id}`);
      fetch();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete submission");
    }
  };

  // 🚀 New: Issue certificate directly
  const handleIssueCertificate = async row => {
    if (!confirm(`Issue certificate for submission "${row.title}"?`)) return;
    try {
      const res = await api.post("/admin/certificates", {
        submission_id: row.submission_id,
        certificate_url: `/certificates/${row.submission_id}.pdf`
      });
      alert(`Certificate issued: ${res.data.certificate_id}`);
      fetch(); // refresh submissions to show certificate
    } catch (err) {
      setError(err.response?.data?.message || "Failed to issue certificate");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Submissions</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading && (
        <div className="bg-white p-4 rounded shadow text-center text-gray-500">
          Loading submissions...
        </div>
      )}

      {!loading && (
        <>
          {editing && (
            <form onSubmit={handleUpdate} className="bg-white p-4 rounded shadow mb-4 flex gap-3 items-end">
              <div>
                <label className="text-sm font-medium">Status</label>
                <select value={form.status} onChange={e => setForm({ status: e.target.value })} className="block border p-2 rounded text-sm mt-1">
                  <option value="submitted">Submitted</option>
                  <option value="under_review">Under Review</option>
                  <option value="approved">Approved</option>
                  <option value="minor_revisions">Minor Revisions</option>
                  <option value="major_revisions">Major Revisions</option>
                  <option value="rejected">Rejected</option>
                  <option value="certificate_issued">Certificate Issued</option>
                </select>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded text-sm">Update</button>
              <button type="button" onClick={() => setEditing(null)} className="border px-4 py-2 rounded text-sm">Cancel</button>
            </form>
          )}

          <div className="bg-white rounded shadow p-4">
            <CrudTable
              columns={[
                { key: "submission_id", label: "ID" },
                { key: "title", label: "Title" },
                { key: "status", label: "Status" },
                { key: "user", label: "scientific Staff", render: r => r.user?.name || "—" },
                { key: "submitted_at", label: "Date", render: r => new Date(r.submitted_at).toLocaleDateString() },
                { key: "certificate", label: "Certificate", render: r =>
                    r.certificate?.certificate_url
                      ? <a href={r.certificate.certificate_url} target="_blank" className="text-blue-500 hover:underline">View</a>
                      : <button onClick={() => handleIssueCertificate(r)} className="bg-green-600 text-white px-3 py-1 rounded text-sm">Issue</button>
                },
              ]}
              data={submissions}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </>
      )}
    </div>
  );
}
