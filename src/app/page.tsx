"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ControlBar from "@/components/ControlBar";
import CodeEditor from "@/components/CodeEditor";
import ReportPane from "@/components/ReportPane";
import Footer from "@/components/Footer";
import { SAMPLE_BUGS } from "@/data/sampleBugs";
import { RoastLevel, Persona, RoastResult, ViewState } from "@/types/roast";

export default function Home() {
  const [code, setCode] = useState<string>(SAMPLE_BUGS[0].code);
  const [language, setLanguage] = useState<string>("javascript");
  const [roastLevel, setRoastLevel] = useState<RoastLevel>("tikha");
  const [persona, setPersona] = useState<Persona>("standup");
  const [showErrorInput, setShowErrorInput] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(SAMPLE_BUGS[0].errorMessage || "");
  const [viewState, setViewState] = useState<ViewState>("idle");
  const [result, setResult] = useState<RoastResult | null>(null);
  const [mobileTab, setMobileTab] = useState<"code" | "report">("code");
  const [sampleIndex, setSampleIndex] = useState<number>(0);

  const handleLoadSample = () => {
    const nextIdx = (sampleIndex + 1) % SAMPLE_BUGS.length;
    setSampleIndex(nextIdx);
    const sample = SAMPLE_BUGS[nextIdx];
    setCode(sample.code);
    setLanguage(sample.language);
    if (sample.errorMessage) {
      setErrorMessage(sample.errorMessage);
      setShowErrorInput(true);
    } else {
      setErrorMessage("");
      setShowErrorInput(false);
    }
  };

  const handleClear = () => {
    setCode("");
    setErrorMessage("");
    setShowErrorInput(false);
    setViewState("idle");
    setResult(null);
  };

  const handleRoast = async (overrideSpice?: RoastLevel) => {
    if (!code || code.trim().length === 0) {
      alert("Bhau, please enter some code first!");
      return;
    }

    const currentSpice = overrideSpice || roastLevel;
    if (overrideSpice) {
      setRoastLevel(overrideSpice);
    }

    setViewState("analyzing");
    setMobileTab("report");

    try {
      const res = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language,
          roastLevel: currentSpice,
          persona,
          errorMessage
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data: RoastResult = await res.json();
      setResult(data);
      setViewState("result");
    } catch (err) {
      console.error("Roast execution error:", err);
      setViewState("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[#EDB13E] selection:text-[#141414]">
      {/* Top Floating Pill Header */}
      <Navbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-3 sm:px-6">
        {/* Short Hero */}
        <Hero />

        {/* Mobile Tab Toggle (≤ 1023px) */}
        <div className="lg:hidden flex items-center justify-center gap-2 mb-3">
          <div className="inline-flex bg-white border-[2px] border-[#141414] rounded-full p-1 shadow-[2px_2px_0px_#141414]">
            <button
              type="button"
              onClick={() => setMobileTab("code")}
              className={`px-4 py-1.5 text-xs font-bold font-mono rounded-full transition-all ${
                mobileTab === "code"
                  ? "bg-[#141414] text-white shadow-[1px_1px_0px_#141414]"
                  : "text-[#66625B]"
              }`}
            >
              [ ORIGINAL CODE ]
            </button>
            <button
              type="button"
              onClick={() => setMobileTab("report")}
              className={`px-4 py-1.5 text-xs font-bold font-mono rounded-full transition-all ${
                mobileTab === "report"
                  ? "bg-[#EDB13E] text-[#141414] shadow-[1px_1px_0px_#141414]"
                  : "text-[#66625B]"
              }`}
            >
              [ ROAST REPORT ] {viewState === "result" && "🔥"}
            </button>
          </div>
        </div>

        {/* Main Split-Pane Tool Card */}
        <div className="neo-card overflow-hidden transition-all bg-white mb-8">
          {/* Top Control Bar */}
          <ControlBar
            roastLevel={roastLevel}
            setRoastLevel={setRoastLevel}
            persona={persona}
            setPersona={setPersona}
            language={language}
            setLanguage={setLanguage}
            showErrorInput={showErrorInput}
            setShowErrorInput={setShowErrorInput}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            onRoast={() => handleRoast()}
            isLoading={viewState === "analyzing"}
          />

          {/* Dual Split Pane (Editor Left / Report Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-[#141414]">
            {/* Left: Code Editor (shown on desktop or when mobileTab is code) */}
            <div className={`${mobileTab === "code" ? "block" : "hidden lg:block"} h-full`}>
              <CodeEditor
                code={code}
                setCode={setCode}
                language={language}
                onLoadSample={handleLoadSample}
                onClear={handleClear}
              />
            </div>

            {/* Right: Report Pane (shown on desktop or when mobileTab is report) */}
            <div className={`${mobileTab === "report" ? "block" : "hidden lg:block"} h-full min-h-[460px]`}>
              <ReportPane
                viewState={viewState}
                result={result}
                onTrySample={() => {
                  handleLoadSample();
                  setMobileTab("code");
                }}
                onRoastAgain={() => handleRoast("zanzanit")}
                onNewCode={handleClear}
                onRetry={() => handleRoast()}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Warli/Rangoli Footer */}
      <Footer />
    </div>
  );
}
