// // CertificateView.js
// import { useEffect, useState } from "react";
// import api from "./utils/axios";

// function CertificateView() {
//   const [certificates, setCertificates] = useState([]);

//   useEffect(() => {
//     const fetchCerts = async () => {
//       try {
//         const res = await api.get("/certificates");
//         setCertificates(res.data);
//       } catch (err) {
//         console.error("Error fetching certificates:", err);
//       }
//     };
//     fetchCerts();
//   }, []);

//   return (
//     <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
//       <h1 className="text-2xl font-bold mb-4">My Certificates</h1>
//       <ul className="space-y-3">
//         {certificates.map((cert) => (
//           <li key={cert.id} className="border p-3 rounded">
//             <h2 className="font-semibold">{cert.title}</h2>
//             <p className="text-sm text-gray-600">Issued: {new Date(cert.date).toLocaleDateString()}</p>
//             <a href={cert.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
//               Download Certificate
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default CertificateView;
// CertificateView.js
import { useEffect, useState } from "react";
import api from "./utils/axios";
import { useLanguage } from "./context/LanguageContext";

function CertificateView() {
  const { translate: tr } = useLanguage();
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const res = await api.get("/certificates"); // backend returns certificates with submission included
        setCertificates(res.data);
      } catch (err) {
        console.error("Error fetching certificates:", err);
      }
    };
    fetchCerts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{tr("My Certificates")}</h1>
      <ul className="space-y-3">
        {certificates.map((cert) => (
          <li key={cert.certificate_id} className="border p-3 rounded">
            <h2 className="font-semibold">
              {cert.submission?.title || tr("Untitled Submission")}
            </h2>
            <p className="text-sm text-gray-600">
              {tr("Issued:")}{" "}
              {cert.issue_date
                ? new Date(cert.issue_date).toLocaleDateString()
                : "—"}
            </p>
            <p className="text-sm text-gray-600">
              {tr("Status:")} {tr(cert.payment_status)}
            </p>
            {cert.certificate_url ? (
              <a
                href={cert.certificate_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {tr("Download Certificate")}
              </a>
            ) : (
              <span className="text-gray-400">{tr("No file available")}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CertificateView;
