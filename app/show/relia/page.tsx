'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
    Terminal,
    Activity,
    Calendar,
    Mail,
    MessageSquare,
    Linkedin,
    ArrowRight,
    Check,
    Zap,
    Lock
} from 'lucide-react';



const NoiseBackground = () => (
    <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
        <svg width="100%" height="100%">
            <filter id="noiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
    </div>
);

const DitherOrb = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let time = 0;
        let animationFrameId: number;

        const resize = () => {
            canvas.width = 600;
            canvas.height = 600;
        };
        window.addEventListener('resize', resize);
        resize();

        const draw = () => {
            time += 0.01;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = 200;


            const gradient = ctx.createRadialGradient(
                centerX - 50 * Math.cos(time),
                centerY - 50 * Math.sin(time),
                10,
                centerX,
                centerY,
                radius
            );

            gradient.addColorStop(0, '#FFFFFF');
            gradient.addColorStop(0.2, '#A3A3A3');
            gradient.addColorStop(1, '#000000');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fill();



            ctx.globalCompositeOperation = 'source-atop';
            ctx.fillStyle = 'rgba(0,0,0,0.1)';
            for (let i = 0; i < canvas.height; i += 4) {
                if (i % 8 === 0) {
                    ctx.fillRect(0, i, canvas.width, 2);
                }
            }
            ctx.globalCompositeOperation = 'source-over';

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative w-75 h-75 md:w-125 md:h-125"
        >
            <canvas
                ref={canvasRef}
                className="w-full h-full grayscale contrast-125 brightness-90"
            />

            <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full -z-10" />
        </motion.div>
    );
};

const ScrambleText = ({ text, className }: { text: string, className?: string }) => {
    const [displayedText, setDisplayedText] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

    useEffect(() => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplayedText(text
                .split("")
                .map((letter, index) => {
                    if (index < iterations) return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("")
            );
            if (iterations >= text.length) clearInterval(interval);
            iterations += 1 / 3;
        }, 30);
        return () => clearInterval(interval);
    }, [text]);

    return <span className={className}>{displayedText}</span>;
};



const Navbar = () => (
    <nav className="fixed top-0 w-full z-40 bg-zinc-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-white rounded-sm animate-pulse" />
                <span className="text-lg font-bold tracking-tight text-white">RELIA</span>
            </div>
            <div className="hidden md:flex gap-8 text-sm text-zinc-400 font-medium">
                {['Methodology', 'Privacy', 'Manifesto'].map((item) => (
                    <a key={item} href="#" className="hover:text-white transition-colors uppercase tracking-wider text-xs">
                        {item}
                    </a>
                ))}
            </div>
            <button className="text-xs font-bold bg-white text-black px-4 py-2 rounded-sm hover:bg-zinc-200 transition-colors uppercase tracking-wide">
                Login
            </button>
        </div>
    </nav>
);

const Hero = () => {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
            <div className="z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6 flex items-center gap-2 px-3 py-1 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-zinc-300 uppercase tracking-widest font-medium">System Online</span>
                </motion.div>

                <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6 leading-[0.9]">
                    <span className="block text-zinc-500 text-4xl md:text-6xl mb-2 font-normal">Separate signal</span>
                    <ScrambleText text="FROM THE NOISE" />
                </h1>

                <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mb-12 font-light leading-relaxed">
                    Your digital exhaust from Slack, Email, and LinkedIn synthesized into a
                    <span className="text-white font-medium"> single 3-minute intelligence briefing</span>.
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-widest rounded-sm overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Initialize Relia <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-zinc-200 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </motion.button>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-60 mix-blend-screen pointer-events-none">
                <DitherOrb />
            </div>
        </section>
    );
};

