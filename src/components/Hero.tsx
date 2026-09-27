"use client";

import React from "react";

export default function Hero() {
  return (
    <section className="text-center pt-8 pb-6 px-4 max-w-3xl mx-auto">
      {/* Eyebrow Pill */}
      <div className="inline-flex items-center gap-2 bg-[#F7E3A8] border-[2px] border-[#141414] shadow-[3px_3px_0px_#141414] px-3.5 py-1 rounded-full mb-3 text-xs sm:text-sm font-bold text-[#141414]">
        <span>⚡</span>
        <span>CODE BOL RAHA HAI · मला वाचवा!</span>
        <span>🌶️</span>
      </div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#141414] font-['Bricolage_Grotesque'] mb-2">
        Code Roaster
      </h1>

      {/* Supporting Copy */}
      <p className="text-base sm:text-lg text-[#141414] font-medium max-w-xl mx-auto">
        Paste your code. Pick your roast. <span className="underline decoration-wavy decoration-[#EA4335] font-bold">Get humbled.</span> Get the fix.
      </p>

      <p className="text-xs text-[#66625B] font-mono mt-1 font-semibold">
        Desi debugging for DevFest Nashik 2026 · Powered by Gemini 2.5 Flash
      </p>
    </section>
  );
}
