export default function LogoSVG({ className = '', height = 52 }: { className?: string; height?: number }) {
  const w = height * 1.72
  return (
    <svg
      viewBox="0 0 220 128"
      height={height}
      width={w}
      className={className}
      aria-label="Euroceram 2002"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Teal rectangle (top-left) */}
      <rect x="8" y="4" width="72" height="62" rx="2" fill="#5BA4A4" transform="rotate(-5 8 4)" />
      {/* White "e" inside teal */}
      <text x="22" y="58" fontSize="52" fontFamily="Georgia, serif" fontWeight="700" fill="white" opacity="0.92">e</text>

      {/* Gray rounded rect (top-right) */}
      <rect x="64" y="2" width="46" height="60" rx="6" fill="#A8A8A8" transform="rotate(4 64 2)" />

      {/* Black parallelogram (middle overlap) */}
      <polygon points="52,38 108,32 112,68 56,74" fill="#1C1C1C" />

      {/* White square with black border (bottom-left) */}
      <rect x="8" y="56" width="54" height="50" rx="2" fill="white" stroke="#1C1C1C" strokeWidth="5" transform="rotate(-3 8 56)" />

      {/* Wordmark */}
      <text x="72" y="98" fontSize="22" fontFamily="Arial, sans-serif" fontWeight="400" letterSpacing="0.5" fill="#1C1C1C">
        <tspan fill="#5BA4A4">euro</tspan>ceram
      </text>
      <text x="76" y="118" fontSize="13" fontFamily="Arial, sans-serif" letterSpacing="8" fill="#888888">2002</text>
    </svg>
  )
}
