"use client";

import React, { useState, useEffect } from "react";
import { RoastResult, ViewState } from "@/types/roast";

interface ReportPaneProps {
  viewState: ViewState;
  result: RoastResult | null;
  onTrySample: () => void;
  onRoastAgain: () => void;
  onNewCode: () => void;
  onRetry: () => void;
}

const ANALYZING_MESSAGES = [
  "Compiler ki chai thandi ho rahi hai… ☕",
  "Sharma ji ke bete se comparison chal raha hai… 👦",
  "Bhau, roast tayyar ho raha hai… 🌶️",
  "Panchavati Express se bhi late chal raha hai tumhara loop… 🚂",
  "Godavari ghat pe debug kar rahe hain tumhara logic… 🌊",
  "Nashik Misal jitna spicy banaya ja raha hai verdict… 🔥"
];

export default function ReportPane({
  viewState,
  result,
  onTrySample,
  onRoastAgain,
  onNewCode,
  onRetry
}: ReportPaneProps) {
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  // Rotate analyzing messages every 2.2 seconds during loading
  useEffect(() => {
    if (viewState !== "analyzing") return;
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % ANALYZING_MESSAGES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [viewState]);

  const handleCopyCode = async () => {
    if (!result?.correctedCode) return;
    try {
      await navigator.clipboard.writeText(result.correctedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleShare = async () => {
    const textToShare = `🔥 Code Roaster (DevFest Nashik 2026)\nRoast Score: ${result?.score}/100 [${result?.scoreLabel}]\n"${result?.headline}"\n\nTry roasting your code: ${window.location.origin}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Code Roaster Verdict",
          text: textToShare
        });
      } catch {
        // Cancelled or unsupported
      }
    } else {
      await navigator.clipboard.writeText(textToShare);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2500);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FFFFFF] rounded-b-[20px] lg:rounded-bl-none lg:rounded-br-[20px] p-4 sm:p-6 overflow-y-auto">
      {/* 1. EMPTY STATE */}
      {viewState === "idle" && (
        <div className="flex flex-col items-center justify-center h-full text-center py-8">
          {/* Header Badge */}
          <div className="inline-flex items-center gap-1.5 bg-[#EFF2FB] border-[2px] border-[#141414] px-3 py-1 rounded-full text-[11px] font-bold font-mono tracking-wider text-[#4285F4] mb-4">
            <span>AUDIT // REPORT</span>
            <span className="text-[#141414]">·</span>
            <span className="text-[#141414]">WAITING FOR CODE</span>
          </div>

          {/* Neo-brutalist Ascii Illustrated Bug Mascot */}
          <div className="w-24 h-24 mb-4 bg-[#F8F4EC] border-[2.5px] border-[#141414] rounded-2xl shadow-[4px_4px_0px_#141414] flex flex-col items-center justify-center p-3 relative group hover:rotate-3 transition-transform">
            <span className="text-xs font-mono font-bold text-[#EDB13E]">◇</span>
            <div className="bg-[#141414] text-white px-2 py-1 rounded font-mono text-sm font-bold tracking-widest mt-1">
              ? _ ?
            </div>
            <span className="text-[10px] text-[#8F9194] font-mono mt-1">
              BUG_DETECT
            </span>
            <span className="absolute -top-2 -right-2 bg-[#EA4335] text-white text-[10px] font-black px-1.5 py-0.5 rounded-full border-[1.5px] border-[#141414] shadow-[1px_1px_0px_#141414]">
              0 BUGS
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-['Bricolage_Grotesque'] text-[#141414] mb-2">
            Your code is suspiciously quiet.
          </h3>
          <p className="text-sm text-[#66625B] max-w-sm mb-6 font-medium">
            Paste some code and let’s find out why it was crying in production.
          </p>

          <button
            type="button"
            onClick={onTrySample}
            className="neo-button-secondary px-5 py-2.5 text-xs sm:text-sm flex items-center gap-2 cursor-pointer mb-8"
          >
            <span>[ TRY SAMPLE BUG → ]</span>
          </button>

          {/* Feature Teaser Pills */}
          <div className="grid grid-cols-2 gap-2 max-w-xs text-left w-full">
            <div className="bg-[#F8F4EC] border-[1.5px] border-[#141414] rounded-xl p-2 text-xs font-bold flex items-center gap-2">
              <span>🔥</span> <span>Savage Roast</span>
            </div>
            <div className="bg-[#F8F4EC] border-[1.5px] border-[#141414] rounded-xl p-2 text-xs font-bold flex items-center gap-2">
              <span>🧪</span> <span>Root Cause</span>
            </div>
            <div className="bg-[#F8F4EC] border-[1.5px] border-[#141414] rounded-xl p-2 text-xs font-bold flex items-center gap-2">
              <span>🛠️</span> <span>One-Click Fix</span>
            </div>
            <div className="bg-[#F8F4EC] border-[1.5px] border-[#141414] rounded-xl p-2 text-xs font-bold flex items-center gap-2">
              <span>🌶️</span> <span>Nashik Slang</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. ANALYZING / LOADING STATE */}
      {viewState === "analyzing" && (
        <div className="flex flex-col items-center justify-center h-full text-center py-12">
          {/* Tilted Geometric Diamond Square Loader */}
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-[#EDB13E] border-[3px] border-[#141414] shadow-[5px_5px_0px_#141414] rounded-2xl rotate-12 flex items-center justify-center animate-pulse">
              <span className="text-3xl -rotate-12 animate-bounce">🔥</span>
            </div>
            <div className="absolute -bottom-2 -right-3 bg-white border-[2px] border-[#141414] shadow-[2px_2px_0px_#141414] px-2 py-0.5 rounded-full text-[10px] font-bold font-mono">
              ANALYZING
            </div>
          </div>

          <span className="inline-block bg-[#EFF2FB] border-[2px] border-[#141414] px-3 py-1 rounded-full text-xs font-mono font-bold text-[#4285F4] mb-3">
            AUDIT // IN PROGRESS
          </span>

          <h3 className="text-lg sm:text-xl font-bold font-['Bricolage_Grotesque'] text-[#141414] max-w-md h-12 flex items-center justify-center px-4">
            {ANALYZING_MESSAGES[messageIndex]}
          </h3>

          <p className="text-xs text-[#66625B] font-mono mt-2">
            Panchavati Express speed check in progress · Gemini 2.5 Flash
          </p>

          {/* Multi-color Segmented Progress Meter */}
          <div className="w-48 h-3.5 bg-white border-[2px] border-[#141414] rounded-full overflow-hidden mt-6 p-0.5 flex gap-1 shadow-[2px_2px_0px_#141414]">
            <div className="h-full w-1/3 bg-[#34A853] rounded-full animate-pulse"></div>
            <div className="h-full w-1/3 bg-[#FBBC05] rounded-full animate-pulse delay-100"></div>
            <div className="h-full w-1/3 bg-[#EA4335] rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
      )}

      {/* 3. RESULT STATE */}
      {viewState === "result" && result && (
        <div className="flex flex-col gap-5 text-left animate-in fade-in duration-200">
          {/* Header Row: Label & Rubber Stamp Badge */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b-[2px] border-[#141414]">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-[#F8F4EC] border-[2px] border-[#141414] px-3 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wider text-[#141414] mb-2">
                <span>AUDIT // REPORT</span>
                <span>·</span>
                <span className="text-[#EA4335] font-extrabold">{result.spiceVerdict || "Zanzanit 🌶️"}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold font-['Bricolage_Grotesque'] text-[#141414] leading-snug">
                &ldquo;{result.headline}&rdquo;
              </h2>
            </div>

            {/* Rubber Stamp Roast Score Badge */}
            <div className="neo-stamp flex-shrink-0 self-start sm:self-auto bg-[#F7E3A8]">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#66625B]">
                ROAST SCORE
              </span>
              <span className="text-3xl sm:text-4xl font-black font-['Bricolage_Grotesque'] text-[#141414]">
                {result.score}
                <span className="text-xs text-[#8F9194] font-mono font-normal">/100</span>
              </span>
              <span className="text-[9px] font-extrabold tracking-wider text-[#EA4335] text-center font-mono max-w-[130px] leading-tight mt-0.5">
                {result.scoreLabel}
              </span>
            </div>
          </div>

          {/* Issue Cards Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold font-mono tracking-wider text-[#66625B] uppercase">
                DETECTED CRIMES & CODE SMELLS ({result.issues?.length || 0})
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {result.issues?.map((issue, idx) => {
                const severityColors = {
                  HIGH: "bg-[#EA4335] text-white border-[#141414]",
                  MEDIUM: "bg-[#FBBC05] text-[#141414] border-[#141414]",
                  LOW: "bg-[#34A853] text-white border-[#141414]"
                };

                return (
                  <div
                    key={idx}
                    className="border-[2px] border-[#141414] rounded-xl p-3 sm:p-4 bg-[#F8F4EC] shadow-[3px_3px_0px_#141414]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-white border-[1.5px] border-[#141414] px-2 py-0.5 rounded text-[11px] font-mono font-bold text-[#141414]">
                          Ln {issue.lines}
                        </span>
                        <span className="text-xs font-bold font-mono text-[#66625B]">
                          {issue.category}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border-[1.5px] shadow-[1px_1px_0px_#141414] ${
                          severityColors[issue.severity] || severityColors.MEDIUM
                        }`}
                      >
                        {issue.severity}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-[#141414] mb-2 leading-relaxed">
                      &ldquo;{issue.roast}&rdquo;
                    </p>

                    <div className="bg-white border-[1.5px] border-[#141414] rounded-lg p-2 text-xs text-[#141414] font-medium flex items-start gap-1.5">
                      <span className="text-[#34A853] font-bold">Fix:</span>
                      <span>{issue.fix}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Error Explainer (if available) */}
          {result.errorExplanation && (
            <div className="bg-[#EFF2FB] border-[2px] border-[#141414] rounded-xl p-3 sm:p-4 shadow-[3px_3px_0px_#141414]">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-mono font-bold text-[#4285F4]">
                  ERROR // WHAT HAPPENED
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#141414] font-medium leading-relaxed">
                {result.errorExplanation}
              </p>
            </div>
          )}

          {/* REDEMPTION ARC */}
          <div className="mt-2 border-[2.5px] border-[#141414] rounded-2xl bg-[#171717] text-[#F7F3EA] p-4 sm:p-5 shadow-[4px_4px_0px_#141414]">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#333333]">
              <div>
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#EDB13E] uppercase block">
                  REDEMPTION ARC
                </span>
                <span className="text-xs sm:text-sm font-bold text-white">
                  Ab asli fix dekh, bhau.
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyCode}
                className="bg-[#EDB13E] text-[#141414] border-[2px] border-[#141414] shadow-[2px_2px_0px_#141414] px-3.5 py-1.5 rounded-full text-xs font-bold font-mono hover:bg-[#F7E3A8] transition-all cursor-pointer"
              >
                {copied ? "COPIED ✓" : "COPY CODE →"}
              </button>
            </div>

            <pre className="text-xs font-mono text-[#F7F3EA] overflow-x-auto code-scroll p-2 leading-relaxed bg-[#121212] rounded-lg border border-[#2B2B2B]">
              <code>{result.correctedCode}</code>
            </pre>
          </div>

          {/* Encouragement Note */}
          <div className="bg-[#F8F4EC] border-[2px] border-[#141414] rounded-xl p-3 text-center shadow-[2px_2px_0px_#141414]">
            <p className="text-xs text-[#141414] font-semibold italic">
              &ldquo;{result.encouragement}&rdquo;
            </p>
          </div>

          {/* Closing Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="neo-button-primary px-4 py-2 text-xs font-bold cursor-pointer"
              >
                {shareSuccess ? "LINK COPIED! 📋" : "SHARE ROAST 🚀"}
              </button>
              <button
                type="button"
                onClick={onRoastAgain}
                className="neo-button-secondary px-4 py-2 text-xs font-bold cursor-pointer"
              >
                ROAST AGAIN, SPICIER 🔥
              </button>
            </div>

            <button
              type="button"
              onClick={onNewCode}
              className="text-xs font-bold font-mono text-[#66625B] hover:text-[#141414] underline underline-offset-4 cursor-pointer"
            >
              [ NEW CODE ]
            </button>
          </div>
        </div>
      )}

      {/* 4. ERROR / RATE LIMIT STATE */}
      {viewState === "error" && (
        <div className="flex flex-col items-center justify-center h-full text-center py-8">
          <div className="w-16 h-16 bg-[#EA4335] text-white border-[2.5px] border-[#141414] shadow-[4px_4px_0px_#141414] rounded-2xl flex items-center justify-center text-3xl mb-4">
            ⚠️
          </div>

          <div className="inline-block bg-[#FDF0F0] border-[2px] border-[#EA4335] px-3 py-1 rounded-full text-xs font-mono font-bold text-[#EA4335] mb-2">
            ROAST // INTERRUPTED
          </div>

          <h3 className="text-xl font-bold font-['Bricolage_Grotesque'] text-[#141414] mb-2">
            Bhau, Gemini ne chai break le li!
          </h3>

          <p className="text-xs sm:text-sm text-[#66625B] max-w-sm mb-6 font-medium">
            Bhai, itni bhi jaldi kya hai? Thoda ruk, roast ko bhi marinate hone do. Panchavati Express signal pe atki hai.
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onRetry}
              className="neo-button-primary px-5 py-2.5 text-xs font-bold cursor-pointer"
            >
              TRY AGAIN →
            </button>
            <button
              type="button"
              onClick={onTrySample}
              className="neo-button-secondary px-4 py-2.5 text-xs font-bold cursor-pointer"
            >
              USE OFFLINE SAMPLE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
