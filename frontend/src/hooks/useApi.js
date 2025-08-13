import { useState, useEffect } from 'react';
import { api } from '../services/api';

// Generic API hook
export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiCall();
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || err.message || 'Une erreur est survenue');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: () => fetchData() };
};

// Specific hooks for each endpoint
export const useHero = () => useApi(api.getHero);

export const useTrainings = () => useApi(api.getTrainings);

export const useTrainingVideos = () => useApi(api.getTrainingVideos);

export const useAbout = () => useApi(api.getAbout);

export const useStatistics = () => useApi(api.getStatistics);

export const useSocialLinks = () => useApi(api.getSocialLinks);

export const useTestimonials = () => useApi(api.getTestimonials);

// Hook for newsletter subscription
export const useNewsletterSubscription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const subscribe = async (email) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      await api.subscribeNewsletter(email);
      setSuccess(true);
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || 'Erreur lors de l\'inscription');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
  };

  return { subscribe, loading, error, success, resetState };
};

// Hook for testimonial creation
export const useTestimonialSubmission = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitTestimonial = async (testimonial) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      await api.createTestimonial(testimonial);
      setSuccess(true);
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || 'Erreur lors de l\'envoi du témoignage');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
  };

  return { submitTestimonial, loading, error, success, resetState };
};