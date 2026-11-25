// // ProfessorVerification.js
// import { useState } from "react";
// import api from "../utils/axios";

// function ProfessorVerification() {
//   const [code, setCode] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//   const endpoints = [
//   '/api/verification/scientificStaff/verify',
//   '/api/verification/admin/professor/verify',
// ];




//     let lastErr = null;
//     for (const path of endpoints) {
//       try {
//         const res = await api.post(path, { code });
//         alert((res?.data?.message) ? res.data.message : 'Verification succeeded');
//         return;
//       } catch (err) {
//         lastErr = err;
//       }
//     }

//     const status = lastErr?.response?.status;
//     const body = lastErr?.response?.data || lastErr?.message || 'Unknown error';
//     if (status === 404) {
//       alert('Verification endpoint not found on server. Tried several candidate URLs.');
//     } else if (status === 403) {
//       alert('Access denied: you are not authorized to perform verification.');
//     } else if (status >= 500) {
//       alert('Server error during verification: ' + (body.message || JSON.stringify(body)));
//     } else {
//       alert('Verification failed: ' + (body.message || JSON.stringify(body)));
//     }
//     console.error('Verification failure:', lastErr);
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
//       <h1 className="text-2xl font-bold mb-4">scientific Staff Verification</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter verification code" className="w-full border p-2 rounded" required />
//         <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Verify</button>
//       </form>
//     </div>
//   );
// }

// export default ProfessorVerification;
// ProfessorVerification.js
import { useState } from "react";
import api from "../utils/axios";

function ProfessorVerification() {
  const [code, setCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Remove extra /api, just use relative paths
    const endpoints = [
      '/verification/scientificStaff/verify',
      '/verification/admin/professor/verify',
    ];

    let lastErr = null;
    for (const path of endpoints) {
      try {
        const res = await api.post(path, { code });
        alert(res?.data?.message ? res.data.message : 'Verification succeeded');
        return;
      } catch (err) {
        lastErr = err;
      }
    }

    const status = lastErr?.response?.status;
    const body = lastErr?.response?.data || lastErr?.message || 'Unknown error';
    if (status === 404) {
      alert('Verification endpoint not found on server. Tried several candidate URLs.');
    } else if (status === 403) {
      alert('Access denied: you are not authorized to perform verification.');
    } else if (status >= 500) {
      alert('Server error during verification: ' + (body.message || JSON.stringify(body)));
    } else {
      alert('Verification failed: ' + (body.message || JSON.stringify(body)));
    }
    console.error('Verification failure:', lastErr);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Scientific Staff Verification</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter verification code"
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Verify
        </button>
      </form>
    </div>
  );
}

export default ProfessorVerification;
