import { useState } from 'react';

interface PromptRefinerResult {
    improvedIdea: string;
    diagram: string;
}

interface UsePromptRefinerProps {
    onRefine?: (original: string, refined: string) => void;
}

/**
 * Custom hook for managing prompt refinement logic
 */
export function usePromptRefiner({ onRefine }: UsePromptRefinerProps = {}) {
    const [input, setInput] = useState('');
    const [refinedPrompt, setRefinedPrompt] = useState('');
    const [diagram, setDiagram] = useState('');
    const [isRefining, setIsRefining] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isRefining) return;

        setIsRefining(true);
        setRefinedPrompt('');
        setDiagram('');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/refine`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: input }),
            });

            if (!response.ok) {
                throw new Error('Failed to refine prompt');
            }

            const data: PromptRefinerResult = await response.json();
            setRefinedPrompt(data.improvedIdea);
            setDiagram(data.diagram);

            onRefine?.(input, data.improvedIdea);
        } catch (error) {
            console.error(error);
            setRefinedPrompt("Sorry, something went wrong while connecting to the AI. Please ensure the backend server is running.");
        } finally {
            setIsRefining(false);
        }
    };

    const handleReset = () => {
        setInput('');
        setRefinedPrompt('');
        setDiagram('');
    };

    return {
        input,
        setInput,
        refinedPrompt,
        diagram,
        isRefining,
        handleSubmit,
        handleReset,
    };
}
