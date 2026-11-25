import { useEffect, useState } from "react";
import api from "../utils/axios";

const initial = {
  paypal_enabled: false, paypal_email: "", card_enabled: false, card_checkout_url: "",
  bank_enabled: false, bank_name: "", bank_account_name: "", bank_account_number: "",
  bank_branch_code: "", bank_reference_note: "",
};

export default function PaymentSettingsAdmin() {
  const [form, setForm] = useState(initial);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/payment-settings").then((res) => setForm({ ...initial, ...res.data }))
      .catch((error) => setMessage(error.response?.data?.message || "Unable to load payment settings."));
  }, []);

  const set = (event) => setForm((current) => ({
    ...current,
    [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
  }));

  const save = async (event) => {
    event.preventDefault();
    try {
      await api.put("/payment-settings", form);
      setMessage("Payment settings saved.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to save payment settings.");
    }
  };

  const input = "mt-1 block w-full rounded border border-gray-300 p-2 text-sm";
  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Payment Settings</h1>
      <p className="mb-6 text-sm text-gray-600">Configure payment instructions for users. Do not enter customer card numbers here.</p>
      {message && <p className="mb-4 rounded bg-blue-50 p-3 text-sm text-blue-700">{message}</p>}
      <form onSubmit={save} className="space-y-5">
        <section className="rounded bg-white p-5 shadow">
          <label className="flex items-center gap-2 font-semibold"><input type="checkbox" name="paypal_enabled" checked={form.paypal_enabled} onChange={set} /> PayPal</label>
          <label className="mt-3 block text-sm">PayPal business email<input className={input} type="email" name="paypal_email" value={form.paypal_email} onChange={set} placeholder="payments@organisation.org" /></label>
        </section>
        <section className="rounded bg-white p-5 shadow">
          <label className="flex items-center gap-2 font-semibold"><input type="checkbox" name="card_enabled" checked={form.card_enabled} onChange={set} /> Visa / card checkout</label>
          <label className="mt-3 block text-sm">Hosted checkout URL<input className={input} type="url" name="card_checkout_url" value={form.card_checkout_url} onChange={set} placeholder="https://checkout.payment-provider.example/..." /></label>
          <p className="mt-2 text-xs text-gray-500">Use a hosted page from PayPal, Stripe, Paystack, or your bank. IIRMS never stores card details.</p>
        </section>
        <section className="rounded bg-white p-5 shadow">
          <label className="flex items-center gap-2 font-semibold"><input type="checkbox" name="bank_enabled" checked={form.bank_enabled} onChange={set} /> Bank transfer</label>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <label className="text-sm">Bank name<input className={input} name="bank_name" value={form.bank_name} onChange={set} /></label>
            <label className="text-sm">Account name<input className={input} name="bank_account_name" value={form.bank_account_name} onChange={set} /></label>
            <label className="text-sm">Account number<input className={input} name="bank_account_number" value={form.bank_account_number} onChange={set} /></label>
            <label className="text-sm">Branch / routing code<input className={input} name="bank_branch_code" value={form.bank_branch_code} onChange={set} /></label>
          </div>
          <label className="mt-3 block text-sm">Reference instructions<textarea className={input} name="bank_reference_note" value={form.bank_reference_note} onChange={set} rows={3} placeholder="Use your email address as the payment reference." /></label>
        </section>
        <button className="rounded bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700">Save payment settings</button>
      </form>
    </div>
  );
}
