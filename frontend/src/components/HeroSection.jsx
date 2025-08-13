import React from 'react';
import { ChevronDown, Play } from 'lucide-react';
import { Button } from './ui/button';
import { useHero } from '../hooks/useApi';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const HeroSection = () => {
  const { data: heroData, loading, error, refetch } = useHero();

  const scrollToNext = () => {
    const element = document.getElementById('entraînements');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-100">
        <LoadingSpinner size="large" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-100">
        <ErrorMessage message={error} onRetry={refetch} />
      </section>
    );
  }

  if (!heroData) {
    return null;
  }

  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroData.image}
          alt="Ronaldinho"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-yellow-400/20 backdrop-blur-md rounded-full border border-yellow-400/30 mb-6">
            <span className="text-yellow-300 font-medium">⚽ Légende du Football Mondial</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
              {heroData.title}
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl md:text-2xl text-gray-200 mb-8 font-light">
            {heroData.subtitle}
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            {heroData.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
              onClick={() => scrollToNext()}
            >
              Découvrir ses Entraînements
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-full backdrop-blur-md transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              Voir les Vidéos
            </Button>
          </div>

          {/* Stats Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">{heroData.stats.trophees}</div>
              <div className="text-sm text-gray-300 uppercase tracking-wide">Trophées</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{heroData.stats.matchs}</div>
              <div className="text-sm text-gray-300 uppercase tracking-wide">Matchs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">{heroData.stats.buts}</div>
              <div className="text-sm text-gray-300 uppercase tracking-wide">Buts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{heroData.stats.ballonOr}</div>
              <div className="text-sm text-gray-300 uppercase tracking-wide">Ballon d'Or</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <button 
          onClick={scrollToNext}
          className="animate-bounce p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          <ChevronDown className="w-6 h-6 text-white" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;