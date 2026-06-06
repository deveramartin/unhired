"use client";

import React, { useState, useEffect, useRef } from "react";
import { RoastRecord } from "@/types/types";
import { User } from "@/db/schema";
import { LOADING_PHRASES } from "../utils/roasts";
import UploadPhase from "@/ui/UploadPhase";
import LoadingPhase from "@/ui/LoadingPhase";
import ScoreCard from "@/ui/ScoreCard";
import BuzzwordsCard from "@/ui/BuzzwordCard";
import RoastTextCard from "@/ui/RoastTextCard";
import { speech } from "@/lib/tts/speech";

interface RoastViewProps {
  user: User;
}

export default function RoastView({ user }: RoastViewProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("auto");
  const [phase, setPhase] = useState<"upload" | "loading" | "result">("upload");
  const [loadingPhraseIndex, setLoadingPhraseIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentRoast, setCurrentRoast] = useState<RoastRecord | null>(null);
  const [error, setError] = useState<string | null>(null);

  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const fetchAbortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (phase !== "loading") return;
    const t = setInterval(() => {
      setLoadingPhraseIndex((prev) => (prev + 1) % LOADING_PHRASES.length);
    }, 1600);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "loading") return;
    setLoadingProgress(0);
    progressTimerRef.current = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressTimerRef.current!);
          return 90;
        }
        return Math.min(prev + Math.floor(Math.random() * 8) + 2, 90);
      });
    }, 300);
    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [phase]);

  const saveRoast = async (roast: RoastRecord) => {
    try {
      const res = await fetch("/api/roast/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roast),
      });
      if (!res.ok) throw new Error();
    } catch {
      console.error("Auto-save failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setError(null);
    setPhase("loading");
    fetchAbortRef.current = new AbortController();

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      if (selectedRole !== "auto") formData.append("role", selectedRole);

      const res = await fetch("/api/roast", {
        method: "POST",
        body: formData,
        signal: fetchAbortRef.current.signal,
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to analyze CV");

      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      setLoadingProgress(100);

      setTimeout(() => {
        const roast: RoastRecord = {
          id: crypto.randomUUID(),
          date: json.data.date,
          fileName: json.data.fileName,
          fileSize: json.data.fileSize,
          parsedName: json.data.parsedName,
          role: json.data.role,
          roastText: json.data.roastText,
          rating: json.data.rating,
          buzzwords: json.data.buzzwords,
          grammarSins: json.data.grammarSins,
        };

        setCurrentRoast(roast);
        setPhase("result");

        saveRoast(roast);

        // Auto-play TTS
        speech(roast.roastText).catch((err) =>
          console.error("TTS error:", err),
        );
      }, 400);
    } catch (err: any) {
      if (err.name === "AbortError") return;
      setError(err.message ?? "Something went wrong");
      setPhase("upload");
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    }
  };

  const handleRestart = () => {
    fetchAbortRef.current?.abort();
    setSelectedFile(null);
    setSelectedRole("auto");
    setCurrentRoast(null);
    setError(null);
    setPhase("upload");
  };

  return (
    <div className="min-h-[calc(100vh-73px)] py-10 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-200 relative">
      <div className="absolute top-[10%] right-[5%] w-80 h-80 bg-emerald-950/20 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-72 h-72 bg-emerald-950/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative">
        {phase === "upload" && (
          <>
            {error && (
              <div className="mb-6 px-4 py-3 bg-rose-500/10 border border-rose-500/25 rounded-xl text-rose-400 font-mono text-xs text-center">
                {error}
              </div>
            )}
            <UploadPhase
              selectedFile={selectedFile}
              selectedRole={selectedRole}
              onFileChange={setSelectedFile}
              onRoleChange={setSelectedRole}
              onSubmit={handleSubmit}
            />
          </>
        )}

        {phase === "loading" && (
          <LoadingPhase
            loadingPhraseIndex={loadingPhraseIndex}
            loadingProgress={loadingProgress}
          />
        )}

        {phase === "result" && currentRoast && (
          <div className="md:space-y-8 gap-6 animate-fade-in grid grid-cols-1 md:grid-cols-5">
            <div className="space-y-5 w-full flex flex-col md:col-span-2">
              <div className="h-fit">
                <ScoreCard roast={currentRoast} />
              </div>
              <div className="flex-1">
                <BuzzwordsCard roast={currentRoast} />
              </div>
            </div>
            <div className="grid md:col-span-3">
              <RoastTextCard roast={currentRoast} onRestart={handleRestart} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
