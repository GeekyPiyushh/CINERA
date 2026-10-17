import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage';
import { MoviesPage } from '../pages/MoviesPage';
import { MovieDetailsPage } from '../pages/MovieDetailsPage';
import { BookingPage } from '../pages/BookingPage';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/movies/:slug" element={<MovieDetailsPage />} />
      <Route path="/book/:slug" element={<BookingPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
