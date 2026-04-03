"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "서비스 소개", href: "#features" },
  { label: "결제방식", href: "#payment" },
  { label: "수수료", href: "#pricing" },
  { label: "이용안내", href: "#guide" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">Z</span>
            </div>
            <span className="text-xl font-bold text-primary-dark tracking-tight">
              ZEPLIN
            </span>
            <span className="hidden sm:inline text-[10px] text-gray-400 ml-1 mt-1">
              by ICB
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 hover:text-primary font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-primary font-medium transition-colors"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-light transition-colors"
            >
              무료 가입
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="메뉴 열기"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {open && (
          <nav className="md:hidden py-4 border-t border-gray-100">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 text-sm text-gray-600 hover:text-primary font-medium"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
              <Link href="/login" className="text-sm text-gray-600 font-medium">로그인</Link>
              <Link href="/signup" className="px-5 py-2 bg-primary text-white text-sm font-semibold rounded-full">무료 가입</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
