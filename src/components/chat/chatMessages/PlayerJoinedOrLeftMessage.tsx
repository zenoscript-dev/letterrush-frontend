import { Message } from '../../../stores/useChatStore';

interface PlayerJoinedOrLeftMessageProps {
  message: Message;
}

const PlayerJoinedOrLeftMessage = ({
  message,
}: PlayerJoinedOrLeftMessageProps) => {
  return (
    <div className='rounded-lg border border-gray-700/50 px-3 py-1 text-center text-sm text-gray-500'>
      {message.message}
    </div>
  );
};

export default PlayerJoinedOrLeftMessage;
