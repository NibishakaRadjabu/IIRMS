import { useEffect, useState } from "react";
import api from "../utils/axios";

export default function PublicationFeeAdmin() {
  const [fee, setFee] = useState(150);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedFee = Number(localStorage.getItem("publication_fee") || 150);
    setFee(Number.isFinite(savedFee) && savedFee > 0 ? savedFee : 150);
  }, []);

  const saveFee = async () => {
    setSaving(true);
    setMessage("");

    try {
      const nextFee = Number(fee);
      if (!Number.isFinite(nextFee) || nextFee <= 0) {
        throw new Error("Fee must be a positive number.");
      }

      localStorage.setItem("publication_fee", String(nextFee));
      setMessage("Publication fee updated successfully.");
      alert(`Publication fee has been set to $${nextFee}.`);
    } catch (error) {
      setMessage(error.message || "Unable to update publication fee.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Publication Fee Settings</h2>
      <p className="text-sm text-gray-600 mb-6">
        Set the amount researchers and students must pay before publishing their research.
      </p>

      <label className="block text-sm font-medium text-gray-700 mb-2">Publication fee ($)</label>
      <input
        type="number"
        min="1"
        step="1"
        value={fee}
        onChange={(e) => setFee(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="button"
        onClick={saveFee}
        disabled={saving}
        className="mt-5 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save fee"}
      </button>

      {message && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {message}
        </div>
      )}
    </div>
  );
}
