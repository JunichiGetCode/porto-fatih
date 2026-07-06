"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltIntensity?: number;
  glareEnabled?: boolean;
}

export default function TiltCard({
  children,
  className = "",
  tiltIntensity = 10,
  glareEnabled = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -tiltIntensity;
    const rotateY = ((x - centerX) / centerX) * tiltIntensity;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    if (glareEnabled && glareRef.current) {
      const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
      glareRef.current.style.background = `linear-gradient(${angle + 90}deg, rgba(255,255,255,0.1) 0%, transparent 80%)`;
      glareRef.current.style.opacity = "1";
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    if (glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-300 ease-out ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
      {glareEnabled && (
        <div
          ref={glareRef}
          className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 transition-opacity duration-300"
        />
      )}
    </div>
  );
}
