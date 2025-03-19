import { FC } from 'react';

interface RoomCardProps {
  roomName: string;
  activePlayers: number;
  onClick: () => void;
}

export const RoomCard: FC<RoomCardProps> = ({
  roomName,
  activePlayers,
  onClick,
}) => {
  return (
    <div className='group relative w-full cursor-pointer' onClick={onClick}>
      {/* Animated border effect */}
      <div className='animate-gradient-xy absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary-color/50 via-secondary-color/50 to-primary-color/50 opacity-40 blur transition duration-1000 group-hover:opacity-70 group-hover:duration-200'></div>

      {/* Main card content */}
      <div
        className={`relative flex w-full flex-col gap-4 rounded-xl border border-white/20 p-6 shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:bg-white/10`}
      >
        <div className='flex items-center justify-between'>
          <p className='text-l font-neuropolitical text-white/90 drop-shadow-lg'>
            {roomName.length > 20 ? `${roomName.slice(0, 10)}...` : roomName}
          </p>

          <div className='flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 backdrop-blur-sm'>
            <div className='relative flex items-center'>
              <div className='relative flex h-2 w-2'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400/50 opacity-75'></span>
                <span className='relative inline-flex h-2 w-2 rounded-full bg-green-500'></span>
              </div>
            </div>
            <span className='text-sm text-white/90'>
              {activePlayers} {activePlayers === 1 ? 'player' : 'players'}
            </span>
          </div>
        </div>

        <div className='flex items-center justify-between gap-2 rounded-lg bg-white/5 p-2 text-sm text-white/70 backdrop-blur-sm'>
          <span>Click to join</span>
          <span className='text-lg leading-none'>•</span>
          <span>Ready to start</span>
        </div>
      </div>
    </div>
  );
};
