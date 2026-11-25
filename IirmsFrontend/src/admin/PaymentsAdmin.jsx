import { useState, useEffect } from "react";
import api from "../utils/axios";
import CrudTable from "./CrudTable";

export default function PaymentsAdmin() {
  const [payments, setPayments] = useState([]);

  useEffect(() => { fetch(); }, []);

  const fetch = async () => {
    try { const r = await api.get("/admin/payments"); setPayments(r.data); }
    catch (e) { console.error(e); }
  };

  const handleDelete = async row => {
    if (!confirm("Delete this payment record?")) return;
    await api.delete(`/admin/payments/${row.payment_id}`); fetch();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Payments</h1>
      <div className="bg-white rounded shadow p-4">
        <CrudTable
          columns={[
            { key: "payment_id", label: "ID" },
            { key: "user", label: "User", render: r => r.user?.name || "—" },
            { key: "amount", label: "Amount", render: r => `$${r.amount}` },
            { key: "method", label: "Method" },
            { key: "transaction_id", label: "Transaction ID" },
            { key: "paid_at", label: "Date", render: r => new Date(r.paid_at).toLocaleDateString() },
          ]}
          data={payments}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
