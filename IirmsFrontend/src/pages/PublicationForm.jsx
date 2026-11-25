import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { useLanguage } from "../context/LanguageContext";

const DEFAULT_PUBLICATION_FEE = 150;

const getPublicationFee = () => {
  const raw = Number(localStorage.getItem("publication_fee") || DEFAULT_PUBLICATION_FEE);
  return Number.isFinite(raw) && raw > 0 ? raw : DEFAULT_PUBLICATION_FEE;
};

function PublicationForm() {
  const { translate: tr } = useLanguage();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = String(currentUser.role || "").toLowerCase() === "admin";

  const [fee, setFee] = useState(getPublicationFee());
  const [paid, setPaid] = useState(false);
  const [adminWaiverConfirmed, setAdminWaiverConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paypalReady, setPaypalReady] = useState(false);
  const [paypalError, setPaypalError] = useState("");
  const paypalButtonRef = useRef(null);
  const [form, setForm] = useState({
    title: "",
    authors: "",
    abstract: "",
    keywords: "",
    category: "",
    journal: "",
    institution: "",
    researchSummary: "",
    document: null,
  });

  useEffect(() => {
    setFee(getPublicationFee());
  }, [tr]);

  useEffect(() => {
    let script;
    const loadPayPal = async () => {
      try {
        const { data } = await api.get("/paypal/config");
        script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(data.clientId)}&currency=${data.currency}&intent=capture&enable-funding=card`;
        script.onload = () => setPaypalReady(true);
        script.onerror = () => setPaypalError("Unable to load PayPal checkout.");
        document.body.appendChild(script);
      } catch (error) {
        setPaypalError(error.response?.data?.message || "PayPal is unavailable right now.");
      }
    };
    loadPayPal();
    return () => script?.remove();
  }, []);

  useEffect(() => {
    if (isAdmin || !paypalReady || paid || adminWaiverConfirmed || !paypalButtonRef.current || !window.paypal) return;
    paypalButtonRef.current.replaceChildren();
    let fundingSource = "paypal";
    const buttons = window.paypal.Buttons({
      onClick: (data) => {
        fundingSource = data.fundingSource || "paypal";
      },
      createOrder: async () => {
        const response = await api.post("/paypal/orders", { amount: Number(fee) });
        return response.data.id;
      },
      onApprove: async (data) => {
        setIsSubmitting(true);
        try {
          await api.post(`/paypal/orders/${data.orderID}/capture`, {
            method: fundingSource === "card" ? "credit_card" : "paypal",
          });
          setPaid(true);
          alert(tr("PayPal payment completed. You can now submit your research."));
        } catch (error) {
          setPaypalError(error.response?.data?.message || "PayPal payment could not be verified.");
        } finally {
          setIsSubmitting(false);
        }
      },
      onError: () => setPaypalError("PayPal checkout could not be completed."),
    });
    buttons.render(paypalButtonRef.current);
    return () => buttons.close?.();
  }, [fee, paid, adminWaiverConfirmed, paypalReady, isAdmin, tr]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdminWaiver = () => {
    if (!isAdmin) return;

    const confirmed = window.confirm(tr("Confirm that this publication fee waiver has been approved by an admin?"));
    if (!confirmed) return;

    setAdminWaiverConfirmed(true);
    setPaid(true);
    alert(tr("Admin fee waiver confirmed. This submission can proceed without payment."));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!paid && !adminWaiverConfirmed) {
      alert(tr("Please pay the publication fee or confirm admin waiver before submitting your research."));
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("authors", form.authors);
      formData.append("category", form.category);
      formData.append("journal", form.journal);
      formData.append("institution", form.institution);
      formData.append("keywords", form.keywords);
      formData.append("abstract", form.abstract);
      formData.append("research_summary", form.researchSummary);
      formData.append("user_id", currentUser.id || currentUser.user_id || "");
      formData.append("submitted_by", currentUser.name || "Unknown");
      formData.append("role", currentUser.role || "student");
      formData.append("fee", String(fee));
      formData.append("paid", String(Boolean(paid || adminWaiverConfirmed)));
      formData.append("status", "Pending review");
      if (form.document) {
        formData.append("document", form.document);
      }

      await api.post("/submissions", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(tr("Your research has been submitted for review successfully."));
      navigate("/submissions");
    } catch (error) {
      console.error("Research submission failed:", error);
      alert(tr(error?.response?.data?.message || "Unable to submit your research. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-6 text-white">
          <h1 className="text-3xl font-bold">{tr("Research Publication")}</h1>
          <p className="mt-2 text-blue-100">
            {isAdmin
              ? tr("Admin confirmation is required before a publication fee waiver is accepted.")
              : tr("Researchers and students can submit their work for publication. A publication fee is required before final submission.")}
          </p>
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-gray-50 p-6 border-r border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">{tr("Publication fee")}</h2>
            <div className="mt-4 rounded-xl bg-blue-50 border border-blue-200 p-4">
              <p className="text-sm text-blue-700 uppercase tracking-wide font-semibold">{tr("Admin set fee")}</p>
              <p className="mt-2 text-4xl font-extrabold text-blue-700">${fee}</p>
              <p className="mt-2 text-sm text-gray-600">{tr("This amount is configured by the admin and must be paid before your research is published.")}</p>
            </div>

            <div className="mt-6 space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-green-500" />
                <span>{tr("Submit your title, authors, abstract, and journal details.")}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-green-500" />
                <span>{tr("Pay the configured publication fee to unlock publication submission.")}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-green-500" />
                <span>{tr("Research is reviewed by administrators before publishing.")}</span>
              </div>
            </div>

            {!isAdmin && !paid && !adminWaiverConfirmed && (
              <div className="mt-8">
                <p className="mb-2 text-sm font-medium text-gray-700">{tr("Pay securely with PayPal or Visa / debit card")}</p>
                <div ref={paypalButtonRef} />
              </div>
            )}

            {isAdmin && !adminWaiverConfirmed && (
              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleAdminWaiver}
                  className="w-full bg-purple-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
                >
                  {tr("Confirm admin fee waiver")}
                </button>
              </div>
            )}

            {paypalError && <p className="mt-3 text-sm text-red-600">{paypalError}</p>}

            {(paid || adminWaiverConfirmed) && (
              <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {isAdmin
                  ? tr("Admin waiver confirmed. Your submission is ready to be sent.")
                  : tr("Payment successful. Your submission is ready to be sent.")}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">{tr("Research title")}</label>
                <input
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={tr("e.g. AI for Sustainable Learning")}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">{tr("Authors")}</label>
                <input
                  value={form.authors}
                  onChange={(e) => handleChange("authors", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={tr("Jane Doe, John Smith")}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{tr("Category")}</label>
                <select
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">{tr("Select category")}</option>
                  <option value="Computer Science">{tr("Computer Science")}</option>
                  <option value="Biotechnology">{tr("Biotechnology")}</option>
                  <option value="Engineering">{tr("Engineering")}</option>
                  <option value="Social Science">{tr("Social Science")}</option>
                  <option value="Health Sciences">{tr("Health Sciences")}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{tr("Journal / Platform")}</label>
                <input
                  value={form.journal}
                  onChange={(e) => handleChange("journal", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={tr("IIRMS Journal")}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">{tr("Institution / Department")}</label>
                <input
                  value={form.institution}
                  onChange={(e) => handleChange("institution", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={tr("Faculty of Computing and Engineering")}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">{tr("Keywords")}</label>
                <input
                  value={form.keywords}
                  onChange={(e) => handleChange("keywords", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={tr("machine learning, education, sustainability")}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">{tr("Abstract")}</label>
                <textarea
                  value={form.abstract}
                  onChange={(e) => handleChange("abstract", e.target.value)}
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={tr("Describe the research problem, approach, and key findings...")}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">{tr("Research summary")}</label>
                <textarea
                  value={form.researchSummary}
                  onChange={(e) => handleChange("researchSummary", e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={tr("Add a short summary or notes about the publication")}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">{tr("Upload PDF Document")}</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => handleChange("document", e.target.files[0])}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                disabled={(!paid && !adminWaiverConfirmed) || isSubmitting}
              >
                {isSubmitting ? tr("Submitting research...") : isAdmin ? tr("Submit with admin approval") : tr("Submit research for review")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PublicationForm;
