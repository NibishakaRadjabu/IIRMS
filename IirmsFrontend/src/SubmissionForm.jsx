import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./utils/api";

function SubmissionForm() {
  const [form, setForm] = useState({ title: "", abstract: "", research_summary: "" });
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!file) {
      setError("Please attach your manuscript as a PDF or Word document.");
      return;
    }

    const payload = new FormData();
    payload.append("title", form.title.trim());
    payload.append("abstract", form.abstract.trim());
    payload.append("research_summary", form.research_summary.trim());
    payload.append("document", file);

    setIsSubmitting(true);
    try {
      await api.post("/submissions", payload);
      setSubmitted(true);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Your manuscript could not be submitted. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="mx-auto my-12 max-w-2xl rounded-2xl bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700" aria-hidden="true">✓</div>
        <h1 className="text-3xl font-bold text-slate-900">Manuscript submitted</h1>
        <p className="mt-3 text-slate-600">Your article is now in the editorial screening queue. You can follow its status from your submissions page.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={() => navigate("/submissions")} className="rounded-lg bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800">View my submissions</button>
          <Link to="/" className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50">Return home</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto my-10 max-w-4xl px-4 sm:px-6">
      <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
        <header className="bg-slate-900 px-6 py-8 text-white sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">STMR Innovation Ltd · Journals</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Submit an article</h1>
          <p className="mt-3 max-w-2xl text-slate-300">Send your manuscript to the editorial team for screening and peer review. Your submission will be linked to your account.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-10">
          {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-800">Article title <span className="text-red-600">*</span></span>
            <input name="title" value={form.title} onChange={handleChange} required maxLength={255} className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100" placeholder="Enter the full title of your manuscript" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-800">Abstract</span>
            <textarea name="abstract" value={form.abstract} onChange={handleChange} rows={6} className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100" placeholder="Summarize the purpose, methods, findings, and contribution of your article" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-800">Keywords and additional notes</span>
            <textarea name="research_summary" value={form.research_summary} onChange={handleChange} rows={3} className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100" placeholder="Add keywords and any notes for the editorial office" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-800">Manuscript file <span className="text-red-600">*</span></span>
            <input type="file" name="document" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(event) => setFile(event.target.files?.[0] || null)} required className="block w-full rounded-lg border border-slate-300 p-3 text-sm text-slate-700 file:mr-4 file:rounded-md file:border-0 file:bg-sky-50 file:px-4 file:py-2 file:font-semibold file:text-sky-800 hover:file:bg-sky-100" />
            <span className="mt-2 block text-xs text-slate-500">PDF or Word document, up to 20 MB.</span>
          </label>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">Need to check your submission guidelines? Contact the editorial office before submitting.</p>
            <button type="submit" disabled={isSubmitting} className="rounded-lg bg-sky-700 px-6 py-3 font-semibold text-white transition hover:bg-sky-800 disabled:cursor-wait disabled:opacity-60">{isSubmitting ? "Submitting…" : "Submit manuscript"}</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SubmissionForm;
