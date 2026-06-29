"use client";
import React, { useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
} from "framer-motion";

const CELL = 48;
const SPEED = 0.35;

function Grid({ offX, offY }: { offX: any; offY: any }) {
  return (
    <svg className="w-full h-full">
      <defs>
        <motion.pattern
          id="ec-infinite-grid"
          width={CELL}
          height={CELL}
          patternUnits="userSpaceOnUse"
          x={offX}
          y={offY}
        >
          <path
            d={`M ${CELL} 0 L 0 0 0 ${CELL}`}
            fill="none"
            stroke="#6FA890"
            strokeWidth="1"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ec-infinite-grid)" />
    </svg>
  );
}

/**
 * Griglia infinita interattiva come decorazione di sfondo per sezioni scure.
 * - griglia teal che scorre all'infinito
 * - layer più luminoso rivelato dal cursore (mask radiale)
 * pointer-events:none, zIndex 0 — il contenuto della sezione va a zIndex 1.
 */
export function InfiniteGridDecor() {
  const wrapRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const offX = useMotionValue(0);
  const offY = useMotionValue(0);

  useAnimationFrame(() => {
    offX.set((offX.get() + SPEED) % CELL);
    offY.set((offY.get() + SPEED) % CELL);
  });

  useEffect(() => {
    const parent = wrapRef.current?.parentElement;
    if (!parent) return;
    const onMove = (e: MouseEvent) => {
      const r = wrapRef.current!.getBoundingClientRect();
      mouseX.set(e.clientX - r.left);
      mouseY.set(e.clientY - r.top);
    };
    const onLeave = () => {
      mouseX.set(-1000);
      mouseY.set(-1000);
    };
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [mouseX, mouseY]);

  const mask = useMotionTemplate`radial-gradient(340px circle at ${mouseX}px ${mouseY}px, black, transparent 75%)`;

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* griglia base, sempre visibile ma molto tenue */}
      <div className="absolute inset-0" style={{ opacity: 0.06 }}>
        <Grid offX={offX} offY={offY} />
      </div>

      {/* griglia rivelata dal cursore, più luminosa */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: 0.45, maskImage: mask, WebkitMaskImage: mask }}
      >
        <Grid offX={offX} offY={offY} />
      </motion.div>

      {/* glow teal d'ambiente per profondità */}
      <div
        className="absolute"
        style={{
          bottom: "-14%",
          right: "-6%",
          width: 460,
          height: 460,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(111,168,144,0.10), transparent 70%)",
          filter: "blur(24px)",
        }}
      />
    </div>
  );
}
