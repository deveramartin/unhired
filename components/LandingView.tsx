'use client';

import { ViewType } from '@/types/types';
import { ChevronRight, FileText, Flame, ShieldAlert, Sparkles, Volume2, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingViewProps {
  setView: (view: ViewType) => void;
  isLoggedIn: boolean;
}

export default function LandingView({ setView, isLoggedIn }: LandingViewProps) {
  const ctaDestination = isLoggedIn ? 'roast' : 'login';

  return (
    <div className="relative min-h-[calc(100vh-73px)] flex flex-col justify-between overflow-hidden bg-slate-950 text-slate-200">
      {/* Absolute Backlit Neon Accents (Bento emerald glow) */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-72 h-72 sm:w-[500px] sm:h-[500px] bg-emerald-950/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -left-[10%] top-[40%] w-60 h-60 bg-emerald-950/5 rounded-full blur-[80px] pointer-events-none" />
      
      {/* Top Notice Rail - Bento themed */}  
      <div className="w-full bg-slate-900/60 border-y border-white/5 py-2.5 px-4 text-center">
        <p className="text-xs font-mono text-emerald-400 flex items-center justify-center gap-2">
          <ShieldAlert className="h-4 w-4 animate-pulse flex-shrink-0 text-emerald-500" />
          <span>WARNING: 98.4% of candidate self-esteem is permanently incinerated in this chamber. Proceed at your own career risk.</span>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Grid Left: Pitch & CTA (Nest inside an elegant large bento grid panel) */}
          <div className="lg:col-span-7 bg-zinc-900 border border-white/5 rounded-3xl p-6 sm:p-10 flex flex-col justify-center select-none space-y-6 text-center lg:text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Flame className="h-40 w-40 text-emerald-500" />
            </div>

            <div className="inline-flex self-center lg:self-start items-center space-x-2 px-3 py-1 bg-slate-950 border border-white/10 rounded-full text-slate-400">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[10px] tracking-widest uppercase font-semibold text-emerald-400">AI REC-BOT V6.2 ACTIVE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.05] text-white">
              Let an AI Recruiter <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                Brutally Roast
              </span> <br />
              Your Resume.
            </h1>

            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 font-sans leading-relaxed">
              Stop guessing why your applications are being ghosted. Upload your PDF and let our cynical corporate AI rip your career achievements, tech-stacks, and useless buzzwords to molecular ashes. 
            </p>

            {/* Glowing CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 z-10">
              <button
                id="landing-cta-btn"
                onClick={() => setView(ctaDestination)}
                className="group relative w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 rounded-xl font-mono text-xs font-black uppercase tracking-wider text-slate-950 shadow-[0_0_25px_rgba(16,185,129,0.25)] transition-all duration-300 hover:scale-[1.02] flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Upload & Suffer Now</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="landing-sec-btn"
                onClick={() => {
                  if (isLoggedIn) {
                    setView('history');
                  } else {
                    setView('login');
                  }
                }}
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-950 hover:bg-zinc-800 border border-white/5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>View Recent Carnage</span>
              </button>
            </div>

            {/* User Stat Snippets */}
            <div className="grid grid-cols-3 gap-4 pt-6 max-w-md mx-auto lg:mx-0 font-mono text-left border-t border-white/5">
              <div className="border-l border-emerald-500/30 pl-3">
                <span className="block text-xl font-bold text-emerald-400">482K+</span>
                <span className="text-[9px] text-slate-500 uppercase tracking-wider">Egos Destroyed</span>
              </div>
              <div className="border-l border-emerald-500/30 pl-3">
                <span className="block text-xl font-bold text-emerald-200">2.4m</span>
                <span className="text-[9px] text-slate-500 uppercase tracking-wider">Buzzwords Burnt</span>
              </div>
              <div className="border-l border-emerald-500/30 pl-3">
                <span className="block text-xl font-bold text-teal-400">99.7%</span>
                <span className="text-[9px] text-slate-500 uppercase tracking-wider">Ghost Rate Match</span>
              </div>
            </div>
          </div>

          {/* Grid Right: Interactive Humorous Translation Widget (Styled as distinct Bento box) */}
          <div className="lg:col-span-5 bg-zinc-900 border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_10px_35px_rgba(0,0,0,0.5)] max-w-md mx-auto w-full space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <span className="font-mono text-[10px] text-emerald-400 font-bold tracking-widest uppercase flex items-center gap-1.5">
                <Flame className="h-3.5 w-3.5 text-emerald-500" />
                <span>AI Buzzword De-Obfuscator</span>
              </span>
              <span className="font-mono text-[9px] text-slate-500 block">Status: Fully Judgemental</span>
            </div>

            <div className="space-y-4 flex-1 flex flex-col justify-center">
              <div>
                <span className="font-mono text-[9px] uppercase text-slate-500 block mb-1">What you wrote on your CV:</span>
                <div className="bg-slate-950 border border-white/5 p-3 rounded-xl font-mono text-slate-300 text-xs text-left relative overflow-hidden group">
                  <div className="absolute top-1.5 right-1.5 opacity-45">
                    <FileText className="h-3.5 w-3.5 text-slate-500" />
                  </div>
                  "Spearheaded critical migration metrics and coordinated cross-functional legacy integrations to accelerate key stakeholder deliverables."
                </div>
              </div>

              <div className="flex justify-center -my-1">
                <div className="p-1 px-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full font-mono text-[10px] text-emerald-400 flex items-center gap-1">
                  <span>Translation</span>
                  <ChevronRight className="h-3 w-3 transform rotate-90" />
                </div>
              </div>

              <div>
                <span className="font-mono text-[9px] uppercase text-emerald-400 block mb-1 font-bold">What the AI actually reads:</span>
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl font-mono text-emerald-200 text-xs text-left relative overflow-hidden">
                  <div className="absolute top-1.5 right-1.5 text-emerald-400 opacity-40">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  "Sat quietly in 14 Zoom alignment meetings, muted my microphone, played Minesweeper, and eventually copy-pasted a template code block written by ChatGPT."
                </div>
              </div>
            </div>

            <div className="pt-2 bg-slate-950 border border-white/5 p-3.5 rounded-xl text-center font-mono text-[10px] text-slate-500">
              "They think 'spearheaded' hides that they don't know Git pull requests." 
              <span className="block text-[8px] text-emerald-500 mt-1">— Recruiter AI #041</span>
            </div>
          </div>

        </div>
      </div>

      {/* Feature Walkthrough Block (Bento grid panels) */}
      <div className="bg-zinc-950 border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center pb-8">
            <h2 className="font-mono text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">Triple-Phase Humiliation Framework</h2>
            <p className="text-white font-mono text-lg font-black">How to Roast Your Career in 3 Steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-zinc-900 p-6 rounded-3xl border border-white/5 hover:border-emerald-500/20 transition-all text-center space-y-3">
              <div className="mx-auto w-10 h-10 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center font-mono text-slate-400 font-zinc-900 font-bold text-xs">
                01
              </div>
              <h3 className="text-xs font-mono text-white font-bold uppercase tracking-wider">File Feeding Zone</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Drag-and-drop your glossy PDF resume. We don't steal your private info—we just extract your dignity.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-zinc-900 p-6 rounded-3xl border border-white/5 hover:border-emerald-500/20 transition-all text-center space-y-3">
              <div className="mx-auto w-10 h-10 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center font-mono text-emerald-400 font-bold text-xs">
                02
              </div>
              <h3 className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">Annihilation Scan</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Our parser identifies your grammar sins, inflated job titles, and copy-paste templates with surgical cybernetic eyes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-zinc-900 p-6 rounded-3xl border border-white/5 hover:border-emerald-500/20 transition-all text-center space-y-3">
              <div className="mx-auto w-10 h-10 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center font-mono text-teal-400 font-bold text-xs">
                03
              </div>
              <h3 className="text-xs font-mono text-teal-400 font-bold uppercase tracking-wider font-bold">Suffer in Audio</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Read the scathing markdown breakdown, then click play to hear the AI recruiter speak your demise aloud via Speech Synthesizer.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer message resembling design HTML footer */}
      <footer className="h-14 border-t border-white/5 flex items-center justify-center px-4 bg-slate-950 text-center text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-relaxed">
        Unhired assumes no responsibility for actual unemployment or hurt feelings. Proceed at your own career risk.
      </footer>
    </div>
  );
}
