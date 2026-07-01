'use client'

import type React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from '../motion'
import { useRef } from 'react'

type Photo = { src: string; title: string; pdfHref?: string; aspect?: number; pages?: readonly string[] }
type SubGroup = { name: string; photos: readonly Photo[] }
type Section = { id: string; label: string; sub?: string; photos?: readonly Photo[]; groups?: readonly SubGroup[] }

// Chiave Web3Forms — invio automatico delle richieste info prodotto a euroceram2002@hotmail.it
const WEB3FORMS_KEY = 'b987d673-b06d-4654-9529-0ed7000d431c'

// Tutte le foto di una sezione (piatte o raggruppate in sottocategorie)
const sectionPhotos = (s: Section): readonly Photo[] =>
  s.groups ? s.groups.flatMap((g) => g.photos) : (s.photos ?? [])

/* Richiesta info prodotto: al click compare un mini-form con i recapiti del cliente,
   così Euroceram può ricontattarlo. L'invio arriva via email a euroceram2002@hotmail.it. */
function InfoRequestButton({ productTitle, sectionLabel }: { productTitle: string; sectionLabel: string }) {
  const [state, setState] = useState<'idle' | 'form' | 'sending' | 'sent' | 'error'>('idle')
  const [nome, setNome] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [messaggio, setMessaggio] = useState('')

  // Reset quando cambia prodotto
  useEffect(() => {
    setState('idle'); setNome(''); setTelefono(''); setEmail(''); setMessaggio('')
  }, [productTitle])

  const canSend = nome.trim().length > 0 && (telefono.trim().length > 0 || email.trim().length > 0)

  const send = async () => {
    if (!canSend) return
    setState('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Richiesta info prodotto — ${productTitle}`,
          from_name: nome || 'Sito Euroceram 2002',
          Nome: nome,
          Telefono: telefono || '(non fornito)',
          Email: email || '(non fornita)',
          Categoria: sectionLabel,
          Prodotto: productTitle,
          Messaggio: messaggio || 'Il cliente chiede maggiori informazioni su questo prodotto.',
        }),
      })
      setState(res.ok ? 'sent' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'sent') {
    return (
      <div
        className="inline-flex items-center gap-2"
        style={{ marginTop: '0.85rem', color: 'var(--teal)', fontSize: '0.82rem', fontWeight: 600 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 12l6 6L20 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Richiesta inviata! Ti ricontatteremo presto.
      </div>
    )
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px', marginTop: 10, borderRadius: 10,
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(111,168,144,0.35)',
    color: '#fff', fontSize: '0.95rem', outline: 'none',
    WebkitTextFillColor: '#fff', boxSizing: 'border-box',
  }
  const stop = (e: React.SyntheticEvent) => e.stopPropagation()
  const closeForm = () => { if (state !== 'sending') setState('idle') }
  const showModal = state === 'form' || state === 'sending' || state === 'error'

  return (
    <>
      {/* Pulsante che apre il modale centrato */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setState('form') }}
        className="inline-flex items-center gap-2"
        style={{
          marginTop: '0.85rem', padding: '10px 20px', borderRadius: 999,
          background: 'rgba(111,168,144,0.18)', border: '1px solid rgba(111,168,144,0.5)',
          color: 'var(--teal)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em',
          textTransform: 'uppercase', cursor: 'pointer', backdropFilter: 'blur(8px)',
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M4 4h16v12H7l-3 3V4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
        Chiedi maggiori info sul prodotto
      </button>

      {/* Modale centrato SOPRA la foto (portale su document.body per restare al centro schermo) */}
      {showModal && typeof document !== 'undefined' && createPortal(
        <div
          onClick={closeForm}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 'clamp(16px, 4vw, 40px)',
            background: 'rgba(4,10,10,0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          <div
            onClick={stop}
            style={{
              position: 'relative', width: 'min(420px, 100%)', maxHeight: '90vh', overflowY: 'auto',
              textAlign: 'left', padding: 'clamp(18px, 4vw, 26px)', borderRadius: 18,
              background: 'rgba(16,19,15,0.98)', border: '1px solid rgba(111,168,144,0.4)',
              boxShadow: '0 30px 90px rgba(0,0,0,0.7), inset 1px 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            {/* Chiudi */}
            <button
              type="button" onClick={(e) => { e.stopPropagation(); closeForm() }} aria-label="Chiudi"
              style={{
                position: 'absolute', top: 12, right: 12, width: 34, height: 34, borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)',
                color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 18 18" fill="none"><path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </button>

            <div className="text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: 'var(--teal)', marginBottom: 4 }}>
              Richiesta informazioni
            </div>
            <div className="font-display text-white" style={{ fontSize: '1.15rem', lineHeight: 1.2, marginBottom: 4, paddingRight: 30 }}>
              {productTitle}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.72)', marginBottom: 4 }}>
              Lascia i tuoi recapiti: <b style={{ color: 'var(--teal)' }}>ti ricontatteremo noi</b> con le informazioni su questo prodotto.
            </div>

            <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome e cognome *" style={inputStyle} />
            <input value={telefono} onChange={(e) => setTelefono(e.target.value)} type="tel" placeholder="Telefono" style={inputStyle} />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" style={inputStyle} />
            <textarea value={messaggio} onChange={(e) => setMessaggio(e.target.value)} rows={3} placeholder="Messaggio (facoltativo)" style={{ ...inputStyle, resize: 'none' }} />
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', marginTop: 8 }}>
              Indica almeno un recapito (telefono o email).
            </div>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); send() }}
              disabled={!canSend || state === 'sending'}
              style={{
                width: '100%', marginTop: 14, padding: '13px', borderRadius: 999,
                background: canSend ? 'rgba(111,168,144,0.9)' : 'rgba(111,168,144,0.25)',
                border: '1px solid rgba(111,168,144,0.6)',
                color: canSend ? '#0d130f' : 'rgba(255,255,255,0.5)',
                fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
                cursor: canSend && state !== 'sending' ? 'pointer' : 'not-allowed',
              }}
            >
              {state === 'sending' ? 'Invio…' : state === 'error' ? 'Errore, riprova' : 'Invia richiesta'}
            </button>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}

export function FullCatalogGallery({ sections }: { sections: readonly Section[] }) {
  // Flatten for global lightbox prev/next navigation
  const flat = useMemo(() => {
    const out: { photo: Photo; sectionLabel: string }[] = []
    for (const s of sections) for (const p of sectionPhotos(s)) out.push({ photo: p, sectionLabel: s.label })
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

  // Map each section to a global flat offset for the lightbox
  let runningOffset = 0
  const offsets: number[] = []
  for (const s of sections) {
    offsets.push(runningOffset)
    runningOffset += sectionPhotos(s).length
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
                style={{ maxWidth: '100%', maxHeight: '68vh', borderRadius: 8, boxShadow: '0 30px 90px rgba(0,0,0,0.7)', objectFit: 'contain' }}
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
                {/* Richiesta info prodotto — invio automatico a Euroceram */}
                <div>
                  <InfoRequestButton
                    productTitle={flat[lightbox].photo.title}
                    sectionLabel={flat[lightbox].sectionLabel}
                  />
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

/* Griglia di foto di una (sotto)categoria. baseOffset = indice globale della prima foto. */
function PhotoGrid({
  photos,
  baseOffset,
  onOpen,
  onOpenPdf,
}: {
  photos: readonly Photo[]
  baseOffset: number
  onOpen: (i: number) => void
  onOpenPdf: (p: Photo) => void
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '0.85rem',
      }}
    >
      {photos.map((p, i) => {
        const isPdf = !!p.pdfHref
        return (
          <button
            key={p.src}
            type="button"
            onClick={() => {
              if (isPdf) onOpenPdf(p)
              else onOpen(baseOffset + i)
            }}
            className="relative overflow-hidden group catalog-thumb"
            style={{
              aspectRatio: isPdf ? (p.aspect ?? 0.75) : 4 / 3,
              borderRadius: 10,
              border: isPdf ? '1px solid rgba(111,168,144,0.4)' : '1px solid rgba(255,255,255,0.08)',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <img
              src={p.src}
              alt={p.title}
              className="w-full h-full object-cover catalog-thumb-img"
              loading="lazy"
              decoding="async"
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
          </button>
        )
      })}
    </div>
  )
}

/* Sottocategoria con titolo cliccabile per aprire/chiudere (come le categorie) */
function SubGroupBlock({
  group,
  baseOffset,
  onOpen,
  onOpenPdf,
}: {
  group: SubGroup
  baseOffset: number
  onOpen: (i: number) => void
  onOpenPdf: (p: Photo) => void
}) {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <div>
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        className="flex items-center gap-2.5 w-full text-left"
        style={{ marginBottom: '1rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
      >
        <span className="text-[11px] tracking-[0.18em] uppercase font-semibold" style={{ color: 'var(--teal)' }}>
          {group.name}
        </span>
        <div className="h-px flex-1" style={{ background: 'rgba(111,168,144,0.18)' }} />
        <span className="text-[10px] flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
          {group.photos.length}
          <svg
            width="12" height="12" viewBox="0 0 14 14" fill="none"
            style={{ transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)', transition: 'transform 0.25s' }}
          >
            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: collapsed ? '0fr' : '1fr',
          transition: 'grid-template-rows 0.32s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div style={{ overflow: 'hidden', minHeight: 0 }}>
          <div style={{ opacity: collapsed ? 0 : 1, transition: 'opacity 0.22s ease' }}>
            <PhotoGrid photos={group.photos} baseOffset={baseOffset} onOpen={onOpen} onOpenPdf={onOpenPdf} />
          </div>
        </div>
      </div>
    </div>
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
  const [collapsed, setCollapsed] = useState(false)
  const total = sectionPhotos(section).length

  // Indice globale di partenza di ogni sottocategoria
  let acc = offset
  const groupOffsets = (section.groups ?? []).map((g) => {
    const start = acc
    acc += g.photos.length
    return start
  })

  return (
    <div id={section.id} ref={ref} style={{ marginBottom: '4.5rem' }}>
      <motion.button
        onClick={() => setCollapsed((c) => !c)}
        className="flex items-center gap-3 w-full text-left"
        style={{ marginBottom: '1.75rem', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
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
          {total} foto
          <svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            style={{ transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)', transition: 'transform 0.25s' }}
          >
            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </motion.button>

      {/* Tendina CSS-only: grid-template-rows anima lo spazio in modo sincrono */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: collapsed ? '0fr' : '1fr',
          transition: 'grid-template-rows 0.32s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div style={{ overflow: 'hidden', minHeight: 0 }}>
          <div style={{ opacity: collapsed ? 0 : 1, transition: 'opacity 0.22s ease', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {section.groups ? (
              section.groups.map((g, gi) => (
                <SubGroupBlock key={g.name} group={g} baseOffset={groupOffsets[gi]} onOpen={onOpen} onOpenPdf={onOpenPdf} />
              ))
            ) : (
              <PhotoGrid photos={section.photos ?? []} baseOffset={offset} onOpen={onOpen} onOpenPdf={onOpenPdf} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
