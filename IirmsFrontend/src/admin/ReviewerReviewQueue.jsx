import { useCallback, useEffect, useState } from "react";
import api from "../utils/api";
import { useLanguage } from "../context/LanguageContext";

const decisionOptions = [
  { value: "accepted", label: "Accept" },
  { value: "minor_revisions", label: "Minor revisions" },
  { value: "major_revisions", label: "Major revisions" },
  { value: "rejected", label: "Reject" },
];

export default function ReviewerReviewQueue() {
  const { translate: tr } = useLanguage();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState(null);
  const [form, setForm] = useState({ decision: "accepted", comments: "" });

  const fetchRows = useCallback(async () => {
    try {
      const { data } = await api.get("/reviewer/submissions");
      setRows(data);
    } catch (err) {
      console.error(err);
      alert(tr(err.response?.data?.message || "Unable to load reviewer queue."));
    } finally {
      setLoading(false);
    }
  }, [tr]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  const reviewSubmission = async (submissionId) => {
    try {
      await api.post(`/reviewer/submissions/${submissionId}/review`, form);
      setWorkingId(null);
      setForm({ decision: "accepted", comments: "" });
      fetchRows();
    } catch (err) {
      console.error(err);
      alert(tr(err.response?.data?.message || "Review failed."));
    }
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <h1 className="text-2xl font-bold mb-4">{tr("Submission Review Queue")}</h1>

      {loading ? (
        <p>{tr("Loading submissions...")}</p>
      ) : rows.length === 0 ? (
        <p className="text-gray-500">{tr("No submissions are ready for review.")}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">{tr("Title")}</th>
                <th className="border p-2">{tr("Author")}</th>
                <th className="border p-2">{tr("Status")}</th>
                <th className="border p-2">{tr("Decision")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.submission_id}>
                  <td className="border p-2">{row.title}</td>
                  <td className="border p-2">{row.user?.name || tr("Unknown")}</td>
                  <td className="border p-2">{tr(row.status)}</td>
                  <td className="border p-2">
                    {workingId === row.submission_id ? (
                      <div className="space-y-2">
                        <select value={form.decision} onChange={(e) => setForm({ ...form, decision: e.target.value })} className="border rounded p-1 w-full">
                          {decisionOptions.map((option) => (
                            <option key={option.value} value={option.value}>{tr(option.label)}</option>
                          ))}
                        </select>
                        <textarea value={form.comments} onChange={(e) => setForm({ ...form, comments: e.target.value })} rows={3} className="w-full border rounded p-1" placeholder={tr("Add review comments")} />
                        <div className="flex gap-2">
                          <button onClick={() => reviewSubmission(row.submission_id)} className="bg-blue-600 text-white px-3 py-1 rounded">{tr("Submit")}</button>
                          <button onClick={() => setWorkingId(null)} className="border px-3 py-1 rounded">{tr("Cancel")}</button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => setWorkingId(row.submission_id)} className="bg-green-600 text-white px-3 py-1 rounded">{tr("Review")}</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
