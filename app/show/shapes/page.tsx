"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ShieldCheck, Lock, Sparkles, Boxes, Box, Users, Cpu } from "lucide-react";
import { Section } from "./components/Section";
import { TopNav } from "./components/TopNav";
import type { ThemeMode } from "./types";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: 'easeOut' },
  }),
};

const Hero = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const haloY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <Section id="hero" className="pt-24 pb-28 md:pt-32">
      <div ref={ref} className="grid gap-12 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] text-[#888888]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
            System Norm: Nominal · Build 143
          </div>

          <div className="space-y-4">
            <motion.h1
              className="font-pt-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-[#F5F5F5] tracking-tight"
              variants={fadeUp}
              custom={1}
            >
              Think spatial.
              <span className="block text-lg sm:text-xl md:text-2xl font-normal text-[#B0B0B0] mt-4">
                A digital workshop for wearables &amp; spatial computing teams.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="max-w-xl text-sm sm:text-base text-[#B0B0B0] leading-relaxed font-manrope"
            >
              Shapes is where designers and engineers co-construct scenes, behaviors, and interactions for AR, VR, and mixed reality. Built to feel less like software and more like stepping into a studio.
            </motion.p>
          </div>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.22em] font-medium"
          >
            <button className="group inline-flex items-center gap-2 rounded-full bg-[#F5F5F5] px-5 py-2 text-[10px] font-semibold tracking-[0.2em] text-black">
              Enter the workshop
              <span className="relative flex h-4 w-4 items-center justify-center overflow-hidden rounded-full border border-black/20 bg-black text-[#F5F5F5]">
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>

            <div className="flex flex-wrap items-center gap-3 text-[#888888]">
              <span className="text-[10px] tracking-[0.24em]">No-code · Multi-headset · Local preview</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="relative flex items-center justify-center">
          <motion.div
            style={{ y: haloY }}
            className="pointer-events-none absolute inset-10 rounded-[40px] bg-[radial-gradient(circle_at_top,rgba(245,245,245,0.14),transparent_60%),radial-gradient(circle_at_bottom,rgba(245,245,245,0.08),transparent_60%)] opacity-70 blur-3xl"
          />

          <motion.div
            style={{ y: imageY }}
            className="relative aspect-4/5 w-full max-w-md overflow-hidden rounded-4xl border border-white/12 bg-linear-to-b from-zinc-900 via-black to-black shadow-[0_40px_120px_rgba(0,0,0,0.9)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,245,245,0.22),transparent_55%),radial-gradient(circle_at_bottom,rgba(245,245,245,0.12),transparent_55%)] mix-blend-screen" />

            <div className="relative h-full w-full">
              <div className="absolute inset-x-6 top-6 flex items-center justify-between text-[10px] font-mono text-[#D4D4D4]">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-6 rounded-full bg-white/20" />
                  Wearable Shell · v12
                </span>
                <span className="rounded-full border border-white/15 bg-black/50 px-2 py-0.5 text-[9px] uppercase tracking-[0.18em]">
                  Depth grid
                </span>
              </div>

              <div className="absolute inset-8 mt-8 grid grid-rows-[1.1fr_1fr] gap-4">
                {/* Hero primary illustration: spatial workbench */}
                <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-black/80">
                  <div className="absolute inset-0 opacity-35">
                    <div className="absolute inset-6 border border-dashed border-white/18" />
                    <div className="absolute left-1/2 top-4 h-32 w-px bg-linear-to-b from-white/70 via-white/10 to-transparent" />
                    <div className="absolute inset-x-8 bottom-10 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
                  </div>
                  <div className="relative flex h-full flex-col justify-between p-4 text-[10px] font-mono text-[#E5E5E5]">
                    <div className="flex items-center justify-between">
                      <span>Workshop · Spatial viewport</span>
                      <span className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] text-[#E5E5E5]">
                        Live scene
                      </span>
                    </div>
                    <div className="flex items-end justify-between gap-4 text-[9px]">
                      <div className="space-y-1">
                        <span className="block text-[#B0B0B0]">Physical anchors</span>
                        <div className="flex gap-1.5">
                          <span className="h-1 w-8 rounded-full bg-white/80" />
                          <span className="h-1 w-6 rounded-full bg-white/25" />
                        </div>
                      </div>
                      <div className="space-y-1 text-right">
                        <span className="block text-[#B0B0B0]">Latency budget</span>
                        <span className="rounded-full border border-white/20 px-2 py-0.5">&lt; 8ms</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hero secondary illustration: integration strip */}
                <div className="grid grid-cols-[1.1fr_minmax(0,1fr)] gap-3">
                  <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/80">
                    <div className="absolute inset-0 opacity-25">
                      <div className="absolute inset-5 border border-white/15" />
                      <div className="absolute inset-x-8 bottom-6 h-px bg-linear-to-r from-white/40 via-white/10 to-transparent" />
                    </div>
                    <div className="relative flex h-full flex-col justify-between p-3 text-[9px] font-mono text-[#E5E5E5]">
                      <div className="flex items-center justify-between">
                        <span>Scene graph</span>
                        <span>v4.2</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 text-[8px] tracking-[0.18em] uppercase">
                        {['Figma', 'Blender', 'Unreal', 'Unity'].map((tool) => (
                          <span
                            key={tool}
                            className="rounded-full border border-white/18 bg-white/5 px-2 py-0.5"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between rounded-2xl border border-white/15 bg-black/80 p-3 text-[10px] text-[#E5E5E5] font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[#888888]">
                        System status
                      </span>
                    </div>
                    <div className="space-y-1 text-[9px]">
                      <div className="flex items-center justify-between">
                        <span>Headsets</span>
                        <span className="rounded-full bg-white/5 px-2 py-0.5">5 linked</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Sessions</span>
                        <span className="rounded-full bg-white/5 px-2 py-0.5">Realtime</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

const TrustBar = () => (
  <Section className="pb-20">
    <motion.div
      className="flex flex-col gap-6 border-y border-white/10 py-6 md:flex-row md:items-center md:justify-between"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      variants={fadeUp}
    >
      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[#888888]">
        <span className="h-px w-10 bg-linear-to-r from-white/60 via-white/30 to-transparent" />
        Trusted by spatial teams at
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-xs text-[#F5F5F5] md:flex md:flex-wrap md:gap-8">
        {['Northline XR', 'Perimeter Labs', 'Field & Frame', 'Latitude Studio', 'Orbital Systems'].map(
          (name) => (
            <div key={name} className="flex items-center gap-3 text-[#888888]">
              <div className="h-6 w-6 rotate-45 rounded-md border border-white/20 bg-white/5" />
              <span className="text-[11px] tracking-[0.18em] uppercase">{name}</span>
            </div>
          ),
        )}
      </div>
    </motion.div>
  </Section>
);

const TestimonialPrimary = () => (
  <Section className="py-24">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={fadeUp}
      className="space-y-6 max-w-3xl"
    >
      <p className="text-xs uppercase tracking-[0.26em] text-[#888888]">Testimonial</p>
      <p className="font-pt-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-[#F5F5F5]">
        “Shapes understands depth, occlusion, and embodiment in a way that finally feels native to how our team actually
        thinks about space.”
      </p>
      <div className="text-xs text-[#888888] tracking-[0.18em] uppercase">
        <span className="text-[#F5F5F5]">Ava I.</span> · Design Director, Spatial Systems
      </div>
    </motion.div>
  </Section>
);

type FeatureOrientation = 'textLeft' | 'textRight';

const FeatureBlock: React.FC<{
  eyebrow: string;
  title: string;
  body: string;
  tags: string[];
  orientation: FeatureOrientation;
}> = ({ eyebrow, title, body, tags, orientation }) => {
  // Unique monochrome illustrations per feature, keyed by eyebrow
  const renderIllustration = () => {
    if (eyebrow.includes('Integration')) {
      // Node-link diagram: tools flowing into a spatial hub
      return (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative h-64 md:h-80 overflow-hidden rounded-[26px] border border-white/15 bg-black/80"
        >
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-8 border border-dashed border-white/18" />
          </div>
          <svg className="absolute inset-10 text-[#F5F5F5]" viewBox="0 0 220 220" aria-hidden="true">
            <g transform="translate(0,-50)" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round">
              <circle cx="110" cy="110" r="40" fill="none" opacity="0.5" />
              <circle cx="110" cy="110" r="3" fill="currentColor" />
              {[
                [40, 70],
                [55, 145],
                [170, 75],
                [165, 150],
              ].map(([x, y], idx) => (
                <g key={idx}>
                  <circle cx={x} cy={y} r="3" fill="currentColor" />
                  <line x1={x} y1={y} x2="110" y2="110" opacity="0.5" />
                </g>
              ))}
            </g>
          </svg>
          <div className="relative flex h-full flex-col justify-between p-5 text-[10px] font-mono text-[#E5E5E5]">
            <div className="flex items-center justify-between">
              <span>Multi-tool graph</span>
              <span className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] uppercase tracking-[0.18em]">
                Unified source
              </span>
            </div>
            <div className="flex items-center justify-between text-[9px] text-[#B0B0B0]">
              <span>Figma · Blender · Unreal · Unity</span>
              <span>Synced in real time</span>
            </div>
          </div>
        </motion.div>
      );
    }

    if (eyebrow.includes('Construction')) {
      // Exploded isometric room / set
      return (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative h-64 md:h-80 overflow-hidden rounded-[26px] border border-white/15 bg-black/80"
        >
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-10 border border-white/15 " />
          </div>
          <svg className="absolute text-[#F5F5F5]" viewBox="0 0 220 220" aria-hidden="true">
            <g
              transform="translate(0,-50)"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="60,150 110,175 170,150 120,125 60,150" opacity="0.9" />
              <polygon points="60,90 60,150 120,125 120,65 60,90" opacity="0.7" />
              <polygon points="120,65 120,125 170,150 170,90 120,65" opacity="0.7" />
              <line x1="60" y1="90" x2="110" y2="65" opacity="0.4" />
              <line x1="170" y1="90" x2="110" y2="65" opacity="0.4" />
            </g>
          </svg>
          <div className="relative flex h-full flex-col justify-between p-5 text-[10px] font-mono text-[#E5E5E5]">
            <div className="flex items-center justify-between">
              <span>Room-scale layout</span>
              <span className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] uppercase tracking-[0.18em]">
                1:1 units
              </span>
            </div>
            <div className="flex items-center justify-between text-[9px] text-[#B0B0B0]">
              <span>Anchors · Props · Sightlines</span>
              <span>Snap to physical space</span>
            </div>
          </div>
        </motion.div>
      );
    }

    if (eyebrow.includes('Prototyping')) {
      // Interaction graph
      return (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative h-64 md:h-80 overflow-hidden rounded-[26px] border border-white/15 bg-black/80"
        >
          <svg className="absolute inset-10 text-[#F5F5F5]" viewBox="0 0 220 220" aria-hidden="true">
            <g
              transform="translate(0,-50)"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="40" y="60" width="55" height="32" rx="5" opacity="0.8" />
              <rect x="125" y="60" width="55" height="32" rx="5" opacity="0.8" />
              <rect x="82" y="135" width="55" height="32" rx="5" opacity="0.8" />
              <path d="M95 92 L95 120" opacity="0.7" />
              <path d="M135 92 L135 120" opacity="0.7" />
              <path d="M95 120 Q110 128 110 135" opacity="0.7" />
              <path d="M135 120 Q120 128 110 135" opacity="0.7" />
            </g>
          </svg>
          <div className="relative flex h-full flex-col justify-between p-5 text-[10px] font-mono text-[#E5E5E5]">
            <div className="flex items-center justify-between">
              <span>No-code graph</span>
              <span className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] uppercase tracking-[0.18em]">
                Tap · Gaze · Gesture
              </span>
            </div>
            <div className="flex items-center justify-between text-[9px] text-[#B0B0B0]">
              <span>States · Transitions · Guards</span>
              <span>Exportable specs</span>
            </div>
          </div>
        </motion.div>
      );
    }

    // Collaboration: concentric circles / shared space
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative h-64 md:h-80 overflow-hidden rounded-[26px] border border-white/15 bg-black/80"
      >
        <svg className="absolute inset-12 text-[#F5F5F5]" viewBox="0 0 220 220" aria-hidden="true">
          <g transform="translate(0,-50)" fill="none" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round">
            <circle cx="110" cy="110" r="70" opacity="0.14" />
            <circle cx="110" cy="110" r="45" opacity="0.2" />
            <circle cx="110" cy="110" r="25" opacity="0.4" />
            {[
              [150, 90],
              [80, 60],
              [65, 140],
              [145, 145],
            ].map(([x, y], idx) => (
              <circle key={idx} cx={x} cy={y} r="4" />
            ))}
          </g>
        </svg>
        <div className="relative flex h-full flex-col justify-between p-5 text-[10px] font-mono text-[#E5E5E5]">
          <div className="flex items-center justify-between">
            <span>Shared spatial room</span>
            <span className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] uppercase tracking-[0.18em]">
              Live review
            </span>
          </div>
          <div className="flex items-center justify-between text-[9px] text-[#B0B0B0]">
            <span>Headsets · Laptops · Phones</span>
            <span>One canonical scene</span>
          </div>
        </div>
      </motion.div>
    );
  };

  const text = (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={fadeUp}
      className="space-y-5"
    >
      <p className="text-[11px] uppercase tracking-[0.24em] text-[#888888]">{eyebrow}</p>
      <h3 className="font-pt-serif text-2xl sm:text-3xl text-[#F5F5F5]">{title}</h3>
      <p className="max-w-md text-sm text-[#B0B0B0] leading-relaxed font-manrope">{body}</p>
      <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em] text-[#F5F5F5]">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-medium hover:bg-white/10 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );

  return (
    <Section className="py-20">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        {orientation === 'textLeft' ? (
          <>
            {text}
            {renderIllustration()}
          </>
        ) : (
          <>
            {renderIllustration()}
            {text}
          </>
        )}
      </div>
    </Section>
  );
};

const UtilityGrid = () => (
  <Section className="py-24">
    <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-[11px] uppercase tracking-[0.26em] text-[#888888]">Enterprise-grade Utility</p>
        <h2 className="mt-2 font-pt-serif text-2xl sm:text-3xl text-[#F5F5F5]">
          Built for spatial orgs that can&apos;t afford drift.
        </h2>
      </div>
      <p className="max-w-md text-xs text-[#B0B0B0] font-manrope">
        Security, governance, and accessibility baked into the same system designers use to sketch, assemble, and play.
      </p>
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        className="flex flex-col gap-4 rounded-3xl border border-white/15 bg-black/85 p-6"
      >
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-emerald-400" />
          <div className="text-xs uppercase tracking-[0.22em] text-[#888888]">Security &amp; Compliance</div>
        </div>
        <h3 className="text-sm font-semibold text-[#F5F5F5]">Enterprise security as a default setting.</h3>
        <ul className="space-y-1 text-[11px] text-[#B0B0B0] font-manrope">
          <li>SSO / SAML · SCIM provisioning</li>
          <li>SOC 2 Type II controls &amp; regional hosting</li>
          <li>Granular permissions across teams, spaces, and scenes</li>
        </ul>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        className="flex flex-col gap-4 rounded-3xl border border-white/15 bg-black/85 p-6"
      >
        <div className="flex items-center gap-3">
          <Lock className="h-5 w-5 text-sky-400" />
          <div className="text-xs uppercase tracking-[0.22em] text-[#888888]">Control &amp; Access</div>
        </div>
        <h3 className="text-sm font-semibold text-[#F5F5F5]">Everything auditable, nothing in the way.</h3>
        <ul className="space-y-1 text-[11px] text-[#B0B0B0] font-manrope">
          <li>Revision-safe scene history and per-device diffs</li>
          <li>Role-based briefs for CTOs, designers, and PMs</li>
          <li>PII-aware capture tools with redaction by default</li>
        </ul>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        className="flex flex-col gap-4 rounded-3xl border border-white/15 bg-black/85 p-6"
      >
        <div className="flex items-center gap-3">
          <Cpu className="h-5 w-5 text-amber-300" />
          <div className="text-xs uppercase tracking-[0.22em] text-[#888888]">Technical Spec</div>
        </div>
        <h3 className="text-sm font-semibold text-[#F5F5F5]">Optimized for real hardware, not mockups.</h3>
        <ul className="space-y-1 text-[11px] text-[#B0B0B0] font-manrope">
          <li>Per-headset performance budgets baked into scenes</li>
          <li>Latency overlays for hand tracking &amp; eye tracking</li>
          <li>Build targets for visionOS, Quest, HoloLens, and more</li>
        </ul>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        className="flex flex-col gap-4 rounded-3xl border border-white/15 bg-black/85 p-6"
      >
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-emerald-300" />
          <div className="text-xs uppercase tracking-[0.22em] text-[#888888]">Accessible Mastery</div>
        </div>
        <h3 className="text-sm font-semibold text-[#F5F5F5]">Spatial craft that scales beyond specialists.</h3>
        <ul className="space-y-1 text-[11px] text-[#B0B0B0] font-manrope">
          <li>No-code blueprints for interactions and flows</li>
          <li>Assistive modes for seated, low-vision, and screen readers</li>
          <li>Guided walkthroughs that feel like studio apprenticeships</li>
        </ul>
      </motion.div>
    </div>
  </Section>
);

const TestimonialSecondary = () => (
  <Section className="py-24">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      variants={fadeUp}
      className="flex flex-col items-center text-center gap-4"
    >
      <p className="text-xs uppercase tracking-[0.28em] text-[#888888]">Validation</p>
      <p className="font-pt-serif text-2xl sm:text-3xl md:text-4xl max-w-3xl text-[#F5F5F5] leading-snug">
        “Shapes feels less like loading a file and more like unlocking a room we can all stand inside.”
      </p>
      <p className="text-[11px] uppercase tracking-[0.22em] text-[#888888]">
        Editorial Lead · Mixed Reality Lab
      </p>
    </motion.div>
  </Section>
);

const PressTicker = () => (
  <Section className="pb-28">
    <div className="relative overflow-hidden rounded-full border border-white/15 bg-white/5 py-3">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-linear-to-r from-black via-black/60 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-l from-black via-black/60 to-transparent" />

      <motion.div
        className="flex items-center gap-10 whitespace-nowrap pr-10 pl-24 text-[11px] uppercase tracking-[0.22em] text-[#F5F5F5]"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 26, ease: 'linear' }}
      >
        {[
          '“The new standard for spatial UI.” — Wired',
          '“Finally treats wearables as first-class canvases.” — Surface',
          '“A workshop, not a dashboard.” — FRAME',
          '“Where volumetric craft actually happens.” — Slope',
        ].map((quote) => (
          <span key={quote} className="flex items-center gap-3">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/30 bg-black/40">
              <Sparkles className="h-3 w-3" />
            </span>
            {quote}
          </span>
        ))}
      </motion.div>
    </div>
  </Section>
);

const Features = () => (
  <>
    <FeatureBlock
      eyebrow="Feature · Integration"
      title="Fluid integration with the tools you already ship from."
      body="Connect Figma frames, Blender scenes, and Unreal levels directly into a single spatial assembly. One source of truth that mirrors how your team actually builds."
      tags={['Figma live components', 'Blender collections', 'Unreal streaming', 'Git-linked scenes']}
      orientation="textLeft"
    />
    <FeatureBlock
      eyebrow="Feature · Construction"
      title="Assemble the scene like a physical set."
      body="Block out rooms, anchors, and world-scale landmarks with the same ease as sketching in a notebook. Every change stays grounded in real dimensions and devices."
      tags={['Room-scale blueprints', 'Wearable anchors', 'Depth-aware gizmos']}
      orientation="textRight"
    />
    <FeatureBlock
      eyebrow="Feature · Prototyping"
      title="Prototype interactions without touching code."
      body="Chain together gestures, gaze, and spatial audio in a no-code graph that still respects your engineers&apos; constraints. Export-ready specs, no rewrites."
      tags={['No-code behaviors', 'Interaction graphs', 'Latency budgets']}
      orientation="textLeft"
    />
    <FeatureBlock
      eyebrow="Feature · Collaboration"
      title="Present in real-time, in the same space."
      body="Walk leaders through a scene while standing in it together—headsets, laptops, and phones all seeing the same version of the world. "
      tags={['Multi-device review', 'Comment in 3D', 'Session recording']}
      orientation="textRight"
    />
  </>
);

const UtilityStrip = () => (
  <Section className="pb-24">
    <div className="grid gap-4 rounded-3xl border border-white/10 bg-black/90 p-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)]">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#888888]">
          <Boxes className="h-4 w-4" />
          The Digital Workshop
        </div>
        <p className="font-pt-serif text-lg text-[#F5F5F5]">
          A single, tactile place where spatial teams think, assemble, and rehearse before anything ships.
        </p>
      </div>
      <div className="flex flex-col gap-2 text-[11px] text-[#B0B0B0] font-manrope">
        <span className="uppercase tracking-[0.18em] text-[#888888]">For CTOs &amp; Leads</span>
        <p>Model risk, performance, and headcount impact before committing to a new platform bet.</p>
      </div>
      <div className="flex flex-col gap-2 text-[11px] text-[#B0B0B0] font-manrope">
        <span className="uppercase tracking-[0.18em] text-[#888888]">For Designers</span>
        <p>Stay inside one canvas from sketch to ship, without waiting on custom tooling for every idea.</p>
      </div>
    </div>
  </Section>
);

const ShapesPage = () => {
  const [theme, setTheme] = useState<ThemeMode>('dark');

  return (
    <main className="relative min-h-screen bg-black text-[#F5F5F5] font-sans">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(245,245,245,0.1),transparent_60%),radial-gradient(circle_at_bottom,rgba(15,15,15,1),transparent_70%)] opacity-80" />
      <div className="pointer-events-none fixed inset-0 bg-[url('data:image/svg+xml,%3Csvg_viewBox=0_0_160_160_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cdefs%3E%3Cfilter_id=%22n%22_x=%220%22_y=%220%22_width=%22100%25%22_height=%22100%25%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.8%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3C/defs%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22_opacity=%220.08%22/%3E%3C/svg%3E')] mix-blend-soft-light" />
      <div className="relative flex min-h-screen flex-col">
        <TopNav
          theme={theme}
          onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
        />

        <div className="flex-1">
          <Hero />
          <TrustBar />
          <TestimonialPrimary />
          <Features />
          <UtilityGrid />
          <UtilityStrip />
          <TestimonialSecondary />
          <PressTicker />
        </div>

        <footer className="border-t border-white/10 py-6 text-[11px] text-[#888888]">
          <Section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em]">
              <Box className="h-4 w-4 text-[#F5F5F5]" />
              <span>Shapes · Spatial Workshop</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 font-mono">
              <span>© {new Date().getFullYear()} Workshop Systems Inc.</span>
              <span className="text-[#B0B0B0]">Environment: Production · Status: Nominal</span>
            </div>
          </Section>
        </footer>
      </div>
    </main>
  );
};

export default ShapesPage;
