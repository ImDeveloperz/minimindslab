"use client";

import React from "react";

export default function HintPopup({ hint }) {
  if (!hint) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-white text-gray-800 text-sm md:text-base p-3 rounded-lg shadow-lg border border-gray-300 animate-fade-in">
      <p>💡 Hint: {hint}</p>
    </div>
  );
}
