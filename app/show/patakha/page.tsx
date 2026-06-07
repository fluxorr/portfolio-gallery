"use client";

import React from "react";
import { motion } from "motion/react";
import { Sparkles, Flame, Zap, ArrowRight, Smile, Heart, Star, CloudLightning, ShieldAlert } from "lucide-react";
import Link from "next/link";

const bgCream = "bg-[#FFF9E6]";
const autoYellow = "bg-[#FFC700]";
const raniPink = "bg-[#FF0055]";
const paanGreen = "bg-[#00A859]";
const inkBlue = "bg-[#3D00FF]";
const firozi = "bg-[#00E5FF]";

const brutalShadow = "shadow-[8px_8px_0px_#000] border-4 border-black";
const brutalShadowSm = "shadow-[4px_4px_0px_#000] border-2 border-black";
const brutalShadowLg = "shadow-[12px_12px_0px_#000] border-4 border-black";
const brutalHoverLg = "hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[8px_8px_0px_#000] transition-all active:translate-x-[12px] active:translate-y-[12px] active:shadow-[0px_0px_0px_#000]";
const brutalHoverSm = "hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000] transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_#000]";

const springConfig = { type: "spring" as const, stiffness: 300, damping: 20 };


const Marquee = ({ items, speed = 20 }: { items: string[], speed?: number }) => (
    <div className={`w-full overflow-hidden flex border-y-4 border-black ${autoYellow} py-3 relative z-10 -rotate-2 scale-105`}>
        <motion.div
            className="flex whitespace-nowrap gap-8 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: speed, repeat: Infinity }}
        >
            {[...items, ...items, ...items, ...items].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-black font-black text-xl tracking-widest uppercase">
                    <span>{item}</span>
                    <Star className="w-5 h-5 fill-black" />
                </div>
            ))}
        </motion.div>
    </div>
);

// Jiggle element on load
const Jiggle = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
    <motion.div
        initial={{ rotate: -5, scale: 0.9 }}
        animate={{ rotate: [5, -5, 3, -3, 0], scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: delay }}
    >
        {children}
    </motion.div>
);

