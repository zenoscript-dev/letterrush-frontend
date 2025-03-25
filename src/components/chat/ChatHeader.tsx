
export const ChatHeader = ({randomWord, handleLeaveRoom}: {randomWord: string, handleLeaveRoom: () => void}) => {
  return (
    <div className='flex justify-between items-center pb-4 border-b border-gray-700'>
            <div className='flex-1'></div>
            <div className='text-lg'>
              Type: <span className='text-purple-400'>{randomWord ? randomWord: ''}</span>
            </div>
            <div className='flex-1 flex justify-end'>
              <button
                onClick={handleLeaveRoom}
                className='text-gray-400 hover:text-red-500 transition-colors duration-200 flex items-center gap-2'
                title='Leave Room'
              >
                <span>Leave Game</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
  )
}
