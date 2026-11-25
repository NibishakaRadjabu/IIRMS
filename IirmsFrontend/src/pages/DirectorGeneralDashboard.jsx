import { useEffect, useMemo, useState } from "react";
import api from "../utils/api";

const reviewStatuses = ["submitted", "under_review", "approved", "certificate_issued"];
const tabs = ["overview", "students", "staff", "reviews"];

export default function DirectorGeneralDashboard() {
  const [tab, setTab] = useState("overview");
  const [department, setDepartment] = useState(null);
  const [students, setStudents] = useState([]);
  const [staff, setStaff] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const loadDashboard = async () => {
    setLoading(true); setError("");
    try {
      const [departmentResponse, studentResponse, staffResponse, submissionResponse] = await Promise.all([
        api.get("/faculty/department"), api.get("/faculty/students"), api.get("/faculty/staff"), api.get("/faculty/submissions"),
      ]);
      setDepartment(departmentResponse.data); setStudents(studentResponse.data); setStaff(staffResponse.data); setSubmissions(submissionResponse.data);
    } catch (err) { setError(err.response?.data?.message || "Could not load leadership data."); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadDashboard(); }, []);
  const pendingReviews = useMemo(() => submissions.filter((item) => !["approved", "certificate_issued"].includes(item.status)).length, [submissions]);
  const updateReview = async (submissionId, status) => {
    setNotice(""); setError("");
    try {
      const response = await api.put(`/faculty/submissions/${submissionId}`, { status });
      setSubmissions((current) => current.map((item) => item.submission_id === submissionId ? response.data : item));
      setNotice("Review status updated.");
    } catch (err) { setError(err.response?.data?.message || "Could not update review status."); }
  };

  if (!user.is_leader) return <div className="min-h-screen bg-slate-100 p-8"><div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow"><h1 className="text-2xl font-bold text-slate-800">Leadership access required</h1><p className="mt-2 text-slate-600">This dashboard is available once an administrator approves your leadership application.</p></div></div>;

  return <div className="min-h-screen bg-slate-100 p-6 md:p-10"><div className="mx-auto max-w-7xl">
    <header className="rounded-2xl bg-gradient-to-r from-blue-800 to-blue-950 p-8 text-white shadow-lg"><p className="text-sm uppercase tracking-[0.18em] text-blue-200">Leadership workspace</p><div className="mt-3 flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-3xl font-bold">Director General Dashboard</h1><p className="mt-2 text-blue-100">{user.leadership_role || "Leadership role"} · {department?.faculties || "Your department"}</p></div><button onClick={loadDashboard} className="rounded-full border border-blue-300 px-4 py-2 text-sm font-semibold hover:bg-white/10">Refresh data</button></div></header>
    {error && <p className="mt-5 rounded-lg bg-rose-50 p-4 text-rose-800">{error}</p>}{notice && <p className="mt-5 rounded-lg bg-emerald-50 p-4 text-emerald-800">{notice}</p>}
    <nav className="mt-6 flex gap-2 overflow-x-auto border-b border-slate-200">{tabs.map((item) => <button key={item} onClick={() => setTab(item)} className={`whitespace-nowrap px-4 py-3 text-sm font-semibold capitalize ${tab === item ? "border-b-2 border-blue-700 text-blue-700" : "text-slate-500 hover:text-slate-800"}`}>{item === "reviews" ? "Review queue" : item}</button>)}</nav>
    {loading ? <p className="py-10 text-slate-500">Loading leadership workspace…</p> : <>
      {tab === "overview" && <div className="mt-6"><div className="grid gap-4 md:grid-cols-3"><Metric label="Students & researchers" value={students.length} detail="In your department" /><Metric label="Scientific staff" value={staff.length} detail="Department colleagues" /><Metric label="Reviews awaiting action" value={pendingReviews} detail={`${submissions.length} total submissions`} /></div><section className="mt-6 rounded-2xl bg-white p-6 shadow-sm"><h2 className="text-xl font-bold text-slate-800">Department overview</h2><dl className="mt-4 grid gap-4 md:grid-cols-3"><Info label="Faculty" value={department?.faculties} /><Info label="Department" value={department?.depertment} /><Info label="Speciality" value={department?.speciality} /></dl></section></div>}
      {tab === "students" && <MemberTable title="Students and Researchers" empty="No students or researchers are assigned to your department." headers={["Name", "Email", "Role", "University"]} rows={students.map((item) => [item.user?.name, item.user?.email, item.user?.role, item.university || "—"])} />}
      {tab === "staff" && <MemberTable title="Scientific Staff" empty="No scientific staff are assigned to your department." headers={["Name", "Email", "Leadership role", "Account"]} rows={staff.map((item) => [item.name, item.email, item.leadership_role || "Scientific staff", item.is_leader ? "Leader" : "Active"])} />}
      {tab === "reviews" && <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm"><h2 className="text-2xl font-bold text-slate-800">Research review queue</h2><p className="mt-2 text-sm text-slate-600">Update the review status for submissions from your department.</p><div className="mt-5 overflow-x-auto"><table className="min-w-full text-left text-sm"><thead className="border-b text-slate-500"><tr><th className="p-3">Submission</th><th className="p-3">Researcher</th><th className="p-3">Current status</th><th className="p-3">Review action</th></tr></thead><tbody>{submissions.map((item) => <tr key={item.submission_id} className="border-b border-slate-100"><td className="p-3 font-medium text-slate-800">{item.title}</td><td className="p-3">{item.user?.name || "—"}</td><td className="p-3 capitalize">{String(item.status || "submitted").replace("_", " ")}</td><td className="p-3"><select value={item.status || "submitted"} onChange={(event) => updateReview(item.submission_id, event.target.value)} className="rounded border border-slate-300 p-2">{reviewStatuses.map((status) => <option key={status} value={status}>{status.replace("_", " ")}</option>)}</select></td></tr>)}</tbody></table>{!submissions.length && <p className="py-6 text-slate-500">No submissions are ready for review.</p>}</div></section>}
    </>}
  </div></div>;
}

function Metric({ label, value, detail }) { return <article className="rounded-2xl bg-white p-6 shadow-sm"><p className="text-sm font-medium text-slate-500">{label}</p><p className="mt-2 text-4xl font-bold text-blue-800">{value}</p><p className="mt-2 text-sm text-slate-500">{detail}</p></article>; }
function Info({ label, value }) { return <div className="rounded-xl bg-slate-50 p-4"><dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt><dd className="mt-2 font-medium text-slate-800">{value || "—"}</dd></div>; }
function MemberTable({ title, headers, rows, empty }) { return <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm"><h2 className="text-2xl font-bold text-slate-800">{title}</h2><div className="mt-5 overflow-x-auto"><table className="min-w-full text-left text-sm"><thead className="border-b text-slate-500"><tr>{headers.map((header) => <th key={header} className="p-3">{header}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index} className="border-b border-slate-100">{row.map((value, cell) => <td key={cell} className="p-3 capitalize">{value}</td>)}</tr>)}</tbody></table>{!rows.length && <p className="py-6 text-slate-500">{empty}</p>}</div></section>; }
