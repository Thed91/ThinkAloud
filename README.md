# ThinkAloud

AI-powered chat application with voice input support. Built with React and .NET.

## Features

- Chat interface with Google Gemini AI
- Voice input using Web Speech API
- Auto-expanding text input
- Dark blue theme
- Real-time typing indicators

## Tech Stack

**Frontend:**
- React 19
- TypeScript
- Vite
- Tailwind CSS 4

**Backend:**
- .NET 10
- ASP.NET Core Web API
- Google Gemini API

## Getting Started

### 1. Configure the backend

Create or update `ThinkAloud/appsettings.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "Gemini": {
    "ApiKey": "YOUR_GEMINI_API_KEY",
    "Model": "gemini-2.5-flash"
  }
}
```

### 3. Run the backend

```bash
cd ThinkAloud
dotnet run
```

The API will be available at `https://localhost:7063`.

### 4. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Project Structure

```
ThinkAloud/
├── ThinkAloud/                 # Backend (.NET)
│   ├── Controllers/
│   │   └── ChatController.cs
│   ├── Models/
│   │   ├── ChatRequest.cs
│   │   └── ChatResponse.cs
│   ├── Services/
│   │   ├── IChatService.cs
│   │   └── GeminiChatService.cs
│   ├── Program.cs
│   └── appsettings.json
│
└── frontend/                   # Frontend (React)
    └── src/
        ├── components/
        │   ├── ChatInput.tsx
        │   ├── ChatMessages.tsx
        │   └── MicrophoneButton.tsx
        ├── hooks/
        │   └── useSpeechRecognition.ts
        ├── services/
        │   └── api.ts
        ├── types/
        │   └── index.ts
        ├── App.tsx
        └── index.css
```

## Voice Input

Voice input uses the Web Speech API and is supported in Chrome, Edge, and Safari. The microphone button appears automatically in supported browsers.

Speech recognition:
- Auto-stops after 3 seconds of silence
- Continuous mode for longer phrases

## API Endpoints

### POST /api/chat

Send a message to the AI.

**Request:**
```json
{
  "message": "Hello, how are you?"
}
```

**Response:**
```json
{
  "response": "I'm doing well, thank you for asking!",
  "success": true
}
```

## License

MIT
