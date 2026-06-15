'use client'

import { useRef } from 'react'
import { motion, useInView } from './motion'

const CATEGORIES = [
  {
    title: 'Piastrelle & Gres',
    desc: 'Grande formato, effetto marmo, cemento e legno. Soluzioni per ogni ambiente, dal living all\'outdoor.',
    tags: ['Gres Porcellanato', 'Grande Formato', 'Effetto Marmo', 'Outdoor'],
    accent: 'var(--teal)',
    icon: <TileIcon />,
  },
  {
    title: 'Ceramiche Decorative',
    desc: 'Maioliche, decori hand-made, mosaici e rivestimenti artistici. L\'estetica che racconta la tradizione.',
    tags: ['Maiolica', 'Mosaico', 'Decori', 'Artistico'],
    accent: 'var(--accent)',
    icon: <WallIcon />,
  },
  {
    title: 'Arredo Bagno',
    desc: 'Mobili bagno, lavabi sospesi e a colonna, specchi illuminati e accessori di design premium.',
    tags: ['Mobili Bagno', 'Lavabi', 'Specchi LED', 'Accessori'],
    accent: 'var(--teal)',
    icon: <BathroomIcon />,
  },
  {
    title: 'Rubinetterie',
    desc: 'Miscelatori monocomando, termostatici, rubinetteria da incasso e design di alta gamma.',
    tags: ['Miscelatori', 'Termostatici', 'Da Incasso', 'Design'],
    accent: 'var(--accent)',
    icon: <TapIcon />,
  },
  {
    title: 'Sanitari',
    desc: 'WC sospesi, bidet, vasi monoblocco e sistemi di scarico delle migliori marche italiane ed europee.',
    tags: ['WC Sospeso', 'Bidet', 'Monoblocco', 'Top Brand'],
    accent: 'var(--teal)',
    icon: <SanitaryIcon />,
  },
  {
    title: 'Box Doccia & Vasche',
    desc: 'Walk-in, box multifunzione, piatti doccia a filo pavimento e vasche freestanding da sogno.',
    tags: ['Walk-in', 'Filo Pavimento', 'Freestanding', 'Idromassaggio'],
    accent: 'var(--accent)',
    icon: <ShowerIcon />,
  },
]

export default function Prodotti() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="prodotti" ref={ref} className="py-28 lg:py-36" style={{ background: '#0C1616' }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-20">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10" style={{ background: 'var(--teal)' }} />
              <span className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Il Nostro Catalogo</span>
            </div>
            <h2
              className="font-display text-white"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}
            >
              I Nostri <span style={{ color: 'var(--teal)' }}>Prodotti</span>
            </h2>
          </motion.div>
          <motion.p
            className="text-sm leading-relaxed max-w-sm"
            style={{ color: 'rgba(255,255,255,0.45)' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Tutto quello che serve per trasformare la tua casa: dall&apos;idea al prodotto finito,
            con la consulenza dei nostri esperti.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={i}
              className="relative group cursor-pointer p-8"
              style={{ background: '#0C1616' }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              whileHover={{ background: '#111F1F' }}
            >
              {/* Top color bar */}
              <div
                className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                style={{ background: cat.accent }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 flex items-center justify-center mb-6"
                style={{ background: 'rgba(91,164,164,0.1)', border: `1px solid ${cat.accent}22` }}
              >
                {cat.icon}
              </div>

              <h3 className="text-white font-medium text-lg mb-3 group-hover:text-[var(--teal)] transition-colors duration-300">
                {cat.title}
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {cat.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {cat.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-wider uppercase px-3 py-1"
                    style={{ border: `1px solid ${cat.accent}33`, color: `${cat.accent}` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-6 text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: 'var(--teal)' }}>
                <span>Scopri di più</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <a href="#preventivo" className="btn-primary">
            Richiedi Preventivo Gratuito
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function TileIcon() {
  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="1" y="1" width="8" height="8" rx="1" stroke="var(--teal)" strokeWidth="1.4"/><rect x="13" y="1" width="8" height="8" rx="1" stroke="var(--teal)" strokeWidth="1.4"/><rect x="1" y="13" width="8" height="8" rx="1" stroke="var(--teal)" strokeWidth="1.4"/><rect x="13" y="13" width="8" height="8" rx="1" stroke="var(--teal)" strokeWidth="1.4"/></svg>
}
function WallIcon() {
  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="1" y="1" width="20" height="20" rx="1" stroke="var(--accent)" strokeWidth="1.4"/><path d="M1 8h20M1 15h20M8 1v7M15 1v7M11 8v7M5 15v6M17 15v6" stroke="var(--accent)" strokeWidth="1" opacity="0.6"/></svg>
}
function BathroomIcon() {
  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 14h16v2.5A2 2 0 0117 18.5H5A2 2 0 013 16.5V14z" stroke="var(--teal)" strokeWidth="1.4"/><path d="M3 14V7a2 2 0 012-2h2v9" stroke="var(--teal)" strokeWidth="1.4"/><path d="M8 12h9" stroke="var(--teal)" strokeWidth="1.4" strokeLinecap="round"/></svg>
}
function TapIcon() {
  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 14h14M11 14V8M8 8h6M11 8V5" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round"/><circle cx="11" cy="4" r="1.5" stroke="var(--accent)" strokeWidth="1.4"/><path d="M4 14v3a2 2 0 002 2h10a2 2 0 002-2v-3" stroke="var(--accent)" strokeWidth="1.4"/></svg>
}
function SanitaryIcon() {
  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><ellipse cx="11" cy="13" rx="7" ry="5" stroke="var(--teal)" strokeWidth="1.4"/><path d="M4 13v3c0 1.7 3.1 3 7 3s7-1.3 7-3v-3" stroke="var(--teal)" strokeWidth="1.4"/><path d="M11 8v5" stroke="var(--teal)" strokeWidth="1.4" strokeLinecap="round"/><circle cx="11" cy="6" r="2" stroke="var(--teal)" strokeWidth="1.4"/></svg>
}
function ShowerIcon() {
  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M5 19V7" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round"/><path d="M5 7a6 6 0 016-6" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round"/><path d="M11 1v3" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round"/><circle cx="10" cy="13" r="1" fill="var(--accent)"/><circle cx="14" cy="11" r="1" fill="var(--accent)"/><circle cx="14" cy="15" r="1" fill="var(--accent)"/><circle cx="17" cy="12" r="1" fill="var(--accent)"/></svg>
}
