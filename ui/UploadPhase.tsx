"use client";

import React, { useRef } from "react";
import { Upload, FileText, Trash2, Sparkles, ArrowRight } from "lucide-react";

interface UploadPhaseProps {
  selectedFile: File | null;
  selectedRole: string;
  onFileChange: (file: File | null) => void;
  onRoleChange: (role: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function UploadPhase({
  selectedFile,
  selectedRole,
  onFileChange,
  onRoleChange,
  onSubmit,
}: UploadPhaseProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = React.useState(false);
  const [isAuto, setIsAuto] = React.useState(false);
  const [customRole, setCustomRole] = React.useState("");

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type === "application/pdf" || file?.name.endsWith(".pdf")) {
      onFileChange(file);
    } else {
      alert("We only roast high-fidelity PDF formats. Please do not feed us other junk.");
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type === "application/pdf" || file?.name.endsWith(".pdf")) {
      onFileChange(file);
    } else {
      alert("We only roast PDF files. Standard corporate rejection standard.");
    }
  };

  // Sync custom role up to parent whenever it changes
  const handleCustomRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomRole(val);
    setIsAuto(false);
    onRoleChange(val);
  };

  const handleAutoClick = () => {
    setIsAuto(true);
    setCustomRole("");
    onRoleChange("auto");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-white uppercase flex items-center justify-center gap-2">
          The Incineration Chamber
        </h1>
        <p className="text-xs text-slate-500 font-mono">
          Assigned Agent: Recruiter AI v6.2 • Integrity Protocol: High Toxicity
        </p>
      </div>

      {/* Dropzone */}
      <div
        id="upload-dropzone"
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer select-none group ${
          dragActive
            ? "border-emerald-500 bg-emerald-500/10 shadow-[0_0_25px_rgba(16,185,129,0.15)] scale-99"
            : "border-white/10 bg-zinc-900/60 hover:border-emerald-500/50 hover:bg-zinc-900/80"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileInput}
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
                onFileChange(null);
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
              <Upload className="h-6 w-6" />
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

      {/* Role selector */}
      <div className="bg-zinc-900 border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2 pb-2.5 border-b border-white/5">
          <Sparkles className="h-4 w-4 text-emerald-500 animate-pulse" />
          <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
            Select Custom Career Filter (Optional)
          </label>
        </div>

        {/* Auto button + text input side by side */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            id="auto"
            type="button"
            onClick={handleAutoClick}
            className={`shrink-0 px-4 py-2.5 text-xs font-mono rounded-xl border text-center transition-all cursor-pointer ${
              isAuto
                ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                : "bg-slate-950 border-white/5 text-slate-400 hover:text-white hover:border-white/10"
            }`}
          >
            🤖 Auto Parse
          </button>

          {/* Divider */}
          <span className="hidden sm:block text-slate-600 font-mono text-xs self-center">or</span>

          {/* Custom role / industry input */}
          <input
            type="text"
            id="custom-role-input"
            value={customRole}
            onChange={handleCustomRoleChange}
            onClick={(e) => e.stopPropagation()}
            placeholder="e.g. Senior Frontend Engineer, Fintech PM, UX Designer..."
            className={`flex-1 bg-slate-950 border rounded-xl px-4 py-2.5 text-xs font-mono text-slate-200 placeholder-slate-600 outline-none transition-all ${
              !isAuto && customRole
                ? "border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.08)] text-emerald-300"
                : "border-white/5 focus:border-emerald-500/50 focus:shadow-[0_0_10px_rgba(16,185,129,0.06)]"
            }`}
          />
        </div>

        <p className="text-[10px] text-slate-500 font-mono mt-1 text-left">
          * Type a specific role or industry to get a targeted roast, or use Auto Parse to let the AI decide.
        </p>
      </div>

      {/* Submit */}
      <div className="flex justify-center">
        <button
          type="submit"
          id="start-roast-btn"
          disabled={!selectedFile}
          className={`group relative w-full sm:w-auto px-10 py-3.5 font-mono font-bold uppercase text-xs tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center space-x-2.5 ${
            selectedFile
              ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02] cursor-pointer font-extrabold"
              : "bg-zinc-900 border border-white/5 text-slate-600 cursor-not-allowed"
          }`}
        >
          <span>Incinerate Resume</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </form>
  );
}