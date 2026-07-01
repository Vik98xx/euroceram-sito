'use client'

import React from 'react'
import { AuroraBackground } from './ui/aurora-background'

const STATS = [
  { value: 1956, label: 'Anno di fondazione', prefix: 'Dal' },
  { value: 70, suffix: '+', label: 'Anni di esperienza' },
  { value: 200, suffix: '+', label: 'Brand in catalogo' },
  { value: 1000, suffix: 'm²', label: 'Showroom ad Arzano' },
]

function Counter({ to, suffix = '', prefix = '' }: { to: number; suffix?: string; prefix?: string }) {
  return <div>{prefix}{prefix ? ' ' : ''}{to.toLocaleString('it')}{suffix}</div>
}

export default function ChiSiamo() {

  return (
    <section id="chi-siamo" className="py-36 lg:py-52 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      <AuroraBackground />
      <div
        className="absolute top-0 right-0 w-80 h-80 opacity-[0.03] pointer-events-none"
        style={{
          background: 'var(--teal)',
          clipPath: 'polygon(30% 0%, 100% 0%, 100% 70%, 70% 100%, 0% 100%, 0% 30%)',
        }}
      />

      <div className="w-full" style={{ position: 'relative', zIndex: 1, paddingLeft: "clamp(16px, 3vw, 60px)", paddingRight: "clamp(16px, 3vw, 60px)" }}>
        <div className="grid lg:grid-cols-2 items-start" style={{ gap: '1.5rem' }}>

          {/* Blocco testo (sinistra) — a filo del bordo sinistro del sito */}
          <div
            style={{
              marginLeft: 'calc(clamp(16px, 3vw, 60px) * -1)',
              marginTop: '3.5rem',
              marginBottom: '3.5rem',
              borderRadius: '0 24px 24px 0',
              border: '1px solid rgba(255,255,255,0.10)',
              borderLeft: 'none',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(16px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(16px) saturate(1.4)',
              boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.08), 0 8px 40px rgba(0,0,0,0.30)',
              padding: 'clamp(2rem, 3.5vw, 3.5rem)',
              paddingLeft: 'clamp(16px, 3vw, 60px)',
              alignSelf: 'start',
            }}
          >
            <div
              className="flex items-center gap-3" style={{ marginBottom: '2rem', marginTop: '2rem' }}
            >
              <div className="h-px w-10" style={{ background: 'var(--teal)' }} />
              <span className="section-label">Chi Siamo</span>
            </div>

            <h2
              className="font-display mb-6"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', lineHeight: 1.1, color: 'var(--dark)' }}
            >
              Una storia lunga<br />
              <span style={{ color: 'var(--teal)' }}>quasi 70 anni</span>
            </h2>

            <div className="prose-euro space-y-4">
              <p>
                Dal 1956, Euroceram 2002 è il punto di riferimento per pavimenti, rivestimenti e arredo bagno
                di alta qualità ad Arzano, nel cuore metropolitano di Napoli.
              </p>
              <p>
                Offriamo una selezione accurata di oltre 200 brand internazionali — dai gres porcellanati di grande
                formato ai marmi pregiati, dalle ceramiche decorative ai sanitari di design — tutto in un unico showroom
                di 1.000 m² dove puoi toccare con mano ogni materiale.
              </p>
              <p>
                Il nostro team ti accompagna dalla progettazione 3D gratuita fino alla posa,
                con un servizio post-vendita che non ti lascia solo neanche dopo.
              </p>
            </div>

            <div
              className="flex"
              style={{ marginTop: '3rem' }}
            >
              <a
                href="#prodotti"
                className="btn-primary"
                style={{ padding: '20px 64px', fontSize: '1rem', letterSpacing: '0.12em' }}
              >
                Esplora i Prodotti
              </a>
            </div>
          </div>

          {/* Blocco immagine (destra) — centrata verticalmente sul blocco testo */}
          <div className="relative" style={{ alignSelf: 'center' }}>
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: 24, border: '1px solid rgba(255,255,255,0.10)' }}
            >
              <img
                src="/images/img-living-marmo.jpg"
                alt="Living effetto marmo — Euroceram"
                className="w-full object-cover"
                style={{ height: 420, filter: 'brightness(0.88) contrast(1.05) saturate(1.05)' }}
              />
              {/* Gradient bottom */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(28,28,28,0.75) 0%, transparent 55%)' }} />
              {/* Stats sovrapposti in basso */}
              <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 gap-px" style={{ background: 'rgba(0,0,0,0.3)' }}>
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="p-5"
                    style={{ background: 'rgba(8,10,7,0.55)', backdropFilter: 'blur(8px)' }}
                  >
                    <div className="font-display text-3xl font-light mb-1" style={{ color: 'var(--teal)' }}>
                      <Counter to={s.value} suffix={s.suffix} prefix={s.prefix} />
                    </div>
                    <div className="text-[10px] tracking-[0.15em] uppercase text-white/60">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Immagine secondaria in basso a destra, sovrapposta — nascosta su telefono
                (copriva la voce "5000 m² Showroom") */}
            <div
              className="hidden md:block absolute -bottom-6 -right-6 w-36 h-28 overflow-hidden border-2"
              style={{ borderColor: 'var(--teal)', borderRadius: 2 }}
            >
              <img
                src="/images/img-sala-marmo-scuro.jpg"
                alt="Sala marmo scuro — dettaglio"
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.9) saturate(1.1)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
