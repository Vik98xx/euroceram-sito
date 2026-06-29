'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from './motion'
import { InfiniteGridDecor } from './ui/the-infinite-grid'

const CATEGORIES = [
  {
    title: 'Piastrelle & Gres',
    desc: 'Grande formato, effetto marmo, cemento e legno. Soluzioni per ogni ambiente, dal living all\'outdoor.',
    tags: ['Gres Porcellanato', 'Grande Formato', 'Effetto Marmo', 'Outdoor'],
    accent: 'var(--teal)',
    icon: <TileIcon />,
    img: '/images/vendor-photos/emil-ceramica/crystal--tdm20extra20120x27820living.jpg',
    catalogAnchor: 'piastrelle-gres',
  },
  {
    title: 'Ceramiche Decorative',
    desc: 'Maioliche, decori hand-made, mosaici e rivestimenti artistici. L\'estetica che racconta la tradizione.',
    tags: ['Maiolica', 'Mosaico', 'Decori', 'Artistico'],
    accent: 'var(--accent)',
    icon: <WallIcon />,
    img: '/images/vendor-photos/emil-ceramica/forme-ambienti-jpeg-300dpi-a4--forme-antracite-80x80-majolica-lux-ocra-brick-bianco-assoluto-antracite-amb-ristorante.jpg',
    catalogAnchor: 'ceramiche-decorative',
  },
  {
    title: 'Arredo Bagno',
    desc: 'Mobili bagno, lavabi sospesi e a colonna, specchi illuminati e accessori di design premium.',
    tags: ['Mobili Bagno', 'Lavabi', 'Specchi LED', 'Accessori'],
    accent: 'var(--teal)',
    icon: <BathroomIcon />,
    img: '/images/brand-photos/bagno-1.jpg',
    catalogAnchor: 'arredo-bagno',
  },
  {
    title: 'Rubinetterie',
    desc: 'Miscelatori monocomando, termostatici, rubinetteria da incasso e design di alta gamma.',
    tags: ['Miscelatori', 'Termostatici', 'Da Incasso', 'Design'],
    accent: 'var(--accent)',
    icon: <TapIcon />,
    img: '/images/brand-photos/rubinetteria-cover.png',
    catalogAnchor: 'rubinetterie',
  },
  {
    title: 'Sanitari',
    desc: 'WC sospesi, bidet, vasi monoblocco e sistemi di scarico delle migliori marche italiane ed europee.',
    tags: ['WC Sospeso', 'Bidet', 'Monoblocco', 'Top Brand'],
    accent: 'var(--teal)',
    icon: <SanitaryIcon />,
    img: '/images/brand-photos/sanitari-4.webp',
    catalogAnchor: 'sanitari',
  },
  {
    title: 'Box Doccia & Vasche',
    desc: 'Walk-in, box multifunzione, piatti doccia a filo pavimento e vasche freestanding da sogno.',
    tags: ['Walk-in', 'Filo Pavimento', 'Freestanding', 'Idromassaggio'],
    accent: 'var(--accent)',
    icon: <ShowerIcon />,
    img: '/images/brand-photos/docce-2.jpg',
    catalogAnchor: 'box-doccia-vasche',
  },
]

export default function Prodotti() {
  return (
    <section id="prodotti" style={{ position: 'relative', overflow: 'hidden', background: '#10130F', paddingTop: 'var(--section-gap-lg)', paddingBottom: 'var(--section-gap-md)' }}>
      <div className="hidden md:block"><InfiniteGridDecor /></div>
      <div className="w-full" style={{ position: 'relative', zIndex: 1, paddingLeft: "clamp(16px, 3vw, 60px)", paddingRight: "clamp(16px, 3vw, 60px)" }}>

        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: 'var(--teal)' }} />
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Il Nostro Catalogo</span>
            <div className="h-px w-10" style={{ background: 'var(--teal)' }} />
          </div>
          <h2
            className="font-display text-white"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}
          >
            I Nostri <span style={{ color: 'var(--teal)' }}>Prodotti</span>
          </h2>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '34rem', marginLeft: 'auto', marginRight: 'auto', marginTop: '1.25rem' }}
          >
            Tutto quello che serve per trasformare la tua casa: dall&apos;idea al prodotto finito,
            con la consulenza dei nostri esperti.
          </p>
        </div>

        {/* Griglia 2 colonne su mobile, 3 su desktop — tutte visibili senza scorrimento */}
        <div
          className="grid grid-cols-2 lg:grid-cols-3"
          style={{ gap: 'clamp(0.5rem, 2vw, 1.5rem)' }}
        >
          {CATEGORIES.map((cat, i) => (
            <ProdottoCard key={i} cat={cat} i={i} />
          ))}
        </div>

        {/* CTA */}
        <div
          className="text-center flex flex-wrap justify-center gap-3"
          style={{ marginTop: '2.5rem' }}
        >
          <a href="#preventivo" className="btn-primary">
            Richiedi Preventivo Gratuito
          </a>
          <Link href="/catalogo" prefetch={false} className="btn-outline">
            Vedi il Catalogo Completo
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ── Card component — hooks called at top level ── */
type CatType = { title: string; desc: string; tags: string[]; accent: string; icon: React.ReactNode; img: string; catalogAnchor: string | null }

