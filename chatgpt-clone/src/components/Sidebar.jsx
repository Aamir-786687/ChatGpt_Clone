import { useContext } from "react"
import { ChatContext } from "../Context/ChatContext"
import SettingsMenu from "./SettingsMenu"
import { PlusCircle, MessageSquare, X } from "lucide-react"

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { chats, currentChatId, startNewChat, selectChat } = useContext(ChatContext)

  // Format date to show in a readable format
  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  // Get first line of chat for preview
  const getChatPreview = (messages) => {
    if (messages.length === 0) return "New chat"
    const firstUserMessage = messages.find((msg) => msg.role === "user")
    if (!firstUserMessage) return "New chat"

    // Truncate message if it's too long
    const preview = firstUserMessage.content
    return preview.length > 30 ? preview.substring(0, 30) + "..." : preview
  }

  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed h-screen md:relative inset-y-0 left-0 z-50 
          w-80 bg-gray-50 dark:bg-gray-900 
          flex flex-col border-r border-gray-200 dark:border-gray-700
          transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Mobile close button */}
        <button className="absolute top-4 right-4 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <X className="h-6 w-6" />
        </button>

        {/* New chat button */}
        <div className="p-4">
          <button
            onClick={startNewChat}
            className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-md transition-colors"
          >
            <PlusCircle className="h-5 w-5" />
            <span>New chat</span>
          </button>
        </div>

        {/* Chat history */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-2 py-2">
            <h2 className="px-2 mb-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Chat History</h2>
            <ul className="space-y-1">
              {chats.map((chat) => (
                <li key={chat.id}>
                  <button
                    onClick={() => selectChat(chat.id)}
                    className={`
                      w-full text-left px-3 py-2 rounded-md flex items-start space-x-3
                      ${
                        currentChatId === chat.id
                          ? "bg-gray-200 dark:bg-gray-700"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }
                    `}
                  >
                    <MessageSquare className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate">{getChatPreview(chat.messages)}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatDate(chat.timestamp)}</p>
                    </div>
                  </button>
                </li>
              ))}

              {chats.length === 0 && (
                <li className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">No chat history yet</li>
              )}
            </ul>
          </div>
        </div>

        {/* Settings */}
        <div className="p-2 border-t border-gray-200 dark:border-gray-700">
          <SettingsMenu />
        </div>
      </aside>
    </>
  )
}

export default Sidebar
