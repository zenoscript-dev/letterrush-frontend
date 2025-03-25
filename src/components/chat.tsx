import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useSocketStore } from '../stores/useSocketStore';
import { cn } from '../utils/cn';
import { Button } from './Button';
interface LeaderboardEntry {
  username: string;
  score: number;
}

export const Chat = ({nickName}: {nickName: string}) => {
  const {submitWord, messages: socketMessages, leaveRoom, numberOfPlayers, randomWord } = useSocketStore();
  const [newMessage, setNewMessage] = useState('');
  const [showExitModal, setShowExitModal] = useState(false);
  const nickname = sessionStorage.getItem('nickname') || '';
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
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
  const [currentWord, setCurrentWord] = useState(randomWord);
  const [currentRank, setCurrentRank] = useState(1);
  const [score, setScore] = useState(1200);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [socketMessages]);

  // Focus input on any click
  useEffect(() => {
    const handleClick = () => {
      inputRef.current?.focus();
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // Handle page reload/close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
      // setShowExitModal(true);
      return 'You will lose all your game progress if you leave. Are you sure?';
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    try {
      submitWord(newMessage, nickName);
      // setMessages((prev) => [...prev, message]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending chat message:', error);
      toast.error('Error sending chat message');
    }

    
  };

  const handleLeaveRoom = () => {
    setShowExitModal(true);
  };

  const confirmLeave = () => {
   try {
     leaveRoom();
     window.location.href = '/';
     setShowExitModal(false);
   } catch (error) {
    toast.error('Error leaving room');
   }
  };

  // Check if screen width is less than 768px (mobile)
  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    return (
      <div className='flex items-center justify-center h-screen bg-gray-900 p-6 text-white'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold mb-4'>Desktop Mode Required</h2>
          <p className='text-gray-300'>Please switch to desktop mode to use this application.</p>
          <p className='text-gray-300 mt-2'>The game experience is optimized for larger screens.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='relative flex h-screen w-full bg-gradient-to-br from-gray-900 to-black p-6 font-sans text-white'>
      {showExitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 transform transition-all shadow-2xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-4">Are you sure you want to leave?</h3>
              <p className="text-gray-300 mb-8">You will lose all your game progress if you exit now.</p>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => setShowExitModal(false)}
                  variant="outline"
                  className="w-full"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmLeave}
                  variant="destructive"
                  className="w-full"
                >
                  Leave Game
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
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

      {/* Main Chat Area */}
      <div className='flex-1 flex justify-center'>
        <div className='flex flex-col w-[800px] bg-gray-900 p-6 rounded-xl shadow-xl'>
          {/* Top Bar */}
          <div className='flex justify-between items-center pb-4 border-b border-gray-700'>
            <div className='flex-1'></div>
            <div className='text-lg'>
              Type: <span className='text-purple-400'>{randomWord ? randomWord: ''}</span>
            </div>
            <div className='flex-1 flex justify-end'>
              <button
                onClick={handleLeaveRoom}
                className='text-gray-400 hover:text-red-500 transition-colors duration-200 flex items-center gap-2'
                title='Leave Room'
              >
                <span>Leave Game</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={messagesContainerRef}
            className='flex-1 overflow-y-auto p-4 flex flex-col-reverse space-y-3 space-y-reverse scrollbar-thin scrollbar-thumb-gray-600'
          >
            {[...socketMessages].reverse().map((message) => (
              console.log(message, nickName,'asadsdasdadasdasd'),
              <div
                key={message.id}
                className={cn('flex flex-col', message.nickName === nickname ? 'items-end' : 'items-start')}
              >
                <div
                  className={cn(
                    'p-3 rounded-lg max-w-xs break-words',
                    message.nickName === nickname ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-200'
                  )}
                >
                  <p>{message.message}</p>
                </div>
                <span className='text-xs text-gray-500 mt-1'>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>

          {/* Input Field */}
          <div className='mt-4 flex items-center gap-3'>
            <input
              ref={inputRef}
              type='text'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              onPaste={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              placeholder={`Type "${randomWord ? randomWord : ''}"" to score points...`}
              className='flex-1 rounded-lg bg-gray-800 p-3 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 transition-all duration-300'
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              size="sm"
              className='bg-purple-600 rounded-lg text-white text-sm font-bold hover:bg-purple-700 transition-all duration-300 px-3 py-2'
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
