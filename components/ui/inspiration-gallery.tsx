'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from '../motion'
import { INSPIRAZIONE_PHOTOS, type InspoPhoto } from '../../lib/inspirazione-data'

function MarqueeRow({
  photos,
  direction,
  onOpen,
}: {
  photos: InspoPhoto[]
  direction: 'left' | 'right'
  onOpen: (src: string) => void
}) {
  const track = [...photos, ...photos]
  return (
    <div className="marquee-row" style={{ overflow: 'hidden' }}>
      <div
        className={direction === 'left' ? 'marquee-track marquee-left' : 'marquee-track marquee-right'}
        style={{ display: 'flex', gap: '0.85rem', width: 'max-content' }}
      >
        {track.map((p, i) => (
          <motion.button
            key={p.src + i}
            onClick={() => onOpen(p.src)}
            className="relative overflow-hidden group flex-shrink-0"
            style={{
              width: 'clamp(120px, 22vw, 200px)',
              height: 'clamp(120px, 22vw, 200px)',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.08)',
              cursor: 'zoom-in',
              padding: 0,
            }}
            whileHover={{ y: -3 }}
          >
            <img
              src={p.src}
              alt={p.title}
              className="w-full h-full object-cover"
              style={{ transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }}
              loading="lazy"
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{ background: 'linear-gradient(to top, rgba(8,10,7,0.75), transparent 55%)', transition: 'opacity 0.3s' }}
            />
            <span
              className="absolute bottom-3 left-3 right-3 text-xs opacity-0 group-hover:opacity-100"
              style={{ color: 'rgba(255,255,255,0.9)', transition: 'opacity 0.3s', lineHeight: 1.3 }}
            >
              {p.title}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

const ROW_TOP = INSPIRAZIONE_PHOTOS.filter((_, i) => i % 2 === 0)
const ROW_BOTTOM = INSPIRAZIONE_PHOTOS.filter((_, i) => i % 2 === 1)

export function InspirationGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const filtered = INSPIRAZIONE_PHOTOS

  const openLightboxBySrc = (src: string) => {
    const i = filtered.findIndex((p) => p.src === src)
    if (i !== -1) setLightbox(i)
  }

  useEffect(() => {
    if (lightbox === null) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox((i) => (i === null ? i : (i + 1) % filtered.length))
      if (e.key === 'ArrowLeft') setLightbox((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length))
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox, filtered.length])

  return (
    <div>
      {/* Due righe a scorrimento automatico infinito, in direzioni opposte */}
      <style>{`
        @keyframes inspo-scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes inspo-scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-left { animation: inspo-scroll-left 110s linear infinite; }
        .marquee-right { animation: inspo-scroll-right 110s linear infinite; }
        .marquee-row:hover .marquee-track { animation-play-state: paused; }
      `}</style>
      <div className="relative" style={{ maskImage: 'linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)', WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <MarqueeRow photos={ROW_TOP} direction="left" onOpen={openLightboxBySrc} />
          <MarqueeRow photos={ROW_BOTTOM} direction="right" onOpen={openLightboxBySrc} />
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] && (
          <motion.div
            key="inspo-lightbox"
            className="fixed inset-0 flex items-center justify-center"
            style={{ zIndex: 95, padding: 'clamp(16px, 4vw, 56px)', background: 'rgba(4,10,10,0.92)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative flex flex-col items-center gap-3"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightbox].src}
                alt={filtered[lightbox].title}
                style={{ maxWidth: '100%', maxHeight: '78vh', borderRadius: 8, boxShadow: '0 30px 90px rgba(0,0,0,0.7)', objectFit: 'contain' }}
              />
              <div className="text-center" style={{ maxWidth: '90vw' }}>
                <div className="text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: 'var(--teal)' }}>
                  {filtered[lightbox].cat}
                </div>
                <div className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {filtered[lightbox].title}
                </div>
                <div className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {lightbox + 1} / {filtered.length}
                </div>
              </div>
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + filtered.length) % filtered.length) }}
              aria-label="Precedente"
              className="fixed flex items-center justify-center"
              style={{ left: 'clamp(10px,2vw,32px)', top: '50%', transform: 'translateY(-50%)', width: 46, height: 46, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)', color: '#fff', cursor: 'pointer', zIndex: 96 }}
            >
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M9 3L4 7l5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % filtered.length) }}
              aria-label="Successiva"
              className="fixed flex items-center justify-center"
              style={{ right: 'clamp(10px,2vw,32px)', top: '50%', transform: 'translateY(-50%)', width: 46, height: 46, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)', color: '#fff', cursor: 'pointer', zIndex: 96 }}
            >
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M5 3l5 4-5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(null) }}
              aria-label="Chiudi"
              className="fixed flex items-center justify-center"
              style={{ right: 'clamp(10px,2vw,32px)', top: 'clamp(10px,2vw,32px)', width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)', color: '#fff', cursor: 'pointer', zIndex: 96 }}
            >
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
