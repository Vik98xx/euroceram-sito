'use client'

import React, { useState } from 'react'
import { motion } from './motion'
import { AuroraBackground } from './ui/aurora-background'

type IconFC = () => React.JSX.Element

const PUNTI: { n: string; title: string; desc: string; Icon: IconFC; img: string }[] = [
  { n: '01', title: 'Progettazione 3D Gratuita', desc: 'Visualizza il tuo spazio prima di acquistare con il nostro servizio di rendering 3D offerto senza costi aggiuntivi.', Icon: IconCube, img: '/images/progettazione.jpg' },
  { n: '02', title: 'Dal 1956', desc: 'Quasi 70 anni di esperienza nel settore. Una tradizione di qualità e affidabilità tramandata di generazione in generazione.', Icon: IconTime, img: '/images/img-pavimenti-store.jpg' },
  { n: '03', title: 'Gres Lavorato su Misura', desc: 'Taglio, squadratura e lavorazione speciale del gres porcellanato per adattarsi perfettamente al tuo progetto.', Icon: IconCut, img: '/images/lavorazionegres.jpg' },
  { n: '04', title: 'Spedizione in Tutta Italia', desc: 'Consegniamo i tuoi prodotti direttamente in cantiere o a domicilio, con imballaggio sicuro in tutta Italia.', Icon: IconShip, img: '/images/spedizioneitalia.png' },
  { n: '05', title: 'Assistenza Post-Vendita', desc: 'Il nostro supporto non finisce con l\'acquisto. Siamo sempre disponibili per consulenze tecniche e assistenza.', Icon: IconSupport, img: '/images/assistenzapostvendita.png' },
  { n: '06', title: 'Oltre 200 Brand', desc: 'FAP, Emil Ceramica, Provenza, Ergon, d\'Imola, Hafro, Catalano e molti altri brand di riferimento internazionale.', Icon: IconGrid, img: '/images/brand-photos/piastrelle-1.jpg' },
]

function Card({ p }: { p: typeof PUNTI[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="relative overflow-hidden cursor-default"
      style={{
        minHeight: 'clamp(170px, 44vw, 340px)',
        width: '100%',
        borderRadius: 16,
        background: '#10130F',
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.25)',
      }}
      whileHover={{ y: -6, borderColor: 'rgba(111,168,144,0.4)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Foto sfondo */}
      <img
        src={p.img}
        alt={p.title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)', transform: hovered ? 'scale(1.07)' : 'scale(1)' }}
      />
      {/* Gradiente pesante dal basso — il testo vive qui */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(8,10,7,0.97) 0%, rgba(8,10,7,0.82) 42%, rgba(8,10,7,0.3) 68%, rgba(8,10,7,0.05) 100%)' }}
      />

      {/* Numero decorativo in alto a destra */}
      <span
        className="font-display absolute select-none pointer-events-none hidden md:block"
        style={{ top: 14, right: 16, fontSize: '2.8rem', lineHeight: 1, fontWeight: 500, color: 'rgba(255,255,255,0.15)', zIndex: 5 }}
      >
        {p.n}
      </span>

      {/* Contenuto — sempre in basso, nell'area del gradiente */}
      <div className="relative z-10 h-full flex flex-col justify-end" style={{ padding: 'clamp(0.85rem, 3vw, 2rem)' }}>
        {/* Icon */}
        <div
          className="mb-2 md:mb-4 flex items-center justify-center"
          style={{
            width: 'clamp(40px, 8vw, 48px)',
            height: 'clamp(40px, 8vw, 48px)',
            borderRadius: 12,
            background: 'rgba(16,19,15,0.85)',
            border: '1px solid rgba(111,168,144,0.5)',
            backdropFilter: 'blur(8px)',
            flexShrink: 0,
          }}
        >
          <p.Icon />
        </div>

        <motion.h3
          className="font-medium text-sm md:text-base mb-1 md:mb-2 leading-tight"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
          animate={{ color: hovered ? 'var(--teal)' : '#ffffff' }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
        >
          {p.title}
        </motion.h3>

        <p
          className="text-xs leading-relaxed hidden md:block"
          style={{ color: 'rgba(255,255,255,0.78)', textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}
        >
          {p.desc}
        </p>
      </div>
    </motion.div>
  )
}

export default function PuntiForza() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: '#10130F', borderTop: '1px solid rgba(111,168,144,0.12)', paddingTop: 'var(--section-gap-sm)', paddingBottom: 'var(--section-gap-lg)' }}>
      <AuroraBackground />
      <div className="w-full" style={{ position: 'relative', zIndex: 1, paddingLeft: "clamp(16px, 3vw, 60px)", paddingRight: "clamp(16px, 3vw, 60px)" }}>

        <div className="text-center" style={{ marginBottom: '5rem' }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: 'var(--teal)' }} />
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.45)' }}>Perché Sceglierci</span>
            <div className="h-px w-10" style={{ background: 'var(--teal)' }} />
          </div>
          <h2 className="font-display text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.1 }}>
            I Nostri <span style={{ color: 'var(--teal)' }}>Punti di Forza</span>
          </h2>
        </div>

        {/* Griglia 2 colonne su mobile, 3 su desktop — tutte le card visibili senza scorrimento */}
        <div
          className="grid grid-cols-2 lg:grid-cols-3"
          style={{ gap: 'clamp(0.5rem, 2vw, 1.5rem)' }}
        >
          {PUNTI.map((p, i) => (
            <Card key={i} p={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── SVG icons — statici, sempre visibili su tutti i browser incluso iOS Safari ── */
function IconCube() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="var(--teal)" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M2 17l10 5 10-5" stroke="var(--teal)" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M2 12l10 5 10-5" stroke="var(--teal)" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M2 7v10M22 7v10" stroke="var(--teal)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function IconTime() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="var(--teal)" strokeWidth="1.8" />
      <path d="M12 7v5l3 3" stroke="var(--teal)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconCut() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="1" stroke="var(--teal)" strokeWidth="1.8" />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" stroke="var(--teal)" strokeWidth="1.5" strokeOpacity="0.5" />
    </svg>
  )
}

function IconShip() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M5 17H3a2 2 0 01-2-2v-4a2 2 0 012-2h11v8H5z" stroke="var(--teal)" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 9V5a2 2 0 012-2h1l3 6h-6z" stroke="var(--teal)" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M20 17h1a2 2 0 000-4h-1" stroke="var(--teal)" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="7" cy="19" r="2" stroke="var(--teal)" strokeWidth="1.8" />
      <circle cx="17" cy="19" r="2" stroke="var(--teal)" strokeWidth="1.8" />
    </svg>
  )
}

function IconSupport() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="var(--teal)" strokeWidth="1.8" />
      <path d="M9 9a3 3 0 015.12 2.12C14.12 13 12 13 12 15" stroke="var(--teal)" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="18" r="0.8" fill="var(--teal)" />
    </svg>
  )
}

function IconGrid() {
  const rects = [{ x: 3, y: 3 }, { x: 10, y: 3 }, { x: 17, y: 3 }, { x: 3, y: 10 }, { x: 10, y: 10 }, { x: 17, y: 10 }, { x: 3, y: 17 }, { x: 10, y: 17 }, { x: 17, y: 17 }]
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      {rects.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width="4" height="4" rx="0.5" stroke="var(--teal)" strokeWidth="1.5" />
      ))}
    </svg>
  )
}
