# PulseIdea

Transform raw ideas into professional, detailed specifications with AI-powered refinement and visual diagrams.

## 🚀 Features

- **AI-Powered Refinement**: Convert simple ideas into comprehensive project specifications
- **Visual Diagrams**: Automatically generate Mermaid flowcharts and architecture diagrams
- **Interactive UI**: Modern, responsive interface with smooth animations
- **Rich Text Rendering**: Markdown-formatted output with syntax highlighting
- **API Documentation**: Full Swagger/OpenAPI documentation available

## 📚 API Documentation

Interactive API documentation is available at:
**[https://pulse-idea-backend.vercel.app/api-docs/](https://pulse-idea-backend.vercel.app/api-docs/)**

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- TailwindCSS 4
- Motion (Framer Motion)
- Mermaid.js for diagrams
- React Markdown

### Backend
- Node.js + Express
- Google Gemini AI API
- Swagger/OpenAPI documentation
- CORS enabled

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/michaelraoof/pulseIdea.git
   cd pulseIdea
   ```

2. **Install frontend dependencies**
   ```bash
   pnpm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   pnpm install
   ```

4. **Configure environment variables**
   
   **Frontend** - Create `.env` in the root directory:
   ```env
   VITE_API_URL=http://localhost:3000
   ```
   
   **Backend** - Create `backend/.env`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3000
   ```

   Get your Gemini API key from: [Google AI Studio](https://makersuite.google.com/app/apikey)

## 🚀 Running Locally

### Development Mode

1. **Start the backend server**
   ```bash
   cd backend
   pnpm run dev
   ```
   Backend will run on `http://localhost:3000`

2. **Start the frontend** (in a new terminal)
   ```bash
   pnpm run dev
   ```
   Frontend will run on `http://localhost:5173`

3. **Access the application**
   - Frontend: `http://localhost:5173`
   - API Docs: `http://localhost:3000/api-docs`

### Production Build

**Frontend:**
```bash
pnpm run build
pnpm run preview
```

**Backend:**
```bash
cd backend
node server.js
```

## 🌐 Deployment

### Frontend (Vercel)
The frontend is deployed automatically via Vercel when pushing to the main branch.

### Backend (Vercel)
The backend is deployed separately with the root directory set to `backend/`.

**Important**: Set the following environment variable in Vercel:
- `GEMINI_API_KEY`: Your Google Gemini API key

## 📝 Usage

1. Enter your idea in the input field (max 500 characters)
2. Click "Refine Idea"
3. View the refined specification in the "Text" tab
4. Switch to "Diagram" tab to see the visual flowchart
5. Use zoom/pan controls to navigate the diagram
6. Copy the output using the "Copy" button

## 🔑 Key Features Explained

### Input Validation
- Client-side: 500 character limit with live counter
- Server-side: Validation middleware for data integrity

### Markdown Rendering
- Headers, lists, and paragraphs properly formatted
- Bold text highlighted in blue
- Left-aligned for optimal readability

### Diagram Controls
- **Zoom In/Out**: Adjust diagram scale
- **Pan**: Drag to move around
- **Reset**: Return to original view

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.