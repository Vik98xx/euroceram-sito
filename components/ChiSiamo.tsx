'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from './motion'

const STATS = [
  { value: 1956, label: 'Anno di fondazione', prefix: 'Dal' },
  { value: 68, suffix: '+', label: 'Anni di esperienza' },
  { value: 200, suffix: '+', label: 'Brand in catalogo' },
  { value: 5000, suffix: 'm²', label: 'Showroom ad Arzano' },
]

function Counter({ to, suffix = '', prefix = '', inView }: { to: number; suffix?: string; prefix?: string; inView: boolean }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    const steps = 60
    const inc = to / steps
    let current = 0
    const timer = setInterval(() => {
      current += inc
      if (current >= to) { setCount(to); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, 2000 / steps)
    return () => clearInterval(timer)
  }, [inView, to])
  return <>{prefix}{prefix ? ' ' : ''}{count.toLocaleString('it')}{suffix}</>
}

export default function ChiSiamo() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="chi-siamo" ref={ref} className="py-28 lg:py-36 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      <div
        className="absolute top-0 right-0 w-80 h-80 opacity-[0.03] pointer-events-none"
        style={{
          background: 'var(--teal)',
          clipPath: 'polygon(30% 0%, 100% 0%, 100% 70%, 70% 100%, 0% 100%, 0% 30%)',
        }}
      />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Text */}
          <div>
            <motion.div
              className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="h-px w-10" style={{ background: 'var(--teal)' }} />
              <span className="section-label">Chi Siamo</span>
            </motion.div>

            <motion.h2
              className="font-display mb-6"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', lineHeight: 1.1, color: 'var(--dark)' }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Una storia lunga<br />
              <span style={{ color: 'var(--teal)' }}>quasi 70 anni</span>
            </motion.h2>

            <motion.div
              className="prose-euro space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p>
                Dal 1956, Euroceram 2002 è il punto di riferimento per pavimenti, rivestimenti e arredo bagno
                di alta qualità ad Arzano, nel cuore metropolitano di Napoli.
              </p>
              <p>
                Offriamo una selezione accurata di oltre 200 brand internazionali — dai gres porcellanati di grande
                formato ai marmi pregiati, dalle ceramiche decorative ai sanitari di design — tutto in un unico showroom
                di 5.000 m² dove puoi toccare con mano ogni materiale.
              </p>
              <p>
                Il nostro team ti accompagna dalla progettazione 3D gratuita fino alla posa,
                con un servizio post-vendita che non ti lascia solo neanche dopo.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-3 mt-8"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <a href="#preventivo" className="btn-primary">Richiedi Preventivo</a>
              <a href="#prodotti" className="btn-outline">Esplora i Prodotti</a>
            </motion.div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-5">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                className="card-hover p-8 border"
                style={{
                  borderColor: 'var(--border)',
                  background: i % 2 === 0 ? 'var(--card)' : 'transparent',
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              >
                <div className="font-display text-4xl font-light mb-2" style={{ color: 'var(--teal)' }}>
                  <Counter to={s.value} suffix={s.suffix} prefix={s.prefix} inView={inView} />
                </div>
                <div className="text-xs tracking-[0.15em] uppercase" style={{ color: 'var(--muted)' }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
