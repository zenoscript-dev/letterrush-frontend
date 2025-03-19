const ActivePlayers = ({
  totalActiveUsersForRoom,
}: {
  totalActiveUsersForRoom: number;
}) => {
  return (
    <div className='flex max-w-fit items-start gap-6 rounded-xl border border-gray-700 bg-gray-800/90 p-2 shadow-xl backdrop-blur-sm'>
      <div className='relative flex items-center justify-center gap-2 px-1'>
        <div className='relative flex h-2 w-2'>
          <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75'></span>
          <span className='relative inline-flex h-2 w-2 rounded-full bg-green-500'></span>
        </div>
        <p className='text-[10px] font-medium uppercase tracking-wider text-white'>
          Active Players
        </p>
        <p className='text-[10px] font-bold text-white'>
          {totalActiveUsersForRoom}
        </p>
      </div>
    </div>
  );
};

export default ActivePlayers;
