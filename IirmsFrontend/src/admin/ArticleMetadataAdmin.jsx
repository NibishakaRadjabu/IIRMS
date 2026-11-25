import { useEffect, useState } from "react";
import api from "../utils/axios";
import { useLanguage } from "../context/LanguageContext";

const emptyMetadata = {
  title: "",
  journal_title: "",
  volume: "",
  issue: "",
  publication_year: "",
  publication_date: "",
  first_page: "",
  last_page: "",
  issn: "",
  doi: "",
  research_summary: "",
  document: "",
};

const articleUrl = (id) =>
  `${(api.defaults.baseURL || "/api").replace(/\/$/, "")}/publications/public/${id}/article`;

export default function ArticleMetadataAdmin() {
  const { translate: tr } = useLanguage();
  const [articles, setArticles] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [form, setForm] = useState(emptyMetadata);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/publications")
      .then(({ data }) => {
        const rows = Array.isArray(data) ? data : [];
        setArticles(rows);
        if (rows.length) {
          setSelectedId(String(rows[0].publication_id));
          setForm(Object.fromEntries(Object.keys(emptyMetadata).map((key) => [
            key,
            rows[0][key] == null ? "" : String(rows[0][key]).slice(0, 10),
          ])));
        }
      })
      .catch((requestError) => setError(tr(requestError.response?.data?.message || "Could not load publications.")))
      .finally(() => setLoading(false));
  }, [tr]);

  const selectArticle = (article, clearMessage = true) => {
    if (clearMessage) {
      setError("");
      setMessage("");
    }
    setSelectedId(String(article.publication_id));
    setForm(Object.fromEntries(Object.keys(emptyMetadata).map((key) => [
      key,
      article[key] == null ? "" : String(article[key]).slice(0, 10),
    ])));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);
    try {
      const payload = {
        ...form,
        publication_year: form.publication_year ? Number(form.publication_year) : null,
      };
      const { data } = await api.put(`/publications/${selectedId}`, payload);
      const updated = { ...data, ...payload, publication_id: Number(selectedId) };
      setArticles((previous) => previous.map((article) =>
        String(article.publication_id) === selectedId ? { ...article, ...updated } : article
      ));
      selectArticle(updated, false);
      setMessage(tr("Article metadata saved."));
    } catch (requestError) {
      setError(tr(requestError.response?.data?.message || "Could not save article metadata."));
    } finally {
      setSaving(false);
    }
  };

  const updateField = (event) => {
    setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  };

  if (loading) return <p className="p-8 text-gray-600">{tr("Loading publications…")}</p>;

  return (
    <section className="max-w-5xl">
      <h1 className="text-2xl font-bold text-gray-900">{tr("Article metadata")}</h1>
      <p className="mt-2 text-sm text-gray-600">
        {tr("Complete each published article’s citation details and link its searchable PDF. The article page is public and has its own permanent URL.")}
      </p>

      {error && <p role="alert" className="mt-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {message && <p role="status" className="mt-4 rounded border border-green-200 bg-green-50 p-3 text-sm text-green-700">{message}</p>}

      {!articles.length ? (
        <p className="mt-6 rounded bg-white p-6 text-gray-600">{tr("There are no publication records to edit yet.")}</p>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(220px,0.7fr)_minmax(0,1.5fr)]">
          <div className="space-y-2">
            {articles.map((article) => (
              <button
                key={article.publication_id}
                type="button"
                onClick={() => selectArticle(article)}
                className={`w-full rounded border p-3 text-left text-sm ${selectedId === String(article.publication_id) ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white hover:bg-gray-50"}`}
              >
                {article.title}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">{tr("Bibliographic details")}</h2>
              <a href={articleUrl(selectedId)} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-700 hover:underline">
                {tr("Preview public article page")}
              </a>
            </div>
            <label className="block text-sm font-medium">{tr("Article title")}
              <input name="title" value={form.title} onChange={updateField} required className="mt-1 w-full rounded border p-2" />
            </label>
            <label className="block text-sm font-medium">{tr("Journal title")}
              <input name="journal_title" value={form.journal_title} onChange={updateField} className="mt-1 w-full rounded border p-2" />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["volume", "Volume"],
                ["issue", "Issue"],
                ["publication_year", "Publication year"],
                ["publication_date", "Publication date"],
                ["first_page", "First page"],
                ["last_page", "Last page"],
                ["issn", "ISSN"],
                ["doi", "DOI"],
              ].map(([name, label]) => (
                <label key={name} className="block text-sm font-medium">{tr(label)}
                  <input
                    name={name}
                    type={name === "publication_date" ? "date" : name === "publication_year" ? "number" : "text"}
                    min={name === "publication_year" ? 1500 : undefined}
                    max={name === "publication_year" ? 9999 : undefined}
                    value={form[name]}
                    onChange={updateField}
                    className="mt-1 w-full rounded border p-2"
                  />
                </label>
              ))}
            </div>
            <label className="block text-sm font-medium">{tr("Abstract")}
              <textarea name="research_summary" value={form.research_summary} onChange={updateField} rows={5} className="mt-1 w-full rounded border p-2" />
            </label>
            <label className="block text-sm font-medium">{tr("PDF URL or uploaded file path")}
              <input name="document" value={form.document} onChange={updateField} placeholder="/uploads/article.pdf" className="mt-1 w-full rounded border p-2" />
            </label>
            <button type="submit" disabled={saving} className="rounded bg-blue-700 px-5 py-2.5 font-semibold text-white hover:bg-blue-800 disabled:opacity-60">
              {saving ? tr("Saving…") : tr("Save article metadata")}
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
