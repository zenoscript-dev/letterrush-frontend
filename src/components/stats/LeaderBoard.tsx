import { useSocketStore } from "../../stores/useSocketStore";
import { cn } from "../../utils/cn";

const LeaderBoard = () => {
    const { leaderBoard } = useSocketStore();
  return (
    <div className='flex-1 bg-gray-800 p-4 rounded-lg shadow-md overflow-y-auto'>
    <h3 className='text-lg font-bold mb-2 text-center'>Leaderboard</h3>
    <div className='space-y-2'>
      {leaderBoard.data.map((entry, index) => (
        <div key={entry.nickname.split('@')[0]} className='flex justify-between text-sm'>
          <span
            className={cn(
              index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-300' : index === 2 ? 'text-orange-400' : 'text-gray-500'
            )}
          >
            {index + 1}. {entry.nickname.split('@')[0]}
          </span>
          <span className='text-purple-400 font-mono'>{entry.score}</span>
        </div>
      ))}
    </div>
  </div>
  )
}

export default LeaderBoard