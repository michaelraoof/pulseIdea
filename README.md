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

## ⚡ Quick Start

1. **Get a Gemini API Key** (Required)
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Click "Create API Key"
   - Copy your key

2. **Clone and Install**
   ```bash
   git clone https://github.com/michaelraoof/pulseIdea.git
   cd pulseIdea
   pnpm install
   cd backend
   pnpm install
   ```

3. **Configure API Key**
   
   Create `backend/.env`:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=3000
   ```
   
   Create `.env` (in root directory for frontend):
   ```env
   VITE_API_URL=http://localhost:3000
   ```
   
   > **Note**: For production deployment, update `VITE_API_URL` to your deployed backend URL.

4. **Run the Application**
   
   Terminal 1 (Backend):
   ```bash
   cd backend
   pnpm run dev
   ```
   
   Terminal 2 (Frontend):
   ```bash
   pnpm run dev
   ```

5. **Open in Browser**
   - Frontend: http://localhost:5173
   - API Docs: http://localhost:3000/api-docs

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