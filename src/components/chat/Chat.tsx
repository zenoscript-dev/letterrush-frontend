import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useSocketStore } from '../../stores/useSocketStore';
import ConfirmLeaveGameModel from '../ConfirmLeaveGameModel';
import GameSideBar from '../GameSideBar';
import ChatBody from './ChatBody';
import { ChatHeader } from './ChatHeader';
import ChatInput from './ChatInput';

const Chat = ({ nickName }: { nickName: string }) => {
  const { submitWord, messages: socketMessages, leaveRoom, randomWord } = useSocketStore();
  const [showExitModal, setShowExitModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
      return 'You will lose all your game progress if you leave. Are you sure?';
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;
    try {
      submitWord(message, nickName);
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

  const handleLeaveCancel = () => {
    setShowExitModal(false);
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
        <ConfirmLeaveGameModel confirmLeave={confirmLeave} handleLeaveCancel={handleLeaveCancel} />
      )}

      <GameSideBar />

      {/* Main Chat Area */}
      <div className='flex-1 flex justify-center'>
        <div className='flex flex-col w-[800px] bg-gray-900 p-6 rounded-xl shadow-xl'>
          <ChatHeader randomWord={randomWord} handleLeaveRoom={handleLeaveRoom} />
          <ChatBody socketMessages={socketMessages} />
          <ChatInput 
            handleSendMessage={handleSendMessage} 
            randomWord={randomWord} 
            inputRef={inputRef as React.RefObject<HTMLInputElement>}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
