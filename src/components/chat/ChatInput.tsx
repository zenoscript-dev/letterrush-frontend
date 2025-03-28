import { useState } from 'react';
import { Button } from '../Button';

const ChatInput = ({
  handleSendMessage,
  randomWord,
  inputRef,
}: {
  handleSendMessage: (message: string) => void;
  randomWord: string;
  inputRef: React.RefObject<HTMLInputElement>;
}) => {
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    handleSendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <div className='mt-4 flex items-center gap-3'>
      <input
        ref={inputRef}
        type='text'
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        onPaste={(e) => e.preventDefault()}
        onCopy={(e) => e.preventDefault()}
        placeholder={`Type "${randomWord ? randomWord : ''}"" to score points...`}
        className='flex-1 rounded-lg bg-gray-800 p-3 text-sm text-white placeholder-gray-400 transition-all duration-300 focus:ring-2 focus:ring-purple-500'
      />
      <Button
        onClick={() => sendMessage()}
        disabled={!newMessage.trim()}
        size='sm'
        className='rounded-lg bg-purple-600 px-3 py-2 text-sm font-bold text-white transition-all duration-300 hover:bg-purple-700'
      >
        Send
      </Button>
    </div>
  );
};

export default ChatInput;
