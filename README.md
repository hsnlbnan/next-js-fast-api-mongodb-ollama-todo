# Next.js + FastAPI Todo Application

A modern todo application built with Next.js for the frontend and FastAPI for the backend. The application features real-time updates, AI-powered task summarization, and a clean, responsive interface.

![Nextjs + Fastapi Todo](https://github.com/user-attachments/assets/1e8475c7-665a-49fb-8901-fe2b3bae8f54)

## Features

- ✨ Modern, responsive UI built with Next.js
- 🚀 Fast and efficient FastAPI backend
- 🤖 AI-powered task summarization
- 🎨 Dark mode support
- ⚡ Real-time updates
- 🔄 Optimistic UI updates

## Tech Stack

### Frontend
- Next.js 15.0.3
- React 19
- TypeScript
- Tailwind CSS
- Lucide Icons

### Backend
- FastAPI
- MongoDB
- Python 3.11+
- Motor (async MongoDB driver)

## Prerequisites

- Node.js 18+ 
- Python 3.11+
- MongoDB instance
- pnpm (recommended) or npm
- Python virtual environment

## Installation

1. Clone the repository:

```bash
git clone https://github.com/hsnlbnan/next-js-fast-api-mongodb-ollama-todo.git
cd next-js-fast-api-mongodb-ollama-todo
```

2. Install frontend dependencies:
```bash
pnpm install
```

3. Set up Python virtual environment:
```bash
python -m venv myenv
source myenv/bin/activate  # On Windows: myenv\Scripts\activate
pip install -r requirements.txt
```

4. Create a `.env` file in the root directory:
```env
MONGO_DB_CLUSTER=your_mongodb_connection_string
```

5. Start the development server:
```bash
pnpm dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Documentation: http://localhost:8000/api/docs

## Project Structure

```
├── app/                    # Next.js application
│   ├── actions/           # Server actions
│   ├── api/              # Backend API
│   ├── components/       # React components
│   ├── config/          # Configuration files
│   ├── hooks/           # Custom React hooks
│   └── types/           # TypeScript types
├── public/               # Static files
└── myenv/               # Python virtual environment
```

## Development

- Frontend development server: `pnpm next-dev`
- Backend development server: `pnpm fastapi-dev`
- Both servers concurrently: `pnpm dev`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
