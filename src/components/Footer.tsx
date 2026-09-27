"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="mt-16 w-full">
      {/* Geometric Rangoli / Warli Strip */}
      <div className="warli-strip text-center select-none">
        <div className="flex items-center justify-center gap-4 text-xs font-mono font-black text-[#141414] tracking-widest uppercase overflow-hidden whitespace-nowrap opacity-90">
          <span>▲ ▼ ▲ ▼ ▲</span>
          <span>•</span>
          <span>DEVFEST NASHIK 2026</span>
          <span>•</span>
          <span>▲ ▼ ▲ ▼ ▲</span>
          <span>•</span>
          <span>CODE ROASTER</span>
          <span>•</span>
          <span>▲ ▼ ▲ ▼ ▲</span>
          <span>•</span>
          <span>मला वाचवा!</span>
          <span>•</span>
          <span>▲ ▼ ▲ ▼ ▲</span>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-[#F8F4EC] py-8 px-4 border-t-[2.5px] border-[#141414]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          {/* Left Credits */}
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#4285F4]"></span>
              <span className="w-2 h-2 rounded-full bg-[#EA4335]"></span>
              <span className="w-2 h-2 rounded-full bg-[#FBBC05]"></span>
              <span className="w-2 h-2 rounded-full bg-[#34A853]"></span>
              <span className="font-extrabold text-sm text-[#141414] font-['Bricolage_Grotesque']">
                Google Developer Groups Nashik
              </span>
            </div>
            <p className="text-xs text-[#66625B] font-mono">
              Built with 💛 for DevFest Nashik 2026 · Desi Edition
            </p>
          </div>

          {/* Right Links & Disclaimer */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-[#141414]">
            <a
              href="https://devfest26.gdgnashik.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:underline hover:text-[#EA4335] transition-colors"
            >
              DevFest 2026 Site ↗
            </a>
            <span>•</span>
            <span className="text-[#66625B]">Comedy Contract: Roast Code, Not People</span>
            <span>•</span>
            <span className="bg-[#EDB13E] border border-[#141414] px-2 py-0.5 rounded text-[10px] font-mono">
              Nashik, MH 🍇
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
