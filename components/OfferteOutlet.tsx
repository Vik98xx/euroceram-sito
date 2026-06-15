'use client'

import { useRef } from 'react'
import { motion, useInView } from './motion'

const OFFERTE = [
  {
    badge: 'OFFERTA DEL MESE',
    title: 'Gres Effetto Marmo Calacatta',
    desc: 'Grande formato 60×120 cm · Effetto marmo bianco con venature oro · Ideale per living e bagno di lusso',
    original: '€ 52',
    price: '€ 34',
    unit: '/m²',
    color: 'var(--teal)',
  },
  {
    badge: 'OUTLET',
    title: 'Arredo Bagno Sospeso Completo',
    desc: 'Mobile da 80 cm con lavabo integrato, specchio LED e colonna · Colore grigio cemento opaco',
    original: '€ 1.290',
    price: '€ 890',
    unit: '',
    color: 'var(--accent)',
  },
  {
    badge: 'PROMOZIONE',
    title: 'Box Doccia Walk-In 8mm',
    desc: 'Cristallo temperato 8mm · Profilo nero opaco · Cm 80–120 · Inclusa cerniera e barra stabilizzatrice',
    original: '€ 680',
    price: '€ 480',
    unit: '',
    color: 'var(--teal)',
  },
]

export default function OfferteOutlet() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="offerte" ref={ref} className="py-24 lg:py-32" style={{ background: 'var(--bg)' }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-20">

        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: 'var(--accent)' }} />
            <span className="section-label" style={{ color: 'var(--accent)', borderColor: 'var(--accent)33' }}>Offerte & Outlet</span>
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--dark)', lineHeight: 1.1 }}>
            Le Migliori <span style={{ color: 'var(--accent)' }}>Occasioni</span><br />del Momento
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {OFFERTE.map((item, i) => (
            <motion.div
              key={i}
              className="card-hover border overflow-hidden flex flex-col"
              style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {/* Top accent */}
              <div className="h-[3px]" style={{ background: item.color }} />

              <div className="p-7 flex-1 flex flex-col">
                <span
                  className="inline-block text-[9px] tracking-[0.35em] uppercase font-bold px-3 py-1 mb-5 self-start"
                  style={{ background: item.color + '18', color: item.color }}
                >
                  {item.badge}
                </span>

                <h3 className="font-display text-xl mb-3" style={{ color: 'var(--dark)', lineHeight: 1.2 }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: 'var(--muted)' }}>
                  {item.desc}
                </p>

                <div className="flex items-end gap-3 mb-6">
                  <div className="font-display text-3xl" style={{ color: item.color }}>
                    {item.price}<span className="text-base">{item.unit}</span>
                  </div>
                  <div className="text-sm line-through mb-1" style={{ color: 'var(--muted)' }}>
                    {item.original}{item.unit}
                  </div>
                </div>

                <a
                  href="#preventivo"
                  className="text-center text-[11px] tracking-[0.2em] uppercase font-semibold py-3 px-6 border transition-all duration-300 hover:text-white"
                  style={{ borderColor: item.color, color: item.color }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = item.color)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  Richiedi Info
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-xs mt-8"
          style={{ color: 'var(--muted)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          * Offerte valide fino a esaurimento scorte · Prezzi IVA esclusa · Vieni in showroom per vedere i prodotti dal vivo
        </motion.p>
      </div>
    </section>
  )
}
