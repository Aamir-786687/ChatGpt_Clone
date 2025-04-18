import { useContext, useRef, useEffect } from "react"
import { ChatContext } from "../Context/ChatContext";
import ChatMessage from "./ChatMessage"
import MessageInput from "./MessageInput"
import TypingIndicator from "./TypingIndicator"
import { Menu } from "lucide-react"

const ChatWindow = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { currentChat, isTyping } = useContext(ChatContext)
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [currentChat, isTyping])

  return (
    <>
      <header className="border-b border-gray-200 dark:border-gray-700 p-4 flex items-center bg-white dark:bg-gray-800">
        <button
          className="md:hidden mr-4 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">ChatGPT</h1>
      </header>

      <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-800">
        {currentChat.messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">How can I help you today?</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              Ask me anything, from creative writing to coding help, explanations, or just casual conversation.
            </p>
          </div>
        ) : (
          <div className="pb-32 pt-4">
            {currentChat.messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="sticky bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white dark:from-gray-800 pt-20">
        <div className="max-w-3xl mx-auto">
          <MessageInput />
        </div>
      </div>
    </>
  )
}

export default ChatWindow
