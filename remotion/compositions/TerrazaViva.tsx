import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate } from 'remotion'

const W = 1920
const H = 1080

function organicSin(frame: number, fps: number, f1 = 0.3, f2 = 0.7, f3 = 1.1, phase = 0): number {
  const t = frame / fps
  return (
    Math.sin(t * f1 * Math.PI * 2 + phase) * 0.5 +
    Math.sin(t * f2 * Math.PI * 2 + phase * 1.3) * 0.3 +
    Math.sin(t * f3 * Math.PI * 2 + phase * 0.7) * 0.2
  )
}

export function TerrazaViva() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' })

  // Seed della turbolenza che avanza lentamente — crea il movimento organico
  const turbSeed   = (frame / fps) * 0.012
  const turbSeed2  = (frame / fps) * 0.008

  // Intensità del displacement — varia con brezza irregolare
  const breeze     = organicSin(frame, fps, 0.12, 0.27, 0.43, 0)
  const breeze2    = organicSin(frame, fps, 0.09, 0.21, 0.38, 1.7)

  // Le foglie pendenti della pergola: displacement più deciso
  const hangScale  = 3.2 + breeze  * 1.8   // 1.4 – 5.0px
  // La vegetazione sullo sfondo: displacement più sottile
  const vegScale   = 1.8 + breeze2 * 0.9   // 0.9 – 2.7px

  return (
    <AbsoluteFill style={{ opacity: fadeIn, background: '#000' }}>

      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>

          {/* ── Filtro foglie pergola (zona alta, foglie pendenti) ── */}
          <filter id="leafWind" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={`${0.018 + turbSeed * 0.001} ${0.024 + turbSeed * 0.0008}`}
              numOctaves={4}
              seed={Math.floor(turbSeed * 1000) % 1000}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={hangScale}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            {/* Leggerissima sfocatura per ammorbidire i bordi del displacement */}
            <feGaussianBlur in="displaced" stdDeviation="0.3" />
          </filter>

          {/* ── Filtro vegetazione sfondo (zona sinistra, arbusti) ── */}
          <filter id="vegWind" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={`${0.022 + turbSeed2 * 0.001} ${0.016 + turbSeed2 * 0.001}`}
              numOctaves={3}
              seed={Math.floor(turbSeed2 * 800 + 300) % 1000}
              result="noise2"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise2"
              scale={vegScale}
              xChannelSelector="G"
              yChannelSelector="R"
            />
          </filter>

          {/* ── Maschera pergola: zona alta centrale-destra (foglie appese) ── */}
          <mask id="maskPergola">
            <radialGradient id="rgPergola" cx="58%" cy="10%" rx="45%" ry="22%">
              <stop offset="0%"  stopColor="white" stopOpacity="1" />
              <stop offset="70%" stopColor="white" stopOpacity="0.7" />
              <stop offset="100%" stopColor="black" stopOpacity="0" />
            </radialGradient>
            <rect width={W} height={H * 0.38} fill="url(#rgPergola)" />
          </mask>

          {/* ── Maschera vegetazione: zona sinistra (arbusti sfondo) ── */}
          <mask id="maskVeg">
            <radialGradient id="rgVeg" cx="20%" cy="45%" rx="32%" ry="40%">
              <stop offset="0%"   stopColor="white" stopOpacity="1" />
              <stop offset="60%"  stopColor="white" stopOpacity="0.65" />
              <stop offset="100%" stopColor="black" stopOpacity="0" />
            </radialGradient>
            <rect width={W * 0.5} height={H} fill="url(#rgVeg)" />
          </mask>

        </defs>
      </svg>

      {/* ── Layer 1: Immagine base completamente statica ── */}
      <Img
        src={staticFile('/images/terrazza.jpg')}
        style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
      />

      {/* ── Layer 2: Zona foglie pergola — deformata dal vento ── */}
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <image
          href={staticFile('/images/terrazza.jpg')}
          width={W}
          height={H}
          preserveAspectRatio="xMidYMid slice"
          filter="url(#leafWind)"
          mask="url(#maskPergola)"
        />
      </svg>

      {/* ── Layer 3: Zona vegetazione sfondo — deformata dal vento ── */}
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <image
          href={staticFile('/images/terrazza.jpg')}
          width={W}
          height={H}
          preserveAspectRatio="xMidYMid slice"
          filter="url(#vegWind)"
          mask="url(#maskVeg)"
        />
      </svg>

    </AbsoluteFill>
  )
}
