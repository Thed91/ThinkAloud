interface MicrophoneButtonProps {
  isListening: boolean;
  onClick: () => void;
  disabled: boolean;
}

export function MicrophoneButton({ isListening, onClick, disabled }: MicrophoneButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={isListening ? 'animate-pulse' : ''}
      style={{
        color: isListening ? '#EF4444' : '#6a85a8',
        padding: '0 8px 0 16px',
        background: 'none',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
      title={isListening ? 'Stop recording' : 'Start voice recording'}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 2.34 9 5v6c0 1.66 1.34 3 3 3z"/>
        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
      </svg>
    </button>
  );
}
