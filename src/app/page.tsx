"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { SettingsPanel } from "@/components/SettingsPanel";
import { ImageGenerator } from "@/components/ImageGenerator";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Home() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKey] = useLocalStorage<string>("ai_api_key", "");

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black selection:bg-indigo-500/30">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(79,70,229,0.15),transparent_50%)]" />
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-500/10 rounded-full blur-[100px] mix-blend-screen opacity-50 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-purple-500/10 rounded-full blur-[100px] mix-blend-screen opacity-50 animate-pulse" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <Navbar onOpenSettings={() => setIsSettingsOpen(true)} />

      <main className="relative z-10 container mx-auto px-6 pt-32 pb-24">
        <motion.div
          style={{ opacity, scale }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 absolute" />
            V1.0 is now live — Open Source
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500 mb-8"
          >
            Create Stunning LinkedIn Covers in{" "}
            <span className="italic font-light">One Click</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Stop wasting time on canvas. Just type your article&apos;s topic,
            and our proprietary AI pipeline instantly generates an optimized,
            professional cover image tailored for maximum CTR.
          </motion.p>
        </motion.div>

        <ImageGenerator apiKey={apiKey} />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">
            Open-Source Project by{" "}
            <a
              href="https://www.linkedin.com/in/muhammadschees/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Muhammad Schees
            </a>
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-zinc-500 hover:text-white text-sm transition-colors">Privacy</a>
            <a href="#" className="text-zinc-500 hover:text-white text-sm transition-colors">Terms</a>
            <a href="https://github.com/msk0442" className="text-zinc-500 hover:text-white text-sm transition-colors">GitHub</a>
          </div>
        </div>
      </footer>

      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
