import { useState, useContext, useRef, useEffect } from "react"
import { ChatContext } from "../Context/ChatContext"
import { Send } from "lucide-react"

const MessageInput = () => {
  const [message, setMessage] = useState("")
  const { sendMessage, isTyping } = useContext(ChatContext)
  const textareaRef = useRef(null)

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [message])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = message.trim()
    if (trimmed && !isTyping) {
      sendMessage(trimmed)
      setMessage("")

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(0,0,0,0.2)]">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message ChatGPT..."
          className="w-full resize-none bg-transparent px-4 py-3.5 outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-900 dark:text-gray-100"
          rows={1}
          style={{ maxHeight: "200px" }}
          disabled={isTyping}
        />
        <div className="absolute right-3 bottom-8">
          <button
            type="submit"
            disabled={!message.trim() || isTyping}
            className={`p-1.5 rounded-md transition ${
              message.trim() && !isTyping
                ? "text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-[#10a37f] dark:hover:text-[#10a37f]"
                : "text-gray-300 dark:text-gray-600 cursor-not-allowed"
            }`}
          >
            <Send className=" h-2s w-5" />
          </button>
        </div>
      </div>
      <p className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400">
        ChatGPT can make mistakes. Consider checking important information.
      </p>
    </form>
  )
}

export default MessageInput
