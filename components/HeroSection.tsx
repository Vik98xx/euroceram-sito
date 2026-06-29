'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from './motion'

const SLIDES = [
  {
    label: 'Pavimenti & Esterni',
    headline: 'La Bellezza\ndel Gres\nall\'Aperto',
    sub: 'Piastrelle per spazi outdoor di grande formato',
    img: '/images/img-golden-ambra.jpg',
  },
  {
    label: 'Cool Elegance',
    headline: 'Eleganza\nMinimalista\nin Ogni Stanza',
    sub: 'Marmi e cementi per un\'estetica senza tempo',
    img: '/images/img-cool-elegance.jpg',
  },
  {
    label: 'Pattern & Texture',
    headline: 'Geometrie\nche Raccontano\nStorie',
    sub: 'Effetti chevron, mosaico e decorativi di alta gamma',
    img: '/images/img-texture-floreale.jpg',
  },
  {
    label: 'Golden Ambra',
    headline: 'Lusso\nin Ogni\nDettaglio',
    sub: 'Marmi pregiati e finiture premium per il bagno',
    img: '/images/img-bagno-caldo.jpg',
  },
]

const STATS = [
  { val: '5.000m²', label: 'Showroom' },
  { val: '200+', label: 'Brand' },
  { val: '70', label: 'Anni' },
]

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacityContent = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), 5500)
    return () => clearInterval(timer)
  }, [])

  const slide = SLIDES[current]

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[680px] overflow-hidden flex items-center"
    >
      {/* ── Video di sfondo ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* ── Overlay ── */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.30) 100%)',
        }}
      />

      {/* ── Griglia decorativa ── */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          zIndex: 1,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Layout 2 colonne ── */}
      <motion.div
        className="w-full relative"
        style={{ y, opacity: opacityContent, zIndex: 2, paddingLeft: 'clamp(16px, 3vw, 60px)', paddingRight: 'clamp(16px, 3vw, 60px)' }}
      >
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 xl:gap-20 items-center">

          {/* ── SINISTRA: testo ── */}
          <div>
            {/* Eyebrow */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`label-${current}`}
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="h-px w-10" style={{ background: 'var(--teal)' }} />
                <span className="text-[11px] tracking-[0.4em] uppercase text-white/60">{slide.label}</span>
              </motion.div>
            </AnimatePresence>

            {/* Headline */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`headline-${current}`}
                className="font-display text-white leading-[1.05] mb-6 whitespace-pre-line"
                style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', letterSpacing: '-0.02em' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {slide.headline}
              </motion.h1>
            </AnimatePresence>

            {/* Sub */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${current}`}
                className="text-white/60 text-base lg:text-lg mb-10 max-w-sm"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {slide.sub}
              </motion.p>
            </AnimatePresence>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <a href="#prodotti" className="btn-primary">
                Scopri i Prodotti
                <ArrowRight />
              </a>
              <a href="#preventivo" className="btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
                Richiedi Preventivo
              </a>
            </motion.div>

            {/* Slide dots */}
            <div className="flex gap-2 mt-12">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="h-[3px] transition-all rounded-full"
                  style={{
                    width: i === current ? 28 : 10,
                    background: i === current ? 'var(--teal)' : 'rgba(255,255,255,0.3)',
                  }}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* ── DESTRA: featured image card (solo desktop) ── */}
          <div className="hidden lg:flex flex-col gap-2">
            {/* Immagine principale */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`card-${current}`}
                className="relative overflow-hidden"
                style={{
                  height: 400,
                  border: '1px solid rgba(111,168,144,0.35)',
                }}
                initial={{ opacity: 0, x: 30, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.97 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={slide.img}
                  alt={slide.label}
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.80) saturate(1.12) contrast(1.05)' }}
                />
                {/* Gradient */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 55%)' }} />

                {/* Corner accents */}
                <div className="absolute top-4 right-4 w-7 h-7" style={{ borderTop: '1.5px solid var(--teal)', borderRight: '1.5px solid var(--teal)' }} />
                <div className="absolute bottom-[72px] left-4 w-7 h-7" style={{ borderBottom: '1.5px solid var(--teal)', borderLeft: '1.5px solid var(--teal)' }} />

                {/* Label + category */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-[9px] tracking-[0.4em] uppercase mb-1" style={{ color: 'var(--teal)' }}>{slide.label}</div>
                  <div className="font-display text-white text-xl leading-tight">
                    {slide.headline.split('\n')[0]}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Strip statistiche */}
            <div className="grid grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.07)' }}>
              {STATS.map((s, i) => (
                <motion.div
                  key={i}
                  className="p-4 text-center"
                  style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(10px)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                >
                  <div className="font-display text-xl font-light" style={{ color: 'var(--teal)' }}>{s.val}</div>
                  <div className="text-[9px] tracking-[0.25em] uppercase mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>

      {/* ── Info strip bottom ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 hidden md:flex items-center justify-between px-10 py-4 border-t border-white/10"
        style={{ zIndex: 2, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="flex items-center gap-8">
          <InfoItem icon="📍" text="Via G. Carducci 3, Arzano (NA)" />
          <InfoItem icon="⏰" text="Lun–Ven 8:30–13:00 / 15:00–18:00 · Sab 8:30–13:00" />
        </div>
        <a href="tel:0817313025" className="flex items-center gap-2 text-white/80 hover:text-[var(--teal)] transition-colors text-sm font-medium">
          <span style={{ color: 'var(--teal)' }}>●</span> 081 731 3025 — Chiama ora
        </a>
      </motion.div>

      {/* ── Mobile call button ── */}
      <motion.a
        href="tel:0817313025"
        className="md:hidden fixed bottom-24 right-6 flex items-center gap-2 text-white text-xs font-bold tracking-wider uppercase px-4 py-3 shadow-xl"
        style={{ zIndex: 40, background: 'var(--teal)', borderRadius: 2 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5 }}
        whileTap={{ scale: 0.95 }}
      >
        Chiama Ora
      </motion.a>
    </section>
  )
}

function InfoItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2 text-white/60 text-xs">
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  )
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