function ProdottoCard({ cat, i }: { cat: CatType; i: number }) {
  const [hovered, setHovered] = useState(false)
  const href = cat.catalogAnchor ? `/catalogo#${cat.catalogAnchor}` : '/catalogo'

  return (
    <motion.div
      className="relative overflow-hidden"
      style={{
        minHeight: 'clamp(160px, 45vw, 360px)',
        width: '100%',
        borderRadius: 'clamp(12px, 3vw, 24px)',
        background: '#10130F',
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.25)',
      }}
      whileHover={{ y: -6, borderColor: 'rgba(111,168,144,0.4)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={href}
        prefetch={false}
        aria-label={`Vedi ${cat.title} nel catalogo`}
        className="absolute inset-0 flex flex-col"
        style={{ justifyContent: 'flex-end', padding: 0 }}
      >
        {/* Foto categoria — sfondo a piena card, come "I Nostri Punti di Forza" */}
        <img
          src={cat.img}
          alt={cat.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
            transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
        {/* Pellicola gradiente dal basso verso l'alto */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(8,10,7,0.96) 0%, rgba(8,10,7,0.78) 32%, rgba(8,10,7,0.3) 62%, rgba(8,10,7,0.05) 100%)' }}
        />

        {/* Etichetta numerica — nascosta su mobile */}
        <span
          className="font-display absolute select-none pointer-events-none hidden md:block"
          style={{ top: 14, right: 20, fontSize: '3.2rem', lineHeight: 1, fontWeight: 500, color: 'rgba(255,255,255,0.18)', zIndex: 1 }}
        >
          {String(i + 1).padStart(2, '0')}
        </span>

        {/* Contenuto in basso, nell'area del gradiente — come PuntiForza */}
        <div className="relative z-10 h-full flex flex-col justify-end" style={{ padding: 'clamp(0.75rem, 3vw, 2.5rem)' }}>
          {/* Icon — più piccola su mobile */}
          <div
            className="flex items-center justify-center mb-2"
            style={{
              width: 'clamp(32px, 6vw, 48px)',
              height: 'clamp(32px, 6vw, 48px)',
              borderRadius: 'clamp(8px, 2vw, 16px)',
              background: 'rgba(16,19,15,0.7)',
              border: `1px solid ${cat.accent}55`,
              backdropFilter: 'blur(8px)',
              flexShrink: 0,
            }}
          >
            {cat.icon}
          </div>

          <motion.h3
            className="font-medium text-xs md:text-lg leading-tight mb-0 md:mb-3"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
            animate={{ x: hovered ? 4 : 0, color: hovered ? 'var(--teal)' : '#ffffff' }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          >
            {cat.title}
          </motion.h3>

          <p className="hidden md:block text-sm leading-relaxed mb-2.5 sm:mb-5" style={{ color: 'rgba(255,255,255,0.82)', textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}>
            {cat.desc}
          </p>

          <div className="hidden md:flex flex-wrap gap-2">
            {cat.tags.map((tag, ti) => (
              <motion.span
                key={tag}
                className="text-[10px] tracking-wider uppercase px-3 py-1"
                style={{ border: `1px solid ${cat.accent}55`, color: cat.accent, background: 'rgba(16,19,15,0.5)' }}
                animate={{ opacity: hovered ? 1 : 0.7 }}
                transition={{ duration: 0.2, delay: hovered ? ti * 0.05 : 0 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <motion.div
            className="flex items-center gap-2 mt-2.5 md:mt-6 text-[11px] md:text-xs tracking-widest uppercase"
            style={{ color: 'var(--teal)' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <span>Vedi nel catalogo</span>
            <motion.svg
              width="14" height="14" viewBox="0 0 14 14" fill="none"
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </motion.div>
        </div>
      </Link>
    </motion.div>
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
function RiggiolaIcon() {
  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="1" y="1" width="20" height="20" rx="1" stroke="var(--accent)" strokeWidth="1.4"/><circle cx="11" cy="11" r="5.5" stroke="var(--accent)" strokeWidth="1.2"/><circle cx="11" cy="11" r="2" stroke="var(--accent)" strokeWidth="1.2"/><path d="M11 1v3.5M11 16.5V21M1 11h3.5M16.5 11H21" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round"/></svg>
}
