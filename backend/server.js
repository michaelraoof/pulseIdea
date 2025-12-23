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
      
      Return ONLY a JSON object with the following structure. Do not use Markdown formatting (no \`\`\`json blocks). Ensure all strings are properly escaped for JSON validation.
      Return ONLY a JSON object with the following structure. Do not use Markdown formatting (no \`\`\`json blocks). Ensure all strings are properly escaped for JSON validation.
      For the Mermaid diagram:
      - Use standard "graph TD".
      - You MUST end every single relationship or node definition with a semicolon (;).
      - You MUST wrap all text labels in double quotes. Example: A["User Name"] --> B{"Login"};
      - Do NOT rely on newlines alone. Use semicolons.
      {
        "improvedIdea": "The refined, detailed text description...",
        "diagram": "graph TD;\\n A[\"User\"] --> B{\"Node\"};\\n B --> C[\"End\"];"
      }
    `;

        const result = await model.generateContent(`${instruction}\n\nRaw Idea: ${prompt}`);
        const response = await result.response;
        const text = response.text();

        // Robust cleanup: finding the JSON object boundaries
        let jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const firstOpen = jsonStr.indexOf('{');
        const lastClose = jsonStr.lastIndexOf('}');

        if (firstOpen !== -1 && lastClose !== -1) {
            jsonStr = jsonStr.substring(firstOpen, lastClose + 1);
        }

        let parsedData;
        try {
            parsedData = JSON.parse(jsonStr);
        } catch (e) {
            console.error("JSON Parse Error on string:", jsonStr);
            // Fallback: If JSON is broken, return the raw text as the idea and an empty diagram
            // This prevents the UI from breaking completely.
            parsedData = {
                improvedIdea: text,
                diagram: ""
            };
        }

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


