// SubmissionList.js
import { useEffect, useState } from "react";
import api from "./utils/axios";
import { useLanguage } from "./context/LanguageContext";

function SubmissionList() {
  const { translate: tr } = useLanguage();
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const res = await api.get("/submissions");
        setSubmissions(res.data);
      } catch (err) {
        console.error("Error fetching submissions:", err);
      }
    };
    fetchSubs();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{tr("My Submissions")}</h1>
      <ul className="space-y-3">
        {submissions.map((sub) => (
          <li key={sub.submission_id} className="border p-3 rounded">
            <h2 className="font-semibold">{sub.title}</h2>
            <p className="text-sm text-gray-600">{sub.abstract}</p>
            <p className="text-xs text-gray-500">{tr("Status:")} {tr(sub.status)}</p>
          </li>
        ))}
      </ul>
      {submissions.length === 0 && (
        <p className="text-gray-500">{tr("You have not submitted any research yet.")}</p>
      )}
    </div>
  );
}

export default SubmissionList;
