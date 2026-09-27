"use client";

import React from "react";

export default function Navbar() {
  return (
    <header className="sticky top-4 z-50 w-full max-w-5xl mx-auto px-4">
      <nav className="bg-white/95 backdrop-blur-sm border-[2.5px] border-[#141414] shadow-[4px_4px_0px_#141414] rounded-full px-4 sm:px-6 py-3 flex items-center justify-between transition-all">
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#F8F4EC] border-[2px] border-[#141414] px-2.5 py-1 rounded-full text-xs font-bold font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]"></span>
            <span className="ml-1 tracking-wider text-[11px] text-[#141414]">GDG NASHIK</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-base sm:text-lg tracking-tight font-['Bricolage_Grotesque'] text-[#141414]">
              CODE ROASTER
            </span>
            <span className="text-sm">🔥</span>
            <span className="hidden sm:inline-block bg-[#EDB13E] text-[#141414] border-[1.5px] border-[#141414] text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-[1px_1px_0px_#141414]">
              v2.0
            </span>
          </div>
        </div>

        {/* Center / Right Links */}
        <div className="hidden md:flex items-center gap-2">
          <button className="px-3 py-1 rounded-full text-xs font-bold text-[#141414] hover:bg-[#F8F4EC] transition-colors">
            Roaster
          </button>
          <button className="px-3 py-1 rounded-full text-xs font-bold text-[#66625B] hover:text-[#141414] hover:bg-[#F8F4EC] transition-colors">
            Nashik Slang
          </button>
          <button className="px-3 py-1 rounded-full text-xs font-bold text-[#66625B] hover:text-[#141414] hover:bg-[#F8F4EC] transition-colors">
            Leaderboard
          </button>
        </div>

        {/* Right DevFest Badge */}
        <div className="flex items-center gap-2">
          <div className="bg-[#EDB13E] border-[2px] border-[#141414] shadow-[2px_2px_0px_#141414] rounded-full px-3 py-1 flex items-center gap-1.5">
            <span className="text-xs font-black tracking-wide text-[#141414]">
              DEVFEST 2026
            </span>
            <span className="w-2 h-2 rounded-full bg-[#141414] animate-ping hidden sm:inline-block"></span>
          </div>
        </div>
      </nav>
    </header>
  );
}
