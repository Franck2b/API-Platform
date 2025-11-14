"use client";

import { useState } from "react";

export default function SearchForm() {
  const [formData, setFormData] = useState({
    yourLocation: "Rembang, Indonesia",
    location: "Singapore",
    guests: "4 Person",
  });

  return (
    <div className="bg-white rounded-3xl p-6 pb-8 shadow-2xl">
      <div className="mb-3">
        <label className="block text-gray-400 text-md px-1">Your Location</label>
        <input
          type="text"
          value={formData.yourLocation}
          onChange={(e) => setFormData({ ...formData, yourLocation: e.target.value })}
          className="w-full text-gray-900 font-semibold px-1 py-1 focus:outline-none focus:ring-2 focus:ring-pink-500/30 text-lg"
        />
      </div>

      <div className="mb-3">
        <label className="block text-gray-400 text-md mb-2 px-6">Location</label>
        <div className="px-4 py-1.5 border-2 border-gray-200 rounded-2xl flex items-center gap-3">
          <svg className="w-6 h-6 text-gray-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="flex-1 text-gray-900 bg-transparent focus:outline-none text-lg"
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-gray-400 text-md mb-2 px-6">Check-In</label>
        <div className="px-4 py-1.5 border-2 border-gray-200 rounded-2xl flex items-center gap-3">
          <svg className="w-6 h-6 text-gray-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <input
            type="text"
            value="Mon, 14 Jan 2022"
            className="flex-1 text-gray-900 bg-transparent focus:outline-none text-lg"
            readOnly
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-gray-400 text-md mb-2 px-6">Check-Out</label>
        <div className="px-4 py-1.5 border-2 border-gray-200 rounded-2xl flex items-center gap-3">
          <svg className="w-6 h-6 text-gray-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <input
            type="text"
            value="Wed, 16 Jan 2022"
            className="flex-1 text-gray-900 bg-transparent focus:outline-none text-lg"
            readOnly
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-400 text-md mb-2 px-6">Guest</label>
        <div className="px-4 py-1.5 border-2 border-gray-200 rounded-2xl flex items-center gap-3">
          <svg className="w-6 h-6 text-gray-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <input
            type="text"
            value={formData.guests}
            onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
            className="flex-1 text-gray-900 bg-transparent focus:outline-none text-lg"
          />
        </div>
      </div>

      <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-4 rounded-full shadow-lg transition-all active:scale-95">
        Search
      </button>
    </div>
  );
}
