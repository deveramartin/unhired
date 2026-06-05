"use client";

import React, { useRef, useState } from "react";
import { Volume2, Pause, Loader2 } from "lucide-react";

interface AudioConsoleProps {
  roastText: string;
  parsedName: string;
  role: string;
  rating: number;
}

export default function AudioConsole({
  roastText,
  parsedName,
  role,
  rating,
}: AudioConsoleProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [playSpeed, setPlaySpeed] = useState(1);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const buildSpeechText = () => {
    const clean = roastText
      .replace(/[#*`🚨]/g, "")
      .replace(/Translation:/gi, "What that actually implies:");
    return `Subject Profile: ${parsedName}. Profession of Disappointment: ${role}. Self Esteem Rating: ${rating} out of 10. Let the incineration begin. ${clean}`;
  };

  const startProgressTracking = (audio: HTMLAudioElement) => {
    progressTimerRef.current = setInterval(() => {
      if (audio.duration) {
        setPlaybackProgress((audio.currentTime / audio.duration) * 100);
      }
    }, 200);
  };

  const stopProgressTracking = () => {
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  };

  const handleTogglePlay = async () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      stopProgressTracking();
      return;
    }

    if (
      audioRef.current &&
      !isPlaying &&
      playbackProgress > 0 &&
      playbackProgress < 100
    ) {
      audioRef.current.play();
      setIsPlaying(true);
      startProgressTracking(audioRef.current);
      return;
    }

    setIsLoading(true);
    setPlaybackProgress(0);

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: buildSpeechText() }),
      });

      if (!res.ok) throw new Error("TTS request failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }

      const audio = new Audio(url);
      audio.playbackRate = playSpeed;
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
        setPlaybackProgress(100);
        stopProgressTracking();
      };

      audio.onerror = () => {
        setIsPlaying(false);
        stopProgressTracking();
      };

      await audio.play();
      setIsPlaying(true);
      startProgressTracking(audio);
    } catch (err) {
      console.error("TTS error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaySpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

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
        <span className="font-mono text-[8px] text-slate-500 uppercase">
          Powered by ElevenLabs
        </span>
      </div>

      {/* Equalizer */}
      <div className="space-y-4">
        <div className="h-10 flex items-end justify-center gap-1.5 bg-slate-950/60 p-2.5 rounded-xl border border-white/5 overflow-hidden">
          {isPlaying ? (
            Array.from({ length: 24 }).map((_, i) => {
              const heights = [
                "h-3",
                "h-7",
                "h-5",
                "h-9",
                "h-4",
                "h-8",
                "h-6",
                "h-2",
              ];
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
              {isLoading ? "Generating voice..." : "Press Play to hear insults"}
            </div>
          )}
        </div>

        <div className="space-y-1">
          <div className="flex justify-between font-mono text-[9px] text-slate-500 uppercase">
            <span>Playback</span>
            <span>{Math.floor(playbackProgress)}%</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-200"
              style={{ width: `${playbackProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Speed slider */}
      <div className="pb-2">
        <div className="space-y-1 max-w-xs">
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
            onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Play button */}
      <div className="flex justify-center">
        <button
          type="button"
          id="listen-roast-btn"
          onClick={handleTogglePlay}
          disabled={isLoading}
          className={`px-8 py-3 rounded-xl font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer ${
            isPlaying
              ? "bg-zinc-800 hover:bg-zinc-700 text-white border border-white/10"
              : isLoading
                ? "bg-zinc-900 border border-white/5 text-slate-500 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Generating Voice...</span>
            </>
          ) : isPlaying ? (
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
