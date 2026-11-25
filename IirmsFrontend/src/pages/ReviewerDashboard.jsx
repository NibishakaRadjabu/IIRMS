import { Link } from "react-router-dom";
import ReviewerReviewQueue from "../admin/ReviewerReviewQueue";
import { useLanguage } from "../context/LanguageContext";

export default function ReviewerDashboard() {
  const { translate: tr } = useLanguage();
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{tr("Reviewer Dashboard")}</h1>
          <p className="text-gray-600">{tr("Review research submissions before publication.")}</p>
        </div>
        <Link to="/dashboard" className="rounded border bg-white px-4 py-2 text-sm hover:bg-gray-50">{tr("Main dashboard")}</Link>
      </div>
      <div className="max-w-7xl mx-auto"><ReviewerReviewQueue /></div>
    </div>
  );
}