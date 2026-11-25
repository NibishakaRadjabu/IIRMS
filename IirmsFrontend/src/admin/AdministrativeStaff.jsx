// import React from 'react';

// function AdministrativeStaff() {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Administrative Staff</h1>
//       <p className="text-gray-600 mb-4">Manage administrative staff records here.</p>

//       {/* Placeholder table - replace with real data fetching and actions as needed */}
//       <div className="overflow-x-auto bg-white p-4 rounded shadow">
//         <table className="w-full table-auto border-collapse border border-gray-200">
//           <thead>
//             <tr className="bg-gray-50">
//               <th className="border p-2">ID</th>
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Email</th>
//               <th className="border p-2">Department</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="border p-2">-</td>
//               <td className="border p-2">No data</td>
//               <td className="border p-2">-</td>
//               <td className="border p-2">-</td>
//               <td className="border p-2">-</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default AdministrativeStaff;
// import React, { useEffect, useState } from "react";
// import api from "../utils/axios";
// import CrudTable from "./CrudTable";

// function ScientificStaff() {
//   const [staff, setStaff] = useState([]);

//   useEffect(() => {
//     fetchStaff();
//   }, []);

//   const fetchStaff = async () => {
//     try {
//       const res = await api.get("/api/scientificStaff");
//       setStaff(res.data);
//     } catch (err) {
//       console.error("Error fetching staff:", err);
//     }
//   };

//   const verifyStaff = async (id) => {
//     try {
//       await api.put(`/api/scientificStaff/${id}/verify`);
//       fetchStaff(); // refresh list
//     } catch (err) {
//       console.error("Error verifying staff:", err);
//     }
//   };

//   const deleteStaff = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this staff member?")) return;
//     try {
//       await api.delete(`/api/scientificStaff/${id}`);
//       fetchStaff(); // refresh list
//     } catch (err) {
//       console.error("Error deleting staff:", err);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Scientific Staff</h1>
//       <p className="text-gray-600 mb-4">Manage scientific staff records here.</p>

//       <div className="overflow-x-auto bg-white p-4 rounded shadow">
//         <table className="w-full table-auto border-collapse border border-gray-200">
//           <thead>
//             <tr className="bg-gray-50">
//               <th className="border p-2">ID</th>
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Email</th>
//               <th className="border p-2">Department</th>
//               <th className="border p-2">Verified</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {staff.length > 0 ? (
//               staff.map((s) => (
//                 <tr key={s.user_id}>
//                   <td className="border p-2">{s.user_id}</td>
//                   <td className="border p-2">{s.name}</td>
//                   <td className="border p-2">{s.email}</td>
//                   <td className="border p-2">{s.department_id || "-"}</td>
//                   <td className="border p-2">{s.verified ? "Yes" : "No"}</td>
//                   <td className="border p-2 space-x-2">
//                     {!s.verified && (
//                       <button
//                         onClick={() => verifyStaff(s.user_id)}
//                         className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
//                       >
//                         Verify
//                       </button>
//                     )}
//                     <button
//                       onClick={() => deleteStaff(s.user_id)}
//                       className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="border p-2 text-center">
//                   No scientific staff found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default ScientificStaff;
import React, { useEffect, useState } from "react";
import api from "../utils/axios";

function AdministrativeStaff() {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await api.get("/scientificStaff"); // ✅ no extra /api
      setStaff(res.data);
    } catch (err) {
      console.error("Error fetching staff:", err);
    }
  };

  const verifyStaff = async (id) => {
    try {
      await api.put(`/scientificStaff/${id}/verify`); // ✅
      fetchStaff();
    } catch (err) {
      console.error("Error verifying staff:", err);
    }
  };

  const deleteStaff = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff member?")) return;
    try {
      await api.delete(`/scientificStaff/${id}`); // ✅
      fetchStaff();
    } catch (err) {
      console.error("Error deleting staff:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Scientific Staff</h1>
      <p className="text-gray-600 mb-4">Manage scientific staff records here.</p>

      <div className="overflow-x-auto bg-white p-4 rounded shadow">
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Department</th>
              <th className="border p-2">Verified</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.length > 0 ? (
              staff.map((s) => (
                <tr key={s.user_id}>
                  <td className="border p-2">{s.user_id}</td>
                  <td className="border p-2">{s.name}</td>
                  <td className="border p-2">{s.email}</td>
                  <td className="border p-2">{s.department_id || "-"}</td>
                  <td className="border p-2">{s.verified ? "Yes" : "No"}</td>
                  <td className="border p-2 space-x-2">
                    {!s.verified && (
                      <button
                        onClick={() => verifyStaff(s.user_id)}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                      >
                        Verify
                      </button>
                    )}
                    <button
                      onClick={() => deleteStaff(s.user_id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border p-2 text-center">
                  No scientific staff found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdministrativeStaff;
