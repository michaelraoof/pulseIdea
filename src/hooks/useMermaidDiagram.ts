import { useState, useEffect } from 'react';
import mermaid from 'mermaid';

/**
 * Custom hook for managing Mermaid diagram rendering
 */
export function useMermaidDiagram(diagram: string, viewMode: 'text' | 'diagram') {
    const [mermaidContainer, setMermaidContainer] = useState<HTMLDivElement | null>(null);
    const [mermaidId] = useState(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

    // Initialize Mermaid on mount
    useEffect(() => {
        mermaid.initialize({
            startOnLoad: false,
            theme: 'default',
            securityLevel: 'loose',
        });
    }, []);

    // Render diagram when container, diagram, or view mode changes
    useEffect(() => {
        if (mermaidContainer && diagram && viewMode === 'diagram') {
            // Sanitize diagram: remove comments and ensure newlines after semicolons
            const sanitizedDiagram = diagram
                .replace(/\/\*[\s\S]*?\*\//g, '')
                .replace(/;(?=\S)/g, ';\n')
                .trim();

            console.log("Starting render for ID:", mermaidId);

            // Show loading state
            mermaidContainer.innerHTML = '<div class="flex items-center gap-2 text-gray-400 p-4"><div class="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div><span>Rendering...</span></div>';

            (async () => {
                try {
                    const renderId = mermaidId + '-svg';
                    const result = await mermaid.render(renderId, sanitizedDiagram);

                    if (mermaidContainer) {
                        mermaidContainer.innerHTML = result.svg;
                        const svg = mermaidContainer.querySelector('svg');
                        if (svg) {
                            svg.setAttribute('width', '100%');
                            svg.setAttribute('height', 'auto');
                            svg.style.maxWidth = '100%';
                        }
                    }
                } catch (err) {
                    console.error("Mermaid Render Error:", err);
                    if (mermaidContainer) {
                        mermaidContainer.innerHTML = `<div class="text-red-500 p-4 font-mono text-sm bg-red-50 rounded-lg border border-red-100">
              <strong>Render Failed</strong><br/>
              ${err instanceof Error ? err.message : String(err)}
            </div>`;
                    }
                }
            })();
        }
    }, [mermaidContainer, diagram, viewMode, mermaidId]);

    return { mermaidContainer: setMermaidContainer, mermaidId };
}
