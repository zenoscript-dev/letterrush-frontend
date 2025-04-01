import Chat from '../components/chat/Chat';
import { useSocketStore } from '../stores/useSocketStore';

const GamePlayPage = () => {
  const { isConnected, isConnecting, error, nickname } = useSocketStore();

  if (isConnecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-color p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-color mx-auto mb-4"></div>
          <p className="text-lg sm:text-xl text-primary-color animate-pulse">
            Connecting to server...
          </p>
        </div>
      </div>
    );
  }

  if (isConnected) {
    return (
      <div className='min-h-screen max-h-screen w-full overflow-hidden bg-bg-color p-2 sm:p-4 md:p-6'>
        <div className="max-w-7xl mx-auto rounded-lg border-2 border-primary-color/30 backdrop-blur">
          <Chat nickName={nickname} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center p-4 bg-bg-color'>
        <div className="w-full max-w-md mx-auto text-center space-y-6">
          <div className="text-6xl mb-4">😕</div>
          <div className="text-xl sm:text-2xl text-red-500 mb-4 font-semibold">
            Connection Error
          </div>
          <div className="text-gray-300 mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20">
            {error}
          </div>
          <button
            onClick={() => (window.location.href = '/')}
            className='w-full sm:w-auto px-6 py-3 rounded-lg bg-primary-color text-white font-medium 
            transition-all duration-300 hover:bg-primary-color/80 hover:scale-105 
            focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 focus:ring-offset-bg-color'
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }
};

export default GamePlayPage;
