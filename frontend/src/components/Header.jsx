import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">R10</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Ronaldinho</span>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('accueil')}
              className="text-gray-700 hover:text-yellow-600 font-medium transition-colors duration-200"
            >
              Accueil
            </button>
            <button 
              onClick={() => scrollToSection('entraînements')}
              className="text-gray-700 hover:text-yellow-600 font-medium transition-colors duration-200"
            >
              Entraînements
            </button>
            <button 
              onClick={() => scrollToSection('apropos')}
              className="text-gray-700 hover:text-yellow-600 font-medium transition-colors duration-200"
            >
              À Propos
            </button>
            <button 
              onClick={() => scrollToSection('statistiques')}
              className="text-gray-700 hover:text-yellow-600 font-medium transition-colors duration-200"
            >
              Statistiques
            </button>
          </nav>

          {/* Menu Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Menu Mobile Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t md:hidden">
            <nav className="flex flex-col p-4 space-y-4">
              <button 
                onClick={() => scrollToSection('accueil')}
                className="text-left text-gray-700 hover:text-yellow-600 font-medium transition-colors duration-200"
              >
                Accueil
              </button>
              <button 
                onClick={() => scrollToSection('entraînements')}
                className="text-left text-gray-700 hover:text-yellow-600 font-medium transition-colors duration-200"
              >
                Entraînements
              </button>
              <button 
                onClick={() => scrollToSection('apropos')}
                className="text-left text-gray-700 hover:text-yellow-600 font-medium transition-colors duration-200"
              >
                À Propos
              </button>
              <button 
                onClick={() => scrollToSection('statistiques')}
                className="text-left text-gray-700 hover:text-yellow-600 font-medium transition-colors duration-200"
              >
                Statistiques
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;