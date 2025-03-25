import { useEffect, useRef } from "react";
import { Message } from "../../stores/useSocketStore";
import { cn } from "../../utils/cn";

const ChatBody = ({socketMessages}: {socketMessages: Message[]}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const nickName = sessionStorage.getItem('nickname') || '';



    useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [socketMessages]);

  return (
    <div
    ref={messagesContainerRef}
    className='flex-1 overflow-y-auto p-4 flex flex-col-reverse space-y-3 space-y-reverse scrollbar-thin scrollbar-thumb-gray-600'
  >
    {[...socketMessages].reverse().map((message) => (
      console.log(message, nickName,'asadsdasdadasdasd'),
      <div
        key={message.id}
        className={cn('flex flex-col', message.nickName === nickName ? 'items-end' : 'items-start')}
      >
        <div
          className={cn(
            'p-3 rounded-lg max-w-[70%] break-words flex flex-col gap-2',
            message.nickName === nickName ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-200'
          )}
        >
          <p className="text-sm text-gray-400 font-bold ">[{message.nickName}]</p>
          <p className="text-base">{message.message}</p>
        </div>
        <span className='text-xs text-gray-500 mt-1'>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    ))}
  </div>
  )
}

export default ChatBody