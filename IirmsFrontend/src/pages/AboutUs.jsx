import { useLanguage } from "../context/LanguageContext";

function AboutUs() {
  const { translate: tr } = useLanguage();
  const highlights = [
    {
      title: tr('Our Mission'),
      text: tr('To advance research, innovation, and academic collaboration through a transparent and inclusive publication platform.'),
    },
    {
      title: tr('What We Support'),
      text: tr('Researchers, students, and faculty can submit, review, and publish scholarly work with secure digital workflows.'),
    },
    {
      title: tr('Our Values'),
      text: tr('Integrity, accessibility, collaboration, and excellence guide every academic and administrative process.'),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-slate-800">
      <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-700 px-8 py-10 text-white shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">{tr('About us')}</p>
        <h1 className="mt-3 text-4xl font-bold">{tr('Empowering research and academic excellence')}</h1>
        <p className="mt-4 max-w-3xl text-blue-50">
          {tr('IIRMS is designed to support the full research lifecycle, from submission and review to publication and communication.')}
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {highlights.map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">{item.title}</h2>
            <p className="mt-3 text-slate-600">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-2xl font-bold text-slate-900">{tr('Who we are')}</h2>
          <p className="mt-4 text-slate-600">
            {tr('IIRMS connects academic institutions, researchers, and administrators in one digital environment built to streamline quality research management.')}
          </p>
          <p className="mt-3 text-slate-600">
            {tr('We help teams manage submissions, certificates, payment processes, notifications, and publication workflows with clarity and accountability.')}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-2xl font-bold text-slate-900">{tr('Why it matters')}</h2>
          <p className="mt-4 text-slate-600">
            {tr('Research excellence depends on reliable systems, open communication, and a focus on quality. Our platform improves academic visibility and strengthens institutional collaboration.')}
          </p>
        </div>
      </div>
      <div className="mt-10 rounded-2xl border flex border-slate-200 bg-white p-6 shadow-sm"><iframe width="600" height="315" src="https://www.youtube.com/embed/80deb0XrBqY?si=tlhnFAZz8VTfrN75" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen className="mx-auto w-100"></iframe><div className="mt-4 text-left m-10">
        <h1 className="text-2xl bottom-2 font-bold">{tr('Watch our introduction video')}</h1>
   
          <p className="mt-2 text-sm">{tr('Learn more about how IIRMS supports research and academic excellence.')}</p>
      
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
