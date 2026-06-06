"use client";

import React from "react";
import { FileSpreadsheet, Save, RefreshCw } from "lucide-react";
import { RoastRecord } from "@/types/types";
import { renderParsedMarkdown } from "../utils/markdown";

interface RoastTextCardProps {
  roast: RoastRecord;
  onRestart: () => void;
}

export default function RoastTextCard({ roast, onRestart }: RoastTextCardProps) {
  return (
    <div className="md:col-span-2 bg-zinc-900 border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <span className="font-mono text-[10px] text-slate-500 tracking-wider flex items-center gap-1.5">
          <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-500" />
          <span className="truncate max-w-[200px]">{roast.fileName}</span>
        </span>
        <span className="font-mono text-[9px] text-slate-500">{roast.date}</span>
      </div>

      {renderParsedMarkdown(roast.roastText)}

      <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          id="roast-another-btn"
          onClick={onRestart}
          className="w-full sm:w-auto px-5 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 rounded-xl text-xs font-mono font-bold text-rose-400 hover:text-rose-300 flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
        >
          <RefreshCw
            className="h-3.5 w-3.5 animate-spin text-rose-400"
            style={{ animationDuration: "6s" }}
          />
          <span>Scan Another Victim</span>
        </button>
      </div>
    </div>
  );
}