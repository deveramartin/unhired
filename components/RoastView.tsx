'use client';

import React, { useState, useEffect, useRef } from 'react';
import { RoastRecord, User } from '@/types/types';
import { LOADING_PHRASES, generateRoastFromUpload } from '../utils/roasts';
import { 
  Upload, FileText, ArrowRight, Play, Pause, RefreshCw, AlertCircle, 
  Trash2, ShieldX, Sparkles, Volume2, Flame, ThumbsDown, Save, FileSpreadsheet
} from 'lucide-react';

interface RoastViewProps {
  user: User;
  onRoastCompleted: (record: RoastRecord) => void;
}

export default function RoastView({ user, onRoastCompleted }: RoastViewProps) {
  // Parsing states
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('auto');
  
  // App Phase states: 'upload' | 'loading' | 'result'
  const [phase, setPhase] = useState<'upload' | 'loading' | 'result'>('upload');
  const [loadingPhraseIndex, setLoadingPhraseIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Results
  const [currentRoast, setCurrentRoast] = useState<RoastRecord | null>(null);
  
  // Audio Playback Simulation
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [playSpeed, setPlaySpeed] = useState<number>(1); // Speech rate speed
  const [cynicismLevel, setCynicismLevel] = useState<number>(85); // Pitch simulation
  
  // Refs for tracking
  const fileInputRef = useRef<HTMLInputElement>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Cycling through cynical thoughts during loading phase
  useEffect(() => {
    let phraseTimer: NodeJS.Timeout;
    if (phase === 'loading') {
      phraseTimer = setInterval(() => {
        setLoadingPhraseIndex((prev) => (prev + 1) % LOADING_PHRASES.length);
      }, 1600);
    }
    return () => clearInterval(phraseTimer);
  }, [phase]);

  // 2. Incremental loading percentage bar representation
  useEffect(() => {
    let progressTimer: NodeJS.Timeout;
    if (phase === 'loading') {
      setLoadingProgress(0);
      progressTimer = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressTimer);
            // Finish scanning & output roast record
            setTimeout(() => {
              const fileName = selectedFile ? selectedFile.name : "My_Pathetic_Resume.pdf";
              const targetRole = selectedRole === 'auto' ? undefined : selectedRole;
              const generated = generateRoastFromUpload(fileName, targetRole);
              setCurrentRoast(generated);
              setPhase('result');
              setIsPlaying(false);
              setPlaybackProgress(0);
            }, 300);
            return 100;
          }
          const increment = Math.floor(Math.random() * 12) + 4;
          return Math.min(prev + increment, 100);
        });
      }, 120);
    }
    return () => clearInterval(progressTimer);
  }, [phase, selectedFile, selectedRole]);

  // 3. Audio simulated playback timer (also manages Web Speech synthesis)
  useEffect(() => {
    if (isPlaying) {
      progressTimerRef.current = setInterval(() => {
        setPlaybackProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            if (progressTimerRef.current) clearInterval(progressTimerRef.current);
            return 100;
          }
          // Increments based on selected speech speed
          return prev + (1 * playSpeed);
        });
      }, 150);
    } else {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    }

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPlaying, playSpeed]);

  // Cleanup speech synthesis on component unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf" || file.name.endsWith('.pdf')) {
        setSelectedFile(file);
      } else {
        alert("We only roast high-fidelity PDF formats. Please do not feed us other junk.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf" || file.name.endsWith('.pdf')) {
        setSelectedFile(file);
      } else {
        alert("We only roast PDF files. Standard corporate rejection standard.");
      }
    }
  };

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    setPhase('loading');
  };

  // Speaks the markdown main headers & bullet points using SpeechSynthesis
  const speakRoastText = () => {
    if (!currentRoast || !window.speechSynthesis) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    // Cancel any previous ones
    window.speechSynthesis.cancel();

    // Prepare speech content with clean plain-text conversion
    const cleanSpeechText = currentRoast.roastText
      .replace(/[#*`🚨]/g, '') // remove markdown symbols
      .replace(/Translation:/gi, 'What that actually implies:');

    const speakIntro = `Subject Profile: ${currentRoast.parsedName}. Assigned Profession of Disappointment: ${currentRoast.role}. Rated Self Esteem Level is ${currentRoast.rating} out of 10. Let the incineration begin. . . . ${cleanSpeechText}`;

    const utterance = new SpeechSynthesisUtterance(speakIntro);
    
    // Wire up rates/pitches based on sliders
    utterance.rate = playSpeed;
    // Map cynicism pitch (30-150) into speech synthesis pitch (0.5 to 2)
    const normalizedPitch = (cynicismLevel / 100) * 1.5 + 0.3;
    utterance.pitch = Math.min(Math.max(normalizedPitch, 0.5), 2.0);

    utterance.onend = () => {
      setIsPlaying(false);
      setPlaybackProgress(100);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    speechRef.current = utterance;
    setIsPlaying(true);
    setPlaybackProgress(0);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  // Helper routine to save roast record to shared state history on parent
  const handleSaveToArchives = () => {
    if (!currentRoast) return;
    onRoastCompleted(currentRoast);
    alert("Dignity Loss documented! This roast was successfully appended to your Past Sufferings archives.");
  };

  const handleRestart = () => {
    stopSpeaking();
    setSelectedFile(null);
    setSelectedRole('auto');
    setCurrentRoast(null);
    setPlaybackProgress(0);
    setPhase('upload');
  };

  // Custom inline parser to display markdown cleanly as interactive HTML elements
  const renderParsedMarkdown = (markdown: string) => {
    const lines = markdown.split('\n');
    return (
      <div className="space-y-4 font-sans text-sm text-slate-300 leading-relaxed text-left">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          
          if (trimmed.startsWith('###')) {
            return (
              <h4 key={idx} className="font-mono text-sm font-bold text-emerald-400 uppercase tracking-wide pt-4 pb-2 border-b border-white/5 flex items-center gap-2">
                <Flame className="h-4 w-4 animate-pulse flex-shrink-0 text-emerald-500" />
                <span>{trimmed.replace('###', '').trim()}</span>
              </h4>
            );
          }
          if (trimmed.startsWith('####')) {
            return (
              <h5 key={idx} className="font-mono text-xs font-bold text-white uppercase tracking-wider pt-3 pb-1">
                {trimmed.replace('####', '').trim()}
              </h5>
            );
          }
          if (trimmed.startsWith('*')) {
            const listContent = trimmed.substring(1).trim();
            // Match bold texts **text** inside list item
            const parts = listContent.split('**');
            return (
              <div key={idx} className="flex items-start gap-2.5 pl-2">
                <span className="text-emerald-500 leading-5 select-none font-bold text-lg">•</span>
                <span className="text-slate-300">
                  {parts.map((p, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="text-white font-bold">{p}</strong> : p)}
                </span>
              </div>
            );
          }
          
          if (trimmed === '') return <div key={idx} className="h-2" />;

          // Default text paragraphs with bold matching
          const parts = trimmed.split('**');
          return (
            <p key={idx} className="leading-relaxed">
              {parts.map((p, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="text-emerald-400 font-bold">{p}</strong> : p)}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-73px)] py-10 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-200 relative">
      {/* Dynamic fluorescent glows */}
      <div className="absolute top-[10%] right-[5%] w-80 h-80 bg-emerald-950/20 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-72 h-72 bg-emerald-950/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative">

        {/* ================= PHASE 1: UPLOAD & SELECTION ================= */}
        {phase === 'upload' && (
          <form onSubmit={handleStartScan} className="space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-white uppercase flex items-center justify-center gap-2">
                The Incineration Chamber
              </h1>
              <p className="text-xs text-slate-500 font-mono">
                Assigned Agent: Recruiter AI v6.2 • Integrity Protocol: High Toxicity
              </p>
            </div>

            {/* Dropzone container */}
            <div
              id="upload-dropzone"
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer select-none group ${
                dragActive 
                  ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_25px_rgba(16,185,129,0.15)] scale-99' 
                  : 'border-white/10 bg-zinc-900/60 hover:border-emerald-500/50 hover:bg-zinc-900/80'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              {selectedFile ? (
                <div className="space-y-4">
                  <div className="mx-auto w-14 h-14 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <FileText className="h-7 w-7" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-mono text-sm text-white font-bold max-w-md mx-auto truncate">
                      {selectedFile.name}
                    </p>
                    <p className="font-mono text-[10px] text-slate-500">
                      {(selectedFile.size / 1024).toFixed(1)} KB • PDF Format Loaded
                    </p>
                  </div>
                  <button
                    type="button"
                    id="trash-file-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                    }}
                    className="p-1 px-3 py-1.5 text-[10px] uppercase font-mono bg-slate-950 border border-white/5 rounded-lg text-slate-400 hover:text-rose-400 hover:border-rose-900/50 transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="h-3 w-3" />
                    <span>Disintegrate File</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="mx-auto w-14 h-14 bg-slate-950 border border-white/10 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-all duration-300">
                    <Upload className="h-6 w-6 group-hover:bounce" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-mono text-sm text-slate-300 font-bold">
                      Drag & Drop your resume PDF here
                    </p>
                    <p className="font-sans text-xs text-slate-500">
                      or click to browse filesystem imports
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-slate-600 bg-slate-950 py-1.5 px-3 rounded-lg max-w-xs mx-auto border border-white/5">
                    Max size: 10MB • Strictly PDF only
                  </div>
                </div>
              )}
            </div>

            {/* Target Specialty Select Widget */}
            <div className="bg-zinc-900 border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 pb-2.5 border-b border-white/5">
                <Sparkles className="h-4 w-4 text-emerald-500 animate-pulse" />
                <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                  Select Custom Career Filter (Optional)
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {[
                  { id: 'auto', label: '🤖 Auto Parse' },
                  { id: 'swe', label: '💻 Software Eng.' },
                  { id: 'pm', label: '📅 Product Mgr.' },
                  { id: 'junior', label: '👶 Junior Dev.' },
                  { id: 'designer', label: '🎨 UI Designer' },
                ].map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    id={`role-btn-${role.id}`}
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-2.5 text-xs font-mono rounded-xl border text-center transition-all cursor-pointer ${
                      selectedRole === role.id 
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                        : 'bg-slate-950 border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                    }`}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 font-mono mt-1 text-left">
                * Select a role above to override automatic PDF parsing with our tailored job category roasting engines!
              </p>
            </div>

            {/* Trigger Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                id="start-roast-btn"
                disabled={!selectedFile}
                className={`group relative w-full sm:w-auto px-10 py-3.5 font-mono font-bold uppercase text-xs tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center space-x-2.5 ${
                  selectedFile 
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02] cursor-pointer font-extrabold' 
                    : 'bg-zinc-900 border border-white/5 text-slate-600 cursor-not-allowed'
                }`}
              >
                <span>Incinerate Resume</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </form>
        )}

        {/* ================= PHASE 2: SCANNERS & PROGRESS ================= */}
        {phase === 'loading' && (
          <div className="space-y-10 py-16 text-center select-none">
            {/* Spinning Diagnostic Radar Grid */}
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
              
              {/* Humorous loading scanner thoughts switcher */}
              <div className="h-12 flex items-center justify-center bg-zinc-900 border border-white/5 p-3 rounded-lg">
                <span className="font-mono text-xs text-emerald-400 capitalize animate-pulse">
                  {LOADING_PHRASES[loadingPhraseIndex]}
                </span>
              </div>

              {/* Real percent display bar */}
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
        )}

        {/* ================= PHASE 3: THE DEMOLISH RESULTS ================= */}
        {phase === 'result' && currentRoast && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Top Score banner */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              
              {/* Score Badges */}
              <div className="md:col-span-4 bg-zinc-900 border border-white/5 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden text-center space-y-4 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-950/15 rounded-full blur-2xl pointer-events-none" />
                <span className="font-mono text-[9px] text-slate-500 tracking-widest uppercase block">
                  Self-Esteem Impact
                </span>

                <div className="space-y-2 py-4">
                  <span className="block text-6xl sm:text-7xl font-mono tracking-tighter font-extrabold text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    {currentRoast.rating}
                    <span className="text-xl font-mono text-slate-600 font-bold">/10</span>
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <ThumbsDown className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="font-mono text-[9px] text-emerald-400 font-bold uppercase">Critical Trauma</span>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-3 flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-500 text-left">Candidate:</span>
                  <span className="text-white font-bold text-right truncate max-w-[120px]">{currentRoast.parsedName}</span>
                </div>
              </div>

              {/* Synthesizer audio console */}
              <div className="md:col-span-8 bg-zinc-900 border border-white/5 rounded-3xl p-5 sm:p-6 flex flex-col justify-between space-y-6 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="flex items-center space-x-2">
                    <div className="p-1 px-2 bg-slate-950 border border-white/5 rounded text-emerald-400 font-mono text-[9px] uppercase tracking-wider flex items-center gap-1">
                      <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>Audio Out Live</span>
                    </div>
                    <span className="font-mono text-xs text-white font-bold uppercase">Sarcasm Synthesizer</span>
                  </div>
                  
                  {/* Speech Support Badge */}
                  {!window.speechSynthesis && (
                    <span className="font-mono text-[8px] text-amber-500 uppercase">TTS API Unresponsive</span>
                  )}
                </div>

                {/* Simulated playback tracking */}
                <div className="space-y-4">
                  {/* Equalizer animation */}
                  <div className="h-10 flex items-end justify-center gap-1.5 bg-slate-950/60 p-2.5 rounded-xl border border-white/5 overflow-hidden">
                    {isPlaying ? (
                      Array.from({ length: 24 }).map((_, i) => {
                        const heights = ['h-3', 'h-7', 'h-5', 'h-9', 'h-4', 'h-8', 'h-6', 'h-2'];
                        const randomHeight = heights[Math.floor(Math.random() * heights.length)];
                        return (
                          <div 
                            key={i} 
                            style={{ animationDelay: `${i * 30}ms` }}
                            className={`w-1 bg-emerald-500 rounded-full animate-pulse ${randomHeight}`} 
                          />
                        );
                      })
                    ) : (
                      <div className="w-full flex items-center justify-center text-[10px] text-slate-500 font-mono italic">
                        "Pre-routing vocal cords... Press Play to hear insults"
                      </div>
                    )}
                  </div>

                  {/* Range Progress Bar */}
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

                {/* Synthesis Parameter Inputs */}
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
                      onChange={(e) => {
                        const newSpeed = parseFloat(e.target.value);
                        setPlaySpeed(newSpeed);
                        if (isPlaying) {
                           stopSpeaking();
                        }
                      }}
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
                      onChange={(e) => {
                        const newPitch = parseInt(e.target.value);
                        setCynicismLevel(newPitch);
                        if (isPlaying) {
                           stopSpeaking();
                        }
                      }}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Play controls */}
                <div className="flex justify-center">
                  <button
                    type="button"
                    id="listen-roast-btn"
                    onClick={speakRoastText}
                    className={`px-8 py-3 rounded-xl font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                      isPlaying 
                        ? 'bg-zinc-800 hover:bg-zinc-700 text-white border border-white/10' 
                        : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
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
            </div>

            {/* Main Roast Details Container */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              
              {/* Left detail side: Sins found */}
              <div className="space-y-5">
                
                {/* Useless buzzwords list card */}
                <div className="bg-zinc-900 border border-white/5 rounded-3xl p-5 space-y-3 text-left shadow-sm">
                  <span className="font-mono text-[9px] uppercase text-slate-500 tracking-wider block font-bold border-b border-white/5 pb-2">
                    Useless Corporate Buzzwords Found
                  </span>
                  
                  <div className="flex flex-wrap gap-2 pt-1">
                    {currentRoast.buzzwords.map((bw, bIdx) => (
                      <span
                        key={bIdx}
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

                {/* Grammar Sins list card */}
                <div className="bg-zinc-900 border border-white/5 rounded-3xl p-5 space-y-3.5 text-left shadow-sm">
                  <span className="font-mono text-[9px] uppercase text-emerald-400 tracking-wider block font-bold border-b border-white/5 pb-2 flex items-center gap-1">
                    <ShieldX className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Formatting & Logic Sins</span>
                  </span>

                  <ul className="space-y-2.5">
                    {currentRoast.grammarSins.map((sin, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2 text-xs font-sans text-slate-400">
                        <span className="font-mono text-emerald-500 font-bold flex-shrink-0 text-[10px] mt-0.5">[{sIdx + 1}]</span>
                        <span>{sin}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Right detail side: Scathing text markdown render */}
              <div className="md:col-span-2 bg-zinc-900 border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
                
                {/* Subtitle / Filename indicator */}
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <span className="font-mono text-[10px] text-slate-500 tracking-wider flex items-center gap-1.5">
                    <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="truncate max-w-[200px]">{currentRoast.fileName}</span>
                  </span>
                  <span className="font-mono text-[9px] text-slate-500">{currentRoast.date}</span>
                </div>

                {/* Rendered Text */}
                {renderParsedMarkdown(currentRoast.roastText)}

                {/* Control Action footer tags */}
                <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="button"
                    id="save-archives-btn"
                    onClick={handleSaveToArchives}
                    className="w-full sm:w-auto px-5 py-2.5 bg-slate-950 hover:bg-slate-900 border border-white/10 rounded-xl text-xs font-mono font-bold text-slate-200 hover:text-white flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                  >
                    <Save className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Document Dignity Loss</span>
                  </button>

                  <button
                    type="button"
                    id="roast-another-btn"
                    onClick={handleRestart}
                    className="w-full sm:w-auto px-5 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 rounded-xl text-xs font-mono font-bold text-rose-400 hover:text-rose-300 flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                  >
                    <RefreshCw className="h-3.5 w-3.5 animate-spin text-rose-400" style={{ animationDuration: '6s' }} />
                    <span>Scan Another Victim</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
