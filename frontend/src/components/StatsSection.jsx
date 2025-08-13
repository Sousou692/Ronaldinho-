import React from 'react';
import { Trophy, Target, Users, Calendar, TrendingUp, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ronaldinhoData } from '../data/mock';

const StatsSection = () => {
  const iconMap = {
    matchs: Users,
    buts: Target,
    passes: TrendingUp,
    trophees: Trophy
  };

  return (
    <section id="statistiques" className="py-20 bg-gradient-to-b from-yellow-50 to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gray-800 text-white hover:bg-gray-900">
            Records & Palmarès
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {ronaldinhoData.statistiques.title}
          </h2>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {Object.entries(ronaldinhoData.statistiques.records).map(([key, value]) => {
            const Icon = iconMap[key];
            return (
              <Card key={key} className="text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{value}</div>
                  <div className="text-sm text-gray-600 uppercase tracking-wide font-medium">
                    {key === 'matchs' && 'Matchs Joués'}
                    {key === 'buts' && 'Buts Marqués'}
                    {key === 'passes' && 'Passes Décisives'}
                    {key === 'trophees' && 'Trophées'}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Clubs */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-6 h-6" />
                <span>Parcours en Clubs</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {ronaldinhoData.statistiques.clubs.map((club, index) => (
                  <div key={index} className="flex items-center justify-between p-6 border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{club.nom}</h4>
                        <p className="text-sm text-gray-600 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {club.periode}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-600">{club.buts}</div>
                      <div className="text-sm text-gray-600">buts</div>
                      <div className="text-xs text-gray-500">{club.matchs} matchs</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Titles */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-6 h-6" />
                <span>Palmarès</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-3">
                {ronaldinhoData.statistiques.titres.map((titre, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-yellow-50 transition-colors duration-200">
                    <Star className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <span className="text-gray-800 font-medium">{titre}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievement Highlights */}
        <div className="mt-16 text-center">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ballon d'Or 2005</h3>
              <p className="text-gray-600">Élu meilleur joueur mondial</p>
            </div>
            
            <div className="p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Champion du Monde</h3>
              <p className="text-gray-600">Coupe du Monde 2002</p>
            </div>
            
            <div className="p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-500 to-green-500 rounded-full flex items-center justify-center">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ligue des Champions</h3>
              <p className="text-gray-600">Vainqueur avec Barcelone</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;