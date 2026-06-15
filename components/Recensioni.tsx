'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from './motion'

const REVIEWS = [
  {
    name: 'Vincenzo Noviello',
    role: 'Local Guide · 137 recensioni',
    rating: 5,
    date: '5 anni fa',
    text: 'Accorsato esercizio di materiali edili con sala mostra showroom, si può trovare dal mattone alle piastrelle, idrotermosanitari ed arredo bagno. Il tutto presentato con gentilezza e competenza degli addetti alla vendita.',
  },
  {
    name: 'Cristofaro De Rosa',
    role: 'Local Guide · 31 recensioni',
    rating: 5,
    date: 'Un anno fa',
    text: 'Una grossa esposizione di piastrelle e non solo, persone che ti fanno sentire a tuo agio. Lo consiglio vivamente a chiunque stia cercando materiali di qualità con un servizio eccellente.',
  },
  {
    name: 'Aniello Pezzella',
    role: 'Local Guide · 93 recensioni',
    rating: 5,
    date: '8 anni fa',
    text: "Una vasta gamma di ceramiche e pezzi igienici di tutti i tipi. L'Euroceram 2002 srl è una consolidata realtà leader nel settore delle ceramiche, arredo bagno e nei prodotti termoidraulici.",
  },
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

export default function Recensioni() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)

  return (
    <section id="recensioni" ref={ref} className="py-24 lg:py-32" style={{ background: 'var(--bg)' }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-20">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10" style={{ background: 'var(--teal)' }} />
              <span className="section-label">Google Reviews</span>
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--dark)', lineHeight: 1.1 }}>
              Cosa Dicono<br />
              <span style={{ color: 'var(--teal)' }}>i Nostri Clienti</span>
            </h2>
          </motion.div>

          {/* Rating badge */}
          <motion.a
            href="https://maps.google.com/?q=Euroceram+2002+Arzano"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-5 p-5 border card-hover"
            style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div>
              <div className="font-display text-4xl font-light" style={{ color: 'var(--teal)' }}>4,6</div>
              <Stars n={5} />
              <div className="text-[10px] tracking-wider mt-1" style={{ color: 'var(--muted)' }}>11 recensioni Google</div>
            </div>
            <div className="w-px h-14" style={{ background: 'var(--border)' }} />
            <div>
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2 mb-1">
                  <span className="text-[9px]" style={{ color: 'var(--muted)' }}>{star}</span>
                  <div className="w-16 h-1 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'var(--teal)' }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: star >= 4 ? '85%' : star === 3 ? '10%' : '0%' } : {}}
                      transition={{ duration: 1, delay: 0.5 + (5 - star) * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.a>
        </div>

        {/* Reviews */}
        <div className="grid md:grid-cols-3 gap-5">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={i}
              className="p-7 border relative overflow-hidden group cursor-pointer"
              style={{
                borderColor: active === i ? 'var(--teal)' : 'var(--border)',
                background: 'var(--card)',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ borderColor: 'var(--teal)' }}
              onClick={() => setActive(i)}
            >
              {active === i && (
                <motion.div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'var(--teal)' }} layoutId="activeBar" />
              )}

              <div className="flex items-start justify-between mb-4">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: `hsl(${i * 80 + 180}, 35%, 45%)` }}>
                  {review.name[0]}
                </div>
                <span className="text-[10px]" style={{ color: 'var(--muted)' }}>{review.date}</span>
              </div>

              <Stars n={review.rating} />

              <p className="text-sm leading-relaxed my-4" style={{ color: 'var(--muted)' }}>
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="border-t pt-4" style={{ borderColor: 'var(--border)' }}>
                <div className="text-sm font-medium" style={{ color: 'var(--dark)' }}>{review.name}</div>
                <div className="text-[10px] mt-0.5" style={{ color: 'var(--muted)' }}>{review.role}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <a
            href="https://maps.google.com/?q=Euroceram+2002+Arzano"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex"
          >
            Scrivi una Recensione
          </a>
        </motion.div>
      </div>
    </section>
  )
}
