import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
          {/* Logo and copyright */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold">
                <span className="text-gray-900">SMS</span>
                <span className="text-indigo-600">CORVO</span>
              </div>
            </Link>
            <p className="text-gray-600 text-sm">
              © 2026 - SMSCorvo. Todos os direitos reservados.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                Home
              </Link>
              <Link to="/#faq" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                FAQ
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                Contato
              </Link>
            </div>
            <div className="flex flex-col space-y-3">
              <Link to="/terms" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                Termos de Uso
              </Link>
              <Link to="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                Política de Privacidade
              </Link>
              <Link to="/abuse-policy" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                Política de Abuso e Fraude
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;
