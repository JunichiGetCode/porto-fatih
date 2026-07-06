"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  animation?: string;
  delay?: string;
}

export default function AnimateOnScroll({
  children,
  className = "",
  animation = "animate-fade-in-up",
  delay = "",
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${
        isVisible ? `${animation} ${delay}` : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
