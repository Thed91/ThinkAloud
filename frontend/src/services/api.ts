import type { ChatResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:7063/api';

export async function sendMessage(message: string): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    return {
      response: '',
      success: false,
      error: errorData.error || `HTTP error: ${response.status}`,
    };
  }

  return response.json();
}
