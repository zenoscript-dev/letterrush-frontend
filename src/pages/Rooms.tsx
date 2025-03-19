import { useEffect } from 'react';
import { Room, useSocketStore } from '../stores/useSocketStore';
import { RoomCard } from '../components/RoomCard';
import { useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const Rooms = () => {
  const { state } = useLocation();
  const userId = state?.userId;
  const navigate = useNavigate();
  const { getRoomList, roomList, error, disconnectSocket } = useSocketStore();
  console.log(roomList, 'roomList');

  useEffect(() => {
    try {
      // disconnectSocket();x
      getRoomList();
    } catch (error) {
      alert('Error connecting to socket');
    }

    // Poll for room updates every 5 seconds
    const interval = setInterval(() => {
      getRoomList();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (error) {
    toast.error(error);
  }

  const handleRoomClick = (roomId: string) => {
    navigate(`/game`, { state: { roomId, userId } });
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900'>
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        <div className='mb-12 text-center'>
          <h1 className='mb-4 animate-pulse font-neuropolitical text-5xl text-primary-color'>
            Game Rooms
          </h1>
          <p className='text-lg text-gray-400 transition-colors duration-300 hover:text-primary-color'>
            Choose a room to start racing!
          </p>
        </div>

        {roomList && roomList.length === 0 ? (
          <div className='transform rounded-xl border border-gray-700 bg-gray-800/50 p-12 text-center backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-primary-color hover:bg-gray-800/70'>
            <div className='mb-4 text-6xl transition-transform duration-300 hover:rotate-12'>
              🎮
            </div>
            <p className='mb-2 text-2xl text-gray-300 transition-colors duration-300 hover:text-primary-color'>
              No rooms available
            </p>
            <p className='text-gray-500 transition-colors duration-300 hover:text-gray-300'>
              Rooms will appear here when available
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {roomList &&
              roomList.length &&
              roomList.map((room: Room) => (
                <RoomCard
                  key={room.roomId}
                  roomName={room.roomName}
                  activePlayers={room.roomSize}
                  onClick={() => handleRoomClick(room.roomId)}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;
