import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Check, Copy, RotateCcw, FileText, Network } from 'lucide-react';
import mermaid from 'mermaid';

interface PromptRefinerProps {
  onRefine?: (original: string, refined: string) => void;
}

export function PromptRefiner({ onRefine }: PromptRefinerProps) {
  const [input, setInput] = useState('');
  const [refinedPrompt, setRefinedPrompt] = useState('');
  const [diagram, setDiagram] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [viewMode, setViewMode] = useState<'text' | 'diagram'>('text');
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true, theme: 'default' });
  }, []);

  useEffect(() => {
    if (viewMode === 'diagram' && diagram && mermaidRef.current) {
      mermaid.render('mermaid-diagram', diagram).then((result) => {
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = result.svg;
        }
      }).catch(err => {
        console.error("Mermaid rendering failed:", err);
        if (mermaidRef.current) mermaidRef.current.innerText = "Failed to render diagram. Code:\n" + diagram;
      });
    }
  }, [viewMode, diagram]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isRefining) return;

    setIsRefining(true);
    setRefinedPrompt('');
    setDiagram('');
    setCopied(false);
    setViewMode('text'); // Reset to text view on new submission

    try {
      const response = await fetch('http://localhost:3000/api/refine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to refine prompt');
      }

      const data = await response.json();
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

  const handleCopy = async () => {
    const textToCopy = viewMode === 'text' ? refinedPrompt : diagram;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInput('');
    setRefinedPrompt('');
    setDiagram('');
    setCopied(false);
    setViewMode('text');
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <form onSubmit={handleSubmit} className="relative group">
          <motion.div
            animate={{
              boxShadow: isFocused
                ? '0 20px 60px -15px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.1)'
                : '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)'
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/90 backdrop-blur-2xl rounded-[32px] overflow-hidden border border-white/50"
          >
            <div className="relative">
              {/* Subtle gradient overlay on focus */}
              <motion.div
                animate={{
                  opacity: isFocused ? 0.03 : 0
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black pointer-events-none"
              />

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Describe your website idea..."
                className="relative w-full px-8 py-7 bg-transparent resize-none outline-none placeholder:text-gray-400 min-h-[160px] text-lg z-10"
                disabled={isRefining}
              />
            </div>

            <div className="px-8 pb-6 flex items-center justify-between border-t border-gray-100 pt-6 bg-gradient-to-b from-transparent to-gray-50/50">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="p-2 bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-lg"
                >
                  <Sparkles className="w-4 h-4 text-white" strokeWidth={2} />
                </motion.div>
                <span className="font-medium">AI-powered refinement</span>
              </div>

              <motion.button
                type="submit"
                disabled={!input.trim() || isRefining}
                whileHover={{
                  scale: input.trim() && !isRefining ? 1.03 : 1,
                  boxShadow: input.trim() && !isRefining ? "0 10px 30px -5px rgba(0, 0, 0, 0.3)" : "0 0 0 0 rgba(0, 0, 0, 0)"
                }}
                whileTap={{ scale: input.trim() && !isRefining ? 0.97 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="px-8 py-4 bg-gradient-to-b from-gray-900 to-black text-white rounded-full flex items-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed shadow-xl shadow-black/20 relative overflow-hidden group/button"
              >
                {/* Shine effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />

                {isRefining ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="w-5 h-5 relative z-10" strokeWidth={2} />
                    </motion.div>
                    <span className="relative z-10 font-medium">Refining...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10 font-medium">Refine Idea</span>
                    <ArrowRight className="w-5 h-5 relative z-10" strokeWidth={2} />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </form>
      </motion.div>

      {/* Output Section */}
      <AnimatePresence mode="wait">
        {refinedPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Glow effect behind card */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-200 blur-3xl opacity-30 rounded-[32px]" />

            <div className="relative bg-white/90 backdrop-blur-2xl rounded-[32px] border border-white/50 overflow-hidden shadow-2xl shadow-black/10">
              {/* Header */}
              <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-b from-gray-50/80 to-transparent backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-black blur-lg opacity-30 rounded-full" />
                    <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-900 to-black flex items-center justify-center shadow-xl">
                      <Check className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                  </motion.div>
                  <div>
                    <div className="font-semibold text-black">Refined Result</div>
                    <div className="text-sm text-gray-500">Ready to use</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* View Toggles */}
                  <div className="p-1 bg-gray-100 rounded-xl flex items-center gap-1 mr-4">
                    <button
                      onClick={() => setViewMode('text')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'text' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>Text</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setViewMode('diagram')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'diagram' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'}`}
                      disabled={!diagram}
                    >
                      <div className="flex items-center gap-2">
                        <Network className="w-4 h-4" />
                        <span>Diagram</span>
                      </div>
                    </button>
                  </div>

                  <motion.button
                    onClick={handleCopy}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="px-6 py-3 bg-white hover:bg-gray-50 rounded-2xl flex items-center gap-2.5 transition-colors text-sm font-medium shadow-lg shadow-black/5 border border-gray-200/50"
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.div
                          key="copied"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          className="flex items-center gap-2.5"
                        >
                          <Check className="w-4 h-4 text-black" strokeWidth={2} />
                          <span className="text-black">Copied!</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          className="flex items-center gap-2.5"
                        >
                          <Copy className="w-4 h-4" strokeWidth={2} />
                          <span>Copy</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  <motion.button
                    onClick={handleReset}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="px-6 py-3 bg-gradient-to-b from-gray-900 to-black text-white rounded-2xl transition-colors flex items-center gap-2.5 text-sm font-medium shadow-xl shadow-black/20"
                  >
                    <RotateCcw className="w-4 h-4" strokeWidth={2} />
                    <span>New Idea</span>
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="px-8 py-8 max-h-[450px] overflow-y-auto">
                <AnimatePresence mode="wait">
                  {viewMode === 'text' ? (
                    <motion.pre
                      key="text-view"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="whitespace-pre-wrap text-[15px] leading-relaxed text-gray-700 font-sans"
                    >
                      {refinedPrompt}
                    </motion.pre>
                  ) : (
                    <motion.div
                      key="diagram-view"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex justify-center items-center min-h-[200px]"
                    >
                      <div ref={mermaidRef} className="w-full overflow-x-auto flex justify-center" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
