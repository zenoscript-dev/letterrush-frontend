import React from 'react';
import { useSocketStore } from '../stores/useSocketStore';
import { cn } from '../utils/cn';

interface LeaderboardEntry {
  username: string;
  score: number;
}

const GameSideBar = () => {
  const { numberOfPlayers } = useSocketStore();
  const [leaderboard, setLeaderboard] = React.useState<LeaderboardEntry[]>([
    { username: 'Player 1', score: 1200 },
    { username: 'Player 2', score: 1100 },
    { username: 'Player 3', score: 1000 },
    { username: 'Player 4', score: 950 },
    { username: 'Player 5', score: 900 },
    { username: 'Player 6', score: 850 },
    { username: 'Player 7', score: 800 },
    { username: 'Player 8', score: 750 },
    { username: 'Player 9', score: 700 },
    { username: 'Player 10', score: 650 },
  ]);
  const [currentRank, setCurrentRank] = React.useState(1);
  const [score, setScore] = React.useState(1200);

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
        <div className='text-4xl font-extrabold text-white'>{score.toLocaleString()}</div>
        <div className='text-sm text-purple-200 mt-1'>Points</div>
      </div>

      {/* Rank */}
      <div className='bg-gradient-to-r from-blue-700 to-indigo-500 p-5 rounded-lg text-center shadow-md'>
        <h2 className='text-lg font-bold text-blue-200'>YOUR RANK</h2>
        <div className='text-4xl font-extrabold text-white'>#{currentRank}</div>
        <div className='text-sm text-blue-200 mt-1'>of {leaderboard.length} players</div>
        {/* <div className='text-xs text-blue-200/80 mt-1'>Top {Math.round((currentRank / to) * 100)}%</div> */}
      </div>

      {/* Leaderboard */}
      <div className='flex-1 bg-gray-800 p-4 rounded-lg shadow-md overflow-y-auto'>
        <h3 className='text-lg font-bold mb-2 text-center'>Leaderboard</h3>
        <div className='space-y-2'>
          {leaderboard.map((entry, index) => (
            <div key={entry.username} className='flex justify-between text-sm'>
              <span
                className={cn(
                  index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-300' : index === 2 ? 'text-orange-400' : 'text-gray-500'
                )}
              >
                {index + 1}. {entry.username}
              </span>
              <span className='text-purple-400 font-mono'>{entry.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameSideBar;