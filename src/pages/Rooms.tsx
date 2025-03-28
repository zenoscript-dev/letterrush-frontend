import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router';
import { RoomCard } from '../components/RoomCard';
import useRoomStore, { Room } from '../stores/useRoomStore';
import { useSocketStore } from '../stores/useSocketStore';

const SkeletonRoomCard = () => (
  <div className='h-40 animate-pulse rounded-lg bg-gray-800/50'></div>
);

const Rooms = () => {
  const { state } = useLocation();
  const nickname = state?.nickname;
  const navigate = useNavigate();
  const { getRooms, rooms, loading, error } = useRoomStore();
  const { connectSocketAndJoinRoom } = useSocketStore();

  useEffect(() => {
    try {
      getRooms();
    } catch (error) {
      toast.error(error as string);
    }
  }, []);

  if (error) {
    toast.error(error);
  }

  const handleRoomClick = (roomId: string) => {
    try {
      connectSocketAndJoinRoom(roomId, nickname);
      navigate(`/game`, { state: { roomId, nickName: nickname } });
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <div className='min-h-screen bg-primary-bg'>
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        <div className='mb-12 text-center'>
          <h1 className='mb-4 animate-pulse font-neuropolitical text-5xl text-primary-color'>
            Game Rooms
          </h1>
          <p className='text-lg text-gray-400 transition-colors duration-300 hover:text-primary-color'>
            Choose a room to start typing!
          </p>
        </div>

        {loading && rooms?.length === 0 ? (
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonRoomCard key={index} />
            ))}
          </div>
        ) : rooms?.length === 0 ? (
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
            {rooms?.map((room: Room) => (
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
