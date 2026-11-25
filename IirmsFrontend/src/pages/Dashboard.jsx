import { useNavigate, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

// sections built inside component to allow dynamic profile link


function Dashboard() {
  const navigate = useNavigate();
  const { translate: tr } = useLanguage();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const sections = [
    { label: tr("Submissions"), path: "/submissions", icon: "📄" },
    { label: tr("Certificates"), path: "/certificates", icon: "🎓" },
    { label: tr("Payments"), path: "/payments", icon: "💳" },
    { label: tr("Publications"), path: "/publications", icon: "📝" },
    { label: tr("Chat"), path: "/chat", icon: "💬" },
    { label: tr("Notifications"), path: "/notifications", icon: "🔔" },
    { label: tr("Account settings"), path: "/account", icon: "👤" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">{tr("Welcome,")} {user.name || tr("Student")}</h1>
            <p className="text-gray-500 text-sm">{user.email} — {user.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            {tr("Logout")}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {sections.map((s) => (
            <Link
              key={s.path}
              to={s.path}
              className="bg-white rounded-lg shadow p-6 flex flex-col items-center hover:shadow-md transition hover:bg-blue-50"
            >
              <span className="text-4xl mb-2">{s.icon}</span>
              <span className="font-semibold text-gray-700">{s.label}</span>
            </Link>
          ))}
          {user.role === "admin" && (
            <Link
              to="/admin"
              className="bg-white rounded-lg shadow p-6 flex flex-col items-center hover:shadow-md transition hover:bg-red-50"
            >
              <span className="text-4xl mb-2">⚙️</span>
              <span className="font-semibold text-gray-700">{tr("Admin Panel")}</span>
            </Link>
          )}
          {user.role === "scientific_staff" && (
            <Link
              to="/faculty"
              className="bg-white rounded-lg shadow p-6 flex flex-col items-center hover:shadow-md transition hover:bg-green-50"
            >
              <span className="text-4xl mb-2">🏛</span>
              <span className="font-semibold text-gray-700">{tr("Faculty Panel")}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
