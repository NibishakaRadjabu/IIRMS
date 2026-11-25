import React from "react";
import { NavLink } from "react-router-dom";

function DirectorGeneral() {
  const sections = [
    {
      title: "Deputy Director General",
      name: "Prof. Dr Amani",
      description:
        "The Deputy Director General supports the overall leadership and strategic direction of the institution. This role is central to coordinating institutional priorities, strengthening program delivery, and supporting efficient decision-making across departments.",
      responsibilities: [
        "Oversees daily institutional operations and strategic coordination.",
        "Supports policy implementation and cross-functional project execution.",
        "Ensures alignment between leadership goals and operational delivery.",
        "Represents the office in high-level meetings and institutional engagements.",
      ],
      button: "See more",
      path: "/DeputyDirectorGenerals",
    },
  ];

  const units = [
    {
      title: "Executive Secretariat",
      description:
        "Supports executive coordination, institutional communication, documentation, and administrative support for leadership decisions and strategic planning.",
      button: "See more",
      path: "/ExecutiveSecretariat",
    },
    {
      title: "Scientific Directorate",
      description:
        "Provides direction for scientific programs, research quality assurance, and the implementation of innovation and knowledge production priorities.",
      button: "See more",
      path: "/ScientificDirectorate",
    },
    {
      title: "Scientific Director",
      description:
        "Leads scientific strategy, research oversight, and the advancement of academic and applied research standards across the institution.",
      button: "See more",
      path: "/ScientificDirector",
    },
    {
      title: "Scientific Council",
      description:
        "Advises on science policy, research ethics, funding priorities, and the development of a strong academic and research culture.",
      button: "See more",
      path: "/ScientificCouncil",
    },
    {
      title: "Research Coordinators",
      description:
        "Coordinate research activities, project tracking, collaboration support, and coordination between teams, faculties, and external partners.",
      button: "See more",
      path: "/ResearchCoordinators",
    },
    {
      title: "Researchers and Research Professors",
      description:
        "Drive project execution, scholarly inquiry, scientific mentorship, and the generation of high-impact research outputs.",
      button: "See more",
      path: "/ResearchersAndResearchProfessors",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-8 py-10 text-white">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-100">Leadership</p>
            <h1 className="mt-3 text-4xl font-bold">Director Generals</h1>
            <p className="mt-3 max-w-2xl text-blue-50">
              Guiding the institution with strategic leadership, accountability, and commitment to research, innovation, and institutional excellence.
            </p>
          </div>

          <div className="p-6 md:p-8">
            <div className="space-y-6">
              {sections.map((section) => (
                <div
                  key={section.title}
                  className="border border-slate-200 rounded-2xl bg-slate-50 p-5 md:p-6 shadow-sm"
                >
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-full md:w-56">
                      <div className="h-52 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-400 flex items-center justify-center text-5xl font-bold text-white shadow-md">
                        DG
                      </div>
                    </div>

                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                        {section.title}
                      </h2>
                      <p className="mt-2 text-lg font-semibold text-blue-700">{section.name}</p>

                      <p className="mt-4 text-base leading-7 text-slate-600">
                        {section.description}
                      </p>

                      <ul className="mt-5 space-y-2 text-slate-700">
                        {section.responsibilities.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-2 h-2 w-2 rounded-full bg-blue-600"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <NavLink
                        to={section.path}
                        className="mt-6 inline-flex items-center justify-center rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
                      >
                        {section.button}
                      </NavLink>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="text-2xl font-bold text-slate-800 mb-5">Institutional Structure</h3>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {units.map((unit) => (
                  <div
                    key={unit.title}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                  >
                    <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
                      {unit.title.charAt(0)}
                    </div>
                    <h4 className="text-lg font-bold text-slate-800">{unit.title}</h4>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{unit.description}</p>
                    <NavLink
                      to={unit.path}
                      className="mt-4 inline-flex items-center justify-center rounded-full bg-blue-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-800"
                    >
                      {unit.button}
                    </NavLink>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DirectorGeneral;