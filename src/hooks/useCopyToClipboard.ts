import { useState } from 'react';

/**
 * Custom hook for copying text to clipboard with temporary feedback state
 */
export function useCopyToClipboard() {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
        }
    };

    return { copied, copyToClipboard };
}
