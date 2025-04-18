import { useContext } from "react"
import { ThemeContext } from "../Context/ThemeContext"
import { Bot } from "lucide-react"

const TypingIndicator = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <div className="py-5 bg-gray-50 dark:bg-gray-700/30">
      <div className="max-w-3xl mx-auto flex space-x-4 px-4 md:px-8">
        <div className="flex-shrink-0 mt-1">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex space-x-2">
            <div
              className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TypingIndicator
