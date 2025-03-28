import { Message } from '../../../stores/useChatStore';

interface GameStartedMessageProps {
  message: Message;
}

const GameStartedMessage = ({ message }: GameStartedMessageProps) => {
  return (
    <div className='rounded-lg border border-green-700/50 px-3 py-1 text-center text-sm text-green-500'>
      {message.message}
    </div>
  );
};

export default GameStartedMessage;
