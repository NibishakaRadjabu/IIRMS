import React from "react";
import { NavLink } from "react-router-dom";

const projectDevelopmentAreas = [
  "Scientific and Technological Innovation",
  "Research Partnerships",
  "Funding and Grant Seeking",
  "International Relations Department",
  "University Cooperation",
  "Relations with Partner Institutes and Universities",
  "Researchers’ Mobility",
  "International Scientific Networks",
  "Administration and Finance",
  "Human Resources",
  "Accounting",
  "Finance",
  "Logistics and Procurement",
  "Communication and Digital Technologies",
  "Institutional Communication",
  "Website and Social Media",
  "Documentation",
  "Scientific Data Management",
  "Ethics, Quality, and Compliance",
  "Ethics Committee",
  "Quality Assurance",
  "Research Integrity",
  "Intellectual Property",
];

function DepartmentProjectDevelopment() {
  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-8 py-10 text-white">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-100">Department</p>
            <h1 className="mt-3 text-4xl font-bold">Project Development</h1>
            <p className="mt-3 text-blue-50 max-w-3xl">
              Supporting innovation, partnerships, institutional capacity, and sustainable development through coordinated project design, administrative excellence, and international engagement.
            </p>
          </div>

          <div className="p-6 md:p-8">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-2xl font-bold text-slate-800">Structure and Responsibilities</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {projectDevelopmentAreas.map((item) => (
                  <div key={item} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-blue-600"></span>
                      <p className="text-slate-700 font-medium leading-6">{item}</p>
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

export default DepartmentProjectDevelopment;
