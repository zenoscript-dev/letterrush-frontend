import { Navigate, Route, Routes } from 'react-router';
import GamePlayPage from './pages/GamePlayPage';
import HomePage from './pages/HomePage';
import Rooms from './pages/Rooms';
import SplashPage from './pages/SplashPage';

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
