import { Message } from "../../../stores/useSocketStore"

const WordMatchMessage = ({message}: {message: Message}) => {
  return (
    <div className="p-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-700 text-white max-w-[70%]">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-emerald-200 font-bold">🎯 Word Match!</p>
        <p className="text-base font-medium">
          {message.message} <span className="text-sm text-emerald-200">+100</span>
        </p>
      </div>
    </div>
  )
}

export default WordMatchMessage