// AdminPanel.js
import Sidebar from "./Sidebar";
import { Routes, Route } from "react-router-dom";

// Admin Pages
import ManageUsers from "./ManageUsers";
import ManageDepartments from "./ManageDepartments";
import ProfessorConfirm from "./ProfessorConfirm";
import AdministrativeStaff from "./AdministrativeStaff";
import SubmissionsAdmin from "./SubmissionsAdmin";
import CertificatesAdmin from "./CertificatesAdmin";
// import PaymentsAdmin from "./PaymentsAdmin";
import PublicationFeeAdmin from "./PublicationFeeAdmin";
// import Analytics from "./Analytics";
import NotificationsAdmin from "./NotificationsAdmin";
import HeroSlidesAdmin from "./HeroSlidesAdmin";
import FundingGrantsAdmin from "./FundingGrantsAdmin";
import PaymentSettingsAdmin from "./PaymentSettingsAdmin";
import EventsNewsAdmin from "./EventsNewsAdmin";
import ReviewerApplicationsAdmin from "./ReviewerApplicationsAdmin";
import ReviewerReviewQueue from "./ReviewerReviewQueue";
import LeadershipApplicationsAdmin from "./LeadershipApplicationsAdmin";
import ArticleMetadataAdmin from "./ArticleMetadataAdmin";

function AdminPanel() {
  return (
    <div className="flex ">
      {/* Sidebar fixed on the left */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 ml-64 p-6 bg-gray-100 min-h-screen">
        <Routes>
          <Route path="users" element={<ManageUsers />} />
          <Route path="departments" element={<ManageDepartments />} />
          <Route path="scientific-staff" element={<ProfessorConfirm />} />
          <Route path="administrative-staff" element={<AdministrativeStaff />} />
          <Route path="submissions" element={<SubmissionsAdmin />} />
          <Route path="articles" element={<ArticleMetadataAdmin />} />
          <Route path="certificates" element={<CertificatesAdmin />} />
          {/* <Route path="payments" element={<PaymentsAdmin />} /> */}
          <Route path="payment-settings" element={<PaymentSettingsAdmin />} />
          <Route path="publication-fee" element={<PublicationFeeAdmin />} />
          {/* <Route path="analytics" element={<Analytics />} /> */}
          <Route path="notifications" element={<NotificationsAdmin />} />
          {/* <Route path="funding-grants" element={<FundingGrantsAdmin />} /> */}
          <Route path="hero" element={<HeroSlidesAdmin />} />
          <Route path="events" element={<EventsNewsAdmin />} />
          <Route path="reviewer-applications" element={<ReviewerApplicationsAdmin />} />
          <Route path="reviewer-review-queue" element={<ReviewerReviewQueue />} />
          <Route path="leadership-applications" element={<LeadershipApplicationsAdmin />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPanel;
