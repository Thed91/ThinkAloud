import { useState } from 'react';
import { ChatInput, ChatMessages } from './components';
import type { ChatMessage } from './types';
import { sendMessage } from './services/api';

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async (content: string) => {
    setError(null);
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'user', content }]);
    setIsLoading(true);

    try {
      const response = await sendMessage(content);
      if (response.success) {
        setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'assistant', content: response.response }]);
      } else {
        setError(response.error || 'An error occurred');
      }
    } catch {
      setError('Unable to connect to the server');
    } finally {
      setIsLoading(false);
    }
  };

  const hasMessages = messages.length > 0 || isLoading;

  return (
    <div className="flex flex-col h-screen bg-gradient-main overflow-hidden">
      <main className="flex-1 flex flex-col max-w-3xl w-full mx-auto px-6 py-8 min-h-0">
        {!hasMessages ? (
          <div className="flex-1 flex flex-col justify-center">
            <div
              className="w-12 h-12 flex items-center justify-center mb-8"
              style={{ backgroundColor: '#1e4b8a', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
            >
              <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              </svg>
            </div>

            <h2 className="text-white text-xl font-semibold mb-2">Hi there!</h2>
            <h1 className="text-white text-4xl font-bold mb-4" style={{ lineHeight: 1.2 }}>
              What would you like to know?
            </h1>
            <p className="mb-10" style={{ color: '#b0c4de' }}>
              Use one of the most common prompts below or ask your own question
            </p>

            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
          </div>
        ) : (
          <div className="flex-1 flex flex-col min-h-0">
            <ChatMessages messages={messages} isLoading={isLoading} />
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-500 text-red-200 rounded-xl">
            <p className="text-sm">{error}</p>
            <button onClick={() => setError(null)} className="text-xs underline mt-1 hover:text-red-100">
              Close
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
