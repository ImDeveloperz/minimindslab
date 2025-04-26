

"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MemoryCard({ card, index, flipped, highlight, onClick, onHover }) {
  return (
    <motion.div
      className={`relative w-24 h-32 md:w-28 md:h-36 
        flex items-center justify-center 
        text-center font-bold text-white 
        rounded-xl shadow-lg cursor-pointer
        transition-transform transform-gpu 
        ${highlight ? "border-4 border-green-400" : ""}
        ${flipped ? "bg-gradient-to-br from-green-400 to-blue-500" : "bg-gradient-to-br from-purple-400 to-pink-500"}
      `}
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
      onMouseEnter={() => onHover(card.hint)}
      onMouseLeave={() => onHover("")}
    >
      {flipped ? (
        <div className="p-2 text-sm md:text-base">{card.content}</div>
      ) : (
        <div className="text-4xl">❓</div>
      )}
    </motion.div>
  );
}
