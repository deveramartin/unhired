"use client";

import { ReactNode } from "react";
import { User } from "@/types/types";
import { History, LogOut, UploadCloud, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  user: User | null;
  logout: () => void;
  children: ReactNode;
}

export default function Navbar({ user, logout, children }: NavbarProps) {
  const router = useRouter();

  return (
    <div>
      <nav className="border-b border-white/10 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-6 lg:px-8 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <button
            id="nav-logo-btn"
            onClick={() => router.push("/")}
            className="flex items-center space-x-2.5 focus:outline-none group text-left"
          >
            <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center font-black text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-transform duration-300 group-hover:scale-105">
              U
            </div>
            <span className="font-mono text-xl font-bold tracking-tighter text-white">
              UNHIRED
              <span className="text-emerald-500 font-extrabold underline underline-offset-4 decoration-2 animate-pulse">
                .AI
              </span>
            </span>
          </button>

          {/* Nav Links */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            {user ? (
              <>
                <button
                  id="nav-roast-btn"
                  onClick={() => router.push("/roast")}
                  className="px-3 py-1.5 rounded-lg font-mono text-xs font-semibold tracking-wider transition-all duration-200 flex items-center space-x-1.5 text-slate-300 hover:text-white hover:bg-white/5"
                >
                  <UploadCloud className="h-3.5 w-3.5" />
                  <span>New Roast</span>
                </button>

                <button
                  id="nav-history-btn"
                  onClick={() => router.push("/history")}
                  className="px-3 py-1.5 rounded-lg font-mono text-xs font-semibold tracking-wider transition-all duration-200 flex items-center space-x-1.5 text-slate-300 hover:text-white hover:bg-white/5"
                >
                  <History className="h-3.5 w-3.5" />
                  <span>Wall of Shame</span>
                </button>
              </>
            ) : (
              <>
                <button
                  id="nav-home-btn"
                  onClick={() => router.push("/")}
                  className="px-3 py-1.5 rounded-lg font-mono text-xs font-semibold tracking-wider text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  Home
                </button>

                <button
                  id="nav-cta-roast-btn"
                  onClick={() => router.push("/login")}
                  className="px-3.5 py-1.5 rounded-lg font-mono text-xs font-black tracking-wider bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all duration-200 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-[1.02]"
                >
                  Get Roasted
                </button>
              </>
            )}
          </div>

          {/* User Profile / Auth */}
          <div className="flex items-center space-x-3 pl-3 border-l border-white/10">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden md:block text-right">
                  <span className="block text-xs font-mono font-bold text-white leading-3">
                    {user.email?.toLowerCase()}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    Target Candidate
                  </span>
                </div>
                {user.image && (
                  <img
                    src={user.image}
                    alt={user.email ?? "User avatar"}
                    referrerPolicy="no-referrer"
                    className="h-8 w-8 rounded-full border border-white/10 object-cover bg-zinc-900"
                  />
                )}
                <button
                  id="logout-btn"
                  title="Sign Out"
                  onClick={logout}
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
