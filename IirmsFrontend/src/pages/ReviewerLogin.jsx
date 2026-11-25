import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useLanguage } from "../context/LanguageContext";

export default function ReviewerLogin() {
  const { translate: tr } = useLanguage();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/reviewer/login", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("auth:changed"));
      navigate("/reviewer/dashboard");
    } catch (err) {
      setError(tr(err.response?.data?.message || "Reviewer login failed."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">{tr("Reviewer Login")}</h1>
        <p className="text-sm text-gray-600 mb-6">{tr("Your reviewer application must be approved by an administrator before you can sign in.")}</p>
        {error && <p className="mb-4 rounded bg-red-100 p-3 text-sm text-red-700">{error}</p>}
        <label className="block text-sm font-medium mb-1">{tr("Email")}</label>
        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border rounded p-3 mb-4" required />
        <label className="block text-sm font-medium mb-1">{tr("Password")}</label>
        <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full border rounded p-3 mb-6" required />
        <button disabled={loading} className="w-full rounded bg-blue-600 p-3 font-semibold text-white disabled:opacity-60">
          {loading ? tr("Signing in...") : tr("Sign in as reviewer")}
        </button>
        <p className="mt-5 text-center text-sm text-gray-600">
          {tr("Not a reviewer yet?")} <Link to="/reviewer-apply" className="text-blue-600 hover:underline">{tr("Apply here")}</Link>
        </p>
      </form>
    </div>
  );
}
