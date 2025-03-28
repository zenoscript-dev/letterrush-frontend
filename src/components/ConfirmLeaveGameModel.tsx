import { Button } from './Button';

const ConfirmLeaveGameModel = ({
  confirmLeave,
  handleLeaveCancel,
}: {
  confirmLeave: () => void;
  handleLeaveCancel: () => void;
}) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='mx-4 w-full max-w-md transform rounded-xl bg-gray-800 p-8 shadow-2xl transition-all'>
        <div className='text-center'>
          <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100'>
            <svg
              className='h-6 w-6 text-red-600'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
              />
            </svg>
          </div>
          <h3 className='mb-4 text-xl font-medium text-white'>
            Are you sure you want to leave?
          </h3>
          <p className='mb-8 text-gray-300'>
            You will lose all your game progress if you exit now.
          </p>
          <div className='flex justify-center gap-4'>
            <Button
              onClick={() => handleLeaveCancel()}
              variant='outline'
              className='w-full'
            >
              Cancel
            </Button>
            <Button
              onClick={confirmLeave}
              variant='destructive'
              className='w-full'
            >
              Leave Game
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLeaveGameModel;
