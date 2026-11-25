// PaymentForm.js
import { useEffect, useState } from "react";
import api from "../utils/axios";
import { useLanguage } from "../context/LanguageContext";

function PaymentForm() {
  const { translate: tr } = useLanguage();
  const [amount, setAmount] = useState("");
  const [settings, setSettings] = useState({});
  const [method, setMethod] = useState("");

  useEffect(() => {
    api.get("/payment-settings/public").then((res) => {
      const next = res.data || {};
      setSettings(next);
      if (next.paypal_enabled) setMethod("paypal");
      else if (next.card_enabled) setMethod("credit_card");
      else if (next.bank_enabled) setMethod("bank_transfer");
    }).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!method) return alert(tr("No payment method has been enabled by the administrator."));
      if (method === "credit_card" && settings.card_checkout_url) {
        window.open(settings.card_checkout_url, "_blank", "noopener,noreferrer");
      }
      await api.post("/payments", { amount, method, transaction_id: `PAY-${Date.now()}` });
      alert(tr(method === "bank_transfer" ? "Bank-transfer request recorded. Complete the transfer using the details below." : "Payment request recorded. Complete payment using the selected provider."));
    } catch (err) {
      console.error("Error processing payment:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{tr("Make a Payment")}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={tr("Amount")} className="w-full border p-2 rounded" required />
        <div className="space-y-2 text-sm">
          {settings.paypal_enabled && <label className="block"><input className="mr-2" type="radio" value="paypal" checked={method === "paypal"} onChange={(e) => setMethod(e.target.value)} />PayPal {settings.paypal_email && `(${settings.paypal_email})`}</label>}
          {settings.card_enabled && <label className="block"><input className="mr-2" type="radio" value="credit_card" checked={method === "credit_card"} onChange={(e) => setMethod(e.target.value)} />{tr("Visa / card")}</label>}
          {settings.bank_enabled && <label className="block"><input className="mr-2" type="radio" value="bank_transfer" checked={method === "bank_transfer"} onChange={(e) => setMethod(e.target.value)} />{tr("Bank transfer")}</label>}
        </div>
        {method === "bank_transfer" && (
          <div className="rounded border border-blue-200 bg-blue-50 p-3 text-sm text-gray-700">
            <p><b>{tr("Bank")}:</b> {settings.bank_name}</p><p><b>{tr("Account name")}:</b> {settings.bank_account_name}</p><p><b>{tr("Account number")}:</b> {settings.bank_account_number}</p><p><b>{tr("Branch / routing")}:</b> {settings.bank_branch_code}</p>
            {settings.bank_reference_note && <p className="mt-2">{settings.bank_reference_note}</p>}
          </div>
        )}
        <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">{tr("Pay")}</button>
      </form>
    </div>
  );
}

export default PaymentForm;
