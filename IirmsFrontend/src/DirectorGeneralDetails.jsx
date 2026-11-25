import React from "react";
import { useLocation, NavLink } from "react-router-dom";

const directorDetailsMap = {
  DeputyDirectorGenerals: {
    title: "Deputy Director General",
    name: "Prof. Daniel M. Okafor",
    intro:
      "The Deputy Director General supports the overall leadership and strategic direction of the institution. This role is central to coordinating institutional priorities, strengthening program delivery, and supporting efficient decision-making across departments.",
    focusAreas: [
      "Institutional strategy and program coordination",
      "Operations oversight and administrative alignment",
      "Leadership support for cross-functional delivery",
      "Institutional representation and policy execution",
    ],
    mission:
      "To support the Director General in guiding operational excellence, institutional coordination, and evidence-based leadership across departments.",
  },
  ExecutiveSecretariat: {
    title: "Executive Secretariat",
    name: "Executive Secretariat Office",
    intro:
      "The Executive Secretariat provides strategic administrative support to leadership and ensures efficient institutional communication, documentation, and coordination.",
    focusAreas: [
      "Executive communication and documentation",
      "Institutional coordination and reporting",
      "Support for strategic decision-making",
      "Administrative facilitation of leadership activities",
    ],
    mission:
      "To ensure leadership functions run smoothly through reliable administrative coordination, planning support, and institutional communication.",
  },
  ScientificDirectorate: {
    title: "Scientific Directorate",
    name: "Scientific Directorate Unit",
    intro:
      "The Scientific Directorate provides oversight for research quality, scientific strategy, and the advancement of innovation across the institution.",
    focusAreas: [
      "Research governance and scientific planning",
      "Quality assurance in research delivery",
      "Innovation and knowledge production",
      "Interdisciplinary research coordination",
    ],
    mission:
      "To strengthen scientific excellence, research performance, and the institution's innovation agenda through strategic direction and oversight.",
  },
  ScientificDirector: {
    title: "Scientific Director",
    name: "Scientific Director",
    intro:
      "The Scientific Director leads the vision for research, academic advancement, and the quality of scientific output across institutional programs.",
    focusAreas: [
      "Scientific vision and strategic leadership",
      "Research quality and performance oversight",
      "Academic collaboration and innovation",
      "Scientific policy implementation",
    ],
    mission:
      "To promote a culture of excellence, integrity, and innovation across the scientific and research agenda of the institution.",
  },
  ScientificCouncil: {
    title: "Scientific Council",
    name: "Scientific Council Committee",
    intro:
      "The Scientific Council advises on research priorities, ethics, scholarly standards, and long-term scientific development of the institution.",
    focusAreas: [
      "Scientific policy and strategic review",
      "Ethics and research governance",
      "Funding alignment and research priorities",
      "Academic quality and institutional research culture",
    ],
    mission:
      "To provide independent scientific guidance that strengthens research integrity, excellence, and institutional growth.",
  },
  ResearchCoordinators: {
    title: "Research Coordinators",
    name: "Research Coordination Team",
    intro:
      "Research Coordinators support research activity planning, collaboration, monitoring, and effective implementation across departments and projects.",
    focusAreas: [
      "Project coordination and activity tracking",
      "Interdepartmental research collaboration",
      "Research support and monitoring",
      "Partnership and stakeholder coordination",
    ],
    mission:
      "To align research activities with institutional goals and ensure smooth coordination between teams, projects, and stakeholders.",
  },
  ResearchersAndResearchProfessors: {
    title: "Researchers and Research Professors",
    name: "Research Community",
    intro:
      "Researchers and Research Professors are at the heart of the institution's intellectual mission, driving investigation, mentorship, and impactful scholarship.",
    focusAreas: [
      "Research generation and publication",
      "Mentorship and academic supervision",
      "Innovation and knowledge transfer",
      "Interdisciplinary collaboration and problem-solving",
    ],
    mission:
      "To advance knowledge, mentor future scholars, and generate impactful research that addresses societal and institutional challenges.",
  },
};

function DirectorGeneralDetails() {
  const location = useLocation();
  const slug = location.pathname.replace("/", "");
  const detail = directorDetailsMap[slug] || {
    title: "Leadership Unit",
    name: "Institutional Leadership",
    intro: "This leadership profile is currently being updated.",
    focusAreas: ["Leadership coordination", "Research support", "Institutional excellence"],
    mission: "To strengthen institutional development through strategic leadership and collaboration.",
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-8 py-10 text-white">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-100">Leadership</p>
            <h1 className="mt-3 text-4xl font-bold">{detail.title}</h1>
            <p className="mt-2 text-blue-50 text-lg font-medium">{detail.name}</p>
          </div>

          <div className="p-6 md:p-8">
            <p className="text-lg leading-8 text-slate-700">{detail.intro}</p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-xl font-bold text-slate-800">Core Responsibilities</h2>
                <ul className="mt-4 space-y-3 text-slate-700">
                  {detail.focusAreas.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-2 w-2 rounded-full bg-blue-600"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-blue-50 p-5">
                <h2 className="text-xl font-bold text-slate-800">Mission</h2>
                <p className="mt-4 text-slate-700 leading-7">{detail.mission}</p>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <NavLink
                to="/DirectorGeneral"
                className="inline-flex items-center justify-center rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                Back to Leadership
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DirectorGeneralDetails;
