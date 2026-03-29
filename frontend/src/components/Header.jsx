import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('pt');
  const navigate = useNavigate();

  const languages = [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
  ];

  const currentLang = languages.find(lang => lang.code === selectedLanguage);

  const menuItems = [
    { label: 'FAQ', href: '/#faq' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contato', href: '/contact' },
    { label: 'Termos de Uso', href: '/terms' }
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="text-gray-900">SMS</span>
              <span className="text-indigo-600">CORVO</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100">
                  <span className="text-xl">{currentLang.flag}</span>
                  <span className="text-sm font-medium">{currentLang.name}</span>
                  <ChevronDown size={16} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.code)}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button
              variant="ghost"
              onClick={() => navigate('/login')}
              className="text-gray-900"
            >
              Entrar
            </Button>
            <Button
              onClick={() => navigate('/register')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Registrar
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <Button
                  variant="ghost"
                  onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}
                  className="w-full"
                >
                  Entrar
                </Button>
                <Button
                  onClick={() => { navigate('/register'); setMobileMenuOpen(false); }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Registrar
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
