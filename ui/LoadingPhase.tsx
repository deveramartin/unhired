"use client";

import React from "react";
import { Flame } from "lucide-react";
import { LOADING_PHRASES } from "../utils/roasts";

interface LoadingPhaseProps {
  loadingPhraseIndex: number;
  loadingProgress: number;
}

export default function LoadingPhase({ loadingPhraseIndex, loadingProgress }: LoadingPhaseProps) {
  return (
    <div className="space-y-10 py-16 text-center select-none">
      {/* Spinning radar */}
      <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-emerald-950/40 animate-ping opacity-35" />
        <div className="absolute inset-2 rounded-full border-[3px] border-b-transparent border-t-emerald-500 border-l-transparent border-r-emerald-500/40 animate-spin" />
        <div className="absolute inset-6 rounded-full border border-white/5" />
        <div className="z-10 bg-slate-950 p-4 border border-white/10 rounded-full animate-pulse">
          <Flame className="h-10 w-10 text-emerald-500" />
        </div>
      </div>

      <div className="space-y-4 max-w-lg mx-auto">
        <h3 className="text-lg font-mono font-bold text-white uppercase tracking-tight">
          Evaluating Credentials
        </h3>

        <div className="h-12 flex items-center justify-center bg-zinc-900 border border-white/5 p-3 rounded-lg">
          <span className="font-mono text-xs text-emerald-400 capitalize animate-pulse">
            {LOADING_PHRASES[loadingPhraseIndex]}
          </span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between font-mono text-[9px] text-slate-500 uppercase tracking-widest px-1">
            <span>Extracting Pride</span>
            <span>{loadingProgress}%</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-white/5">
            <div
              className="bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 h-full transition-all duration-150 rounded-full"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}