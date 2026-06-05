import React from "react";
import { Flame } from "lucide-react";

export function renderParsedMarkdown(markdown: string) {
  const lines = markdown.split("\n");
  return (
    <div className="space-y-4 font-sans text-sm text-slate-300 leading-relaxed text-left">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (trimmed.startsWith("###")) {
          return (
            <h4
              key={idx}
              className="font-mono text-sm font-bold text-emerald-400 uppercase tracking-wide pt-4 pb-2 border-b border-white/5 flex items-center gap-2"
            >
              <Flame className="h-4 w-4 animate-pulse flex-shrink-0 text-emerald-500" />
              <span>{trimmed.replace("###", "").trim()}</span>
            </h4>
          );
        }
        if (trimmed.startsWith("####")) {
          return (
            <h5
              key={idx}
              className="font-mono text-xs font-bold text-white uppercase tracking-wider pt-3 pb-1"
            >
              {trimmed.replace("####", "").trim()}
            </h5>
          );
        }
        if (trimmed.startsWith("*")) {
          const listContent = trimmed.substring(1).trim();
          const parts = listContent.split("**");
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-2">
              <span className="text-emerald-500 leading-5 select-none font-bold text-lg">•</span>
              <span className="text-slate-300">
                {parts.map((p, pIdx) =>
                  pIdx % 2 === 1 ? (
                    <strong key={pIdx} className="text-white font-bold">{p}</strong>
                  ) : (
                    p
                  )
                )}
              </span>
            </div>
          );
        }

        if (trimmed === "") return <div key={idx} className="h-2" />;

        const parts = trimmed.split("**");
        return (
          <p key={idx} className="leading-relaxed">
            {parts.map((p, pIdx) =>
              pIdx % 2 === 1 ? (
                <strong key={pIdx} className="text-emerald-400 font-bold">{p}</strong>
              ) : (
                p
              )
            )}
          </p>
        );
      })}
    </div>
  );
}