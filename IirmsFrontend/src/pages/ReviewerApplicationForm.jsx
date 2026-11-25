import { useState } from "react";
import api from "../utils/api";

const initialForm = {
  salutation: "",
  full_name: "",
  qualification: "",
  designation: "",
  department: "",
  organization: "",
  discipline_field: "",
  research_areas: "",
  email: "",
  password: "",
  mobile_number: "",
  country: "",
  state_province: "",
  city_district: "",
  postal_code: "",
  address: "",
  agreed: false,
};

const requiredBorder = "border-l-4 border-red-500";

export default function ReviewerApplicationForm() {
  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState({
    resume: null,
    qualification_proof: null,
    identity_proof: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    setFiles((prev) => ({ ...prev, [name]: fileList[0] || null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!form.agreed) {
      setMessage({ type: "error", text: "You must agree with the journal policies before submitting." });
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key !== "agreed") formData.append(key, value);
    });

    Object.entries(files).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });

    const missingFile = Object.entries(files).find(([, file]) => !file);
    if (missingFile) {
      setMessage({ type: "error", text: "Please upload your resume, qualification proof, and identity proof." });
      return;
    }

    try {
      setLoading(true);
      await api.post("/reviewer/apply", formData);
      setMessage({ type: "success", text: "Reviewer application submitted successfully." });
      setForm(initialForm);
      setFiles({ resume: null, qualification_proof: null, identity_proof: null });
    } catch (err) {
      console.error("Reviewer application submission failed", err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || `Submission failed (${err.response?.status || "network error"}). Please review your details and try again.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-lg my-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">Join as a Reviewer</h1>
      <p className="text-sm text-gray-600 mb-6">
        All input fields marked with a red left border are mandatory. Please provide valid contact details.
      </p>

      {message.text && (
        <div className={`mb-6 rounded p-3 text-sm ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={requiredBorder + " p-2 rounded"}>
            <label className="block text-sm font-medium mb-1">Salutation</label>
            <input name="salutation" value={form.salutation} onChange={handleChange} className="w-full border rounded p-2" required />
          </div>

          <div className={requiredBorder + " p-2 rounded"}>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input name="full_name" value={form.full_name} onChange={handleChange} className="w-full border rounded p-2" required />
          </div>

          <div className={requiredBorder + " p-2 rounded"}>
            <label className="block text-sm font-medium mb-1">Qualification</label>
            <input name="qualification" value={form.qualification} onChange={handleChange} className="w-full border rounded p-2" required />
          </div>

          <div className={requiredBorder + " p-2 rounded"}>
            <label className="block text-sm font-medium mb-1">Designation</label>
            <input name="designation" value={form.designation} onChange={handleChange} className="w-full border rounded p-2" required />
          </div>

          <div className={requiredBorder + " p-2 rounded"}>
            <label className="block text-sm font-medium mb-1">Department</label>
            <input name="department" value={form.department} onChange={handleChange} className="w-full border rounded p-2" required />
          </div>

          <div className={requiredBorder + " p-2 rounded"}>
            <label className="block text-sm font-medium mb-1">Organization</label>
            <input name="organization" value={form.organization} onChange={handleChange} className="w-full border rounded p-2" required />
          </div>

          <div className={requiredBorder + " p-2 rounded"}>
            <label className="block text-sm font-medium mb-1">Discipline Field</label>
            <input name="discipline_field" value={form.discipline_field} onChange={handleChange} className="w-full border rounded p-2" required />
          </div>

          <div className={requiredBorder + " p-2 rounded md:col-span-2"}>
            <label className="block text-sm font-medium mb-1">Research Area(s)</label>
            <textarea name="research_areas" value={form.research_areas} onChange={handleChange} rows={3} className="w-full border rounded p-2" required />
          </div>

          <div className={requiredBorder + " p-2 rounded"}>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border rounded p-2" required />
          </div>

          <div className={requiredBorder + " p-2 rounded"}>
            <label className="block text-sm font-medium mb-1">Reviewer Password</label>
            <input type="password" name="password" minLength={8} value={form.password} onChange={handleChange} className="w-full border rounded p-2" required />
          </div>

          <div className={requiredBorder + " p-2 rounded"}>
            <label className="block text-sm font-medium mb-1">Mobile Number</label>
            <input name="mobile_number" value={form.mobile_number} onChange={handleChange} className="w-full border rounded p-2" required />
          </div>

          <div className={requiredBorder + " p-2 rounded"}>
            <label className="block text-sm font-medium mb-1">Country</label>
            <input name="country" value={form.country} onChange={handleChange} className="w-full border rounded p-2" required />
          </div>

          <div className={requiredBorder + " p-2 rounded"}>
            <label className="block text-sm font-medium mb-1">State / Province</label>
            <input name="state_province" value={form.state_province} onChange={handleChange} className="w-full border rounded p-2" required />
          </div>

          <div className={requiredBorder + " p-2 rounded"}>
            <label className="block text-sm font-medium mb-1">City / District</label>
            <input name="city_district" value={form.city_district} onChange={handleChange} className="w-full border rounded p-2" required />
          </div>

          <div className={requiredBorder + " p-2 rounded"}>
            <label className="block text-sm font-medium mb-1">Postal Code</label>
            <input name="postal_code" value={form.postal_code} onChange={handleChange} className="w-full border rounded p-2" required />
          </div>

          <div className={requiredBorder + " p-2 rounded md:col-span-2"}>
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea name="address" value={form.address} onChange={handleChange} rows={3} className="w-full border rounded p-2" required />
          </div>
        </div>

        <div className="space-y-4 border-t pt-4">
          <div className={requiredBorder + " p-2 rounded"}>
            <label className="block text-sm font-medium mb-1">Resume / CV (.doc, .docx, .pdf)</label>
            <input type="file" name="resume" accept=".doc,.docx,.pdf" onChange={handleFileChange} className="w-full" required />
            <div className="text-xs text-gray-500 mt-1">{files.resume ? files.resume.name : "No file chosen"}</div>
          </div>

          <div className={requiredBorder + " p-2 rounded"}>
            <label className="block text-sm font-medium mb-1">Qualification Proof (.pdf, .jpg, .png)</label>
            <input type="file" name="qualification_proof" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} className="w-full" required />
            <div className="text-xs text-gray-500 mt-1">{files.qualification_proof ? files.qualification_proof.name : "No file chosen"}</div>
          </div>

          <div className={requiredBorder + " p-2 rounded"}>
            <label className="block text-sm font-medium mb-1">Identity Proof (with photo)</label>
            <input type="file" name="identity_proof" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} className="w-full" required />
            <div className="text-xs text-gray-500 mt-1">{files.identity_proof ? files.identity_proof.name : "No file chosen"}</div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 border rounded bg-gray-50">
          <input type="checkbox" name="agreed" checked={form.agreed} onChange={handleChange} className="mt-1" required />
          <label className="text-sm text-gray-700">
            I agree with the journal/website policies.
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
