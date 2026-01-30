import { useEffect, useRef } from 'react';
import type { ChatMessage } from '../types';

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto space-y-4 py-4 min-h-0">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div
            className="max-w-[80%] px-4 py-3 rounded-2xl text-white whitespace-pre-wrap"
            style={{ backgroundColor: msg.role === 'user' ? '#2b6cb0' : '#0f3057' }}
          >
            {msg.content}
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div className="rounded-2xl px-4 py-3 flex items-center gap-2" style={{ backgroundColor: '#0f3057' }}>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#6a85a8' }} />
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#6a85a8', animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#6a85a8', animationDelay: '300ms' }} />
            </div>
            <span className="text-sm" style={{ color: '#b0c4de' }}>Thinking...</span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
