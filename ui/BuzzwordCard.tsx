"use client";

import React from "react";
import { ShieldX } from "lucide-react";
import { RoastRecord } from "@/types/types";

interface BuzzwordsCardProps {
  roast: RoastRecord;
}

export default function BuzzwordsCard({ roast }: BuzzwordsCardProps) {
  return (
    <div className="space-y-5">
      {/* Buzzwords */}
      <div className="bg-zinc-900 border border-white/5 rounded-3xl p-5 space-y-3 text-left shadow-sm">
        <span className="font-mono text-[9px] uppercase text-slate-500 tracking-wider block font-bold border-b border-white/5 pb-2">
          Useless Corporate Buzzwords Found
        </span>
        <div className="flex flex-wrap gap-2 pt-1">
          {roast.buzzwords.map((bw, i) => (
            <span
              key={i}
              className="px-2.5 py-1 text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg font-bold"
            >
              ☣️ {bw}
            </span>
          ))}
        </div>
        <p className="text-[9px] font-mono text-slate-500 italic mt-2">
          * Recruiters use these words to play Bingo when they are bored during candidate screening.
        </p>
      </div>

      {/* Grammar sins */}
      <div className="bg-zinc-900 border border-white/5 rounded-3xl p-5 space-y-3.5 text-left shadow-sm">
        <span className="font-mono text-[9px] uppercase text-emerald-400 tracking-wider block font-bold border-b border-white/5 pb-2 flex items-center gap-1">
          <ShieldX className="h-3.5 w-3.5 text-emerald-500" />
          <span>Formatting & Logic Sins</span>
        </span>
        <ul className="space-y-2.5">
          {roast.grammarSins.map((sin, i) => (
            <li key={i} className="flex items-start gap-2 text-xs font-sans text-slate-400">
              <span className="font-mono text-emerald-500 font-bold flex-shrink-0 text-[10px] mt-0.5">
                [{i + 1}]
              </span>
              <span>{sin}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}