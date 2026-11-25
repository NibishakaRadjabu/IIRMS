import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import api from "../utils/api";
import logo from "../assets/logos/logo.png";
import { useLanguage } from "../context/LanguageContext";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { t, translate: tr } = useLanguage();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.dispatchEvent(new Event("auth:changed"));
      navigate(location.state?.from?.pathname || "/dashboard", { replace: true });
    } catch (err) {
      setError(tr(err.response?.data?.message || t.loginFailed));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 pt-8">
        <img src={logo} alt="" className="w-30 h-30 ml-38 " />
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">{t.loginTitle}</h2>
        {location.state?.message && <p className="text-amber-700 bg-amber-50 border border-amber-200 p-3 rounded text-sm mb-4 text-center">{tr(location.state.message)}</p>}
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder={t.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder={t.password}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold p-3 rounded hover:bg-blue-700 transition duration-200"
          >
            {t.login}
          </button>
        </form>
        <div className="mt-4 flex flex-col items-center gap-3 text-sm">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">{t.forgotPassword}</Link>
          <p className="text-gray-600">
          {t.registerPrompt}{" "}
          <Link to="/register" state={{ from: location.state?.from }} className="text-blue-600 hover:underline">{t.register}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
