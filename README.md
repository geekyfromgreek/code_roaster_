# Code Roaster 🔥 (DevFest Nashik 2026 — Desi Edition)

> **A serious code editor walked into a Nashik DevFest roast show — thick ink, mustard paper, Warli details, Google-colour sparks, and just enough chaos to make debugging memorable.**

Code Roaster is an AI-powered code roasting and debugging web application built for **DevFest Nashik 2026** by Google Developer Groups Nashik. Powered by **Gemini 2.5 Flash**, it serves savage, authentic Hinglish and Marathi comedy critiques of buggy code while providing a complete, working **Redemption Arc** fix.

---

## ✨ Features

- **DevFest Nashik 2026 Neo-Brutalist Aesthetic**: Warm cream paper background (`#F8F4EC`), 2.5px solid black borders, hard offset shadows (`4px 4px 0 #141414`), and Google color accents.
- **Segmented Spice Selector**:
  - `Halka 🍋`: Mild teasing, gentle fixes.
  - `Tikha 🌶️`: Savage debugging roast, sharp observations.
  - `Zanzanit 🔥`: Extra-spicy Nashik misal grade roasts.
- **5 Local Personas**:
  - 🎭 **Stand-up Roaster** (witty comic timing)
  - 👦 **Sharma ji ka Beta** (condescending cousin comparisons)
  - 👨‍🏫 **Strict Professor** (attendance shortage & zero internals)
  - 🤙 **Hostel Bhau** (authentic Marathi bro advice: *"Wat lavli, ata bagha"*)
  - 💼 **Campus Recruiter** (placement interview exasperation)
- **Serious JetBrains Mono Code Editor**: Line numbers, character limits, sample bug loader, and clear controls.
- **Interactive 4-State Lifecycle**: Empty mascot state, animated analyzing state with rotating Hinglish messages, savage audit results with rubber-stamp score badge, and humorous rate-limit fallbacks.
- **The Redemption Arc**: Full working corrected code block with one-tap copy functionality.
- **Warli & Rangoli Geometric Accents**: Handcrafted Nashik cultural ribbon strip.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 & Neo-Brutalist CSS utilities
- **AI Engine**: Google Gemini 2.5 Flash via Server-Side API Route
- **Typography**: Bricolage Grotesque, Space Grotesk, JetBrains Mono, Noto Sans Devanagari

---

## 🚀 Local Development

1. **Clone the repository:**
   ```bash
   git clone git@github.com:geekyfromgreek/code_roaster_.git
   cd code_roaster_
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deploying to Vercel

1. Push your code to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import the `geekyfromgreek/code_roaster_` repository.
4. In the **Environment Variables** section, add:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** `your_gemini_api_key`
5. Click **Deploy**.
   Vercel will automatically detect Next.js and deploy your application worldwide in seconds!

---

## 📜 Comedy Contract

The product's comedy contract is strict: **Roast the code, bad architecture, poor naming, and questionable logic — NEVER insult the developer personally.**

Built with 💛 by Google Developer Groups Nashik.
