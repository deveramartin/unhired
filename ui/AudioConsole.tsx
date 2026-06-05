"use client";

import React from "react";
import { Volume2, Pause } from "lucide-react";

interface AudioConsoleProps {
  isPlaying: boolean;
  playbackProgress: number;
  playSpeed: number;
  cynicismLevel: number;
  onTogglePlay: () => void;
  onSpeedChange: (speed: number) => void;
  onCynicismChange: (level: number) => void;
}

export default function AudioConsole({
  isPlaying,
  playbackProgress,
  playSpeed,
  cynicismLevel,
  onTogglePlay,
  onSpeedChange,
  onCynicismChange,
}: AudioConsoleProps) {
  return (
    <div className="md:col-span-8 bg-zinc-900 border border-white/5 rounded-3xl p-5 sm:p-6 flex flex-col justify-between space-y-6 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center space-x-2">
          <div className="p-1 px-2 bg-slate-950 border border-white/5 rounded text-emerald-400 font-mono text-[9px] uppercase tracking-wider flex items-center gap-1">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Audio Out Live</span>
          </div>
          <span className="font-mono text-xs text-white font-bold uppercase">
            Sarcasm Synthesizer
          </span>
        </div>
        {!window.speechSynthesis && (
          <span className="font-mono text-[8px] text-amber-500 uppercase">
            TTS API Unresponsive
          </span>
        )}
      </div>

      {/* Equalizer */}
      <div className="space-y-4">
        <div className="h-10 flex items-end justify-center gap-1.5 bg-slate-950/60 p-2.5 rounded-xl border border-white/5 overflow-hidden">
          {isPlaying ? (
            Array.from({ length: 24 }).map((_, i) => {
              const heights = ["h-3", "h-7", "h-5", "h-9", "h-4", "h-8", "h-6", "h-2"];
              return (
                <div
                  key={i}
                  style={{ animationDelay: `${i * 30}ms` }}
                  className={`w-1 bg-emerald-500 rounded-full animate-pulse ${heights[i % heights.length]}`}
                />
              );
            })
          ) : (
            <div className="w-full flex items-center justify-center text-[10px] text-slate-500 font-mono italic">
              "Pre-routing vocal cords... Press Play to hear insults"
            </div>
          )}
        </div>

        <div className="space-y-1">
          <div className="flex justify-between font-mono text-[9px] text-slate-500 uppercase">
            <span>Simulated Voice Tracking</span>
            <span>{Math.floor(playbackProgress)}%</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded overflow-hidden relative">
            <div
              className="bg-emerald-500 h-full transition-all duration-200"
              style={{ width: `${playbackProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-2 gap-4 pb-2">
        <div className="space-y-1">
          <div className="flex justify-between font-mono text-[9px] text-slate-500">
            <span>Mockery Speed</span>
            <span>{playSpeed.toFixed(1)}x</span>
          </div>
          <input
            id="speech-speed-range"
            type="range"
            min="0.7"
            max="1.6"
            step="0.1"
            value={playSpeed}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>
        <div className="space-y-1">
          <div className="flex justify-between font-mono text-[9px] text-slate-500">
            <span>Cynicism Pitch</span>
            <span>{cynicismLevel}%</span>
          </div>
          <input
            id="speech-pitch-range"
            type="range"
            min="40"
            max="140"
            step="5"
            value={cynicismLevel}
            onChange={(e) => onCynicismChange(parseInt(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Play button */}
      <div className="flex justify-center">
        <button
          type="button"
          id="listen-roast-btn"
          onClick={onTogglePlay}
          className={`px-8 py-3 rounded-xl font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer ${
            isPlaying
              ? "bg-zinc-800 hover:bg-zinc-700 text-white border border-white/10"
              : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="h-4 w-4 text-emerald-400" />
              <span>Mute Insults</span>
            </>
          ) : (
            <>
              <Volume2 className="h-4 w-4 animate-bounce" />
              <span>Listen to Roast Voice</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}