// Footer.js
import logo from "../assets/logos/logo.png"; // place logo in src/assets
import { useLanguage } from "../context/LanguageContext";

function Footer() {
  const { translate: tr } = useLanguage();
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 px-4 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Logo and Name */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="IIRMS Logo" className="h-20 w-auto" />
          <div>
            <h2 className="text-lg font-semibold text-white">IIRMS</h2>
            <p className="text-sm text-gray-400">
              Institut International de Recherche Scientifique Multidisciplinaire Sapientia(IIRMS)
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-sm text-gray-400">
          <p>📍 Rubavu District, Rwanda</p>
          <p>📧 iirms.com</p>
          <a href="tel:+250795522221">📞 +250795522221</a>
         <p><a href="tel:+250722739811">📞 +250722739811</a></p> 
          <p><a href="https://wa.me/250795522221" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
        </p></div>

        {/* Copyright */}
        <div className="text-sm text-gray-400 text-center md:text-right">
          <p>© {new Date().getFullYear()} IIRMS. {tr("All rights reserved.")}</p>
          <p> {tr("Developed with ❤️ by STMR INNOVATION ltd Team.")} </p> 
         
          <p>Developer is Nibishaka Radjab </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
