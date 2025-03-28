import Chat from '../components/chat/Chat';
import { useSocketStore } from '../stores/useSocketStore';

const GamePlayPage = () => {
  const { isConnected, isConnecting, error, nickname } = useSocketStore();

  if (isConnecting) {
    return <div>Connecting to server...</div>;
  }

  if (isConnected) {
    return (
      <div className='h-screen w-screen overflow-hidden bg-bg-color'>
        <Chat nickName={nickname} />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center gap-4'>
        <div>Error: {error}</div>
        <button
          onClick={() => (window.location.href = '/')}
          className='rounded bg-primary-color px-4 py-2 text-white hover:bg-primary-color/80'
        >
          Return to Homepage
        </button>
      </div>
    );
  }
};

export default GamePlayPage;
