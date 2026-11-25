import { useEffect, useState } from "react";
import api from "../utils/api";

const positions = ["Director General", "Deputy Director General", "Scientific Director", "Department Head", "Research Programme Coordinator", "Other Leadership Position"];
const statusStyles = { pending: "bg-amber-100 text-amber-800", approved: "bg-emerald-100 text-emerald-800", rejected: "bg-rose-100 text-rose-800" };

export default function LeadershipApplication() {
  const [form, setForm] = useState({ position: "", statement: "" });
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const loadApplications = async () => {
    try { const response = await api.get("/leadership/applications/mine"); setApplications(response.data); }
    catch (err) { setError(err.response?.data?.message || "Could not load your leadership applications."); }
    finally { setLoading(false); }
  };
  useEffect(() => { loadApplications(); }, []);
  const submit = async (event) => {
    event.preventDefault(); setNotice(""); setError(""); setSubmitting(true);
    try { const response = await api.post("/leadership/applications", form); setNotice(response.data.message); setForm({ position: "", statement: "" }); await loadApplications(); }
    catch (err) { setError(err.response?.data?.message || "Unable to submit your application."); }
    finally { setSubmitting(false); }
  };
  const hasPendingApplication = applications.some((item) => item.status === "pending");

  return <div className="min-h-screen bg-slate-100 p-6 md:p-10"><div className="mx-auto max-w-6xl">
    <section className="overflow-hidden rounded-2xl bg-white shadow-xl"><div className="bg-gradient-to-r from-blue-700 to-blue-950 px-8 py-10 text-white md:px-10"><p className="text-sm uppercase tracking-[0.2em] text-blue-100">Scientific staff portal</p><h1 className="mt-3 text-4xl font-bold">Leadership Application</h1><p className="mt-3 max-w-3xl text-blue-50">Put your scientific experience and leadership vision forward for an IIRMS leadership role. Every application is reviewed by an administrator before a role is assigned.</p></div>
      <div className="grid gap-8 p-6 md:grid-cols-5 md:p-8"><aside className="md:col-span-2"><h2 className="text-xl font-bold text-slate-800">How it works</h2><ol className="mt-5 space-y-5">{["Choose the leadership role you wish to serve in.", "Describe your relevant experience and leadership approach.", "An administrator reviews and approves or declines the application."].map((step, index) => <li key={step} className="flex gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">{index + 1}</span><p className="pt-0.5 text-sm leading-6 text-slate-600">{step}</p></li>)}</ol><div className="mt-8 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-900">Leadership approval adds a leadership designation to your Scientific Staff account. It does not grant administrator access.</div></aside>
        <section className="md:col-span-3"><h2 className="text-xl font-bold text-slate-800">Submit your application</h2>{notice && <p className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">{notice}</p>}{error && <p className="mt-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-800">{error}</p>}{hasPendingApplication ? <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">You already have an application awaiting review. You can submit another application once it has been reviewed.</div> : <form onSubmit={submit} className="mt-5 space-y-5"><label className="block text-sm font-semibold text-slate-700">Leadership position<select required value={form.position} onChange={(event) => setForm({ ...form, position: event.target.value })} className="mt-2 w-full rounded-lg border border-slate-300 bg-white p-3 font-normal outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"><option value="">Select a position</option>{positions.map((position) => <option key={position} value={position}>{position}</option>)}</select></label><label className="block text-sm font-semibold text-slate-700">Leadership statement<textarea required minLength="30" value={form.statement} onChange={(event) => setForm({ ...form, statement: event.target.value })} rows="7" placeholder="Describe your leadership experience, relevant scientific work, and vision for the role." className="mt-2 w-full rounded-lg border border-slate-300 p-3 font-normal outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" /></label><button disabled={submitting} className="rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400">{submitting ? "Submitting…" : "Submit for review"}</button></form>}</section></div>
    </section>
    <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm md:p-8"><div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-slate-800">My applications</h2><span className="text-sm text-slate-500">{applications.length} total</span></div>{loading ? <p className="mt-5 text-slate-500">Loading applications…</p> : applications.length === 0 ? <p className="mt-5 rounded-xl bg-slate-50 p-5 text-slate-600">You have not submitted a leadership application yet.</p> : <div className="mt-5 grid gap-4 md:grid-cols-2">{applications.map((item) => <article key={item.application_id} className="rounded-xl border border-slate-200 p-5"><div className="flex items-start justify-between gap-3"><h3 className="font-bold text-slate-800">{item.position}</h3><span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[item.status] || "bg-slate-100 text-slate-700"}`}>{item.status}</span></div><p className="mt-3 text-sm leading-6 text-slate-600">{item.statement}</p><p className="mt-4 text-xs text-slate-400">Submitted {new Date(item.created_at).toLocaleDateString()}</p></article>)}</div>}</section>
  </div></div>;
}
