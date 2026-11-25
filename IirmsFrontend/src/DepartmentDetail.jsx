import React from "react";
import { useLocation, NavLink } from "react-router-dom";

const departmentDetails = {
  CivilEngineeringAndEnvironment: {
    title: "Civil Engineering and Environment",
    intro:
      "This department focuses on sustainable infrastructure, environmental resilience, and engineering innovation for resilient cities and communities.",
    focusAreas: [
      "Structural engineering and urban infrastructure",
      "Water, waste and environmental management",
      "Climate resilience and sustainable construction",
      "Geotechnical, transportation and smart engineering systems",
    ],
    mission:
      "To advance practical engineering research that supports resilient infrastructure, environmental sustainability, and long-term national development.",
  },
  EconomicsAndManagementSciences: {
    title: "Economics and Management Sciences",
    intro:
      "This department strengthens organisational performance, strategic decision-making, and economic growth through applied business and policy research.",
    focusAreas: [
      "Business strategy and entrepreneurship",
      "Public policy and economic development",
      "Finance, accounting and performance management",
      "Innovation, leadership and institutional management",
    ],
    mission:
      "To cultivate high-impact research and management expertise that supports sustainable economic growth and effective public administration.",
  },
  SocialAndHumanSciences: {
    title: "Social and Human Sciences",
    intro:
      "This field explores human behavior, social institutions, culture, and societal transformation through interdisciplinary academic research.",
    focusAreas: [
      "Education and social development",
      "Sociology, culture and identity",
      "Governance and community engagement",
      "Psychology and human well-being",
    ],
    mission:
      "To produce knowledge that strengthens communities, promotes social inclusion, and informs human-centered development policy.",
  },
  LawAndGovernance: {
    title: "Law and Governance",
    intro:
      "This department advances legal scholarship, institutional accountability, and governance models that promote justice and democratic development.",
    focusAreas: [
      "Constitutional and public law",
      "Governance and institutional reform",
      "Human rights and legal ethics",
      "Policy analysis and legal innovation",
    ],
    mission:
      "To generate legal and governance research that enforces accountability, ensures fairness, and supports effective public institutions.",
  },
  HealthAndBiomedicalSciences: {
    title: "Health and Biomedical Sciences",
    intro:
      "The department supports research in clinical practice, public health, biomedical innovation, and better health outcomes for communities.",
    focusAreas: [
      "Public health and disease prevention",
      "Biotechnology and biomedical research",
      "Clinical systems and health policy",
      "Medical innovation and community health",
    ],
    mission:
      "To improve health systems and population well-being through excellence in biomedical research, innovation, and public health practice.",
  },
  AgricultureAndRuralDevelopment: {
    title: "Agriculture and Rural Development",
    intro:
      "This department strengthens food security, rural economies, and sustainable agricultural systems through applied research and innovation.",
    focusAreas: [
      "Crop production and agribusiness",
      "Rural livelihoods and food systems",
      "Agroecology and environmental sustainability",
      "Agricultural policy and rural transformation",
    ],
    mission:
      "To support resilient agricultural systems and inclusive rural development through innovation, evidence and capacity building.",
  },
  ComputerScienceArtificialIntelligenceAndDigitalTechnologies: {
    title: "Computer Science, Artificial Intelligence and Digital Technologies",
    intro:
      "This department leads research in computing, intelligent systems, digital transformation, and emerging technologies for social and economic advancement.",
    focusAreas: [
      "Artificial intelligence and machine learning",
      "Software engineering and digital systems",
      "Data science and cybersecurity",
      "Smart systems and digital innovation",
    ],
    mission:
      "To advance digital capability and intelligent technological solutions that support innovation, productivity and societal transformation.",
  },
  EnergyAndSustainableDevelopment: {
    title: "Energy and Sustainable Development",
    intro:
      "This department focuses on sustainable energy systems, climate action, and integrated strategies for social and economic development.",
    focusAreas: [
      "Renewable energy and energy efficiency",
      "Climate resilience and sustainability planning",
      "Energy policy and resource management",
      "Low-carbon development and green infrastructure",
    ],
    mission:
      "To support a just and sustainable energy transition through research, innovation and evidence-based policy guidance.",
  },
};

function DepartmentDetail() {
  const location = useLocation();
  const slug = location.pathname.replace("/", "");
  const department = departmentDetails[slug] || {
    title: "Research Department",
    intro: "This department profile is currently being updated.",
    focusAreas: ["Research and innovation", "Academic collaboration", "Capacity building"],
    mission: "To contribute to excellence in research, teaching and community impact.",
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-8 py-10 text-white">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-100">Department</p>
            <h1 className="mt-3 text-4xl font-bold">{department.title}</h1>
          </div>

          <div className="p-6 md:p-8">
            <p className="text-lg leading-8 text-slate-700">{department.intro}</p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-xl font-bold text-slate-800">Core Focus Areas</h2>
                <ul className="mt-4 space-y-3 text-slate-700">
                  {department.focusAreas.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-2 w-2 rounded-full bg-blue-600"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-blue-50 p-5">
                <h2 className="text-xl font-bold text-slate-800">Mission</h2>
                <p className="mt-4 text-slate-700 leading-7">{department.mission}</p>
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

export default DepartmentDetail;
