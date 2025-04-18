export const useChatHistory = () => {
    const STORAGE_KEY = "chatgpt_clone_chats"
  
    // Load chats from localStorage
    const loadChats = () => {
      try {
        const savedChats = localStorage.getItem(STORAGE_KEY)
        return savedChats ? JSON.parse(savedChats) : []
      } catch (error) {
        console.error("Error loading chats from localStorage:", error)
        return []
      }
    }
  
    // Save chats to localStorage
    const saveChats = (chats) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(chats))
      } catch (error) {
        console.error("Error saving chats to localStorage:", error)
      }
    }
  
    return { loadChats, saveChats }
  }
  