# CodeLens 🔍

CodeLens is an AI-powered codebase analysis tool that allows developers to "chat" with their repositories. By leveraging AST-based parsing, vector embeddings, and Retrieval-Augmented Generation (RAG) with Google's Gemini AI, CodeLens provides deep insights and answers complex questions about your code.

## 🚀 Features

- **Repository Indexing**: Clone and index any public GitHub repository.
- **AST-based Parsing**: Deep code analysis using Babel parser for accurate context.
- **Semantic Search**: Vector embeddings for efficient and relevant code retrieval.
- **AI Chat Interface**: Interactive chat powered by Gemini AI to query your codebase.
- **Background Processing**: Robust task management using BullMQ and Redis.
- **Secure Auth**: User authentication with JWT and Bcrypt.
- **Modern Dashboard**: Sleek, responsive UI built with React and Tailwind CSS.

## 🛠️ How It Works

CodeLens follows a sophisticated pipeline to transform raw code into intelligent insights:

1.  **Repository Cloning**: When you add a GitHub URL, CodeLens securely clones the repository to a temporary environment.
2.  **AST-Based Parsing**: Instead of simple text splitting, we use Abstract Syntax Trees (AST) to intelligently identify functions, classes, variables, and their relationships.
3.  **Vector Embeddings**: Every code entity is transformed into a high-dimensional vector embedding using the **Xenova** library, representing the "meaning" of your code.
4.  **Query Embedding**: When you ask a question, we generate a vector embedding for your query using the same model.
5.  **Relevancy Scoring**: We calculate the similarity (cosine similarity) between your query and the code entities to find the most relevant snippets.
6.  **Context Creation**: The top relevant code entities are selected and formatted into a concise context block for the AI.
7.  **AI Explanation**: Finally, the context and your query are passed to **Gemini AI**, which generates a clean, accurate, and context-aware explanation.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/))
- **ORM**: [Prisma](https://www.prisma.io/)
- **AI/ML**: [Google Gemini AI](https://ai.google.dev/), [Xenova Transformers](https://huggingface.co/xenova)
- **Task Queue**: [BullMQ](https://docs.bullmq.io/)
- **Cache/Queue Store**: [Redis](https://redis.io/)

## 🏁 Getting Started

### Prerequisites
- Node.js (v18+)
- Redis server
- PostgreSQL database (or Neon account)
- Google Gemini API Key

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd 19_CodeLens
   ```

2. **Setup Server**:
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory:
   ```env
   DATABASE_URL=your_postgresql_url
   GEMINI_API_KEY=your_gemini_api_key
   REDIS_HOST=localhost
   REDIS_PORT=6379
   JWT_SECRET=your_jwt_secret
   ```
   Initialize Prisma:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Setup Client**:
   ```bash
   cd ../client
   npm install
   ```
   Create a `.env` file in the `client` directory:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

### Running the Application

**Start Backend (Development)**:
```bash
cd server
npm run dev
```

**Start Worker (Background Tasks)**:
```bash
cd server
npm run worker
```

**Start Frontend**:
```bash
cd client
npm run dev
```

## 📁 Project Structure

```text
.
├── client/                # React frontend (Vite)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   └── layouts/       # Page layouts
├── server/                # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── llm/           # Gemini AI integration
│   │   ├── parser/        # AST parsing logic
│   │   ├── queue/         # BullMQ workers & queues
│   │   └── retrieval/     # RAG & embedding logic
└── README.md              # Project documentation
```

## 📄 License

This project is licensed under the MIT License.
