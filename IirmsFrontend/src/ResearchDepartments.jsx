import React from "react";
import { NavLink } from "react-router-dom";

function ResearchDepartments() {
  const departments = [
    {
      title: "Civil Engineering and Environment",
      description:
        "Promotes sustainable infrastructure, environmental protection, resilient construction, and innovative engineering solutions for modern society.",
      button: "See more",
      path: "/CivilEngineeringAndEnvironment",
    },
    {
      title: "Economics and Management Sciences",
      description:
        "Supports strategic leadership, organizational development, economic research, and evidence-based management for public and private sector growth.",
      button: "See more",
      path: "/EconomicsAndManagementSciences",
    },
    {
      title: "Social and Human Sciences",
      description:
        "Explores society, culture, human behavior, governance, education, and social transformation through rigorous academic inquiry.",
      button: "See more",
      path: "/SocialAndHumanSciences",
    },
    {
      title: "Law and Governance",
      description:
        "Advances legal scholarship, policy analysis, governance systems, institutional accountability, and justice-oriented research.",
      button: "See more",
      path: "/LawAndGovernance",
    },
    {
      title: "Health and Biomedical Sciences",
      description:
        "Drives biomedical innovation, public health research, clinical advances, and health systems improvement for better community outcomes.",
      button: "See more",
      path: "/HealthAndBiomedicalSciences",
    },
    {
      title: "Agriculture and Rural Development",
      description:
        "Strengthens food systems, sustainable agriculture, rural livelihoods, and agricultural innovation for inclusive development.",
      button: "See more",
      path: "/AgricultureAndRuralDevelopment",
    },
    {
      title: "Computer Science, Artificial Intelligence and Digital Technologies",
      description:
        "Leads research in computing, intelligent systems, digital transformation, software innovation, and emerging technologies.",
      button: "See more",
      path: "/ComputerScienceArtificialIntelligenceAndDigitalTechnologies",
    },
    {
      title: "Energy and Sustainable Development",
      description:
        "Focuses on clean energy systems, sustainability, climate resilience, and development strategies that balance growth and environmental stewardship.",
      button: "See more",
      path: "/EnergyAndSustainableDevelopment",
    },
  ];

  const getInitials = (title) => {
    return title
      .split(" ")
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-8 py-10 text-white">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-100">Research</p>
            <h1 className="mt-3 text-4xl font-bold">Research Departments</h1>
            <p className="mt-3 max-w-3xl text-blue-50">
              Our research departments bring together scientific expertise, innovation, and interdisciplinary collaboration to address global and local development challenges.
            </p>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {departments.map((department) => (
                <div
                  key={department.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-base font-bold text-blue-700">
                    {getInitials(department.title)}
                  </div>

                  <h2 className="text-xl font-bold text-slate-800">{department.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {department.description}
                  </p>

                  <NavLink
                    to={department.path}
                    className="mt-5 inline-flex items-center justify-center rounded-full bg-blue-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-800"
                  >
                    {department.button}
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResearchDepartments;
