import { useContext, useState } from "react"
import { ThemeContext } from "../Context/ThemeContext"
import { ChatContext } from "../Context/ChatContext"
import { Settings, Sun, Moon, Trash2, X } from "lucide-react"

const SettingsMenu = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const { clearAllChats } = useContext(ChatContext)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 w-full p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <Settings className="h-5 w-5" />
        <span>Settings</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Settings</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <span>Theme</span>
              </div>
              <button onClick={toggleTheme} className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-sm">
                {theme === "dark" ? "Light" : "Dark"}
              </button>
            </div>

            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to clear all chats? This cannot be undone.")) {
                    clearAllChats()
                    setIsOpen(false)
                  }
                }}
                className="flex items-center space-x-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
              >
                <Trash2 className="h-5 w-5" />
                <span>Clear all chats</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SettingsMenu