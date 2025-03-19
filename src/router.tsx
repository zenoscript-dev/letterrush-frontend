import { Routes, Route, Navigate } from 'react-router';
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import OpenRoom from './pages/Rooms';
import Rooms from './pages/Rooms';
import GamePlayPage from './pages/GamePlayPage';

const Router = () => {
  return (
    <Routes>
      {/* Unprotected Routes - Accessible without socket connection */}
      <Route path='/' element={<SplashPage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/rooms' element={<Rooms />} />

      <Route path='/game' element={<GamePlayPage />} />

      {/* Protected Routes - Only accessible with socket connection */}

      {/* Fallback route for unknown paths */}
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default Router;
