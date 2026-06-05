"use client";

import React, { useState, useEffect, useRef } from "react";
import { RoastRecord, User } from "@/types/types";
import { LOADING_PHRASES, generateRoastFromUpload } from "../utils/roasts";
import UploadPhase from "@/ui/UploadPhase";
import LoadingPhase from "@/ui/LoadingPhase";
import ScoreCard from "@/ui/ScoreCard";
import AudioConsole from "@/ui/AudioConsole";
import BuzzwordsCard from "@/ui/BuzzwordCard";
import RoastTextCard from "@/ui/RoastTextCard";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [playSpeed, setPlaySpeed] = useState<number>(1);
  const [cynicismLevel, setCynicismLevel] = useState<number>(85);

  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Rotate loading phrases
  useEffect(() => {
    if (phase !== "loading") return;
    const t = setInterval(() => {
      setLoadingPhraseIndex((prev) => (prev + 1) % LOADING_PHRASES.length);
    }, 1600);
    return () => clearInterval(t);
  }, [phase]);

  // Animate loading progress bar and transition to result
  useEffect(() => {
    if (phase !== "loading") return;
    setLoadingProgress(0);
    const t = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(t);
          setTimeout(() => {
            const fileName = selectedFile ? selectedFile.name : "My_Pathetic_Resume.pdf";
            const targetRole = selectedRole === "auto" ? undefined : selectedRole;
            setCurrentRoast(generateRoastFromUpload(fileName, targetRole));
            setPhase("result");
            setIsPlaying(false);
            setPlaybackProgress(0);
          }, 300);
          return 100;
        }
        return Math.min(prev + Math.floor(Math.random() * 12) + 4, 100);
      });
    }, 120);
    return () => clearInterval(t);
  }, [phase, selectedFile, selectedRole]);

  // Playback progress simulation
  useEffect(() => {
    if (isPlaying) {
      progressTimerRef.current = setInterval(() => {
        setPlaybackProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            clearInterval(progressTimerRef.current!);
            return 100;
          }
          return prev + 1 * playSpeed;
        });
      }, 150);
    } else {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    }
    return () => { if (progressTimerRef.current) clearInterval(progressTimerRef.current); };
  }, [isPlaying, playSpeed]);

  // Cancel speech on unmount
  useEffect(() => {
    return () => { window.speechSynthesis?.cancel(); };
  }, []);

  const stopSpeaking = () => {
    window.speechSynthesis?.cancel();
    setIsPlaying(false);
  };

  const handleTogglePlay = () => {
    if (!currentRoast || !window.speechSynthesis) return;

    if (isPlaying) {
      stopSpeaking();
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = currentRoast.roastText
      .replace(/[#*`🚨]/g, "")
      .replace(/Translation:/gi, "What that actually implies:");

    const utterance = new SpeechSynthesisUtterance(
      `Subject Profile: ${currentRoast.parsedName}. Assigned Profession of Disappointment: ${currentRoast.role}. Rated Self Esteem Level is ${currentRoast.rating} out of 10. Let the incineration begin. . . . ${cleanText}`
    );
    utterance.rate = playSpeed;
    utterance.pitch = Math.min(Math.max((cynicismLevel / 100) * 1.5 + 0.3, 0.5), 2.0);
    utterance.onend = () => { setIsPlaying(false); setPlaybackProgress(100); };
    utterance.onerror = () => setIsPlaying(false);

    speechRef.current = utterance;
    setIsPlaying(true);
    setPlaybackProgress(0);
    window.speechSynthesis.speak(utterance);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaySpeed(speed);
    if (isPlaying) stopSpeaking();
  };

  const handleCynicismChange = (level: number) => {
    setCynicismLevel(level);
    if (isPlaying) stopSpeaking();
  };

  const handleSaveToArchives = () => {
    if (!currentRoast) return;
    try {
      const existing = JSON.parse(localStorage.getItem("unhired_roast_history") || "[]");
      localStorage.setItem("unhired_roast_history", JSON.stringify([currentRoast, ...existing]));
      alert("Dignity Loss documented! This roast was successfully appended to your Past Sufferings archives.");
    } catch {
      alert("Failed to save roast. Your browser storage may be full.");
    }
  };

  const handleRestart = () => {
    stopSpeaking();
    setSelectedFile(null);
    setSelectedRole("auto");
    setCurrentRoast(null);
    setPlaybackProgress(0);
    setPhase("upload");
  };

  return (
    <div className="min-h-[calc(100vh-73px)] py-10 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-200 relative">
      <div className="absolute top-[10%] right-[5%] w-80 h-80 bg-emerald-950/20 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-72 h-72 bg-emerald-950/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative">
        {phase === "upload" && (
          <UploadPhase
            selectedFile={selectedFile}
            selectedRole={selectedRole}
            onFileChange={setSelectedFile}
            onRoleChange={setSelectedRole}
            onSubmit={(e) => { e.preventDefault(); if (selectedFile) setPhase("loading"); }}
          />
        )}

        {phase === "loading" && (
          <LoadingPhase
            loadingPhraseIndex={loadingPhraseIndex}
            loadingProgress={loadingProgress}
          />
        )}

        {phase === "result" && currentRoast && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              <ScoreCard roast={currentRoast} />
              <AudioConsole
                isPlaying={isPlaying}
                playbackProgress={playbackProgress}
                playSpeed={playSpeed}
                cynicismLevel={cynicismLevel}
                onTogglePlay={handleTogglePlay}
                onSpeedChange={handleSpeedChange}
                onCynicismChange={handleCynicismChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <BuzzwordsCard roast={currentRoast} />
              <RoastTextCard
                roast={currentRoast}
                onSave={handleSaveToArchives}
                onRestart={handleRestart}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}