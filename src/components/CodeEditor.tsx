"use client";

import React from "react";

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
  onLoadSample: () => void;
  onClear: () => void;
}

export default function CodeEditor({
  code,
  setCode,
  language,
  onLoadSample,
  onClear
}: CodeEditorProps) {
  const lineCount = Math.max(1, code.split("\n").length);
  const charLimit = 12000;

  return (
    <div className="flex flex-col h-full bg-[#171717] rounded-b-[20px] lg:rounded-bl-[20px] lg:rounded-br-none text-[#F7F3EA] overflow-hidden">
      {/* Top Header of Editor */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1F1F1F] border-b-[2px] border-[#2E2E2E]">
        <div className="flex items-center gap-2">
          {/* Faux OS dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]"></span>
          </div>

          <span className="ml-2 text-[10px] font-bold font-mono tracking-widest text-[#8F9194] uppercase">
            INPUT // SRC
          </span>
          <span className="text-xs font-bold text-[#E2E2E1] font-mono">
            YOUR CODE
          </span>
        </div>

        {/* Utility Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onLoadSample}
            className="text-[11px] font-bold font-mono text-[#EDB13E] hover:underline px-2 py-0.5 rounded hover:bg-[#2A2A2A] transition-colors"
          >
            SAMPLE BUG
          </button>
          <span className="text-[#44474A] text-xs">|</span>
          <button
            type="button"
            onClick={onClear}
            className="text-[11px] font-bold font-mono text-[#8F9194] hover:text-[#EA4335] px-2 py-0.5 rounded hover:bg-[#2A2A2A] transition-colors"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Editor Body: Line numbers + Textarea */}
      <div className="flex-1 flex min-h-[360px] max-h-[580px] overflow-auto code-scroll font-mono text-sm leading-6 relative bg-[#171717]">
        {/* Line Numbers Gutter */}
        <div className="select-none py-3 px-3 text-right bg-[#141414] text-[#555555] border-r-[1.5px] border-[#2E2E2E] font-mono text-xs">
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i} className="leading-6">
              {String(i + 1).padStart(2, "0")}
            </div>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          value={code}
          onChange={(e) => {
            if (e.target.value.length <= charLimit) {
              setCode(e.target.value);
            }
          }}
          placeholder={`// Paste your suspicious code here, bhau...\n// e.g. An unhandled promise rejection or memory-hogging while loop\n\nfunction processOrders(orders) {\n  let total = 0;\n  for (var i = 0; i <= orders.length; i++) {\n    total = total + orders[i].price;\n  }\n  return total;\n}`}
          spellCheck={false}
          className="flex-1 bg-transparent text-[#F7F3EA] p-3 resize-none focus:outline-none font-mono text-xs sm:text-sm leading-6 selection:bg-[#EDB13E]/30 selection:text-white"
        />
      </div>

      {/* Bottom Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#141414] border-t-[1.5px] border-[#2A2A2A] text-[11px] font-mono text-[#8F9194]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]"></span>
          <span>{language === "auto" ? "Auto-detected" : language}</span>
        </div>

        <div className="flex items-center gap-3">
          <span>
            {code.length.toLocaleString()} / {charLimit.toLocaleString()} chars
          </span>
        </div>
      </div>
    </div>
  );
}