const DataStream = () => {
    const icons = [
        { Icon: MessageSquare, label: "Slack" },
        { Icon: Mail, label: "Gmail" },
        { Icon: Linkedin, label: "LinkedIn" },
        { Icon: Calendar, label: "G-Cal" },
        { Icon: Terminal, label: "Jira" },
        { Icon: Activity, label: "Linear" }
    ];

    return (
        <section className="py-24 border-y border-white/5 bg-zinc-900/20 backdrop-blur-sm overflow-hidden">
            <div className="flex w-full">
                <motion.div
                    className="flex gap-24 items-center whitespace-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                >
                    {[...icons, ...icons, ...icons].map((item, i) => (
                        <div key={i} className="group flex items-center gap-4 text-zinc-600 hover:text-white transition-colors cursor-default">
                            <item.Icon className="w-12 h-12 stroke-[1.5]" />
                            <span className="text-2xl font-bold tracking-tight opacity-0 group-hover:opacity-100 transition-opacity -ml-2">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const Synthesis = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
    const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <section ref={ref} className="py-40 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
                <motion.div style={{ opacity }} className="inline-block border-l-2 border-white pl-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">The Synthesis Engine</h2>
                    <p className="text-zinc-400 text-lg">
                        Relia doesn&apos;t just summarize. It builds a graph of your workday, connecting context from a Slack thread to an email attachment and a calendar invite.
                    </p>
                </motion.div>

                <div className="grid gap-4">
                    {[
                        { title: "Cross-Platform", desc: "Unifies silos into a single narrative." },
                        { title: "Context Aware", desc: "Understands urgency and sentiment." },
                        { title: "Private", desc: "Local-first processing. No training." }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className="p-6 bg-zinc-900/50 border border-white/5 rounded-sm hover:border-white/20 transition-colors"
                        >
                            <h3 className="text-white font-bold mb-1">{item.title}</h3>
                            <p className="text-zinc-500 text-sm">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <motion.div style={{ scale }} className="relative h-125 w-full bg-zinc-950 border border-zinc-800 rounded-lg p-8 flex items-center justify-center overflow-hidden">
                {/* Animated Visualization */}
                <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full">
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                <svg className="absolute w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                    <motion.path
                        d="M 100 100 Q 250 250 400 100"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        style={{ pathLength }}
                    />
                    <motion.path
                        d="M 100 400 Q 250 250 400 400"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        style={{ pathLength }}
                    />
                    <motion.circle cx="250" cy="250" r="40" fill="#000" stroke="white" strokeWidth="2" />
                </svg>

                <div className="z-10 bg-black border border-zinc-700 p-6 rounded-md shadow-2xl max-w-xs text-center">
                    <div className="w-8 h-8 bg-white mx-auto mb-4 rounded-sm flex items-center justify-center">
                        <Zap className="w-5 h-5 text-black" />
                    </div>
                    <div className="text-white font-bold mb-2">Insight Generated</div>
                    <div className="text-xs text-zinc-500 font-mono">
                        &quot;Meeting with Q3 team requires review of the Q2 financials sent via Gmail yesterday.&quot;
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

const Features = () => {
    return (
        <section className="py-32 px-6 bg-zinc-900/30">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-4">
                    <span className="w-8 h-px bg-zinc-500"></span> Capabilities
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">

                    <div className="col-span-1 md:col-span-2 row-span-1 md:row-span-1 group relative p-8 bg-zinc-950 border border-zinc-800 hover:border-zinc-600 transition-colors overflow-hidden rounded-sm">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent)] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <Lock className="w-8 h-8 text-zinc-400 mb-4" />
                                <h3 className="text-2xl font-bold text-white">The Vault</h3>
                                <p className="text-zinc-500 mt-2">Enterprise-grade security. SOC-2 compliant. Your data is encrypted at rest and never used for model training.</p>
                            </div>
                            <div className="flex gap-2 mt-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-1 flex-1 bg-zinc-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-white"
                                            initial={{ width: "0%" }}
                                            whileInView={{ width: "100%" }}
                                            transition={{ delay: 0.2 * i, duration: 1 }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                    <div className="group relative p-8 bg-zinc-950 border border-zinc-800 hover:border-zinc-600 transition-colors rounded-sm flex flex-col justify-between">
                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <div>
                            <Activity className="w-8 h-8 text-zinc-400 mb-4" />
                            <h3 className="text-xl font-bold text-white">Sentiment Analysis</h3>
                        </div>
                        <div className="font-mono text-xs text-zinc-500">
                            DETECTED: <span className="text-white">URGENCY_HIGH</span>
                            <br />
                            SOURCE: <span className="text-white">SLACK_DM</span>
                        </div>
                    </div>


                    <div className="group relative p-8 bg-zinc-950 border border-zinc-800 hover:border-zinc-600 transition-colors rounded-sm flex flex-col justify-between">
                        <div>
                            <Calendar className="w-8 h-8 text-zinc-400 mb-4" />
                            <h3 className="text-xl font-bold text-white">Smart Prep</h3>
                        </div>
                        <p className="text-zinc-500 text-sm">Automated meeting dossiers delivered 15 minutes before every call.</p>
                    </div>


                    <div className="col-span-1 md:col-span-2 relative p-8 bg-zinc-950 border border-zinc-800 hover:border-zinc-600 transition-colors rounded-sm flex items-center justify-between group overflow-hidden">
                        <div className="relative z-10 max-w-md">
                            <h3 className="text-2xl font-bold text-white mb-2">Noise Cancellation</h3>
                            <p className="text-zinc-500">Filters out newsletters, bot notifications, and &quot;reply all&quot; chains automatically.</p>
                        </div>
                        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-linear-to-l from-zinc-900 to-transparent flex items-center justify-end px-8">
                            <div className="space-y-2 opacity-50 group-hover:opacity-20 transition-opacity">
                                <div className="w-32 h-2 bg-zinc-700 rounded-full" />
                                <div className="w-24 h-2 bg-zinc-700 rounded-full" />
                                <div className="w-28 h-2 bg-zinc-700 rounded-full" />
                            </div>
                            <div className="absolute right-8 p-3 bg-white text-black rounded-full scale-0 group-hover:scale-100 transition-transform">
                                <Check className="w-6 h-6" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setTimeout(() => setStatus("success"), 1500);
    };

    return (
        <section className="relative py-40 px-6 border-t border-white/10 bg-zinc-950">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-6xl md:text-9xl font-bold text-zinc-900 tracking-tighter mb-12 select-none">
                    RELIA
                </h2>

                <div className="relative z-10">
                    <p className="text-zinc-400 mb-8 text-lg">Reclaim your morning. Join the private beta.</p>

                    <form onSubmit={handleSubmit} className="max-w-md mx-auto relative">
                        <input
                            type="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === "success"}
                            className="w-full bg-transparent border-b-2 border-zinc-800 py-4 text-xl text-white focus:outline-none focus:border-white transition-colors disabled:opacity-50 text-center placeholder:text-zinc-700"
                        />
                        <AnimatePresence>
                            {status === "idle" && (
                                <motion.button
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    type="submit"
                                    className="absolute right-0 top-4 text-white hover:text-zinc-300 uppercase text-xs font-bold tracking-widest"
                                >
                                    Enter
                                </motion.button>
                            )}
                            {status === "loading" && (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="absolute right-0 top-5"
                                >
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                </motion.div>
                            )}
                            {status === "success" && (
                                <motion.div
                                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                                    className="absolute right-0 top-4 text-emerald-500"
                                >
                                    <Check className="w-6 h-6" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>

                    {status === "success" && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className="mt-6 text-emerald-500 font-mono text-sm"
                        >
                            Welcome to the signal.
                        </motion.p>
                    )}
                </div>
            </div>

            <div className="absolute bottom-6 left-0 right-0 flex justify-between px-6 text-xs text-zinc-600 font-mono uppercase">
                <span>© 2024 Relia Systems Inc.</span>
                <span>Systems Nominal</span>
            </div>
        </section>
    );
};



export default function LandingPage() {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });


    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            setCursorPos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-white selection:text-black cursor-none font-sans overflow-x-hidden">
            <NoiseBackground />


            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-100 mix-blend-difference"
                animate={{ x: cursorPos.x - 8, y: cursorPos.y - 8 }}
                transition={{ type: "tween", ease: "backOut", duration: 0 }}
            />
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-100 mix-blend-difference"
                animate={{ x: cursorPos.x - 16, y: cursorPos.y - 16 }}
                transition={{ type: "spring", mass: 0.2, stiffness: 100, damping: 10 }}
            />

            <Navbar />
            <Hero />
            <DataStream />
            <Synthesis />
            <Features />
            <Footer />
        </main>
    );
}