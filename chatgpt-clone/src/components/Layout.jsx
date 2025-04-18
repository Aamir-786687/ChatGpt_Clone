import { ThemeProvider } from "../Context/ThemeContext"
import { ChatProvider } from "../Context/ChatContext"

export default function Layout({ children }) {
  return (
    <ThemeProvider>
      <ChatProvider>
        {children}
      </ChatProvider>
    </ThemeProvider>
  )
} 