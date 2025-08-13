import React from 'react';
import { Heart, Instagram, Twitter, Facebook, Youtube, Mail, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { ronaldinhoData } from '../data/mock';

const Footer = () => {
  const socialIcons = {
    instagram: Instagram,
    twitter: Twitter,
    facebook: Facebook,
    youtube: Youtube
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">R10</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Ronaldinho Gaúcho</h3>
                <p className="text-gray-400">La Magie du Football Brésilien</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Site officiel dédié à l'une des plus grandes légendes du football mondial. 
              Découvrez l'univers de Ronaldinho, ses techniques d'entraînement et son parcours exceptionnel.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              {ronaldinhoData.reseauxSociaux.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <Button
                    key={social.nom}
                    variant="outline"
                    size="icon"
                    className="border-gray-600 hover:border-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300"
                    onClick={() => window.open(social.url, '_blank')}
                  >
                    <Icon className="w-5 h-5" />
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => document.getElementById('accueil')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('entraînements')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                >
                  Entraînements
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('apropos')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                >
                  À Propos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('statistiques')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                >
                  Statistiques
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">info@ronaldinho-official.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">+55 11 9999-9999</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-8">
              <h5 className="font-semibold mb-4">Newsletter</h5>
              <div className="flex space-x-2">
                <input 
                  type="email" 
                  placeholder="Votre email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 transition-colors duration-200"
                />
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                  S'abonner
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400">
              <span>© 2024 Ronaldinho Gaúcho. Tous droits réservés.</span>
            </div>
            
            <div className="flex items-center space-x-1 text-gray-400">
              <span>Fait avec</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>pour la légende du football</span>
            </div>

            <Button 
              variant="ghost" 
              size="sm"
              onClick={scrollToTop}
              className="text-gray-400 hover:text-yellow-400"
            >
              Retour en haut ↑
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;