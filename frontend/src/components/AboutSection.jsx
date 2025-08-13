import React from 'react';
import { Quote, Calendar, Award, Heart, Star } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { useAbout } from '../hooks/useApi';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const AboutSection = () => {
  const { data: aboutData, loading, error, refetch } = useAbout();

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-yellow-50">
        <div className="container mx-auto px-4 text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600">Chargement des informations...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-yellow-50">
        <div className="container mx-auto px-4">
          <ErrorMessage message={error} onRetry={refetch} />
        </div>
      </section>
    );
  }

  if (!aboutData) {
    return null;
  }

  return (
    <section id="apropos" className="py-20 bg-gradient-to-b from-white to-yellow-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            La Légende
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            À Propos de Ronaldinho
          </h2>
          
          {/* Quote */}
          <div className="relative max-w-4xl mx-auto mb-12">
            <Quote className="absolute -top-4 -left-4 w-12 h-12 text-yellow-400 opacity-50" />
            <blockquote className="text-2xl md:text-3xl font-light text-gray-700 italic leading-relaxed">
              "{aboutData.quote}"
            </blockquote>
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Biography */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1614170059029-3b7422659b37?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwzfHxmb290YmFsbCUyMGxlZ2VuZHxlbnwwfHx8fDE3NTUxMTMwNjB8MA&ixlib=rb-4.1.0&q=85"
              alt="Ronaldinho"
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Un Artiste du Ballon Rond</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {aboutData.biographie}
            </p>
            
            {/* Qualities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aboutData.qualites?.map((qualite, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm">
                  <Star className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">{qualite.nom}</h4>
                    <p className="text-sm text-gray-600">{qualite.description}</p>
                  </div>
                </div>
              )) || []}
            </div>
          </div>
        </div>

        {/* Career Timeline */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Parcours Professionnel</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutData.carriere?.map((etape, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-green-500"></div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Calendar className="w-5 h-5 text-yellow-600" />
                    <span className="font-semibold text-yellow-600">{etape.periode}</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{etape.club}</h4>
                  <p className="text-gray-600">{etape.description}</p>
                </CardContent>
              </Card>
            )) || []}
          </div>
        </div>

        {/* Memorable Moments */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Moments Marquants</h3>
          <div className="space-y-6">
            {aboutData.momentsMarquants?.map((moment, index) => (
              <div key={index} className="flex items-start space-x-6 p-6 bg-gradient-to-r from-yellow-50 to-green-50 rounded-xl">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl font-bold text-yellow-600">{moment.annee}</span>
                    <h4 className="text-xl font-bold text-gray-900">{moment.evenement}</h4>
                  </div>
                  <p className="text-gray-700">{moment.description}</p>
                </div>
              </div>
            )) || []}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;