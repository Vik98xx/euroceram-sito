'use client'

import { motion } from './motion'

const REVIEWS = [
  {
    name: 'Vincenzo Noviello',
    role: 'Recensione Google · 5 anni fa',
    rating: 4,
    text: 'Accorsato esercizio di materiali edili con sala mostra showroom, si può trovare dal mattone alle piastrelle, idrotermosanitari ed arredo bagno. Il tutto presentato con gentilezza e competenza degli addetti alla vendita.',
  },
  {
    name: 'Cristofaro De Rosa',
    role: 'Recensione Google · un anno fa',
    rating: 5,
    text: 'Una grossa esposizione di piastrelle e non solo, persone che ti fanno sentire a tuo agio. Lo consiglio.',
  },
  {
    name: 'Aniello Pezzella',
    role: 'Recensione Google · 8 anni fa',
    rating: 4,
    text: 'Una vasta gamma di ceramiche e pezzi igienici di tutti i tipi di gamma e cabine doccia.',
  },
  {
    name: 'Raffaele De Rosa',
    role: 'Recensione Google · 6 anni fa',
    rating: 5,
    text: 'Prodotti di altissima qualità. Personale disponibile e preparato.',
  },
  {
    name: 'Antonio Ingenito',
    role: 'Recensione Google · 5 anni fa',
    rating: 5,
    text: 'Cordialità e esperienza nel settore.',
  },
  {
    name: 'Luca Izzolino',
    role: 'Recensione Google · 9 anni fa',
    rating: 5,
    text: 'Numeri uno. Il top del settore.',
  },
  {
    name: 'Salvatore Severino',
    role: 'Recensione Google · 3 anni fa',
    rating: 5,
    text: 'Vasto assortimento.',
  },
]

// Righe: 3 + 2 + 2 — tutte le 7 recensioni, una sola volta, nessun duplicato. Scorrono verso l'alto in loop.
const ROWS = [
  [REVIEWS[0], REVIEWS[1], REVIEWS[2]], // Vincenzo, Cristofaro, Aniello — 3
  [REVIEWS[5], REVIEWS[6]],             // Luca, Salvatore — 2
  [REVIEWS[3], REVIEWS[4]],             // Raffaele, Antonio — 2
]

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 13 13">
          <path d="M6.5 1l1.4 3.3L11 4.9 8.6 7.2l.5 3.3L6.5 9l-2.6 1.5.5-3.3L2 4.9l3.1-.6z"
            fill={i < n ? 'var(--teal)' : 'rgba(255,255,255,0.1)'} />
        </svg>
      ))}
    </div>
  )
}

