import { useSocketStore } from '../stores/useSocketStore';
import LeaderBoard from './stats/LeaderBoard';

const GameSideBar = () => {
  const { numberOfPlayers, score, rank } = useSocketStore();
  //   alert(rank);

  return (
    <div className='flex w-80 flex-col gap-6 rounded-xl bg-gray-900 p-6 shadow-xl'>
      {/* Live Users */}
      <div className='rounded-lg bg-gray-800 p-4 shadow-md'>
        <div className='flex items-center justify-center gap-2 text-center text-lg font-bold'>
          <div className='relative flex items-center'>
            <div className='h-2.5 w-2.5 rounded-full bg-green-500'></div>
            <div className='absolute h-2.5 w-2.5 animate-ping rounded-full bg-green-500'></div>
          </div>
          Live Users:{' '}
          <span className='text-green-400'>
            {numberOfPlayers ? numberOfPlayers : 0}
          </span>
        </div>
      </div>

      {/* Score */}
      <div className='relative rounded-lg bg-gradient-to-r from-purple-700 to-pink-500 p-5 text-center shadow-md'>
        <h2 className='text-lg font-bold text-purple-200'>YOUR SCORE</h2>
        <div className='text-4xl font-extrabold text-white'>{score}</div>
        <div className='mt-1 text-sm text-purple-200'>Points</div>
      </div>

      {/* Rank */}
      <div className='rounded-lg bg-gradient-to-r from-blue-700 to-indigo-500 p-5 text-center shadow-md'>
        <h2 className='text-lg font-bold text-blue-200'>YOUR RANK</h2>
        <div className='text-4xl font-extrabold text-white'>#{rank}</div>
        <div className='mt-1 text-sm text-blue-200'>
          of {numberOfPlayers} players
        </div>
        {/* <div className='text-xs text-blue-200/80 mt-1'>Top {Math.round((currentRank / to) * 100)}%</div> */}
      </div>

      {/* Leaderboard */}
      <LeaderBoard />
    </div>
  );
};

export default GameSideBar;
