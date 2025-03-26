import { useSocketStore } from '../stores/useSocketStore';
import LeaderBoard from './stats/LeaderBoard';

const GameSideBar = () => {
  const { numberOfPlayers, score, rank } = useSocketStore();

  return (
    <div className='w-80 bg-gray-900 rounded-xl shadow-xl p-6 flex flex-col gap-6'>
      {/* Live Users */}
      <div className='bg-gray-800 p-4 rounded-lg shadow-md'>
        <div className='text-lg font-bold text-center flex items-center justify-center gap-2'>
          <div className='relative flex items-center'>
            <div className='w-2.5 h-2.5 bg-green-500 rounded-full'></div>
            <div className='w-2.5 h-2.5 bg-green-500 rounded-full absolute animate-ping'></div>
          </div>
          Live Users: <span className='text-green-400'>{numberOfPlayers ? numberOfPlayers : 0}</span>
        </div>
      </div>

      {/* Score */}
      <div className='relative bg-gradient-to-r from-purple-700 to-pink-500 p-5 rounded-lg text-center shadow-md'>
        <h2 className='text-lg font-bold text-purple-200'>YOUR SCORE</h2>
        <div className='text-4xl font-extrabold text-white'>{score}</div>
        <div className='text-sm text-purple-200 mt-1'>Points</div>
      </div>

      {/* Rank */}
      <div className='bg-gradient-to-r from-blue-700 to-indigo-500 p-5 rounded-lg text-center shadow-md'>
        <h2 className='text-lg font-bold text-blue-200'>YOUR RANK</h2>
        <div className='text-4xl font-extrabold text-white'>#{rank}</div>
        <div className='text-sm text-blue-200 mt-1'>of {numberOfPlayers} players</div>
        {/* <div className='text-xs text-blue-200/80 mt-1'>Top {Math.round((currentRank / to) * 100)}%</div> */}
      </div>

      {/* Leaderboard */}
     <LeaderBoard />
    </div>
  );
};

export default GameSideBar;