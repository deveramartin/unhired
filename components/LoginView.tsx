"use client";

import { SignInWithGoogle } from "@/services/auth.service";
import { User } from "@/types/types";
import { ShieldAlert, Sparkles, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface LoginViewProps {
  onLoginSuccess: (user: User) => void;
}

export default function LoginView({ onLoginSuccess }: LoginViewProps) {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const route = useRouter();

  const handleGoogleLogin = async () => {
    // Generate standard mock user upon clicks
    setIsGoogleLoading(true);
    const result = await SignInWithGoogle();

    if (result && !result.success) {
      toast.error(result.message);
      setIsGoogleLoading(false)
    }

    toast.success("Redirecting to Google for authentication")

    const mockUsers = [
      {
        name: "Hopeful Dev",
        email: "hopeful.dev@gmail.com",
        avatarUrl:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      },
      {
        name: "PM Prodigy",
        email: "pm.synergy@gmail.com",
        avatarUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      },
      {
        name: "Code Crusader",
        email: "crusader.code@gmail.com",
        avatarUrl:
          "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
      },
    ];

    const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    onLoginSuccess(randomUser);
  };

  return (
    <div className="min-h-[calc(100vh-73px)] flex flex-col items-center justify-center bg-slate-950 px-4 py-12 relative text-slate-200">
      {/* Decorative background glows */}
      <div className="absolute top-[30%] left-[45%] w-60 h-60 bg-emerald-950/15 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[30%] w-52 h-52 bg-slate-900/30 rounded-full blur-[60px] pointer-events-none" />

      {/* Main Login Card - Bento theme styled */}
      <div className="max-w-md w-full bg-zinc-900 border border-white/5 rounded-3xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-md relative overflow-hidden text-center space-y-6">
        {/* Card Header & Branding */}
        <div className="space-y-2">
          <div className="inline-flex p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl mb-2 text-emerald-400">
            <ShieldAlert className="h-6 w-6 animate-pulse" />
          </div>
          <h2 className="text-lg font-mono font-bold tracking-tight text-white uppercase">
            Recruiter Portal Access
          </h2>
          <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-sm mx-auto">
            To generate personalized, high-performance resume insults and track
            your rejection timeline, log in below.
          </p>
        </div>

        {/* Cynical Quotes list */}
        <div className="bg-slate-950 border border-white/5 p-4 rounded-xl text-left font-mono text-[10px] space-y-1.5 text-slate-400">
          <div className="flex items-start gap-1.5 text-slate-300">
            <span className="text-emerald-500 font-bold">•</span>
            <span>Unlocks customized PDF parsing</span>
          </div>
          <div className="flex items-start gap-1.5 text-slate-300">
            <span className="text-emerald-500 font-bold">•</span>
            <span>Simulates real-time voice feedback (Text-To-Speech)</span>
          </div>
          <div className="flex items-start gap-1.5 text-slate-300">
            <span className="text-emerald-500 font-bold">•</span>
            <span>
              Logs your past failures into a persistent historical list
            </span>
          </div>
        </div>

        {/* Continue with Google button matching Tailwind Google branding guidelines */}
        <div className="space-y-4 pt-2">
          <button
            id="google-signin-btn"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-neutral-100 text-zinc-900 px-5 py-3 rounded-xl text-sm font-semibold tracking-wide border border-neutral-300 transition-all duration-200 cursor-pointer shadow-md active:scale-[0.99]"
          >
            {/* Google SVG Logo */}
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="matrix(1, 0, 0, 1, 0, 0)">
                <path
                  d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.57h3.3c1.93,-1.78 3.04,-4.4 3.04,-7.49 0,-0.31 -0.03,-0.62 -0.08,-0.88Z"
                  fill="#4285F4"
                />
                <path
                  d="M12,20.6c2.43,0 4.47,-0.8 5.96,-2.18l-3.3,-2.57c-0.9,0.61 -2.07,0.98 -3.12,0.98 -2.43,0 -4.5,-1.64 -5.24,-3.84H2.89v2.66C4.38,18.59 7.91,20.6 12,20.6Z"
                  fill="#34A853"
                />
                <path
                  d="M6.76,13.01c-0.19,-0.57 -0.3,-1.18 -0.3,-1.8s0.11,-1.23 0.3,-1.8V6.75H2.89c-0.61,1.22 -0.96,2.6 -0.96,4.06s0.35,2.84 0.96,4.06l3.87,-2.86Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12,6.44c1.32,0 2.5,0.45 3.44,1.35l2.58,-2.58C16.46,3.77 14.42,2.9 12,2.9c-4.09,0 -7.62,2.01 -9.11,4.95l3.87,2.86c0.74,-2.2 2.81,-3.84 5.24,-3.84Z"
                  fill="#EA4335"
                />
              </g>
            </svg>
            <span>Continue with Google</span>
          </button>

          <p className="text-[10px] text-slate-500 font-mono">
            No password required. Your security is safe, unlike your career.
          </p>
        </div>

        {/* Footer Warning */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-center gap-1.5 text-[9px] text-slate-500 font-mono">
          <Star className="h-3 w-3 text-emerald-500 animate-pulse fill-emerald-500/10" />
          <span>
            By continuing, you accept that AI opinions are highly fictional.
          </span>
        </div>
      </div>
    </div>
  );
}
