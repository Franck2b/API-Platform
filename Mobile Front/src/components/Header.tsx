"use client";

import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ["Home", "Destinations", "About", "Contact"];

  return (
    <header className="px-6 pt-6 pb-4 relative">
      <div className="flex items-center justify-between">
        <div className="text-white font-bold text-xl tracking-wide">
          Kluyuran
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-white">
            <span className="text-lg">🇬🇧</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white z-50 relative">
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setIsMenuOpen(false)}></div>
          
          <div className="absolute top-16 right-6 bg-white rounded-2xl shadow-2xl p-6 min-w-[200px] z-50">
            <nav className="space-y-3">
              {menuItems.map((item, index) => (
                <div key={item}>
                  <a href="#" className="block text-gray-900 hover:text-gray-700 py-2 text-lg font-medium transition-colors">
                    {item}
                  </a>
                  {index < menuItems.length - 1 && <div className="h-px bg-gray-200"></div>}
                </div>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}

