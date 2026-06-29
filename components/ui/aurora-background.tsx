"use client";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  className?: string;
  showRadialGradient?: boolean;
}

/**
 * Aurora teal animata come layer di sfondo per le sezioni scure.
 * Stili inline + keyframe CSS `aurora` (niente dipendenze dal plugin tailwind).
 * pointer-events:none, zIndex 0 — il contenuto della sezione va a zIndex 1.
 */
export function AuroraBackground({ className, showRadialGradient = true }: AuroraBackgroundProps) {
  const mask = "radial-gradient(ellipse at 80% 0%, black 8%, transparent 72%)";
  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      style={{ zIndex: 0 }}
    >
      {/* Versione desktop: blur pieno (GPU ok su desktop) */}
      <div
        className="hidden md:block"
        style={{
          position: "absolute",
          inset: "-30%",
          backgroundImage:
            "repeating-linear-gradient(100deg, #6FA890 10%, #97C3B0 15%, #4E8270 20%, #B2D4C5 25%, #5E957F 30%)",
          backgroundSize: "200% 200%",
          filter: "blur(72px)",
          opacity: 0.16,
          animation: "aurora 55s linear infinite",
          willChange: "background-position",
          maskImage: showRadialGradient ? mask : undefined,
          WebkitMaskImage: showRadialGradient ? mask : undefined,
        }}
      />
      {/* Versione mobile: gradiente statico, nessun blur, nessuna animazione */}
      <div
        className="md:hidden"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 80% 0%, rgba(111,168,144,0.12) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
