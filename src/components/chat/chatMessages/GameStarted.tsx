import { Message } from '../../../stores/useSocketStore';

interface GameStartedMessageProps {
  message: Message;
}

const GameStartedMessage = ({ message }: GameStartedMessageProps) => {
  return (
    <div className="text-center text-sm text-green-500 border border-green-700/50 rounded-lg px-3 py-1">
      {message.message}
    </div>
  );
};

export default GameStartedMessage;
