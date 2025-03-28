import { motion } from 'framer-motion';
import { Message } from '../../../stores/useChatStore';

const Streak = ({ message }: { message: Message }) => {
  return (
    <div className='relative flex items-center justify-center p-4'>
      <div className='absolute'>
        <motion.div
          className='flex space-x-1'
          initial={{ scale: 0.8 }}
          animate={{ scale: 1.2 }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 0.5,
          }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className='h-8 w-4 rounded-full bg-gradient-to-t from-orange-500 via-yellow-400 to-red-500'
              initial={{ y: 0 }}
              animate={{
                y: [-2, 2],
                height: ['2rem', '1.5rem'],
              }}
              transition={{
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 0.3,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      </div>
      <div className='relative z-10 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 px-6 py-2 shadow-lg'>
        <span className='text-xl font-bold text-white'>{message.message}</span>
      </div>
    </div>
  );
};

export default Streak;
