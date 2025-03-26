import { Message } from "../../../stores/useSocketStore"

const WordDidNotMatchMessage = ({message}: {message: Message}) => {
  return (
    <div className="p-3 rounded-lg bg-gradient-to-r from-red-600 to-rose-700 text-white max-w-[70%]">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-rose-200 font-bold">❌ Word Did Not Match!</p>
        <p className="text-base font-medium">
          {message.message} <span className="text-sm text-rose-200">-50</span>
        </p>
      </div>
    </div>
  )
}

export default WordDidNotMatchMessage
