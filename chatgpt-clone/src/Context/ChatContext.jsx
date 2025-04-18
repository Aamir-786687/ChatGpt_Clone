"use client"

import { createContext, useState, useContext, useCallback, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { sendMessage as apiSendMessage } from "../services/api"

export const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([])
  const [currentChatId, setCurrentChatId] = useState(null)
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState(null)

  // Load chats from local storage on initial render
  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem('chats') || '[]')
    if (savedChats.length > 0) {
      setChats(savedChats)
      setCurrentChatId(savedChats[0].id)
    } else {
      // Create a new chat if none exist
      const newChat = createNewChat()
      setChats([newChat])
      setCurrentChatId(newChat.id)
    }
  }, [])

  // Save chats to local storage whenever they change
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('chats', JSON.stringify(chats))
    }
  }, [chats])

  // Helper to create a new chat object
  const createNewChat = () => {
    return {
      id: uuidv4(),
      timestamp: Date.now(),
      messages: [],
    }
  }

  // Get the current chat object
  const currentChat = chats.find((chat) => chat.id === currentChatId) || { messages: [] }

  // Start a new chat
  const startNewChat = useCallback(() => {
    const newChat = createNewChat()
    setChats((prev) => [newChat, ...prev])
    setCurrentChatId(newChat.id)
    setError(null)
  }, [])

  // Select a chat
  const selectChat = useCallback((id) => {
    setCurrentChatId(id)
    setError(null)
  }, [])

  // Delete a chat
  const deleteChat = useCallback((id) => {
    setChats((prev) => prev.filter((chat) => chat.id !== id))
    if (currentChatId === id) {
      const remainingChats = chats.filter((chat) => chat.id !== id)
      if (remainingChats.length > 0) {
        setCurrentChatId(remainingChats[0].id)
      } else {
        const newChat = createNewChat()
        setChats([newChat])
        setCurrentChatId(newChat.id)
      }
    }
  }, [chats, currentChatId])

  // Send a message
  const sendMessage = useCallback(async (content) => {
    if (!currentChatId) {
      startNewChat()
    }

    const userMessage = {
      role: "user",
      content,
      timestamp: Date.now(),
    }

    // Update chat with user message
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: [...chat.messages, userMessage],
              timestamp: Date.now(),
            }
          : chat
      )
    )

    setIsTyping(true)
    setError(null)

    try {
      const response = await apiSendMessage(content)
      
      const assistantMessage = {
        role: "assistant",
        content: response.message || response,
        timestamp: Date.now(),
      }

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: [...chat.messages, assistantMessage],
              }
            : chat
        )
      )
    } catch (err) {
      setError(err.message)
    } finally {
      setIsTyping(false)
    }
  }, [chats, currentChatId, startNewChat])

  // Clear all chats
  const clearAllChats = useCallback(() => {
    const newChat = createNewChat()
    setChats([newChat])
    setCurrentChatId(newChat.id)
  }, [])

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChat,
        currentChatId,
        isTyping,
        error,
        startNewChat,
        selectChat,
        deleteChat,
        sendMessage,
        clearAllChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
