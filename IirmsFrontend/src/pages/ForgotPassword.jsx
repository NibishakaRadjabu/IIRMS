import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { useLanguage } from "../context/LanguageContext";

export default function ForgotPassword() {
  const { t, translate: tr } = useLanguage();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await api.post("/auth/forgot-password", { email });
      setMessage(tr(response.data.message || t.resetEmailSent));
    } catch (requestError) {
      setError(tr(requestError.response?.data?.message || t.resetFailed));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-slate-100 px-4 py-10">
      <section className="w-full max-w-md rounded-xl bg-white p-7 shadow-lg">
        <h1 className="text-2xl font-bold text-slate-900">{t.forgotTitle}</h1>
        <p className="mt-2 text-sm text-slate-600">{t.forgotHelp}</p>
        {message && <p role="status" className="mt-5 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">{message}</p>}
        {error && <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {!message && <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-slate-700" htmlFor="reset-email">{t.email}</label>
          <input id="reset-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg border border-slate-300 p-3 focus:border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-100" />
          <button disabled={loading} className="w-full rounded-lg bg-sky-700 p-3 font-semibold text-white hover:bg-sky-800 disabled:opacity-60">{loading ? t.sending : t.sendResetLink}</button>
        </form>}
        <Link to="/login" className="mt-6 inline-block text-sm font-medium text-sky-700 hover:underline">{t.backToLogin}</Link>
      </section>
    </main>
  );
}
