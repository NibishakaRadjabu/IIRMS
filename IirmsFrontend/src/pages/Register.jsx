import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import api from "../utils/api";
import logo from "../assets/logos/logo.png";
import { useLanguage } from "../context/LanguageContext";


export default function Register() {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", role: "",
    university: "", trade: "", lesson: "", combination: "", department_id: "",
    specialization: "",
  });
  const [error, setError] = useState("");
  const [staffFiles, setStaffFiles] = useState({ resume: null, qualification_proof: null, identity_proof: null });
  const navigate = useNavigate();
  const location = useLocation();
  const { translate: tr } = useLanguage();

  useEffect(() => {
    api.get("/auth/departments").then(r => setDepartments(r.data)).catch(() => {});
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        ...((formData.role === "student" || formData.role === "researcher") && {
          university: formData.university,
          trade: formData.trade,
          lesson: formData.lesson,
          combination: formData.combination,
          department_id: formData.department_id,
        }),
        ...(formData.role === "scientific_staff" && {
          department_id: formData.department_id,
          specialization: formData.specialization,
        }),
      };

      let registrationPayload = payload;
      if (formData.role === "scientific_staff") {
        const missingFile = Object.entries(staffFiles).find(([, file]) => !file);
        if (missingFile) {
          setError(tr("Scientific Staff registration requires a CV, qualification proof, and identity proof."));
          return;
        }
        registrationPayload = new FormData();
        Object.entries(payload).forEach(([key, value]) => registrationPayload.append(key, value));
        Object.entries(staffFiles).forEach(([key, file]) => registrationPayload.append(key, file));
      }

      const res = await api.post("/auth/register", registrationPayload);
      navigate('/login', { state: { message: res.data.message, from: location.state?.from } });
      return;
    } catch (err) {
      setError(tr(err.response?.data?.message || "Registration failed."));
    }
  };

  const inputClass = "ig-input";

  return (
  
           <div className="flex items-center justify-center min-h-screen bg-gray-100">
<div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 pt-8">
  <img src={logo} alt="" className="w-30 h-30 ml-38 " />
          <h2 className=" text-3xl font-bold text-center text-blue-600 mb-6">{tr("Create account")}</h2>
          <p className="ig-subtitle">{tr("Join the research community and start your next chapter.")}</p>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-4">
            <input type="text" name="name" placeholder={tr("Full Name")} value={formData.name} onChange={handleChange}  className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500" required />
            <input type="email" name="email" placeholder={tr("Email")} value={formData.email} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500" required />
            <input type="password" name="password" placeholder={tr("Password (at least 8 characters)")} minLength={8} value={formData.password} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500" required />

            <select name="role" value={formData.role} onChange={handleChange}  className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500" required>
              <option value="">{tr("Select Role")}</option>
              <option value="student">{tr("Student")}</option>
              <option value="researcher">{tr("Researcher")}</option>
              <option value="scientific_staff">{tr("Scientific Staff")}</option>
            </select>

            {(formData.role === "student" || formData.role === "researcher") && (
              <>
                <input type="text" name="university" placeholder={tr("University")} value={formData.university} onChange={handleChange}  className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500" />
                <input type="text" name="trade" placeholder={tr("Trade")} value={formData.trade} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500" />
                <input type="text" name="lesson" placeholder={tr("Lesson")} value={formData.lesson} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500" />
                <input type="text" name="combination" placeholder={tr("Combination")} value={formData.combination} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500" />
                <select name="department_id" value={formData.department_id} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500" required>
                  <option value="">{tr("Select Department")}</option>
                  {departments.map(d => <option key={d.department_id} value={d.department_id}>{d.faculties}</option>)}
                </select>
              </>
            )}

            {formData.role === "scientific_staff" && (
              <>
                <input type="text" name="specialization" placeholder={tr("Specialization")} value={formData.specialization} onChange={handleChange}  className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500" />
                <select name="department_id" value={formData.department_id} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500" required>
                  <option value="">{tr("Select Department")}</option>
                  {departments.map(d => <option key={d.department_id} value={d.department_id}>{d.faculties}</option>)}
                </select>
                <label className="block text-sm text-gray-700">
                  {tr("CV / Resume (PDF, DOC, DOCX)")}
                  <input type="file" accept=".pdf,.doc,.docx" onChange={(event) => setStaffFiles((files) => ({ ...files, resume: event.target.files?.[0] || null }))} className="mt-1 block w-full rounded border p-2" required />
                </label>
                <label className="block text-sm text-gray-700">
                  {tr("Qualification proof (PDF, JPG, PNG)")}
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(event) => setStaffFiles((files) => ({ ...files, qualification_proof: event.target.files?.[0] || null }))} className="mt-1 block w-full rounded border p-2" required />
                </label>
                <label className="block text-sm text-gray-700">
                  {tr("Identity proof (PDF, JPG, PNG)")}
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(event) => setStaffFiles((files) => ({ ...files, identity_proof: event.target.files?.[0] || null }))} className="mt-1 block w-full rounded border p-2" required />
                </label>
              </>
            )}

            <button type="submit"  className="w-full bg-blue-600 text-white font-semibold p-3 rounded hover:bg-blue-700 transition duration-200">
              {tr("Register")}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            {tr("Already have an account?")} <Link to="/login"  className="text-blue-600 hover:underline">{tr("Login")}</Link>
          </p>
          </div>
          </div>
       
  );
}
