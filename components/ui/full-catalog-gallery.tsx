'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence, useInView } from '../motion'
import { useRef } from 'react'

type Photo = { src: string; title: string; pdfHref?: string; aspect?: number; pages?: readonly string[] }
type Section = { id: string; label: string; sub?: string; photos: readonly Photo[] }

export function FullCatalogGallery({ sections }: { sections: readonly Section[] }) {
  // Flatten for global lightbox prev/next navigation
  const flat = useMemo(() => {
    const out: { photo: Photo; sectionLabel: string }[] = []
    for (const s of sections) for (const p of s.photos) out.push({ photo: p, sectionLabel: s.label })
    return out
  }, [sections])

  const [lightbox, setLightbox] = useState<number | null>(null)
  const [pdfModal, setPdfModal] = useState<Photo | null>(null)
  const [zoomPage, setZoomPage] = useState<{ src: string; pages: readonly string[]; i: number } | null>(null)

  useEffect(() => {
    if (lightbox === null) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox((i) => (i === null ? i : (i + 1) % flat.length))
      if (e.key === 'ArrowLeft') setLightbox((i) => (i === null ? i : (i - 1 + flat.length) % flat.length))
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox, flat.length])

  useEffect(() => {
    if (!pdfModal) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setPdfModal(null) }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [pdfModal])

  useEffect(() => {
    if (!zoomPage) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomPage(null)
      if (e.key === 'ArrowRight') setZoomPage((z) => (z ? { ...z, i: (z.i + 1) % z.pages.length, src: z.pages[(z.i + 1) % z.pages.length] } : z))
      if (e.key === 'ArrowLeft') setZoomPage((z) => (z ? { ...z, i: (z.i - 1 + z.pages.length) % z.pages.length, src: z.pages[(z.i - 1 + z.pages.length) % z.pages.length] } : z))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoomPage])

  // Map each (section, localIndex) to a global flat index for the lightbox
  let runningOffset = 0
  const offsets: number[] = []
  for (const s of sections) {
    offsets.push(runningOffset)
    runningOffset += s.photos.length
  }

  return (
    <>
      {sections.map((section, si) => (
        <GallerySection key={section.id} section={section} offset={offsets[si]} onOpen={setLightbox} onOpenPdf={setPdfModal} />
      ))}

      {/* Modal cataloghi PDF: pagine impilate verticalmente a scorrimento, in primo piano */}
      <AnimatePresence>
        {pdfModal && (
          <motion.div
            key="pdf-pages-modal"
            className="fixed inset-0 flex items-center justify-center"
            style={{ zIndex: 140, padding: 'clamp(12px, 3vw, 40px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setPdfModal(null)}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(4,10,10,0.75)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
              }}
            />
            <motion.div
              className="relative w-full"
              style={{
                maxWidth: 'min(1200px, 94vw)',
                maxHeight: '92vh',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 20,
                overflow: 'hidden',
                background: 'rgba(16,19,15,0.96)',
                border: '1px solid rgba(111,168,144,0.25)',
                boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.08), 0 30px 80px rgba(0,0,0,0.6)',
              }}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="flex items-center justify-between gap-4"
                style={{ padding: 'clamp(1.1rem, 2vw, 1.75rem)', borderBottom: '1px solid rgba(111,168,144,0.15)' }}
              >
                <div>
                  <div className="text-[10px] tracking-[0.35em] uppercase font-bold mb-1" style={{ color: 'var(--teal)' }}>
                    Catalogo PDF
                  </div>
                  <h3 className="font-display text-white" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)', lineHeight: 1.1 }}>
                    {pdfModal.title}
                  </h3>
                </div>
                <button
                  onClick={() => setPdfModal(null)}
                  aria-label="Chiudi"
                  className="flex items-center justify-center flex-shrink-0"
                  style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', color: '#fff', cursor: 'pointer' }}
                >
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                </button>
              </div>

              {/* Pagine impilate verticalmente, scorrimento solo verso il basso. Clicca una pagina per leggerla a schermo intero. */}
              <div style={{ overflowY: 'auto', overflowX: 'hidden', padding: 'clamp(0.75rem, 2vw, 1.5rem)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {(pdfModal.pages ?? []).map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setZoomPage({ src, pages: pdfModal.pages ?? [], i })}
                    style={{ padding: 0, border: 'none', background: 'none', cursor: 'zoom-in', display: 'block' }}
                  >
                    <img
                      src={src}
                      alt={`${pdfModal.title} — pagina ${i + 1}`}
                      loading="lazy"
                      style={{ width: '100%', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', display: 'block' }}
                    />
                  </button>
                ))}
              </div>

              <div
                className="text-center text-xs"
                style={{ padding: '0.85rem', borderTop: '1px solid rgba(111,168,144,0.15)', color: 'rgba(255,255,255,0.4)' }}
              >
                {(pdfModal.pages ?? []).length} pagine — clicca una pagina per leggerla a schermo intero
                {pdfModal.pdfHref && (
                  <>
                    {' · '}
                    <a href={pdfModal.pdfHref} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--teal)', textDecoration: 'underline' }}>
                      Scarica PDF originale
                    </a>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zoom a schermo intero per una singola pagina PDF */}
      <AnimatePresence>
        {zoomPage && (
          <motion.div
            key="pdf-zoom"
            className="fixed inset-0 flex items-center justify-center"
            style={{ zIndex: 141, padding: 'clamp(8px, 2vw, 28px)', background: 'rgba(2,4,3,0.96)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setZoomPage(null)}
          >
            <img
              src={zoomPage.src}
              alt={`Pagina ${zoomPage.i + 1}`}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '100%', maxHeight: '96vh', objectFit: 'contain', borderRadius: 4, cursor: 'zoom-out' }}
            />
            <span
              className="fixed text-xs"
              style={{ top: 'clamp(12px,2vw,20px)', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.5)', zIndex: 150 }}
            >
              {zoomPage.i + 1} / {zoomPage.pages.length}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); setZoomPage((z) => z ? { ...z, i: (z.i - 1 + z.pages.length) % z.pages.length, src: z.pages[(z.i - 1 + z.pages.length) % z.pages.length] } : z) }}
              aria-label="Pagina precedente"
              className="fixed flex items-center justify-center"
              style={{ left: 'clamp(8px,2vw,28px)', top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)', color: '#fff', cursor: 'pointer', zIndex: 100 }}
            >
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none"><path d="M9 3L4 7l5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setZoomPage((z) => z ? { ...z, i: (z.i + 1) % z.pages.length, src: z.pages[(z.i + 1) % z.pages.length] } : z) }}
              aria-label="Pagina successiva"
              className="fixed flex items-center justify-center"
              style={{ right: 'clamp(8px,2vw,28px)', top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)', color: '#fff', cursor: 'pointer', zIndex: 100 }}
            >
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none"><path d="M5 3l5 4-5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setZoomPage(null) }}
              aria-label="Chiudi"
              className="fixed flex items-center justify-center gap-2"
              style={{ left: '50%', bottom: 'clamp(16px,3vw,32px)', transform: 'translateX(-50%)', height: 46, padding: '0 22px', borderRadius: 999, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)', color: '#fff', cursor: 'pointer', zIndex: 150, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', backdropFilter: 'blur(8px)' }}
            >
              <svg width="15" height="15" viewBox="0 0 18 18" fill="none"><path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
              Chiudi
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && flat[lightbox] && (
          <motion.div
            key="full-catalog-lightbox"
            className="fixed inset-0 flex items-center justify-center"
            style={{ zIndex: 140, padding: 'clamp(16px, 4vw, 56px)', background: 'rgba(4,10,10,0.92)', backdropFilter: 'blur(8px)' }}
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
                src={flat[lightbox].photo.src}
                alt={flat[lightbox].photo.title}
                style={{ maxWidth: '100%', maxHeight: '78vh', borderRadius: 8, boxShadow: '0 30px 90px rgba(0,0,0,0.7)', objectFit: 'contain' }}
              />
              <div className="text-center" style={{ maxWidth: '90vw' }}>
                <div className="text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: 'var(--teal)' }}>
                  {flat[lightbox].sectionLabel}
                </div>
                <div className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {flat[lightbox].photo.title}
                </div>
                <div className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {lightbox + 1} / {flat.length}
                </div>
                {flat[lightbox].photo.pdfHref && (
                  <a
                    href={flat[lightbox].photo.pdfHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5"
                    style={{ marginTop: '0.75rem', color: 'var(--teal)', fontSize: '0.8rem', textDecoration: 'underline' }}
                  >
                    Apri PDF completo →
                  </a>
                )}
              </div>
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + flat.length) % flat.length) }}
              aria-label="Precedente"
              className="fixed flex items-center justify-center"
              style={{ left: 'clamp(10px,2vw,32px)', top: '50%', transform: 'translateY(-50%)', width: 46, height: 46, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)', color: '#fff', cursor: 'pointer', zIndex: 96 }}
            >
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M9 3L4 7l5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % flat.length) }}
              aria-label="Successiva"
              className="fixed flex items-center justify-center"
              style={{ right: 'clamp(10px,2vw,32px)', top: '50%', transform: 'translateY(-50%)', width: 46, height: 46, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)', color: '#fff', cursor: 'pointer', zIndex: 96 }}
            >
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M5 3l5 4-5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(null) }}
              aria-label="Chiudi"
              className="fixed flex items-center justify-center gap-2"
              style={{ left: '50%', bottom: 'clamp(12px,2vw,24px)', transform: 'translateX(-50%)', height: 44, padding: '0 20px', borderRadius: 999, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)', color: '#fff', cursor: 'pointer', zIndex: 150, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', backdropFilter: 'blur(8px)' }}
            >
              <svg width="15" height="15" viewBox="0 0 18 18" fill="none"><path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
              Chiudi
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function GallerySection({
  section,
  offset,
  onOpen,
  onOpenPdf,
}: {
  section: Section
  offset: number
  onOpen: (i: number) => void
  onOpenPdf: (p: Photo) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div id={section.id} ref={ref} style={{ marginBottom: '4.5rem' }}>
      <motion.button
        onClick={() => setCollapsed((c) => !c)}
        className="flex items-center gap-3 w-full text-left"
        style={{ marginBottom: '1.75rem', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="h-px w-10" style={{ background: 'var(--teal)' }} />
        <div>
          <h3 className="font-display text-white" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', lineHeight: 1.1 }}>
            {section.label}
          </h3>
          {section.sub && (
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{section.sub}</p>
          )}
        </div>
        <span className="text-xs ml-auto flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {section.photos.length} foto
          <svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            style={{ transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)', transition: 'transform 0.25s' }}
          >
            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </motion.button>

      {/* Tendina CSS-only: grid-template-rows anima lo spazio in modo sincrono, senza ricalcoli JS per foto */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: collapsed ? '0fr' : '1fr',
          transition: 'grid-template-rows 0.32s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div style={{ overflow: 'hidden', minHeight: 0 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '0.85rem',
              opacity: collapsed ? 0 : 1,
              transition: 'opacity 0.22s ease',
            }}
          >
          {section.photos.map((p, i) => {
            const isPdf = !!p.pdfHref
            return (
              <motion.button
                key={p.src}
                onClick={() => {
                  if (isPdf) onOpenPdf(p)
                  else onOpen(offset + i)
                }}
                className="relative overflow-hidden group"
                style={{
                  aspectRatio: isPdf ? (p.aspect ?? 0.75) : 4 / 3,
                  borderRadius: 10,
                  border: isPdf ? '1px solid rgba(111,168,144,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  cursor: 'pointer',
                  padding: 0,
                }}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: Math.min(i * 0.02, 0.4), ease: [0.22, 1, 0.36, 1] }}
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
                  style={{ background: 'linear-gradient(to top, rgba(8,10,7,0.7), transparent 55%)', transition: 'opacity 0.3s' }}
                />
                {isPdf && (
                  <span
                    className="absolute top-2 right-2 text-[9px] font-bold tracking-wider uppercase"
                    style={{ color: '#fff', background: 'rgba(111,168,144,0.85)', padding: '3px 8px', borderRadius: 999 }}
                  >
                    PDF
                  </span>
                )}
                <span
                  className="absolute bottom-2 left-2 right-2 text-[10px] opacity-0 group-hover:opacity-100"
                  style={{ color: 'rgba(255,255,255,0.85)', transition: 'opacity 0.3s', lineHeight: 1.3 }}
                >
                  {isPdf ? `${p.title} — visualizza` : p.title}
                </span>
              </motion.button>
            )
          })}
          </div>
        </div>
      </div>
    </div>
  )
}
