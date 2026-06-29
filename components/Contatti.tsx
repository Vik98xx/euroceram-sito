'use client'

import { SocialIcons } from './ui/social-icons'
import { AuroraBackground } from './ui/aurora-background'
import dynamic from 'next/dynamic'

const EuroceramMap = dynamic(() => import('./ui/euroceram-map'), { ssr: false })

export default function Contatti() {
  return (
    <section
      id="contatti"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#10130F',
        borderTop: '1px solid rgba(111,168,144,0.12)',
        paddingTop: 'var(--section-gap-md)',
        paddingBottom: 'var(--section-gap-lg)',
      }}
    >
      <AuroraBackground />

      {/* Header */}
      <div className="w-full" style={{ position: 'relative', zIndex: 1, paddingLeft: 'clamp(16px, 3vw, 60px)', paddingRight: 'clamp(16px, 3vw, 60px)' }}>
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10" style={{ background: 'var(--teal)' }} />
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.45)' }}>Contatti</span>
            <div className="h-px w-10" style={{ background: 'var(--teal)' }} />
          </div>
          <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>
            Vieni a Trovarci
          </h2>
        </div>
      </div>

      {/* Mappa MapLibre */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          marginBottom: '3rem',
          height: 420,
          borderTop: '1px solid rgba(111,168,144,0.15)',
          borderBottom: '1px solid rgba(111,168,144,0.15)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
          overflow: 'hidden',
        }}
      >
        <EuroceramMap />
      </div>

      {/* Social icons centrate */}
      <div className="w-full" style={{ position: 'relative', zIndex: 1, paddingLeft: 'clamp(16px, 3vw, 60px)', paddingRight: 'clamp(16px, 3vw, 60px)' }}>
        <div className="flex justify-center">
          <SocialIcons size="lg" />
        </div>
      </div>
    </section>
  )
}
