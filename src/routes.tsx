import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Movies } from './pages/Movies';
import { MovieDetails } from './pages/MovieDetails';
import { Booking } from './pages/Booking';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/:slug" element={<MovieDetails />} />
      <Route path="/book/:slug" element={<Booking />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
