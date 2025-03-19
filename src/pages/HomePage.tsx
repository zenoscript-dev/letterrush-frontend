import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router';
import { useSocketStore } from '../stores/useSocketStore';
import toast from 'react-hot-toast';
const HomePage = () => {
  const navigate = useNavigate();
  const { disconnectSocket, userId } = useSocketStore();

  useEffect(() => {
    disconnectSocket();
    console.log('Disconnected from socket');
  }, [disconnectSocket, navigate]);

  const handleJoinGame = () => {
    try {
      console.log(userId, 'userId');
      navigate('/rooms', { state: { userId } });
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <div>
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <h1 className='mb-12 text-6xl text-primary-color'>TypeRacerX</h1>
        <div className='flex w-full max-w-2xl gap-8 px-4'>
          <div className='flex-1 rounded-lg border-2 border-primary-color bg-bg-color/30 p-6 backdrop-blur'>
            <h2 className='mb-4 text-center text-2xl text-primary-color'>
              Play as Guest
            </h2>
            <div className='flex flex-col gap-4'>
              {/* <input
                type='text'
                placeholder='Enter your nickname'
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className='rounded border border-primary-color bg-gray-800 p-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-color'
              /> */}
              <Button variant='default' size='lg' onClick={handleJoinGame}>
                Join as Guest
              </Button>
            </div>
          </div>

          <div className='flex-1 rounded-lg border-2 border-secondary-color bg-bg-color/30 p-6 backdrop-blur'>
            <h2 className='mb-4 text-center text-2xl text-secondary-color'>
              Sign Up
            </h2>
            <div className='flex flex-col gap-4'>
              <input
                type='email'
                placeholder='Enter your email'
                className='rounded border border-secondary-color bg-gray-800 p-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary-color'
              />
              <input
                type='password'
                placeholder='Choose password'
                className='rounded border border-secondary-color bg-gray-800 p-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary-color'
              />
              <Button variant='secondary' size='lg'>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
        <div className='mt-8 text-center text-primary-color'>
          Already have an account?
          <Button variant='link' size='lg' className='text-secondary-color'>
            Login here
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
