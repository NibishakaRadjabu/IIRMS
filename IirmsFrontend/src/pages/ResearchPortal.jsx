import { useCallback, useState, useEffect } from "react";
import api from "../utils/axios";
import { useLanguage } from "../context/LanguageContext";

export default function ResearchPortal() {
  const { translate: tr } = useLanguage();
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPub, setSelectedPub] = useState(null);
  const publicationSummary = selectedPub?.research_summary
    || selectedPub?.submission?.research_summary
    || selectedPub?.submission?.abstract;
  const documentUrl = selectedPub?.document || selectedPub?.submission?.file_path;
  const isPdfDocument = typeof documentUrl === "string" && documentUrl.toLowerCase().endsWith(".pdf");
  const isImageDocument = typeof documentUrl === "string" && /\.(png|jpe?g|gif|webp)$/i.test(documentUrl);

  const fetchPublications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/publications/public");
      setPublications(res.data);
    } catch (err) {
      setError(tr(err.response?.data?.message || "Failed to fetch publications"));
    } finally {
      setLoading(false);
    }
  }, [tr]);

  useEffect(() => {
    fetchPublications();
  }, [fetchPublications]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">{tr("Research Portal")}</h1>
          <p className="text-blue-100 text-lg">
            {tr("Discover all publications and meet the researchers behind the innovations")}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{tr("Loading publications...")}</p>
          </div>
        )}

        {!loading && publications.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 text-lg">{tr("No publications found yet.")}</p>
          </div>
        )}

        {!loading && publications.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Publication List */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow sticky top-6">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {tr("Publications")} ({publications.length})
                  </h2>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {publications.map((pub) => (
                    <div key={pub.publication_id} className="border-b border-gray-100">
                      <button
                        onClick={() => setSelectedPub(pub)}
                        className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition ${
                          selectedPub?.publication_id === pub.publication_id
                            ? "bg-blue-100 border-l-4 border-blue-600"
                            : ""
                        }`}
                      >
                        <h3 className="font-medium text-gray-800 line-clamp-2 text-sm">
                          {pub.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {pub.researchers?.length || 0} {tr(pub.researchers?.length === 1 ? "researcher" : "researchers")}
                        </p>
                      </button>
                      <a
                        href={`${(api.defaults.baseURL || "/api").replace(/\/$/, "")}/publications/public/${pub.publication_id}/article`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 pb-3 text-xs font-medium text-blue-700 hover:underline"
                      >
                        {tr("Open permanent article page")}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Publication Details */}
            <div className="md:col-span-2">
              {selectedPub ? (
                <div className="bg-white rounded-lg shadow p-6">
                  {/* Publication Info */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                      {selectedPub.title}
                    </h2>
                    <a
                      href={`${(api.defaults.baseURL || "/api").replace(/\/$/, "")}/publications/public/${selectedPub.publication_id}/article`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-4 inline-block text-sm font-medium text-blue-700 hover:underline"
                    >
                      {tr("Open permanent article page")}
                    </a>
                    
                    {selectedPub.doi && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{tr("DOI:")}</span>{" "}
                          <a
                            href={`https://doi.org/${selectedPub.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {selectedPub.doi}
                          </a>
                        </p>
                      </div>
                    )}

                    {publicationSummary && (
                      <div className="mb-5">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{tr("Research summary")}</h3>
                        
                        <p className="text-sm text-gray-600 whitespace-pre-line">
                          {publicationSummary}
                        </p>
                      </div>
                    )}

                    {documentUrl && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{tr("Research document")}</h3>
                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                          <div className="mb-3 flex flex-wrap gap-3">
                            <a
                              href={documentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                              {tr("Open document")}
                            </a>
                            <a
                              href={documentUrl}
                              download
                              className="inline-flex items-center rounded border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                            >
                              {tr("Download")}
                            </a>
                          </div>

                          {isPdfDocument ? (
                            <iframe
                              src={documentUrl}
                              title={tr("Research document preview")}
                              className="h-[420px] w-full rounded border border-gray-200 bg-white"
                            />
                          ) : isImageDocument ? (
                            <img
                              src={documentUrl}
                              alt="Research document"
                              className="max-h-[420px] w-full rounded border border-gray-200 object-contain bg-white"
                            />
                          ) : (
                            <p className="text-sm text-gray-600">
                              {tr("Document available. Open or download it to view the full file.")}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {selectedPub.department && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{tr("Department:")}</span>{" "}
                          {selectedPub.department.faculties}
                        </p>
                      </div>
                    )}

                    {selectedPub.created_at && (
                      <div className="mb-6">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{tr("Published:")}</span>{" "}
                          {new Date(selectedPub.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Researchers Section */}
                  <div className="border-t pt-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      {tr("Researchers")} ({selectedPub.researchers?.length || 0})
                    </h3>

                    {selectedPub.researchers && selectedPub.researchers.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedPub.researchers.map((researcher) => (
                          <div
                            key={researcher.user_id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                          >
                            <div className="flex items-start space-x-3">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                                {researcher.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-800">
                                  {researcher.name}
                                </h4>
                                <p className="text-xs text-gray-500">
                                  {researcher.role
                                    .split("_")
                                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(" ")}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {researcher.email}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">
                        {tr("No researchers assigned to this publication yet.")}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <p className="text-gray-500 text-lg">
                    {tr("Select a publication to view details and researchers")}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
