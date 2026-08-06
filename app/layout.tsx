import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { BackgroundAura } from "@/components/layout/BackgroundAura";
import { Header } from "@/components/layout/Header";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AI副業2.0 Bonus Box",
    template: "%s｜AI副業2.0 Bonus Box",
  },
  description:
    "面談突破者だけの実践型AIライブラリ。学びながら、コピペしながら、その場で使えるAI副業の特典コレクション。",
  keywords: ["AI副業", "AIエージェント", "Claude Code", "プロンプト", "ワークフロー"],
};

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${outfit.variable} dark`}>
      <body className="min-h-screen font-sans antialiased">
        <Providers>
          <BackgroundAura />
          <Header />
          <main className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
