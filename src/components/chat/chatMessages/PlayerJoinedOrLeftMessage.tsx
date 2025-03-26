import { Message } from '../../../stores/useSocketStore';

interface PlayerJoinedOrLeftMessageProps {
  message: Message;
}

const PlayerJoinedOrLeftMessage = ({ message }: PlayerJoinedOrLeftMessageProps) => {
  return (
    <div className="text-center text-sm text-gray-500 border border-gray-700/50 rounded-lg px-3 py-1">
      {message.message}
    </div>
  );
};

export default PlayerJoinedOrLeftMessage;
