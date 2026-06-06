"use client";

import React from "react";
import { ThumbsDown } from "lucide-react";
import { RoastRecord } from "@/types/types";

interface ScoreCardProps {
  roast: RoastRecord;
}

export default function ScoreCard({ roast }: ScoreCardProps) {
  return (
    <div className=" border border-white md:col-span-2 bg-zinc-900 border border-white/5 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden text-center space-y-4 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-950/15 rounded-full blur-2xl pointer-events-none" />

      <span className="font-mono text-[9px] text-slate-500 tracking-widest uppercase block">
        Self-Esteem Impact
      </span>

      <div className="space-y-2 py-4">
        <span className="block text-6xl sm:text-7xl font-mono tracking-tighter font-extrabold text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          {roast.rating}
          <span className="text-xl font-mono text-slate-600 font-bold">/10</span>
        </span>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <ThumbsDown className="h-3.5 w-3.5 text-emerald-400" />
          <span className="font-mono text-[9px] text-emerald-400 font-bold uppercase">
            Critical Trauma
          </span>
        </div>
      </div>

      <div className="border-t border-white/5 pt-3 flex justify-between items-center text-xs font-mono">
        <span className="text-slate-500 text-left">Candidate:</span>
        <span className="text-white font-bold text-right truncate max-w-[120px]">
          {roast.parsedName}
        </span>
      </div>
    </div>
  );
}