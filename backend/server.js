const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/refine', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const instruction = `
      You are an expert software architect and product manager. 
      Your task is to take a raw app idea and refine it into a professional, detailed specification.
      
      Additionally, create a Mermaid.js flowchart or UML diagram that visualizes the core architecture or user flow of this idea.
      
      Return ONLY a JSON object with the following structure (no markdown formatting around the JSON):
      {
        "improvedIdea": "The refined, detailed text description...",
        "diagram": "The mermaid diagram definition string..."
      }
    `;

        const result = await model.generateContent(`${instruction}\n\nRaw Idea: ${prompt}`);
        const response = await result.response;
        const text = response.text();

        // Clean up potential markdown code blocks if the model ignores "no markdown" instruction
        let jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const parsedData = JSON.parse(jsonStr);

        res.json(parsedData);

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            error: 'Failed to refine prompt',
            message: error.message
        });
    }
});




const server = app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
});


