"use client";

import { useState, useRef, useEffect } from "react";
import { RoastRecord } from "@/db/schema";
import {
  History,
  Search,
  Volume2,
  Calendar,
  Trash2,
  ThumbsDown,
  Pause,
  Frown,
  Loader2,
} from "lucide-react";

export default function HistoryView() {
  const [historyList, setHistoryList] = useState<RoastRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Fetch from Supabase on mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/roast/history");
        if (!res.ok) throw new Error("Failed to fetch history");
        const json = await res.json();
        setHistoryList(json.data ?? []);
      } catch (err: any) {
        setError(err.message ?? "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  useEffect(() => {
    return () => window.speechSynthesis?.cancel();
  }, []);

  const handleToggleSpeech = (record: RoastRecord) => {
    if (!window.speechSynthesis) return;

    if (activeSpeechId === record.id) {
      window.speechSynthesis.cancel();
      setActiveSpeechId(null);
      return;
    }

    window.speechSynthesis.cancel();

    const cleanLabel = record.roastText.replace(/[#*`🚨]/g, "").substring(0, 450);
    const text = `Replaying Roast diagnostic for ${record.parsedName}. Profession: ${record.role}. Score rating ${record.rating} out of 10. . . ${cleanLabel}`;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 0.9;
    utterance.onend = () => setActiveSpeechId(null);
    utterance.onerror = () => setActiveSpeechId(null);

    setActiveSpeechId(record.id);
    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const filteredHistory = historyList.filter((record) => {
    const q = searchQuery.toLowerCase();
    return (
      record.parsedName.toLowerCase().includes(q) ||
      record.role.toLowerCase().includes(q) ||
      record.fileName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-[calc(100vh-73px)] py-10 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-200 relative">
      <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-emerald-950/15 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-72 h-72 bg-emerald-950/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full space-y-8 relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-mono font-bold uppercase tracking-tight text-white flex items-center gap-2.5">
              <History className="h-6 w-6 text-emerald-500 animate-pulse" />
              <span>Dignity Archives</span>
            </h1>
            <p className="text-xs text-slate-500 font-mono">
              Chronological log of AI Recruiter human asset evaluations
            </p>
          </div>
          <div className="font-mono text-xs px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 font-bold">
            Insult Inventory:{" "}
            <span className="text-white ml-1">{historyList.length}</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
            <Search className="h-4 w-4" />
          </div>
          <input
            id="history-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter archives by candidate title, role, or filename..."
            className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-white/5 rounded-xl text-xs font-mono placeholder-zinc-500 focus:outline-none focus:border-emerald-500/60 text-white transition-all focus:ring-1 focus:ring-emerald-500/20"
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20 gap-3 text-slate-500 font-mono text-xs">
            <Loader2 className="h-5 w-5 animate-spin text-emerald-500" />
            <span>Retrieving dignity loss records...</span>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="px-4 py-3 bg-rose-500/10 border border-rose-500/25 rounded-xl text-rose-400 font-mono text-xs text-center">
            {error}
          </div>
        )}

        {/* History List */}
        {!loading && !error && filteredHistory.length > 0 && (
          <div className="grid grid-cols-1 gap-5">
            {filteredHistory.map((record) => {
              const speakIsPlaying = activeSpeechId === record.id;
              const bodySnippet = record.roastText
                .replace(/[#*`🚨]/g, "")
                .split("\n")
                .filter((l) => l.trim().length > 10)
                .slice(0, 2)
                .join(" ");

              return (
                <div
                  key={record.id}
                  className="bg-zinc-900 border border-white/5 hover:border-emerald-500/25 p-5 sm:p-6 rounded-3xl transition-all hover:bg-zinc-900/95 relative overflow-hidden group space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-950/5 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
                    <div className="space-y-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-white">
                          {record.parsedName}
                        </span>
                        <span className="px-2 py-0.5 text-[8px] font-mono font-bold uppercase rounded bg-slate-950 text-slate-400 border border-white/5">
                          PDF
                        </span>
                      </div>
                      <p className="font-mono text-xs text-slate-400">{record.role}</p>
                    </div>

                    <div className="flex items-center space-x-3 self-end sm:self-center">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-rose-500/10 border border-rose-500/20 rounded-lg font-mono text-xs text-rose-400">
                        <ThumbsDown className="h-3.5 w-3.5" />
                        <span>Score:</span>
                        <span className="font-bold">{record.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Snippet */}
                  <div className="text-left font-sans text-xs text-slate-400 leading-relaxed italic pr-2">
                    "{bodySnippet.length > 200 ? `${bodySnippet.substring(0, 200)}...` : bodySnippet}"
                  </div>

                  {/* Buzzwords */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {record.buzzwords.slice(0, 3).map((bw, i) => (
                      <span key={i} className="px-2 py-0.5 font-mono text-[9px] bg-slate-950 text-emerald-400 border border-white/5 rounded-md">
                        ⚠️ {bw}
                      </span>
                    ))}
                    {record.buzzwords.length > 3 && (
                      <span className="font-mono text-[9px] text-slate-500 self-center">
                        +{record.buzzwords.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/5 font-mono text-[10px]">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-emerald-500" />
                      <span>{new Date(record.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggleSpeech(record)}
                      className={`px-3 py-1.5 uppercase font-mono tracking-wider font-extrabold rounded-lg flex items-center gap-1.5 transition-all text-[10px] cursor-pointer ${
                        speakIsPlaying
                          ? "bg-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                          : "bg-slate-950 hover:bg-slate-900 border border-white/10 text-slate-400 hover:text-emerald-400"
                      }`}
                    >
                      {speakIsPlaying ? (
                        <><Pause className="h-3.5 w-3.5" /><span>Mute Record</span></>
                      ) : (
                        <><Volume2 className="h-3.5 w-3.5" /><span>Replay Roast Voice</span></>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredHistory.length === 0 && (
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-12 text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center">
              <Frown className="h-6 w-6 text-zinc-600" />
            </div>
            <div className="space-y-1.5 max-w-sm mx-auto select-none">
              <h3 className="font-mono text-sm font-bold text-white">Dignity Archives Empty</h3>
              <p className="text-xs text-zinc-500 font-sans leading-relaxed">
                Wow, your record feed is clean. Either you possess flawless credentials, or you're too terrified to experience our AI's assessment.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}