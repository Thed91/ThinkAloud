# ThinkAloud

AI-powered chat application with voice input support. Built with React and .NET.

**Live Demo:** [https://thinkaloud-ui.onrender.com/](https://thinkaloud-ui.onrender.com/)

> **Note:** This project is deployed on Render's free tier, so the first request after a period of inactivity may take up to 1 minute while the server wakes up. Please be patient.

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
- .NET 9
- ASP.NET Core Web API
- Google Gemini API

## Getting Started

### Local Development

#### 1. Configure the backend

Create `ThinkAloud/appsettings.json`:

```json
"Gemini": {
"ApiKey": "YOUR_GEMINI_API_KEY",
"Model": "gemini-2.5-flash"
},
```

#### 2. Run the backend

```bash
cd ThinkAloud
dotnet run
```

The API will be available at `https://localhost:7063`.

#### 3. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

### Docker

#### Using Docker Compose

1. Create `.env` file:

```bash
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

2. Run:

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000
- API: http://localhost:8080

## Project Structure

```
ThinkAloud/
├── Dockerfile                  # Backend Dockerfile
├── docker-compose.yml
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
    ├── src/
    │   ├── components/
    │   ├── hooks/
    │   ├── services/
    │   ├── types/
    │   ├── App.tsx
    │   └── index.css
    ├── Dockerfile
    └── nginx.conf
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
