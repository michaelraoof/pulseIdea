import { PromptRefiner } from "../components/PromptRefiner";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating gradient orbs */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -100, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-gray-200 to-transparent rounded-full blur-3xl opacity-30"
                />
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 100, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-gray-300 to-transparent rounded-full blur-3xl opacity-20"
                />

                {/* Floating sparkle particles */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            y: [0, -100],
                        }}
                        transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.8,
                            ease: "easeOut"
                        }}
                        className="absolute"
                        style={{
                            left: `${10 + i * 12}%`,
                            top: `${20 + (i % 3) * 20}%`,
                        }}
                    >
                        <Sparkles className="w-4 h-4 text-gray-400" strokeWidth={2} />
                    </motion.div>
                ))}
            </div>

            {/* Hero Section */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 relative z-10">
                <div className="w-full max-w-4xl mx-auto space-y-12 text-center">
                    {/* Floating Icon */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1],
                            type: "spring",
                            stiffness: 100
                        }}
                        className="inline-flex items-center justify-center mb-8"
                    >
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-black blur-2xl opacity-20 rounded-full" />
                            <div className="relative w-24 h-24 bg-gradient-to-br from-gray-900 to-black rounded-[28px] shadow-2xl flex items-center justify-center ring-1 ring-white/10">
                                {/* Custom handmade logo - transformation symbol */}
                                <svg
                                    width="48"
                                    height="48"
                                    viewBox="0 0 48 48"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-white"
                                >
                                    {/* Left rough shape - represents rough idea */}
                                    <motion.path
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                        d="M 8 24 L 14 18 L 14 30 L 8 24 Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                    />

                                    {/* Middle transition arrows */}
                                    <motion.path
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
                                        d="M 18 24 L 22 24 M 20 22 L 22 24 L 20 26"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <motion.path
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
                                        d="M 26 24 L 30 24 M 28 22 L 30 24 L 28 26"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />

                                    {/* Right refined shape - represents refined prompt */}
                                    <motion.rect
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
                                        x="34"
                                        y="18"
                                        width="6"
                                        height="12"
                                        rx="1"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        fill="none"
                                    />

                                    {/* Sparkle accents */}
                                    <motion.path
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 1.2, type: "spring", stiffness: 200 }}
                                        d="M 38 12 L 38 14 M 37 13 L 39 13"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        style={{ transformOrigin: "38px 13px" }}
                                    />
                                    <motion.path
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 1.3, type: "spring", stiffness: 200 }}
                                        d="M 42 34 L 42 36 M 41 35 L 43 35"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        style={{ transformOrigin: "42px 35px" }}
                                    />
                                </svg>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="space-y-6"
                    >
                        <div className="flex justify-center mb-2">
                            <span className="px-4 py-1.5 rounded-full bg-black text-white text-sm font-medium tracking-wide shadow-lg shadow-black/20">
                                Pulse Idea
                            </span>
                        </div>
                        <h1 className="text-6xl md:text-7xl font-semibold tracking-tight text-black leading-tight">
                            Turn Ideas into
                            <br />
                            Clear Requirements
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Transform rough website concepts into professional,
                            <br className="hidden md:block" />
                            detailed specifications and architectural flowcharts.
                        </p>
                    </motion.div>

                    {/* Prompt Refiner Component */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="pt-4"
                    >
                        <PromptRefiner />
                    </motion.div>

                    {/* Footer Info with premium badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="pt-12 flex flex-wrap justify-center gap-4 text-sm"
                    >
                        {[
                            { label: "AI Architect", delay: 0 },
                            { label: "Mermaid Diagrams", delay: 0.1 },
                            { label: "Instant Specs", delay: 0.2 }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.7 + item.delay,
                                    type: "spring",
                                    stiffness: 200
                                }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                className="flex items-center gap-2.5 px-5 py-3 bg-white/80 backdrop-blur-xl rounded-full shadow-lg shadow-black/5 border border-gray-200/50"
                            >
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.3
                                    }}
                                    className="w-2 h-2 bg-black rounded-full"
                                />
                                <span className="text-gray-700 font-medium">{item.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
