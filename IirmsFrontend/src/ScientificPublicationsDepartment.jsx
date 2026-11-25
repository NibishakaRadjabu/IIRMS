import React from "react";
import { NavLink } from "react-router-dom";

const publicationAreas = [
  "Scientific Journal",
  "Publication of Books and Articles",
  "Peer-Review Committee",
  "Management of DOIs, ISBNs, and Scientific Archives",
  "Training and Capacity-Building",
];

function ScientificPublicationsDepartment() {
  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-8 py-10 text-white">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-100">Department</p>
            <h1 className="mt-3 text-4xl font-bold">Scientific Publications Department</h1>
            <p className="mt-3 text-blue-50 max-w-2xl">
              Promoting scholarly visibility, scientific quality, and the dissemination of research outputs through credible publication and knowledge sharing processes.
            </p>
          </div>

          <div className="p-6 md:p-8">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-2xl font-bold text-slate-800">Core Functions</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {publicationAreas.map((item) => (
                  <div key={item} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-blue-600"></span>
                      <p className="text-slate-700 font-medium">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <NavLink
                to="/ResearchDepartments"
                className="inline-flex items-center justify-center rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                Back to Departments
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScientificPublicationsDepartment;
