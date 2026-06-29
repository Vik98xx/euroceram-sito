'use client'

import { InspirationGallery } from './ui/inspiration-gallery'
import { AuroraBackground } from './ui/aurora-background'

export default function GalleriaIspirazione() {
  return (
    <section id="ispirazione" style={{ position: 'relative', overflow: 'hidden', background: '#080A07', paddingTop: 'var(--section-gap-sm)', paddingBottom: 'var(--section-gap-sm)' }}>
      <AuroraBackground />
      <div className="w-full" style={{ position: 'relative', zIndex: 1, paddingLeft: "clamp(16px, 3vw, 60px)", paddingRight: "clamp(16px, 3vw, 60px)" }}>

        {/* Header */}
        <div style={{ marginBottom: 'var(--header-gap)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: 'var(--teal)' }} />
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.45)' }}>Galleria</span>
          </div>
          <div className="flex flex-row items-end gap-4" style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <h2 className="font-display text-white" style={{ fontSize: 'clamp(1.6rem, 4vw, 3.2rem)', lineHeight: 1.1, flexShrink: 0 }}>
              Lasciati <span style={{ color: 'var(--teal)' }}>Ispirare</span>
            </h2>
            <p className="text-[10px] sm:text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap' }}>
              Clicca una foto per ingrandirla
            </p>
          </div>
        </div>

        {/* Galleria */}
        <InspirationGallery />

        {/* CTA */}
        <div className="text-center" style={{ marginTop: '2rem' }}>
          <a href="#preventivo" className="btn-primary">
            Richiedi il tuo Progetto
          </a>
        </div>
      </div>
    </section>
  )
}
