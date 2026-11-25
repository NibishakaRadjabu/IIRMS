import logo from "./assets/logos/logo.png";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { NavLink } from "react-router-dom";
import { useLanguage } from "./context/LanguageContext";
function Dropdown() {
     const [isOpen, setIsOpen] = useState(false);
  const { translate: tr } = useLanguage();
  return (
    <div className="relative inline-block text-left group  ">
      {/* Dropdown button */}
      <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 h-14 bg-blue-600 font-bold text-2xl flex text-white rounded-4xl hover:bg-blue-700">
       <img src={logo} alt="IIRMS Logo" className="inline-block w-10 h-10 mr-2" />
       IIRMS  <ChevronDownIcon
          className={`w-10 h-9 ml-2   transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />

      </button>

      {/* Dropdown menu (auto open on hover, stays open) */}
      {isOpen && (
        <div className="absolute mt-2 w-50 bg-black border rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover-background-black group-hover:block transition-opacity duration-200">
          <ul className="py-2">
           
            <li className="px-4 py-2 hover:bg-blue-700/50 cursor-pointer">  <NavLink to="/DirectorGeneral"> {tr("Director General")}</NavLink>
             
            </li>
            <li className="px-4 py-2 hover:bg-blue-700/50 cursor-pointer">
             <NavLink to="/ResearchDepartments"> {tr("Research Departments")} </NavLink>
            </li>
            <li className="px-4 py-2 hover:bg-blue-700/50 cursor-pointer">
              <NavLink to="/ScientificPublicationsDepartment"> {tr("Scientific Publications Department")}</NavLink>
            </li>
          <li className="px-4 py-2 hover:bg-blue-700/50 cursor-pointer">
            <NavLink to="/Department"> {tr("Department")}</NavLink>
          </li>
          <li className="px-4 py-2 hover:bg-blue-700/50 cursor-pointer">
            <NavLink to="/DepartmentProjectDevelopment"> 5. {tr("Department Project Development")}</NavLink>
          </li>
        </ul>
      </div>
        )}
    </div>
  );
}

export default Dropdown;
// import { ChevronDownIcon } from "@heroicons/react/20/solid";
// import logo from "./assets/logos/logo.png";

// function Dropdown() {
//   return (
//     <div className="relative inline-block text-left group">
//       {/* Dropdown button */}
//       <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//         <img src={logo} alt="IIRMS Logo" className="inline-block w-10 h-10 mr-2" />
//         IIRMS
//         <ChevronDownIcon className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:rotate-180" />
//       </button>

//       {/* Dropdown menu (auto open on hover) */}
//       <div className="absolute mt-2 w-64 bg-black border rounded shadow-lg hidden group-hover:block transition-opacity duration-200">
//         <ul className="py-2 text-white">
//           <li className="px-4 py-2 hover:bg-blue-700/50 cursor-pointer">Director General</li>
//           <li className="px-4 py-2 hover:bg-blue-700/50 cursor-pointer">Research Departments or Centers</li>
//           <li className="px-4 py-2 hover:bg-blue-700/50 cursor-pointer">Scientific Publications Department</li>
//           <li className="px-4 py-2 hover:bg-blue-700/50 cursor-pointer">Department</li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Dropdown;
