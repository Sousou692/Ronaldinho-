import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { Button } from './ui/button';

const VideoPlayer = ({ video, className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const isYouTube = video.url.includes('youtube.com') || video.url.includes('youtu.be');
  const isVimeo = video.url.includes('vimeo.com');

  const getEmbedUrl = (url) => {
    if (isYouTube) {
      // YouTube embed URL
      return url.replace('watch?v=', 'embed/').replace('youtu.be/', 'embed/');
    } else if (isVimeo) {
      // Vimeo embed URL
      const videoId = url.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
    // For external videos, we'll open in new tab
    if (isYouTube || isVimeo) {
      window.open(video.url, '_blank');
    }
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Video Thumbnail */}
      <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-900">
        <img 
          src={video.miniature} 
          alt={video.titre}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="lg"
            onClick={handlePlayToggle}
            className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-3 transform scale-110 hover:scale-125 transition-transform duration-200"
          >
            <Play className="w-6 h-6 mr-2" />
            Regarder
          </Button>
        </div>

        {/* Duration Badge */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm font-medium">
          {video.duree}
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded text-sm font-medium">
          {video.category}
        </div>
      </div>

      {/* Video Info */}
      <div className="mt-4">
        <h4 className="text-lg font-bold text-gray-900 mb-2">{video.titre}</h4>
        <p className="text-gray-600 text-sm">{video.description}</p>
      </div>

      {/* YouTube/Vimeo Embed Modal would go here */}
      {isPlaying && (isYouTube || isVimeo) && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <iframe
              src={getEmbedUrl(video.url)}
              title={video.titre}
              className="w-full h-full rounded-lg"
              allowFullScreen
              allow="autoplay; encrypted-media"
            />
            <Button
              onClick={() => setIsPlaying(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
              variant="ghost"
              size="sm"
            >
              ✕ Fermer
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;