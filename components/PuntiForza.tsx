'use client'

import { useRef } from 'react'
import { motion, useInView } from './motion'

const PUNTI = [
  {
    n: '01',
    title: 'Progettazione 3D Gratuita',
    desc: 'Visualizza il tuo spazio prima di acquistare con il nostro servizio di rendering 3D offerto senza costi aggiuntivi.',
    icon: '⬡',
  },
  {
    n: '02',
    title: 'Dal 1956',
    desc: 'Quasi 70 anni di esperienza nel settore. Una tradizione di qualità e affidabilità tramandata di generazione in generazione.',
    icon: '◆',
  },
  {
    n: '03',
    title: 'Gres Lavorato su Misura',
    desc: 'Taglio, squadratura e lavorazione speciale del gres porcellanato per adattarsi perfettamente al tuo progetto.',
    icon: '◈',
  },
  {
    n: '04',
    title: 'Spedizione in Tutta Italia',
    desc: 'Consegniamo i tuoi prodotti direttamente in cantiere o a domicilio, con imballaggio sicuro in tutta Italia.',
    icon: '◉',
  },
  {
    n: '05',
    title: 'Assistenza Post-Vendita',
    desc: 'Il nostro supporto non finisce con l\'acquisto. Siamo sempre disponibili per consulenze tecniche e assistenza.',
    icon: '◎',
  },
  {
    n: '06',
    title: 'Oltre 200 Brand',
    desc: 'FAP, Emil Ceramica, Provenza, Ergon, d\'Imola, Hafro, Catalano e molti altri brand di riferimento internazionale.',
    icon: '⬟',
  },
]

export default function PuntiForza() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ background: '#0C1616' }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-20">

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: 'var(--teal)' }} />
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.45)' }}>Perché Sceglierci</span>
            <div className="h-px w-10" style={{ background: 'var(--teal)' }} />
          </div>
          <h2 className="font-display text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.1 }}>
            I Nostri <span style={{ color: 'var(--teal)' }}>Punti di Forza</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
          {PUNTI.map((p, i) => (
            <motion.div
              key={i}
              className="p-8 group relative"
              style={{ background: '#0C1616' }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              whileHover={{ background: '#0F1C1C' }}
            >
              <div className="flex items-start gap-4">
                <span
                  className="text-[10px] tracking-[0.3em] font-mono mt-1 flex-shrink-0"
                  style={{ color: 'var(--teal)', opacity: 0.6 }}
                >
                  {p.n}
                </span>
                <div>
                  <span className="text-xl block mb-3" style={{ color: 'var(--teal)' }}>{p.icon}</span>
                  <h3 className="text-white font-medium mb-2 group-hover:text-[var(--teal)] transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {p.desc}
                  </p>
                </div>
              </div>
              <div
                className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-500"
                style={{ background: 'var(--teal)' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
