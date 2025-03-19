import { useState, useEffect, useRef } from 'react';
import { Button } from './Button';
import { cn } from '../utils/cn';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
}

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: crypto.randomUUID(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='flex h-screen flex-col bg-bg-color font-sans'>
      {/* Chat Header */}
      <div className='mb-2 bg-primary-color p-4 text-white'>
        <h2 className='text-xl font-semibold'>Chat</h2>
      </div>

      {/* Messages Container */}
      <div className='flex flex-1 flex-col-reverse space-y-4 overflow-y-auto p-4'>
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'my-2 flex',
              message.sender === 'user' ? 'justify-end' : 'justify-start',
            )}
          >
            <div
              className={cn(
                'max-w-[70%] rounded-lg p-3',
                message.sender === 'user'
                  ? 'rounded-br-none bg-primary-color text-white'
                  : 'rounded-bl-none bg-secondary-color text-white',
              )}
            >
              <p className='break-words'>{message.text}</p>
              <p className='mt-1 text-right text-xs opacity-70'>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className='border-t border-gray-700 bg-bg-color p-4'>
        <div className='flex gap-2'>
          <input
            ref={inputRef}
            type='text'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder='Type a message...'
            className='flex-1 rounded-lg bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-color'
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            variant='default'
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
