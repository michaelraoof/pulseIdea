const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'PulseIdea API',
            version: '1.0.0',
            description: 'API for refining ideas and generating Mermaid diagrams using Google Gemini.',
        },
        servers: [
            {
                url: process.env.NODE_ENV === 'production' ? 'https://pulse-idea-backend.vercel.app' : `http://localhost:${process.env.PORT || 3000}`,
                description: 'API Server',
            },
        ],
    },
    apis: [path.join(__dirname, './server.js')], // Scans server.js for JSDoc annotations
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
