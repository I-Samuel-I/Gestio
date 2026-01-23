'use client'
import { useEffect, useState } from "react";

interface CounterProps {
  target: number; 
  duration?: number; 
}

export default function Counter({ target, duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16); 
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(interval);
      }
      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(interval);
  }, [target, duration]);

  return <span>{count.toLocaleString()}</span>;
}
