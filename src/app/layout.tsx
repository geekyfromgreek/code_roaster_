import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Code Roaster 🔥 | DevFest Nashik 2026 (Desi Edition)",
  description: "Desi debugging tool powered by Gemini 2.5 Flash for DevFest Nashik 2026. Paste your code, pick your roast, get humbled, and get the fix!",
  keywords: ["Code Roaster", "DevFest Nashik 2026", "GDG Nashik", "Gemini 2.5 Flash", "AI Debugger", "Desi Roaster"],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔥</text></svg>"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased selection:bg-[#EDB13E] selection:text-[#141414]">
        {children}
      </body>
    </html>
  );
}
