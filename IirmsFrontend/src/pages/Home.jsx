 import { useState, useEffect } from 'react';
 import { Link } from 'react-router-dom';
 import api from '../utils/axios';
 import bgImage from '../assets/logos/school.jpg';
 import EventsNewsDisplay from '../components/EventsNewsDisplay';
 import { useLanguage } from '../context/LanguageContext';
  function Home() {
    const { translate: tr } = useLanguage();
   const [slides, setSlides] = useState([]);
   const [current, setCurrent] = useState(0);
 
   useEffect(() => {
     api
       .get('/hero')
       .then((res) => setSlides(Array.isArray(res.data) ? res.data : []))
       .catch(() => setSlides([]));
   }, []);
 
   useEffect(() => {
     if (slides.length <= 1) return undefined;
 
     const timer = window.setInterval(() => {
       setCurrent((prev) => (prev + 1) % slides.length);
     }, 4500);
 
     return () => window.clearInterval(timer);
   }, [slides]);
 
   const prev = () => {
     if (!slides.length) return;
     setCurrent((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
   };
 
   const next = () => {
     if (!slides.length) return;
     setCurrent((prevIndex) => (prevIndex + 1) % slides.length);
   };
 
   return (
     <div className="min-h-screen bg-slate-100  text-slate-800">
       <section className="relative px-4 pb-16 pt-6 sm:px-6 lg:px-8">
           <img src={bgImage} alt="bg" className="  absolute inset-0 h-130 w-full object-cover"/>
         <div className="mx-auto max-w-7xl">
         
           <div className="hero-shell">
             {slides.length === 0 ? (
               <div className="flex h-100 flex-col items-center rounded justify-center px-10 backdrop-blur-sm text-center text-black">
                 <span className="hero-badge mb-4">{tr("Integrated Research Platform")}</span>
                 <h1 className="mb-4 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
                   {tr("Welcome to IIRMS")}
                 </h1>
                 <p className="mb-8 max-w-xl text-base text-black-100 sm:text-lg">
                   {tr("Integrated Institutional Research Management System for faculty, departments, and academic excellence.")}
                 </p>
                 <div className="flex flex-wrap items-center justify-center gap-4">
                   <Link
                     to="/register"
                     className="rounded-full bg-white px-6 py-3 font-semibold text-sky-700 shadow-lg shadow-sky-900/20 transition hover:-translate-y-0.5 hover:bg-sky-50"
                   >
                     {tr("Get Started")}
                   </Link>
                   <Link
                     to="/login"
                     className="rounded-full border border-white/70 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-sky-700"
                   >
                     Login
                   </Link>
                 </div>
               </div>
             ) : (
               <>
                 <div className="hero-slider  ">
                   {slides.map((slide, index) => (
                     <div
                       key={slide.slide_id ?? `${slide.title}-${index}`}
                       className={`hero-slide ${index === current ? 'is-active' : ''}`}
                     >
                       {slide.image_url && (
                         <img
                           src={slide.image_url}
                           alt={slide.title || tr('Hero slide')}
                           className="absolute inset-0  object-cover h-130"
                         />
                       )}
 
                       <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/50 to-sky-900/20" />
 
                       <div className="relative z-10 flex backdrop-blur-sm transition m-16 w-200 rounded-4xl h-80 items-center">
                         <div className="max-w-2xl px-6 py-8 sm:px-10 lg:px-16">
                           <span className="hero-badge mb-4">{tr("Research Excellence")}</span>
                           <h1 className="mb-4 bg-gradient-to-r bg-center from-white via-sky-100 to-cyan-300 bg-clip-text text-4xl font-black leading-[1.05] tracking-[-0.06em] text-transparent drop-shadow-[0_8px_18px_rgba(14,116,144,0.50)] sm:text-5xl lg:text-7xl">
                             {slide.title}
                           </h1>
                           <p className="mb-7 max-w-xl text-sm font-medium text-slate-100/95 sm:text-base lg:text-xl">
                             {slide.description}
                           </p>
                           {slide.link && (
                             <a
                               href={slide.link}
                               className="inline-flex items-center rounded-full bg-sky-500/90 px-6 py-3 font-semibold text-white shadow-lg shadow-sky-500/30 backdrop-blur-sm transition hover:bg-sky-400"
                             >
                               {tr("Learn More")}
                             </a>
                           )}
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
 
                 {slides.length > 1 && (
                   <>
                     <button
                       type="button"
                       onClick={prev}
                       className="hero-nav left-4"
                       aria-label={tr("Previous slide")}
                     >
                       ‹
                     </button>
                     <button
                       type="button"
                       onClick={next}
                       className="hero-nav right-4"
                       aria-label="Next slide"
                     >
                       ›
                     </button>
 
                     <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
                       {slides.map((_, index) => (
                         <button
                           key={index}
                           type="button"
                           onClick={() => setCurrent(index)}
                           className={`hero-dot ${index === current ? 'is-active' : ''}`}
                           aria-label={`${tr("Go to slide")} ${index + 1}`}
                         />
                       ))}
                     </div>
                   </>
                 )}
               </>
             )}
           </div>
         </div>
       </section>
 <section className="mx-auto max-w-5xl px-4 pb-20 text-center sm:px-6 lg:px-8">
         <h2 className="mb-4 text-3xl font-bold text-slate-800 sm:text-4xl">{tr("Start Your Research Journey")}</h2>
         <p className="mx-auto mb-8 max-w-2xl text-base text-slate-600 sm:text-lg">
           {tr("Submit research, get certified, collaborate with researchers and departments, and track your academic impact.")}
         </p>
         <div className="flex flex-wrap justify-center gap-4">
           <Link
             to="/submit"
             className="rounded-lg bg-sky-700 px-8 py-3 font-semibold text-white shadow-lg shadow-sky-700/30 transition hover:bg-sky-800"
           >
             {tr("Submit an Article")}
           </Link>
           <Link
             to="/research"
             className="rounded-lg border border-sky-600 bg-white px-8 py-3 font-semibold text-sky-700 transition hover:bg-sky-50"
           >
             {tr("See more")}
           </Link>
           <Link
             to="/register"
             className="rounded-lg bg-sky-600 px-8 py-3 font-semibold text-white shadow-lg shadow-sky-600/30 transition hover:bg-sky-500"
           >
             {tr("Register Now")}
           </Link>
           <Link to="/login" className="rounded-lg border border-sky-600 bg-white px-8 py-3 font-semibold text-sky-700 transition hover:bg-sky-50">
             Login
           </Link>
         </div>
       </section>
 
       <EventsNewsDisplay />
     </div>
   );
 }
 
 export default Home;
 
