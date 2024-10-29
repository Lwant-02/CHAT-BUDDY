"use client";
import { useEffect, useState } from "react";
export default function DisplayTextEffect({ text }) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  useEffect(() => {
    const word = text.split("");
    const timer = setTimeout(() => {
      if (wordIndex < word.length) {
        setDisplayText((prev) => prev + (prev && "") + word[wordIndex]);
        setWordIndex(wordIndex + 1);
      }
    }, 30);
    return () => clearTimeout(timer);
  }, [text, wordIndex]);
  return <span>{displayText}</span>;
}