/* Pannello vetro riutilizzabile — stesso look del LiquidButton ma senza vincoli di dimensione */
function GlassPanel({ children, className, style }: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div className={`relative ${className ?? ''}`} style={style}>
      {/* strato blur + tinta */}
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
        style={{
          backdropFilter: 'blur(18px) saturate(1.6) brightness(1.08)',
          WebkitBackdropFilter: 'blur(18px) saturate(1.6) brightness(1.08)',
          background: 'rgba(255,255,255,0.06)',
        }}
      />
      {/* bordo luminoso + ombra interna liquida */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          border: '1px solid rgba(255,255,255,0.18)',
          boxShadow: [
            /* esterni */
            '0 4px 24px rgba(0,0,0,0.18)',
            '0 1px 2px rgba(0,0,0,0.12)',
            /* luci interne angoli */
            'inset 1px 1px 0 rgba(255,255,255,0.22)',
            'inset -1px -1px 0 rgba(255,255,255,0.06)',
            /* riflesso superiore */
            'inset 0 2px 8px rgba(255,255,255,0.10)',
            /* profondità interna */
            'inset 0 -2px 10px rgba(0,0,0,0.15)',
          ].join(','),
        }}
      />
      {/* contenuto sopra i layer */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default function Recensioni() {
  return (
    <section id="recensioni" style={{ background: 'var(--bg)', paddingTop: 'var(--section-gap-lg)', paddingBottom: 'var(--section-gap-sm)' }}>
      <div className="w-full" style={{ paddingLeft: 'clamp(16px, 3vw, 60px)', paddingRight: 'clamp(16px, 3vw, 60px)' }}>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8" style={{ marginBottom: '4rem' }}>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10" style={{ background: 'var(--teal)' }} />
              <span className="section-label">Google Reviews</span>
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--dark)', lineHeight: 1.1 }}>
              Cosa Dicono<br />
              <span style={{ color: 'var(--teal)' }}>i Nostri Clienti</span>
            </h2>
          </div>

          {/* Badge 4,6 — Liquid Glass */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            style={{ transition: 'transform 0.35s cubic-bezier(.22,1,.36,1)' }}
          >
            <GlassPanel>
              <a
                href="https://maps.google.com/?q=Euroceram+2002+Arzano"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-6"
                style={{ padding: '1.25rem 1.75rem' }}
              >
                {/* Score */}
                <div>
                  <div className="font-display text-4xl font-light" style={{ color: 'var(--teal)', lineHeight: 1 }}>4,6</div>
                  <Stars n={5} />
                  <div className="text-[10px] tracking-wider mt-1" style={{ color: 'var(--muted)', whiteSpace: 'nowrap' }}>11 recensioni Google</div>
                </div>
                {/* Divider */}
                <div className="w-px self-stretch" style={{ background: 'rgba(255,255,255,0.12)' }} />
                {/* Bar chart */}
                <div>
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] w-2 text-right" style={{ color: 'var(--muted)' }}>{star}</span>
                      <div className="w-20 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <div
                          className="h-full rounded-full"
                          style={{ background: 'var(--teal)', width: star >= 4 ? '85%' : star === 3 ? '10%' : '0%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </a>
            </GlassPanel>
          </motion.div>
        </div>

        {/* Review rows — marquee verticale, righe alternate 3 / 2 */}
        <div className="[mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[460px] overflow-hidden">
          <motion.div
            className="flex flex-col gap-6"
            style={{ willChange: 'transform' }}
            initial={{ y: 0 }}
            animate={{ y: '-50%' }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          >
            {[...ROWS, ...ROWS].map((row, ri) => (
              <div key={ri} className="flex flex-wrap justify-center gap-6">
                {row.map((review, ci) => (
                  <div
                    key={ci}
                    className="rounded-3xl"
                    style={{
                      flex: '1 1 300px',
                      maxWidth: 300,
                      padding: '1.75rem',
                      background: 'rgba(255,255,255,0.04)',
                      backdropFilter: 'blur(16px) saturate(1.4)',
                      WebkitBackdropFilter: 'blur(16px) saturate(1.4)',
                      border: '1px solid rgba(255,255,255,0.10)',
                      boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.25)',
                    }}
                  >
                    <Stars n={review.rating} />
                    <p style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontSize: '1.05rem',
                      lineHeight: 1.6,
                      color: 'rgba(255,255,255,0.65)',
                      fontStyle: 'italic',
                      marginTop: '0.9rem',
                    }}>
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 mt-5">
                      <div
                        className="flex items-center justify-center rounded-full flex-shrink-0"
                        style={{
                          width: 42, height: 42,
                          background: `hsl(${(ci * 67 + 180) % 360}, 38%, 38%)`,
                          fontSize: '1.05rem', fontWeight: 700, color: '#fff',
                          fontFamily: 'var(--font-cormorant), Georgia, serif',
                        }}
                      >
                        {review.name[0]}
                      </div>
                      <div className="flex flex-col">
                        <div className="font-medium tracking-tight leading-5" style={{ color: '#fff' }}>{review.name}</div>
                        <div className="leading-5 tracking-tight" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>{review.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="text-center" style={{ marginTop: '2.5rem' }}>
          <a
            href="https://maps.google.com/?q=Euroceram+2002+Arzano"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            Scrivi una Recensione
          </a>
        </div>
      </div>
    </section>
  )
}
