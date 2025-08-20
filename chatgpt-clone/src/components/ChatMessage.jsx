import { useContext } from "react"
import { ThemeContext } from "../Context/ThemeContext"
import { User, Bot } from "lucide-react"

const ChatMessage = ({ message }) => {
  const { theme } = useContext(ThemeContext)
  const isUser = message.role === "user" 

  // Function to format message content with basic markdown-like features
  const formatMessage = (content) => {
    // Handle code block
    let formattedContent = content.replace(/```([\s\S]*?)```/g, (match, code) => {
      return `<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto font-mono text-sm"><code>${code}</code></pre>`
    })

    // Handle inline code
    formattedContent = formattedContent.replace(
      /`([^`]+)`/g,
      '<code class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono text-sm">$1</code>',
    )

    // Handle line breaks
    formattedContent = formattedContent.replace(/\n/g, "<br />")

    return formattedContent
  }

  return (
    <div className={`py-6 ${isUser ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700/30"}`}>
      <div className="max-w-3xl mx-auto flex space-x-4 px-4 md:px-8">
        <div className="flex-shrink-0 mt-1">
          {isUser ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
              <User className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#10a37f] flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
          )}
        </div>
        <div className="flex-1 markdown prose dark:prose-invert max-w-none">
          {isUser ? (
            <p className="whitespace-pre-wrap text-gray-900 dark:text-gray-100">{message.content}</p>
          ) : (
            <div 
              className="text-gray-900 dark:text-gray-100"
              dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }} 
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatMessage
