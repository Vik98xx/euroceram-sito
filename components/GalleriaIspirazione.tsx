'use client'

import { useRef } from 'react'
import { motion, useInView } from './motion'
import { InteractiveImageAccordion } from './ui/interactive-image-accordion'

export default function GalleriaIspirazione() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="ispirazione" ref={ref} className="py-24 lg:py-32" style={{ background: '#060E0E' }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-20">

        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: 'var(--teal)' }} />
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.45)' }}>Galleria</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.1 }}>
              Lasciati <span style={{ color: 'var(--teal)' }}>Ispirare</span>
            </h2>
            <p className="text-sm max-w-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Passa il cursore su ogni pannello per scoprire le nostre categorie di prodotto
            </p>
          </div>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <InteractiveImageAccordion />
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <a
            href="#preventivo"
            className="btn-outline"
            style={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.15)' }}
          >
            Richiedi il tuo Progetto
          </a>
        </motion.div>
      </div>
    </section>
  )
}
