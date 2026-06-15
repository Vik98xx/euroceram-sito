'use client'

import { useRef } from 'react'
import { motion, useInView } from './motion'

const BRANDS = [
  { name: 'FAP Ceramiche', cat: 'Pavimenti & Rivestimenti' },
  { name: 'Emil Ceramica', cat: 'Gres Porcellanato' },
  { name: 'Provenza', cat: 'Ceramiche d\'Arte' },
  { name: 'Ergon', cat: 'Design & Sostenibilità' },
  { name: 'Ceramica d\'Imola', cat: 'Tradizione Italiana' },
  { name: 'Hafro', cat: 'Arredo Bagno' },
  { name: 'Catalano', cat: 'Sanitari' },
  { name: 'Frisone', cat: 'Rubinetteria' },
  { name: 'Daniel', cat: 'Box Doccia' },
  { name: 'Bongio', cat: 'Rubinetteria Design' },
]

export default function Brand() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="brand" ref={ref} className="py-24 lg:py-32" style={{ background: 'var(--bg)' }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-20">

        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: 'var(--teal)' }} />
            <span className="section-label">I Nostri Partner</span>
            <div className="h-px w-10" style={{ background: 'var(--teal)' }} />
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--dark)', lineHeight: 1.1 }}>
            Brand <span style={{ color: 'var(--teal)' }}>di Eccellenza</span>
          </h2>
          <p className="mt-4 text-sm max-w-lg mx-auto" style={{ color: 'var(--muted)' }}>
            Collaboriamo con i migliori produttori italiani ed europei per offrirti qualità certificata e design senza compromessi.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px" style={{ background: 'var(--border)' }}>
          {BRANDS.map((brand, i) => (
            <motion.div
              key={i}
              className="group flex flex-col items-center justify-center text-center p-6 lg:p-8 cursor-default"
              style={{ background: 'var(--bg)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ background: 'var(--card)' }}
            >
              {/* Brand monogram */}
              <div
                className="w-14 h-14 flex items-center justify-center mb-3 font-display text-2xl font-light transition-colors duration-300"
                style={{ color: 'var(--muted)' }}
              >
                <span className="group-hover:text-[var(--teal)] transition-colors duration-300">
                  {brand.name.charAt(0)}
                </span>
              </div>
              <div className="text-xs font-semibold tracking-wide mb-1" style={{ color: 'var(--dark)' }}>
                {brand.name}
              </div>
              <div className="text-[10px] tracking-wider" style={{ color: 'var(--muted)' }}>
                {brand.cat}
              </div>
              <div
                className="h-px w-0 group-hover:w-8 transition-all duration-400 mt-3"
                style={{ background: 'var(--teal)' }}
              />
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-xs mt-8"
          style={{ color: 'var(--muted)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          E molti altri brand disponibili in showroom · <a href="#contatti" style={{ color: 'var(--teal)' }} className="underline">Contattaci per info</a>
        </motion.p>
      </div>
    </section>
  )
}
