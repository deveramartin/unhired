"use client";

import { ReactNode } from "react";
import { ViewType, User } from "../types";
import { Flame, History, LogOut, UploadCloud, UserCircle } from "lucide-react";

interface NavbarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  user: User | null;
  logout: () => void;
  children: ReactNode;
}

export default function Navbar({
  currentView,
  setView,
  user,
  logout,
  children,
}: NavbarProps) {
  return (
    <div>
      <nav className="border-b border-white/10 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-6 lg:px-8 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo with bento signature accent */}
          <button
            id="nav-logo-btn"
            onClick={() => {}}
            className="flex items-center space-x-2.5 focus:outline-none group text-left"
          >
            <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center font-black text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-transform duration-300 group-hover:scale-105">
              U
            </div>
            <div>
              <span className="font-mono text-xl font-bold tracking-tighter text-white block">
                UNHIRED
                <span className="text-emerald-500 font-extrabold underline underline-offset-4 decoration-2 animate-pulse">
                  .AI
                </span>
              </span>
            </div>
          </button>

          {/* View Switcher / Navbar Links */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            <button
              id="nav-home-btn"
              onClick={() => {}}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold tracking-wider transition-all duration-200 ${
                currentView === "landing"
                  ? "bg-zinc-900 border border-white/10 text-white"
                  : "text-slate-400 hover:text-emerald-400 hover:bg-white/5"
              }`}
            >
              Home
            </button>

            {user ? (
              <>
                <button
                  id="nav-roast-btn"
                  onClick={() => setView("roast")}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold tracking-wider transition-all duration-200 flex items-center space-x-1.5 ${
                    currentView === "roast"
                      ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.05)]"
                      : "text-slate-400 hover:text-emerald-400 hover:bg-white/5"
                  }`}
                >
                  <UploadCloud className="h-3.5 w-3.5" />
                  <span>New Roast</span>
                </button>

                <button
                  id="nav-history-btn"
                  onClick={() => setView("history")}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold tracking-wider transition-all duration-200 flex items-center space-x-1.5 ${
                    currentView === "history"
                      ? "bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.05)]"
                      : "text-slate-400 hover:text-amber-400 hover:bg-white/5"
                  }`}
                >
                  <History className="h-3.5 w-3.5" />
                  <span>Wall of Shame</span>
                </button>
              </>
            ) : (
              <button
                id="nav-cta-roast-btn"
                onClick={() => setView("login")}
                className="px-3.5 py-1.5 rounded-lg font-mono text-xs font-black tracking-wider bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all duration-200 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-[1.02]"
              >
                Get Roasted
              </button>
            )}
          </div>

          {/* User profile side */}
          <div className="flex items-center space-x-3 pl-3 border-l border-white/10">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden md:block text-right">
                  <span className="block text-xs font-mono font-bold text-white leading-3">
                    {user.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    Target Candidate
                  </span>
                </div>
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="h-8 w-8 rounded-full border border-white/10 object-cover bg-zinc-900"
                />
                <button
                  id="logout-btn"
                  onClick={logout}
                  title="Sign Out"
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                id="login-icon-btn"
                onClick={() => setView("login")}
                className="flex items-center space-x-1.5 py-1.5 px-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all text-xs font-mono"
              >
                <UserCircle className="h-4 w-4 text-emerald-500" />
                <span className="hidden sm:inline">Recruiter Portal</span>
              </button>
            )}
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
