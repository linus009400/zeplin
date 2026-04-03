import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZEPLIN - 글로벌 통합결제 솔루션 | ICB",
  description:
    "알리페이, 위챗페이 등 글로벌 결제를 블로그, SNS에서 간편하게. ICB가 제공하는 통합결제 플랫폼 ZEPLIN",
  keywords: ["결제", "알리페이", "위챗페이", "통합결제", "SNS결제", "블로그결제", "ICB", "ZEPLIN"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
