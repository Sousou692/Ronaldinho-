import React, { useState } from 'react';
import { Clock, Users, Target, Play, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useTrainings, useTrainingVideos } from '../hooks/useApi';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import VideoPlayer from './VideoPlayer';

const TrainingSection = () => {
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const { data: trainings, loading: trainingsLoading, error: trainingsError, refetch: refetchTrainings } = useTrainings();
  const { data: videos, loading: videosLoading, error: videosError, refetch: refetchVideos } = useTrainingVideos();

  if (trainingsLoading || videosLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600">Chargement des entraînements...</p>
        </div>
      </section>
    );
  }

  if (trainingsError) {
    return (
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <ErrorMessage message={trainingsError} onRetry={refetchTrainings} />
        </div>
      </section>
    );
  }

  return (
    <section id="entraînements" className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
            Entraînements Secrets
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Entraînements & Techniques
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Les secrets des routines de Ronaldinho
          </p>
        </div>

        {/* Training Routines */}
        {trainings && trainings.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {trainings.map((routine, index) => (
              <Card 
                key={routine.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedRoutine(selectedRoutine === routine.id ? null : routine.id)}
              >
                <div className="relative">
                  <img 
                    src={routine.image} 
                    alt={routine.nom}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-2">{routine.nom}</h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{routine.duree}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{routine.description}</p>
                  
                  {selectedRoutine === routine.id && (
                    <div className="border-t pt-4 animate-in slide-in-from-top duration-300">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Target className="w-5 h-5 mr-2 text-green-600" />
                        Exercices détaillés :
                      </h4>
                      <ul className="space-y-2">
                        {routine.exercices.map((exercice, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{exercice}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button 
                    variant="outline" 
                    className="w-full mt-4 border-green-200 hover:bg-green-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRoutine(selectedRoutine === routine.id ? null : routine.id);
                    }}
                  >
                    {selectedRoutine === routine.id ? 'Masquer les détails' : 'Voir les exercices'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Video Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Vidéos d'Entraînement
            </h3>
            <p className="text-gray-600">
              Apprenez directement des techniques de Ronaldinho
            </p>
          </div>

          {videosLoading ? (
            <div className="text-center">
              <LoadingSpinner size="medium" />
              <p className="mt-4 text-gray-600">Chargement des vidéos...</p>
            </div>
          ) : videosError ? (
            <ErrorMessage message={videosError} onRetry={refetchVideos} />
          ) : videos && videos.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video) => (
                <VideoPlayer key={video.id} video={video} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p>Aucune vidéo disponible pour le moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrainingSection;