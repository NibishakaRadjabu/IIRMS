import { useEffect, useState } from "react";
import api from "../utils/api";
import { useLanguage } from "../context/LanguageContext";

const emptyPasswordForm = { currentPassword: "", newPassword: "", confirmPassword: "" };

export default function AccountSettings() {
  const { t, translate: tr } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "" });
  const [passwordForm, setPasswordForm] = useState(emptyPasswordForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    api.get("/auth/me")
      .then(({ data }) => {
        if (active) setForm({ name: data.name || "", email: data.email || "" });
      })
      .catch((requestError) => {
        if (active) setError(tr(requestError.response?.data?.message || t.accountLoadFailed));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [t.accountLoadFailed, tr]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (passwordForm.newPassword && passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError(t.passwordMismatch);
      return;
    }
    if (passwordForm.newPassword && passwordForm.newPassword.length < 8) {
      setError(t.passwordMin);
      return;
    }

    const payload = { name: form.name, email: form.email };
    if (passwordForm.newPassword) {
      payload.currentPassword = passwordForm.currentPassword;
      payload.newPassword = passwordForm.newPassword;
    }

    setSaving(true);
    try {
      const { data } = await api.put("/auth/me", payload);
      const updatedUser = data.user;
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem("user", JSON.stringify({ ...currentUser, ...updatedUser }));
      window.dispatchEvent(new Event("auth:changed"));
      setPasswordForm(emptyPasswordForm);
      setMessage(tr(data.message || t.accountUpdateSuccess));
    } catch (requestError) {
      setError(tr(requestError.response?.data?.message || t.accountUpdateFailed));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="mx-auto max-w-2xl px-4 py-12 text-center text-gray-600">{t.loading}</div>;
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900">{t.accountSettings}</h1>
        <p className="mt-2 text-sm text-gray-600">{t.accountSettingsHelp}</p>

        {error && <p role="alert" className="mt-5 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {message && <p role="status" className="mt-5 rounded border border-green-200 bg-green-50 p-3 text-sm text-green-700">{message}</p>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">{t.accountDetails}</h2>
            <label className="block text-sm font-medium text-gray-700">
              {t.fullName}
              <input
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(event) => setForm((previous) => ({ ...previous, name: event.target.value }))}
                required
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              {t.email}
              <input
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(event) => setForm((previous) => ({ ...previous, email: event.target.value }))}
                required
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              />
            </label>
          </section>

          <section className="space-y-4 border-t border-gray-200 pt-5">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{t.changePassword}</h2>
              <p className="mt-1 text-sm text-gray-600">{t.passwordChangeHelp}</p>
            </div>
            <label className="block text-sm font-medium text-gray-700">
              {t.currentPassword}
              <input
                type="password"
                autoComplete="current-password"
                value={passwordForm.currentPassword}
                onChange={(event) => setPasswordForm((previous) => ({ ...previous, currentPassword: event.target.value }))}
                required={Boolean(passwordForm.newPassword)}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              {t.newPassword}
              <input
                type="password"
                autoComplete="new-password"
                value={passwordForm.newPassword}
                onChange={(event) => setPasswordForm((previous) => ({ ...previous, newPassword: event.target.value }))}
                minLength={8}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              {t.confirmPassword}
              <input
                type="password"
                autoComplete="new-password"
                value={passwordForm.confirmPassword}
                onChange={(event) => setPasswordForm((previous) => ({ ...previous, confirmPassword: event.target.value }))}
                required={Boolean(passwordForm.newPassword)}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              />
            </label>
          </section>

          <button
            type="submit"
            disabled={saving}
            className="rounded bg-blue-700 px-5 py-2.5 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? t.saving : t.saveAccountChanges}
          </button>
        </form>
        <p className="mt-5 border-t border-gray-100 pt-4 text-xs text-gray-500">{t.passwordStorageNote}</p>
      </div>
    </main>
  );
}
