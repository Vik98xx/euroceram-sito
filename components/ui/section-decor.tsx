/**
 * Decorazione di sfondo premium per le sezioni scure:
 * - griglia tile a dissolvenza
 * - 2 glow teal che fluttuano lentamente (animazioni CSS pure, nessuno state)
 * pointer-events:none, zIndex 0 (il contenuto va messo a zIndex 1).
 */
export function SectionDecor({ grid = true }: { grid?: boolean }) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <style>{`
        @keyframes ecFloatA {
          0%, 100% { transform: translate(0, 0); }
          50%      { transform: translate(50px, 36px); }
        }
        @keyframes ecFloatB {
          0%, 100% { transform: translate(0, 0); }
          50%      { transform: translate(-46px, -32px); }
        }
      `}</style>

      {grid && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(111,168,144,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(111,168,144,0.045) 1px, transparent 1px)',
            backgroundSize: '54px 54px',
            maskImage: 'radial-gradient(ellipse at center, black 25%, transparent 78%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 25%, transparent 78%)',
          }}
        />
      )}

      <div
        style={{
          position: 'absolute',
          top: '-12%',
          left: '-8%',
          width: 420,
          height: 420,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(111,168,144,0.13), transparent 70%)',
          filter: 'blur(24px)',
          animation: 'ecFloatA 19s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-14%',
          right: '-6%',
          width: 460,
          height: 460,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(111,168,144,0.10), transparent 70%)',
          filter: 'blur(24px)',
          animation: 'ecFloatB 24s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
