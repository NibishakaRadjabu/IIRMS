// // ProfessorConfirm.js
// import { useEffect, useState } from "react";
// import api from "../../utils/axios"; // Axios instance with JWT interceptor

// function ProfessorConfirm() {
//   const [professors, setProfessors] = useState([]);

//   useEffect(() => {
//     // Fetch all pending professors
//     const fetchProfessors = async () => {
//       try {
//         const res = await api.get("/admin/professors/pending");
//         setProfessors(res.data);
//       } catch (err) {
//         console.error("Error fetching professors:", err);
//       }
//     };
//     fetchProfessors();
//   }, []);

//   const handleConfirm = async (id) => {
//     try {
//       const res = await api.post(`/admin/professors/confirm/${id}`);
//       alert(`Researchers confirmed with code: ${res.data.confirmation_code}`);
//       setProfessors(professors.filter((prof) => prof.user_id !== id));
//     } catch (err) {
//       console.error("Error confirming professor:", err);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Confirm Researchers</h1>
//       {professors.length === 0 ? (
//         <p className="text-gray-600">No pending researchers.</p>
//       ) : (
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-2">ID</th>
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Email</th>
//               <th className="border p-2">Department</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {professors.map((prof) => (
//               <tr key={prof.user_id}>
//                 <td className="border p-2">{prof.user_id}</td>
//                 <td className="border p-2">{prof.name}</td>
//                 <td className="border p-2">{prof.email}</td>
//                 <td className="border p-2">{prof.department}</td>
//                 <td className="border p-2">
//                   <button
//                     onClick={() => handleConfirm(prof.user_id)}
//                     className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                   >
//                     Confirm
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default ProfessorConfirm;
import { useEffect, useState } from "react";
import api from "../../utils/axios"; // Axios instance with JWT interceptor

function ProfessorConfirm() {
  const [professors, setProfessors] = useState([]);

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        // ✅ Adjusted to match backend route
        const res = await api.get("/verification/admin/professors/pending");
        setProfessors(res.data);
      } catch (err) {
        console.error("Error fetching professors:", err);
      }
    };
    fetchProfessors();
  }, []);

  const handleConfirm = async (code, id) => {
    try {
      // ✅ Backend expects { code } in body, not id in URL
      const res = await api.post("/verification/admin/professor/verify", { code });
      alert(res.data.message || "Professor verified successfully!");
      setProfessors(professors.filter((prof) => prof.user_id !== id));
    } catch (err) {
      console.error("Error confirming professor:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Confirm Professors</h1>
      {professors.length === 0 ? (
        <p className="text-gray-600">No pending professors.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Department</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {professors.map((prof) => (
              <tr key={prof.user_id}>
                <td className="border p-2">{prof.user_id}</td>
                <td className="border p-2">{prof.name}</td>
                <td className="border p-2">{prof.email}</td>
                <td className="border p-2">{prof.department}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleConfirm(prof.verification_code, prof.user_id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Confirm
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProfessorConfirm;
