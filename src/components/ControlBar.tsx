"use client";

import React from "react";
import { RoastLevel, Persona } from "@/types/roast";

interface ControlBarProps {
  roastLevel: RoastLevel;
  setRoastLevel: (level: RoastLevel) => void;
  persona: Persona;
  setPersona: (persona: Persona) => void;
  language: string;
  setLanguage: (lang: string) => void;
  showErrorInput: boolean;
  setShowErrorInput: (show: boolean | ((prev: boolean) => boolean)) => void;
  errorMessage: string;
  setErrorMessage: (msg: string) => void;
  onRoast: () => void;
  isLoading: boolean;
}

export default function ControlBar({
  roastLevel,
  setRoastLevel,
  persona,
  setPersona,
  language,
  setLanguage,
  showErrorInput,
  setShowErrorInput,
  errorMessage,
  setErrorMessage,
  onRoast,
  isLoading
}: ControlBarProps) {
  return (
    <div className="border-b-[2.5px] border-[#141414] bg-[#F8F4EC] p-3 sm:p-4 rounded-t-[20px]">
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        {/* Left Side: Roast Level & Selectors */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Roast Level Segmented Control */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold font-mono tracking-wider text-[#66625B] uppercase mr-1 hidden sm:inline">
              SPICE:
            </span>
            <div className="inline-flex bg-white border-[2px] border-[#141414] rounded-full p-0.5 shadow-[2px_2px_0px_#141414]">
              <button
                type="button"
                onClick={() => setRoastLevel("halka")}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                  roastLevel === "halka"
                    ? "bg-[#FBBC05] text-[#141414] border-[1.5px] border-[#141414] shadow-[1px_1px_0px_#141414]"
                    : "text-[#66625B] hover:text-[#141414]"
                }`}
              >
                Halka 🍋
              </button>
              <button
                type="button"
                onClick={() => setRoastLevel("tikha")}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                  roastLevel === "tikha"
                    ? "bg-[#EDB13E] text-[#141414] border-[1.5px] border-[#141414] shadow-[1px_1px_0px_#141414]"
                    : "text-[#66625B] hover:text-[#141414]"
                }`}
              >
                Tikha 🌶️
              </button>
              <button
                type="button"
                onClick={() => setRoastLevel("zanzanit")}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                  roastLevel === "zanzanit"
                    ? "bg-[#EA4335] text-white border-[1.5px] border-[#141414] shadow-[1px_1px_0px_#141414]"
                    : "text-[#66625B] hover:text-[#141414]"
                }`}
              >
                Zanzanit 🔥
              </button>
            </div>
          </div>

          {/* Persona Select */}
          <div className="relative">
            <select
              value={persona}
              onChange={(e) => setPersona(e.target.value as Persona)}
              className="appearance-none bg-white border-[2px] border-[#141414] rounded-full px-3.5 py-1.5 pr-8 text-xs font-bold text-[#141414] shadow-[2px_2px_0px_#141414] focus:outline-none focus:ring-2 focus:ring-[#141414] cursor-pointer"
            >
              <option value="standup">🎭 Stand-up Roaster</option>
              <option value="sharma_ji">👦 Sharma ji ka Beta</option>
              <option value="professor">👨‍🏫 Strict Professor</option>
              <option value="hostel_bhau">🤙 Hostel Bhau</option>
              <option value="recruiter">💼 Campus Recruiter</option>
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-[#141414]">
              ▼
            </span>
          </div>

          {/* Language Select */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none bg-white border-[2px] border-[#141414] rounded-full px-3.5 py-1.5 pr-8 text-xs font-bold text-[#141414] shadow-[2px_2px_0px_#141414] focus:outline-none focus:ring-2 focus:ring-[#141414] cursor-pointer"
            >
              <option value="auto">⚡ Auto-detect</option>
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="sql">SQL</option>
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-[#141414]">
              ▼
            </span>
          </div>

          {/* Error Message Toggle */}
          <button
            type="button"
            onClick={() => setShowErrorInput((prev) => !prev)}
            className={`border-[2px] border-dashed border-[#141414] rounded-full px-3 py-1 text-xs font-bold transition-colors ${
              showErrorInput || errorMessage.trim().length > 0
                ? "bg-[#EFF2FB] text-[#4285F4] border-solid"
                : "bg-white text-[#66625B] hover:text-[#141414]"
            }`}
          >
            {showErrorInput ? "− HIDE ERROR" : "+ ERROR MESSAGE"}
          </button>
        </div>

        {/* Right Side: Main CTA Button */}
        <div>
          <button
            type="button"
            onClick={onRoast}
            disabled={isLoading}
            className="neo-button-primary px-5 py-2 text-xs sm:text-sm flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-[#141414] border-t-transparent rounded-full animate-spin"></span>
                <span>CHAI MARINATING...</span>
              </>
            ) : (
              <>
                <span>Roast Me / भाजून काढ 🔥</span>
                <span className="font-extrabold text-base">→</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expandable Error Message Box */}
      {showErrorInput && (
        <div className="mt-3 pt-3 border-t-[1.5px] border-[#141414]/30 animate-in fade-in slide-in-from-top-1 duration-150">
          <label className="block text-[11px] font-bold font-mono tracking-wider text-[#66625B] uppercase mb-1">
            STACK TRACE / RUNTIME ERROR (OPTIONAL)
          </label>
          <input
            type="text"
            value={errorMessage}
            onChange={(e) => setErrorMessage(e.target.value)}
            placeholder="e.g. TypeError: Cannot read property 'map' of undefined, or ZeroDivisionError: division by zero"
            className="w-full bg-white border-[2px] border-[#141414] rounded-xl px-3 py-2 text-xs font-mono text-[#141414] placeholder-[#8F9194] focus:outline-none focus:ring-2 focus:ring-[#141414]"
          />
        </div>
      )}
    </div>
  );
}
