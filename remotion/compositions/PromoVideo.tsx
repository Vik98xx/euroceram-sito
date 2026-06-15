import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Sequence } from 'remotion'

// ─── Palette Euroceram ───────────────────────────────────────────────────────
const TEAL   = '#5BA4A4'
const DARK   = '#0C1616'
const ACCENT = '#B8956A'
const WHITE  = '#F5F0E8'

// ─── Slides ──────────────────────────────────────────────────────────────────
const SLIDES = [
  { bg: '#1A2820', label: 'Pavimenti & Esterni',       headline: 'La Bellezza\ndel Gres',         accent: TEAL },
  { bg: '#1E2428', label: 'Cool Elegance',              headline: 'Eleganza\nMinimalista',          accent: '#A8A8A8' },
  { bg: '#1C1A10', label: 'Pattern & Texture',          headline: 'Geometrie\nche Raccontano',      accent: ACCENT },
  { bg: '#1A1208', label: 'Golden Ambra',               headline: 'Lusso in\nOgni Dettaglio',       accent: '#C8A060' },
]

const SLIDE_DURATION = 90 // frames per slide @ 30fps = 3s

// ─── Tile decorativo ─────────────────────────────────────────────────────────
function Tile({ x, y, size, color, delay, frame }: {
  x: number; y: number; size: number; color: string; delay: number; frame: number
}) {
  const { fps } = useVideoConfig()
  const scale = spring({ frame: frame - delay, fps, config: { stiffness: 200, damping: 20 } })
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: size, height: size,
      background: color,
      transform: `scale(${scale})`,
      transformOrigin: 'center',
    }} />
  )
}

// ─── Slide singolo ───────────────────────────────────────────────────────────
function Slide({ slide, localFrame }: { slide: typeof SLIDES[0]; localFrame: number }) {
  const { fps } = useVideoConfig()

  const labelOpacity = interpolate(localFrame, [0, 20], [0, 1], { extrapolateRight: 'clamp' })
  const labelX = interpolate(localFrame, [0, 20], [-30, 0], { extrapolateRight: 'clamp' })

  const headlineScale = spring({ frame: localFrame - 10, fps, config: { stiffness: 120, damping: 18 } })
  const headlineOpacity = interpolate(localFrame, [10, 30], [0, 1], { extrapolateRight: 'clamp' })

  const subOpacity = interpolate(localFrame, [25, 45], [0, 1], { extrapolateRight: 'clamp' })
  const subY = interpolate(localFrame, [25, 45], [20, 0], { extrapolateRight: 'clamp' })

  // Exit fade
  const exitOpacity = localFrame > SLIDE_DURATION - 15
    ? interpolate(localFrame, [SLIDE_DURATION - 15, SLIDE_DURATION], [1, 0], { extrapolateRight: 'clamp' })
    : 1

  return (
    <AbsoluteFill style={{ background: slide.bg, opacity: exitOpacity }}>
      {/* Grid pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Decorative tiles (right side) */}
      <div style={{ position: 'absolute', right: 120, top: '50%', transform: 'translateY(-50%)' }}>
        <Tile x={0}   y={0}   size={140} color={slide.accent} delay={5}  frame={localFrame} />
        <Tile x={150} y={0}   size={140} color={DARK}         delay={12} frame={localFrame} />
        <Tile x={0}   y={150} size={140} color={DARK}         delay={18} frame={localFrame} />
        <Tile x={150} y={150} size={140} color={slide.accent} delay={8}  frame={localFrame} />
      </div>

      {/* Content */}
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 120 }}>

        {/* Line + label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, opacity: labelOpacity, transform: `translateX(${labelX}px)` }}>
          <div style={{ width: 40, height: 2, background: slide.accent }} />
          <span style={{ fontSize: 13, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', fontFamily: 'sans-serif' }}>
            {slide.label}
          </span>
        </div>

        {/* Headline */}
        <div style={{
          fontSize: 96,
          fontFamily: 'Georgia, serif',
          color: WHITE,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          whiteSpace: 'pre-line',
          opacity: headlineOpacity,
          transform: `scale(${0.85 + headlineScale * 0.15})`,
          transformOrigin: 'left center',
          marginBottom: 24,
        }}>
          {slide.headline}
        </div>

        {/* Sub */}
        <div style={{
          fontSize: 22,
          fontFamily: 'sans-serif',
          color: 'rgba(255,255,255,0.5)',
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
          letterSpacing: '0.02em',
        }}>
          Euroceram 2002 · Arzano, Napoli
        </div>

        {/* Accent line bottom */}
        <div style={{
          marginTop: 40,
          width: interpolate(localFrame, [40, 70], [0, 180], { extrapolateRight: 'clamp' }),
          height: 3,
          background: slide.accent,
        }} />
      </AbsoluteFill>
    </AbsoluteFill>
  )
}

// ─── Outro ───────────────────────────────────────────────────────────────────
function Outro({ localFrame }: { localFrame: number }) {
  const { fps } = useVideoConfig()
  const logoScale = spring({ frame: localFrame - 10, fps, config: { stiffness: 100, damping: 20 } })
  const textOpacity = interpolate(localFrame, [25, 50], [0, 1], { extrapolateRight: 'clamp' })
  const tagOpacity  = interpolate(localFrame, [50, 70], [0, 1], { extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{ background: DARK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(91,164,164,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(91,164,164,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Logo mark */}
      <div style={{ transform: `scale(${logoScale})`, marginBottom: 32 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {[TEAL, '#888', '#222', `${TEAL}88`].map((c, i) => (
            <div key={i} style={{ width: 36, height: 36, background: c }} />
          ))}
        </div>
      </div>

      <div style={{ opacity: textOpacity, textAlign: 'center' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 56, color: WHITE, letterSpacing: '0.05em', marginBottom: 8 }}>
          euroceram 2002
        </div>
        <div style={{ fontFamily: 'sans-serif', fontSize: 14, letterSpacing: '0.4em', textTransform: 'uppercase', color: TEAL }}>
          Ceramiche · Arredo Bagno · Arzano
        </div>
      </div>

      <div style={{ opacity: tagOpacity, marginTop: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 1, height: 40, background: TEAL, opacity: 0.4 }} />
        <div style={{ fontFamily: 'sans-serif', fontSize: 18, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em' }}>
          081 731 3025
        </div>
        <div style={{ fontFamily: 'sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
          Via G. Carducci 3 · Arzano (NA)
        </div>
      </div>
    </AbsoluteFill>
  )
}

// ─── Composizione principale ──────────────────────────────────────────────────
export function PromoVideo() {
  const frame = useCurrentFrame()

  return (
    <AbsoluteFill>
      {SLIDES.map((slide, i) => {
        const start = i * SLIDE_DURATION
        const localFrame = frame - start
        if (localFrame < 0 || localFrame > SLIDE_DURATION) return null
        return <Slide key={i} slide={slide} localFrame={localFrame} />
      })}

      <Sequence from={SLIDES.length * SLIDE_DURATION}>
        <Outro localFrame={frame - SLIDES.length * SLIDE_DURATION} />
      </Sequence>
    </AbsoluteFill>
  )
}
