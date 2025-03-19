import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home'); // Navigate to home page after 3 seconds
    }, 2700);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className='center h-screen w-screen'>
      <h1 className='text-6xl font-bold text-primary-color'>
        <span className='typewriter'>TypeRacerX...</span>
      </h1>
    </div>
  );
};

export default SplashPage;
