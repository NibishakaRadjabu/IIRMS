import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function Sidebar() {
  const { translate: tr } = useLanguage();
  const linkClass = ({ isActive }) =>
    isActive ? 'block px-4 py-2 bg-blue-600 text-white rounded' : 'block px-4 py-2 hover:bg-blue-100 rounded';

  return (
    <aside className="w-64 fixed left-0 top-0 h-170 bg-white border-r shadow-sm p-4">
      <h2 className="text-xl font-bold mb-4">{tr("Admin")}</h2>
      <nav className="space-y-2">
        <NavLink to="/admin/users" className={linkClass}>{tr("Manage Users")}</NavLink>
        <NavLink to="/admin/departments" className={linkClass}>{tr("Departments")}</NavLink>
        <NavLink to="/admin/scientific-staff" className={linkClass}>{tr("Scientific staff")}</NavLink>
        <NavLink to="/admin/administrative-staff" className={linkClass}>{tr("Administrative Staff")}</NavLink>
        <NavLink to="/admin/submissions" className={linkClass}>{tr("Submissions")}</NavLink>
        <NavLink to="/admin/articles" className={linkClass}>{tr("Article metadata")}</NavLink>
        {/* <NavLink to="/admin/certificates" className={linkClass}>Certificates</NavLink> */}
        {/* <NavLink to="/admin/funding-grants" className={linkClass}>Funding Grants</NavLink> */}
        {/* <NavLink to="/admin/payments" className={linkClass}>Payments</NavLink> */}
        <NavLink to="/admin/payment-settings" className={linkClass}>{tr("Payment Settings")}</NavLink>
        <NavLink to="/admin/publication-fee" className={linkClass}>{tr("Publication Fee")}</NavLink>
        {/* <NavLink to="/admin/analytics" className={linkClass}>Analytics</NavLink> */}
        <NavLink to="/admin/notifications" className={linkClass}>{tr("Notifications")}</NavLink>
        <NavLink to="/admin/reviewer-applications" className={linkClass}>{tr("Reviewer Applications")}</NavLink>
        <NavLink to="/admin/leadership-applications" className={linkClass}>{tr("Leadership Applications")}</NavLink>
        <NavLink to="/reviewer/reviews" className={linkClass}>{tr("Review Queue")}</NavLink>
        <NavLink to="/admin/hero" className={linkClass}>{tr("Hero Slides")}</NavLink>
        <NavLink to="/admin/events" className={linkClass}>{tr("Events & News")}</NavLink>
      </nav>
    </aside>
  );
}
 
export default Sidebar;
