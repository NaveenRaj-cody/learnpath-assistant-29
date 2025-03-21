import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Message } from '@/components/MessageBubble';
import { v4 as uuidv4 } from 'uuid';
import { processMessage } from '@/utils/chatUtils';
import { CourseLevel, SubjectArea } from '@/types/filters';

interface ChatContextType {
  messages: Message[];
  isTyping: boolean;
  sendMessage: (content: string) => void;
  clearChat: () => void;
  courseFilter: {
    level: CourseLevel;
    subject: SubjectArea;
  };
  setCourseFilter: (filter: { level: CourseLevel; subject: SubjectArea }) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      content: "Namaste! I'm your AI Career Assistant for Indian students. I can help you explore courses in Indian universities, find top colleges across India, and discover job opportunities in the Indian market. What would you like to know about today?",
      sender: 'bot',
      timestamp: new Date(),
      status: 'sent'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [courseFilter, setCourseFilter] = useState<{ level: CourseLevel; subject: SubjectArea }>({
    level: 'all',
    subject: 'all'
  });

  const sendMessage = useCallback((content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = processMessage(content, courseFilter);
      
      const botMessage: Message = {
        id: uuidv4(),
        content: response,
        sender: 'bot',
        timestamp: new Date(),
        status: 'sent'
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  }, [courseFilter]);

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: uuidv4(),
        content: "Namaste! I'm your AI Career Assistant for Indian students. I can help you explore courses in Indian universities, find top colleges across India, and discover job opportunities in the Indian market. What would you like to know about today?",
        sender: 'bot',
        timestamp: new Date(),
        status: 'sent'
      }
    ]);
  }, []);

  return (
    <ChatContext.Provider 
      value={{ 
        messages, 
        isTyping, 
        sendMessage, 
        clearChat, 
        courseFilter, 
        setCourseFilter 
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export default ChatContext;
