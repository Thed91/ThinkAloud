import { useState, useEffect, useRef } from 'react';
import { MicrophoneButton } from './MicrophoneButton';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

const MAX_MESSAGE_LENGTH = 10000;

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { isListening, transcript, isSupported, startListening, stopListening } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) setMessage(transcript);
  }, [transcript]);

  useEffect(() => {
    if (!isListening) textareaRef.current?.focus();
  }, [isListening]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
    }
  }, [message]);

  const submit = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const canSubmit = message.trim() && !disabled;

  return (
    <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="w-full">
      <div className="chat-input-container">
        {isSupported && (
          <MicrophoneButton
            isListening={isListening}
            onClick={() => isListening ? stopListening() : startListening()}
            disabled={disabled}
          />
        )}

        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); } }}
          placeholder="Ask whatever you want"
          disabled={disabled}
          rows={1}
          maxLength={MAX_MESSAGE_LENGTH}
          className="chat-textarea"
        />

        <button
          type="submit"
          disabled={!canSubmit}
          className="chat-submit-btn"
          style={{ backgroundColor: canSubmit ? '#2b6cb0' : '#1e4b8a' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6"/>
          </svg>
        </button>
      </div>
    </form>
  );
}
