import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/logos/revue.jpeg";
import Dropdown from "../IIRMS";
import api from "../utils/api";
import { useLanguage } from "../context/LanguageContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { language, languages, changeLanguage, t, translate: tr } = useLanguage();
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user") || "null"));
  const role = user?.role;
  const initials = user?.name ? user.name.split(' ').map(n => n[0]).slice(0,2).join('') : '';

  useEffect(() => {
    const syncUser = () => {
      try {
        setUser(JSON.parse(localStorage.getItem("user") || "null"));
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("auth:changed", syncUser);
    window.addEventListener("storage", syncUser);
    return () => {
      window.removeEventListener("auth:changed", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  // notification badge count: show 1 if single, otherwise show number
  const [notifCount, setNotifCount] = useState(0);

  useEffect(() => {
    const readCount = () => {
      try {
        const raw = localStorage.getItem('app_notifications') || '[]';
        const arr = JSON.parse(raw);
        setNotifCount(Array.isArray(arr) ? arr.length : 0);
      } catch (e) {
        setNotifCount(0);
      }
    };
    readCount();

    const onApiNotif = (e) => {
      setNotifCount((c) => c + 1);
    };
    const onStorage = (e) => {
      if (e.key === 'app_notifications') {
        try {
          const arr = JSON.parse(e.newValue || '[]');
          setNotifCount(Array.isArray(arr) ? arr.length : 0);
        } catch (err) {
          // ignore
        }
      }
    };

    window.addEventListener('api:notification', onApiNotif);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('api:notification', onApiNotif);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  // Leadership approval can happen while the staff member is already signed
  // in. Refresh the current account so the leadership dashboard link appears
  // without requiring another login.
  useEffect(() => {
    if (!localStorage.getItem("token")) return undefined;

    const refreshCurrentUser = async () => {
      try {
        const response = await api.get("/auth/me");
        const account = response.data;
        const nextUser = {
          id: account.user_id ?? account.id,
          name: account.name,
          email: account.email,
          role: account.role,
          is_leader: Boolean(account.is_leader),
          leadership_role: account.leadership_role || null,
        };
        setUser(nextUser);
        localStorage.setItem("user", JSON.stringify(nextUser));
      } catch {
        // Keep the current session display unchanged for temporary API errors.
      }
    };

    refreshCurrentUser();
    window.addEventListener("focus", refreshCurrentUser);
    const intervalId = window.setInterval(refreshCurrentUser, 30000);
    return () => {
      window.removeEventListener("focus", refreshCurrentUser);
      window.clearInterval(intervalId);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsOpen(false);
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-300";

  const languageSelector = (
    <label className="flex items-center gap-2 text-sm" htmlFor="language-select">
      <span className="sr-only">{t.language}</span>
      <select
        id="language-select"
        value={language}
        onChange={(event) => changeLanguage(event.target.value)}
        className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1"
        aria-label={t.language}
      >
        {Object.entries(languages).map(([code, name]) => (
          <option key={code} value={code}>{name}</option>
        ))}
      </select>
    </label>
  );

  // Links visible to everyone (not logged in)
  
   
  const publicLinks = (
    <> 
      <NavLink to="/" className={linkClass}>{t.home}</NavLink>
      <NavLink to="/research" className={linkClass}>{t.researchPortal}</NavLink>
      <NavLink to="/about" className={linkClass}>{t.aboutUs}</NavLink>
      <NavLink to="/contact" className={linkClass}>{t.contactUs}</NavLink>
      <NavLink to="/submit" className={linkClass}>{tr("Submit Article")}</NavLink>
      <NavLink to="/reviewer-apply" className={linkClass}>{t.joinReviewer}</NavLink>
      <NavLink to="/reviewer/login" className={linkClass}>{t.reviewerLogin}</NavLink>
      <NavLink to="/register" className={linkClass}>{t.register}</NavLink>
      <NavLink to="/login" className={linkClass}>{t.login}</NavLink>
       <Dropdown />
    </>
  );
  

  const studentLinks = (
    <>
    <NavLink to="/" className={linkClass}>{t.home}</NavLink>
     <NavLink to="/submit" className={linkClass}>{tr("Submit Article")}</NavLink>
     <NavLink to="/dashboard" className={linkClass}>{t.dashboard}</NavLink>
      <NavLink to="/submissions" className={linkClass}>{t.submissions}</NavLink>
      <NavLink to="/certificates" className={linkClass}>{t.certificates}</NavLink>
      <NavLink to="/payments" className={linkClass}>{t.payments}</NavLink>
      <NavLink to="/publications" className={linkClass}>{t.publications}</NavLink>
      <NavLink to="/chat" className={linkClass}>{t.chat}</NavLink>
      <NavLink to="/notifications" className={linkClass}>
        {t.notifications}
        {notifCount > 0 && (
          <span className="ml-2 inline-flex items-center justify-center bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            {notifCount}
          </span>
        )}
      </NavLink>
    </>
  );

  const staffLinks = (
    <>
    <NavLink to="/" className={linkClass}>{t.home}</NavLink>
     <NavLink to="/submit" className={linkClass}>Submit Article</NavLink>
     <NavLink to="/dashboard" className={linkClass}>{t.dashboard}</NavLink>
     <NavLink to="/submissions" className={linkClass}>{t.submissions}</NavLink>
     <NavLink to="/publications" className={linkClass}>{t.publications}</NavLink>
     <NavLink to="/leadership/apply" className={linkClass}>{t.leadershipApplication}</NavLink>
     {user?.is_leader && <NavLink to="/leadership/dashboard" className={linkClass}>{t.leadershipDashboard}</NavLink>}
     <NavLink to="/chat" className={linkClass}>{t.chat}</NavLink>
      <NavLink to="/notifications" className={linkClass}>
        {t.notifications}
        {notifCount > 0 && (
          <span className="ml-2 inline-flex items-center justify-center bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            {notifCount}
          </span>
        )}
      </NavLink>
    </>
  );
  // Admin links
  const adminLinks = (
    <>
    <NavLink to="/" className={linkClass}>{t.home}</NavLink>
     <NavLink to="/dashboard" className={linkClass}>{t.dashboard}</NavLink>
     <NavLink to="/admin/users" className={linkClass}>{t.users}</NavLink>
     <NavLink to="/admin/submissions" className={linkClass}>{t.submissions}</NavLink>
      {/* <NavLink to="/admin/certificates" className={linkClass}>Certificates</NavLink> */}
      {/* <NavLink to="/admin/payments" className={linkClass}>Payments</NavLink> */}
      <NavLink to="/admin/notifications" className={linkClass}>{t.notifications}</NavLink>
      <NavLink to="/admin/hero" className={linkClass}>{t.heroSlides}</NavLink>
    </>
  );

  const reviewerLinks = (
    <>
      <NavLink to="/" className={linkClass}>{t.home}</NavLink>
      <NavLink to="/reviewer/dashboard" className={linkClass}>Dashboard</NavLink>
      <NavLink to="/reviewer/reviews" className={linkClass}>{tr("Review Queue")}</NavLink>
    </>
  );

  const renderLinks = () => {
    if (!user) return publicLinks;
    if (role === "reviewer") return reviewerLinks;
    if (role === "admin") return adminLinks;
    if (role === "scientific_staff") return staffLinks;
    return studentLinks;
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center  relative z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="RSIMS Logo" className="h-10 w-auto rounded" />
        <span className="text-xl font-bold hidden sm:block">RSIMS</span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-4">
        {renderLinks()}
        {user && <NavLink to="/account" className={linkClass}>{t.accountSettings}</NavLink>}
        {languageSelector}
        {user && (
          <>
            <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm">{initials || 'U'}</div>
            <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
              {t.logout}
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-800 flex flex-col space-y-2 p-4 md:hidden">
          {user && (
            <div className="flex items-center space-x-3 px-2 pb-2 border-b border-gray-700">
              <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm">{initials || 'U'}</div>
              <div>
                <div className="text-sm font-semibold">{user.name}</div>
                <div className="text-xs text-gray-300">{user.email}</div>
              </div>
            </div>
          )}

          {languageSelector}
          {renderLinks()}
          {user && <NavLink to="/account" className={linkClass}>{t.accountSettings}</NavLink>}

          {user && (
            <>
            <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm text-left">
              {t.logout}
            </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
