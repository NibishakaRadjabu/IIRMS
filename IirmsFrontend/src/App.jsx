// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import ProtectedRoute from "./pages/ProtectedRoute";
import AdministrativeStaff from "./admin/AdministrativeStaff";
// Pages
import DirectorGeneral from "./DirectorGeneral";
import DirectorGeneralDetails from "./DirectorGeneralDetails";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SubmissionForm from "./SubmissionForm";
import SubmissionList from "./SubmissionList";
import CertificateView from "./CertificateView";
import PaymentForm from "./pages/PaymentForm";
import PublicationForm from "./pages/PublicationForm";
import ChatRoom from "./pages/ChatRoom";
import ResearchPortal from "./pages/ResearchPortal";
import ResearchDepartments from "./ResearchDepartments";
import DepartmentDetail from "./DepartmentDetail";
import ScientificPublicationsDepartment from "./ScientificPublicationsDepartment";
import Department from "./Department";
import DepartmentProjectDevelopment from "./DepartmentProjectDevelopment";
import AdminPanel from "./admin/AdminPanel";
import Dashboard from "./pages/Dashboard";
import AccountSettings from "./pages/AccountSettings";
import FacultyPanel from "./pages/FacultyPanel";
import LeadershipApplication from "./pages/LeadershipApplication";
import DirectorGeneralDashboard from "./pages/DirectorGeneralDashboard";
import DevDebugPanel from "./components/DevDebugPanel";
// import ApiProbe from "./components/ApiProbe";
import LiveNotifications from "./components/LiveNotifications";
import Notifications from "./pages/Notifications";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ReviewerApplicationForm from "./pages/ReviewerApplicationForm";
import ReviewerReviewQueue from "./admin/ReviewerReviewQueue";
import ReviewerLogin from "./pages/ReviewerLogin";
import ReviewerDashboard from "./pages/ReviewerDashboard";
import { LanguageProvider } from "./context/LanguageContext";

import { useEffect } from 'react';

function App() {
  // Ensure axios default Authorization header is populated from localStorage at app startup
  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // set header on the api instance we import synchronously
        import('./utils/api').then((apiModule) => {
          const apiInst = apiModule.default;
          apiInst.defaults.headers = apiInst.defaults.headers || {};
          apiInst.defaults.headers.common = apiInst.defaults.headers.common || {};
          apiInst.defaults.headers.common.Authorization = 'Bearer ' + token;
        }).catch(() => {});
      }
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <LanguageProvider>
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/DirectorGeneral" element={<DirectorGeneral />} />
            <Route path="/DeputyDirectorGenerals" element={<DirectorGeneralDetails />} />
            <Route path="/ExecutiveSecretariat" element={<DirectorGeneralDetails />} />
            <Route path="/ScientificDirectorate" element={<DirectorGeneralDetails />} />
            <Route path="/ScientificDirector" element={<DirectorGeneralDetails />} />
            <Route path="/ScientificCouncil" element={<DirectorGeneralDetails />} />
            <Route path="/ResearchCoordinators" element={<DirectorGeneralDetails />} />
            <Route path="/ResearchersAndResearchProfessors" element={<DirectorGeneralDetails />} />
            <Route path="/ResearchDepartments" element={<ResearchDepartments />} />
            <Route path="/ScientificPublications" element={<ScientificPublicationsDepartment />} />
            <Route path="/ScientificPublicationsDepartment" element={<ScientificPublicationsDepartment />} />
            <Route path="/Departments" element={<Department />} />
            <Route path="/Department" element={<Department />} />
            <Route path="/ProjectDevelopment" element={<DepartmentProjectDevelopment />} />
            <Route path="/DepartmentProjectDevelopment" element={<DepartmentProjectDevelopment />} />
            <Route path="/CivilEngineeringAndEnvironment" element={<DepartmentDetail />} />
            <Route path="/EconomicsAndManagementSciences" element={<DepartmentDetail />} />
            <Route path="/SocialAndHumanSciences" element={<DepartmentDetail />} />
            <Route path="/LawAndGovernance" element={<DepartmentDetail />} />
            <Route path="/HealthAndBiomedicalSciences" element={<DepartmentDetail />} />
            <Route path="/AgricultureAndRuralDevelopment" element={<DepartmentDetail />} />
            <Route path="/ComputerScienceArtificialIntelligenceAndDigitalTechnologies" element={<DepartmentDetail />} />
            <Route path="/EnergyAndSustainableDevelopment" element={<DepartmentDetail />} />
            <Route path="/" element={<Home />} />
            <Route path="/research" element={<ResearchPortal />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/submit" element={<ProtectedRoute><SubmissionForm /></ProtectedRoute>} />
            <Route path="/reviewer-apply" element={<ReviewerApplicationForm />} />
            <Route path="/reviewer/login" element={<ReviewerLogin />} />
            <Route
              path="/reviewer/dashboard"
              element={
                <ProtectedRoute>
                  <ReviewerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reviewer/reviews"
              element={
                <ProtectedRoute>
                  <ReviewerReviewQueue />
                </ProtectedRoute>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/leadership/apply" element={<ProtectedRoute allowedRoles={["scientific_staff"]}><LeadershipApplication /></ProtectedRoute>} />
            <Route path="/leadership/dashboard" element={<ProtectedRoute allowedRoles={["scientific_staff"]}><DirectorGeneralDashboard /></ProtectedRoute>} />
            <Route path="/DirectorGeneralDashboard" element={<ProtectedRoute allowedRoles={["scientific_staff"]}><DirectorGeneralDashboard /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/account" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />

            {/* Protected Routes */}
            <Route
              path="/submissions/create"
              element={
                <ProtectedRoute>
                  <SubmissionForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/submissions"
              element={
                <ProtectedRoute>
                  <SubmissionList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/certificates"
              element={
                <ProtectedRoute>
                  <CertificateView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payments"
              element={
                <ProtectedRoute>
                  <PaymentForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/publications"
              element={
                <ProtectedRoute>
                  <PublicationForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <ChatRoom />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/faculty"
              element={
                <ProtectedRoute allowedRoles={["scientific_staff"]}>
                  <FacultyPanel />
                </ProtectedRoute>
              }
            />
          </Routes>

        </main>
        <Footer />
        {/* {import.meta.env.DEV && <DevDebugPanel />} */}
        {/* {import.meta.env.DEV && <ApiProbe />} */}
        <LiveNotifications />
      </div>
    </Router>
    </LanguageProvider>
  );
}

export default App;
