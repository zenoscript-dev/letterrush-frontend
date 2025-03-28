import { Message } from '../../../stores/useChatStore';

const WordDidNotMatchMessage = ({ message }: { message: Message }) => {
  return (
    <div className='max-w-[70%] rounded-lg bg-gradient-to-r from-red-600 to-rose-700 p-3 text-white'>
      <div className='flex flex-col gap-1'>
        <p className='text-sm font-bold text-rose-200'>
          ❌ Word Did Not Match!
        </p>
        <p className='text-base font-medium'>
          {message.message} <span className='text-sm text-rose-200'></span>
        </p>
      </div>
    </div>
  );
};

export default WordDidNotMatchMessage;