export default function PatakhaPage() {
    return (
        <div className={`min-h-screen ${bgCream} text-black font-sans selection:bg-black selection:text-white overflow-x-hidden relative`}>


            <div className="absolute inset-0 pointer-events-none opacity-5 z-0" style={{ backgroundImage: "radial-gradient(circle at center, black 1px, transparent 1px)", backgroundSize: "16px 16px" }}></div>

            <nav className={`fixed top-0 inset-x-0 h-20 z-50 flex items-center justify-between px-6 md:px-12 border-b-4 border-black ${bgCream}`}>
                <div className="flex items-center gap-2 group">
                    <div className={`w-10 h-10 ${raniPink} rounded-full ${brutalShadowSm} flex items-center justify-center group-hover:rotate-180 transition-transform duration-500`}>
                        <Flame className="w-5 h-5 text-white fill-white" />
                    </div>
                    <span className="font-black text-2xl tracking-tighter uppercase mt-1">PATAKHA</span>
                </div>

                <div className="hidden md:flex items-center gap-8 font-bold uppercase tracking-wide">
                    <Link href="#features" className="hover:underline decoration-4 underline-offset-4">Features</Link>
                    <Link href="#pricing" className="hover:underline decoration-4 underline-offset-4">Pricing</Link>
                    <Link href="#testimonials" className="hover:underline decoration-4 underline-offset-4">Wall of Love</Link>
                </div>

                <button className={`hidden sm:flex px-6 py-2 ${paanGreen} text-white font-bold uppercase tracking-wider ${brutalShadowSm} ${brutalHoverSm}`}>
                    Get Started
                </button>
            </nav>


            <main className="w-full max-w-7xl mx-auto px-6 pt-32 pb-20 z-10 relative flex flex-col items-center text-center">

                <div className="relative inline-block mt-12 mb-8">
                    <Jiggle delay={0.2}>
                        <div className={`px-4 py-2 ${autoYellow} ${brutalShadowSm} font-black text-sm uppercase tracking-widest inline-flex items-center gap-2 -rotate-3`}>
                            <Sparkles className="w-4 h-4 fill-black" />
                            Global Scale, Local Soul.
                        </div>
                    </Jiggle>

                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-10 -right-16 md:-top-16 md:-right-24 z-0 text-black"
                    >
                        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 0L61.8034 38.1966H100L69.0983 60.657L80.9017 98.8536L50 76.3932L19.0983 98.8536L30.9017 60.657L0 38.1966H38.1966L50 0Z" fill="#00E5FF" stroke="black" strokeWidth="4" />
                        </svg>
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 1, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.5 }}
                        className="absolute top-20 -left-32 md:-left-48 lg:-left-64 hidden sm:block"
                    >
                        <div className={`w-24 h-24 rounded-full ${inkBlue} ${brutalShadow} border-black border-4 flex items-center justify-center animate-bounce shadow-xl`}>
                            <CloudLightning className="w-10 h-10 text-white" />
                        </div>
                    </motion.div>


                </div>

                <motion.h1
                    initial={{ y: 50, opacity: 1 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-6xl sm:text-8xl md:text-[9rem] font-black uppercase tracking-tighter leading-[0.85] text-balance mb-6 relative z-10"
                >
                    Out of this <br className="hidden md:block" />
                    <span className="relative inline-block">
                        <span className="relative z-10 text-white" style={{ WebkitTextStroke: "4px black" }}>WORLD</span>
                        <div className={`absolute inset-x-0 bottom-2 md:bottom-6 h-6 md:h-12 ${raniPink} -z-10 -rotate-2 border-y-4 border-black`} />
                    </span> Design.
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 1 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xl sm:text-3xl font-bold max-w-3xl mt-8 mb-12 text-balance"
                >
                    Butter-smooth. The only platform built for absolute scale, speed, and <span className={`inline-block px-2 ${firozi} border-2 border-black -rotate-2 ml-1`}>creative freedom.</span>
                </motion.p>

                <motion.div
                    initial={{ scale: 0.8, opacity: 1 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-6 relative z-20"
                >
                    <button className={`px-10 py-5 text-xl sm:text-2xl font-black uppercase tracking-wider text-white ${inkBlue} ${brutalShadowLg} ${brutalHoverLg} flex items-center justify-center gap-3 group`}>
                        Start Creating
                        <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                    </button>
                    <button className={`px-10 py-5 text-xl sm:text-2xl font-black uppercase tracking-wider bg-white ${brutalShadowLg} ${brutalHoverLg} flex items-center justify-center gap-3`}>
                        Watch Demo
                    </button>
                </motion.div>

            </main>


            <div className="mt-10 mb-32 z-20 relative">
                <Marquee items={["No Limits", "Pure Impact", "Flawless UX", "Stand Out", "Killer Analytics"]} />
            </div>


            <section id="features" className="w-full max-w-6xl mx-auto px-6 py-20">
                <div className="text-center mb-16 relative">
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter inline-block relative">
                        Features on <span className={`${autoYellow} px-4 border-4 border-black shadow-[4px_4px_0px_#000] rotate-2 inline-block`}>Fire</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    <div className={`col-span-1 md:col-span-2 lg:col-span-2 p-8 ${firozi} ${brutalShadowLg} flex flex-col justify-between group hover:-translate-y-2 transition-transform relative overflow-hidden`}>
                        <div className="absolute -right-10 -bottom-10 opacity-20 group-hover:scale-110 transition-transform duration-500">
                            <CloudLightning className="w-64 h-64 text-black" strokeWidth={1} />
                        </div>
                        <div className={`w-16 h-16 bg-white border-4 border-black ${brutalShadowSm} rounded-full flex items-center justify-center mb-12 relative z-10`}>
                            <Zap className="w-8 h-8 fill-black" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-4xl font-black uppercase mb-4">Instant Payouts</h3>
                            <p className="text-xl font-bold font-mono">Get paid instantly via UPI. No waiting for 3 business days. Money direct to bank, blazingly fast.</p>
                        </div>
                    </div>


                    <div className={`col-span-1 p-8 ${raniPink} text-white ${brutalShadowLg} flex flex-col justify-between group hover:-translate-y-2 transition-transform`}>
                        <div className={`w-16 h-16 bg-white border-4 border-black ${brutalShadowSm} rounded-full flex items-center justify-center mb-12`}>
                            <Heart className="w-8 h-8 text-black fill-black" />
                        </div>
                        <div>
                            <h3 className="text-4xl font-black uppercase mb-4 line-clamp-2">Built with Love</h3>
                            <p className="text-lg font-bold font-mono">Designed for scale. Works perfectly regardless of network.</p>
                        </div>
                    </div>


                    <div className={`col-span-1 p-8 bg-white ${brutalShadowLg} flex flex-col justify-between group hover:-translate-y-2 transition-transform`}>
                        <div className={`w-16 h-16 ${autoYellow} border-4 border-black ${brutalShadowSm} rounded-full flex items-center justify-center mb-12`}>
                            <ShieldAlert className="w-8 h-8 text-black" />
                        </div>
                        <div>
                            <h3 className="text-4xl font-black uppercase mb-4">Zero Friction</h3>
                            <p className="text-lg font-bold font-mono">No complicated dashboards. One page for everything. You just focus on creation.</p>
                        </div>
                    </div>


                    <div className={`col-span-1 md:col-span-2 lg:col-span-2 p-8 ${paanGreen} text-white ${brutalShadowLg} flex flex-col md:flex-row items-center justify-between group hover:-translate-y-2 transition-transform relative overflow-hidden`}>
                        <div className="relative z-10 md:w-2/3">
                            <div className={`w-16 h-16 bg-white border-4 border-black ${brutalShadowSm} rounded-full flex items-center justify-center mb-8`}>
                                <Smile className="w-8 h-8 text-black" />
                            </div>
                            <h3 className="text-4xl font-black uppercase mb-4">Killer Analytics</h3>
                            <p className="text-xl font-bold font-mono">Data views so sharp they cut through the noise. Know exactly where your audience is from.</p>
                        </div>

                        <div className="mt-8 md:mt-0 w-full md:w-1/3 flex items-end justify-center gap-2 h-32 relative z-10 px-4">
                            <div className="w-1/4 bg-black h-1/3 border-2 border-white group-hover:h-1/2 transition-all duration-500"></div>
                            <div className="w-1/4 bg-white h-2/3 border-2 border-black group-hover:h-4/5 transition-all duration-500"></div>
                            <div className={`w-1/4 ${autoYellow} h-full border-2 border-black group-hover:h-full transition-all duration-500`}></div>
                        </div>
                    </div>
                </div>
            </section>


            <section className={`w-full py-24 ${inkBlue} border-y-4 border-black text-white relative flex flex-col items-center justify-center my-20`}>
                <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, bg-[#3D00FF] 25%, bg-[#3D00FF] 75%, #000 75%, #000)", backgroundPosition: "0 0, 20px 20px", backgroundSize: "40px 40px" }} />

                <h2 className="text-4xl md:text-6xl font-black uppercase text-center mb-16 relative z-10">By The Numbers</h2>

                <div className="flex flex-col md:flex-row gap-12 md:gap-32 relative z-10 w-full max-w-5xl justify-center items-center text-center">
                    <div className="flex flex-col items-center">
                        <span className="text-7xl md:text-9xl font-black uppercase" style={{ WebkitTextStroke: "2px black", color: "#FFC700", textShadow: "6px 6px 0px #000" }}>$50M</span>
                        <span className="text-2xl font-bold mt-4 uppercase tracking-wider bg-black px-4 py-1">Revenue</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-7xl md:text-9xl font-black uppercase" style={{ WebkitTextStroke: "2px black", color: "#00E5FF", textShadow: "6px 6px 0px #000" }}>1M+</span>
                        <span className="text-2xl font-bold mt-4 uppercase tracking-wider bg-black px-4 py-1">Creators</span>
                    </div>
                </div>
            </section>


            <section id="pricing" className="w-full max-w-5xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Transparent Pricing</h2>
                    <p className="text-2xl font-bold mt-4">Simple rate card. No hidden fees.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-12 items-end">


                    <div className={`bg-white p-8 md:p-12 ${brutalShadowLg} relative`}>
                        <h3 className="text-4xl font-black uppercase mb-2">Hobby</h3>
                        <div className="text-6xl font-black mb-8 flex items-end">
                            $0 <span className="text-2xl font-bold ml-2 text-gray-400">/mo</span>
                        </div>
                        <ul className="space-y-4 mb-10 text-xl font-bold font-mono">
                            <li className="flex items-center gap-3"><Star className="w-6 h-6 fill-black" /> 5% Cut on Payments</li>
                            <li className="flex items-center gap-3"><Star className="w-6 h-6 fill-black" /> Basic Storefront</li>
                            <li className="flex items-center gap-3"><Star className="w-6 h-6 fill-black" /> Standard Email Support</li>
                        </ul>
                        <button className={`w-full py-4 text-2xl font-black uppercase bg-white border-4 border-black hover:bg-gray-100 ${brutalShadowSm} ${brutalHoverSm}`}>
                            Get Started
                        </button>
                    </div>


                    <div className={`p-8 md:p-12 ${autoYellow} ${brutalShadowLg} relative -translate-y-4 md:-translate-y-8`}>
                        <div className={`absolute -top-6 -right-6 ${raniPink} text-white font-black px-6 py-2 border-4 border-black rotate-6 ${brutalShadowSm} text-xl uppercase`}>
                            Most Popular!
                        </div>
                        <h3 className="text-4xl font-black uppercase mb-2">Pro</h3>
                        <div className="text-6xl font-black mb-8 flex items-end">
                            $49 <span className="text-2xl font-bold ml-2">/mo</span>
                        </div>
                        <ul className="space-y-4 mb-10 text-xl font-bold font-mono">
                            <li className="flex items-center gap-3"><Star className="w-6 h-6 fill-black" /> 0% Cut (Keep it all)</li>
                            <li className="flex items-center gap-3"><Star className="w-6 h-6 fill-black" /> Premium Storefront Theme</li>
                            <li className="flex items-center gap-3"><Star className="w-6 h-6 fill-black" /> Premium Support</li>
                            <li className="flex items-center gap-3"><Star className="w-6 h-6 fill-black" /> Custom Domain</li>
                        </ul>
                        <button className={`w-full py-4 text-2xl font-black uppercase text-white ${inkBlue} ${brutalShadowSm} ${brutalHoverSm}`}>
                            Upgrade Now
                        </button>
                    </div>

                </div>
            </section>


            <section className="w-full px-6 py-20 pb-40">
                <div className={`max-w-5xl mx-auto p-12 md:p-20 ${raniPink} ${brutalShadowLg} text-center overflow-hidden relative`}>

                    <div className="absolute top-10 left-10 w-20 h-20 bg-white border-4 border-black rounded-full animate-bounce"></div>
                    <div className="absolute bottom-10 right-10 w-24 h-24 rotate-45 bg-[#00E5FF] border-4 border-black"></div>

                    <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter relative z-10 mb-8 lg:leading-[0.9]" style={{ textShadow: "4px 4px 0px #000" }}>
                        Stop Thinking.<br /> Start Building.
                    </h2>
                    <p className="text-2xl md:text-3xl font-bold text-white mb-12 relative z-10" style={{ textShadow: "2px 2px 0px #000" }}>
                        Create your account today and see the magic.
                    </p>
                    <button className={`px-12 py-6 text-2xl sm:text-3xl font-black uppercase tracking-wider text-black ${autoYellow} ${brutalShadowLg} ${brutalHoverLg} inline-flex items-center justify-center gap-3 relative z-10`}>
                        Let's Go! <Flame className="w-8 h-8 fill-black" />
                    </button>
                </div>
            </section>


            <footer className="w-full border-t-8 border-black bg-white px-6 py-12 relative z-20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <Flame className="w-8 h-8 text-black fill-black" />
                        <span className="font-black text-4xl tracking-tighter uppercase mt-1">PATAKHA</span>
                    </div>

                    <div className="flex gap-8 font-black uppercase text-xl">

                        <a href="https://x.com/cipherotaku04" target="_blank" className="hover:text-[#3D00FF] hover:underline hover:underline-offset-4 transition-colors">X</a>

                    </div>
                </div>
                <div className="mt-12 text-center font-bold font-mono text-lg border-t-2 border-dashed border-black pt-8">
                    Made with ❤️ by Fluxorr.
                </div>
            </footer>

        </div>
    );
}
