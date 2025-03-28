import { Message } from '../../../stores/useChatStore';

const WordMatchMessage = ({ message }: { message: Message }) => {
  return (
    <div className='max-w-[70%] rounded-lg bg-gradient-to-r from-green-600 to-emerald-700 p-3 text-white'>
      <div className='flex flex-col gap-1'>
        <p className='text-sm font-bold text-emerald-200'>🎯 Word Match!</p>
        <p className='text-base font-medium'>
          {message.message}{' '}
          <span className='text-sm text-emerald-200'>+1 point</span>
        </p>
      </div>
    </div>
  );
};

export default WordMatchMessage;
