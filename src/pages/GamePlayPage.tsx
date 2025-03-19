import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router';
import { useSocketStore } from '../stores/useSocketStore';

const GamePlayPage = () => {
  const { roomId, userId } = useLocation().state;
  const navigate = useNavigate();
  const { connectSocketAndJoinRoom } = useSocketStore();

  useEffect(() => {
    if (!roomId || !userId) {
      toast.error('Invalid room or user id');
      navigate('/');
    }
    connectSocketAndJoinRoom(roomId);
  }, [roomId, userId, navigate]);
  return (
    <div className='h-screen w-screen overflow-hidden bg-bg-color'>red</div>
  );
};

export default GamePlayPage;
