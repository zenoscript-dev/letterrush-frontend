import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Message, MessageType } from '../../stores/useChatStore';
import { cn } from '../../utils/cn';
import GameStartedMessage from './chatMessages/GameStarted';
import PlayerJoinedOrLeftMessage from './chatMessages/PlayerJoinedOrLeftMessage';
import Streak from './chatMessages/Streak';
import WordDidNotMatchMessage from './chatMessages/WordDidNotMatchMessage';

const ChatBody = ({ socketMessages }: { socketMessages: Message[] }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const nickName = sessionStorage.getItem('nickname') || '';

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [socketMessages]);

  const handleRenderMessage = (message: Message) => {
    if (message.type === MessageType.WORD_MATCH) {
      return <Streak message={message} />;
    } else if (message.type === MessageType.WORD_NOT_MATCH) {
      return <WordDidNotMatchMessage message={message} />;
    } else if (
      message.type === MessageType.PLAYER_JOINED ||
      message.type === MessageType.PLAYER_LEFT
    ) {
      return <PlayerJoinedOrLeftMessage message={message} />;
    } else if (message.type === MessageType.GAME_STARTED) {
      return <GameStartedMessage message={message} />;
    }
  };

  return (
    <div
      ref={messagesContainerRef}
      className='scrollbar-thin scrollbar-thumb-gray-600 flex flex-1 flex-col-reverse space-y-3 space-y-reverse overflow-y-auto p-4'
    >
      <AnimatePresence>
        {[...socketMessages].reverse().map((message) => (
          <motion.div
            key={message.id}
            initial={{
              x: message.nickName === nickName ? 100 : -100,
              opacity: 0,
            }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: message.nickName === nickName ? 100 : -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className={cn(
              'flex flex-col',
              message.nickName === nickName ? 'items-end' : 'items-start',
            )}
          >
            {handleRenderMessage(message)}
            <span className='mt-1 text-xs text-gray-500'>
              {new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ChatBody;
