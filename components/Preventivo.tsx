'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from './motion'
import { AuroraBackground } from './ui/aurora-background'

const CATEGORIE = ['Piastrelle & Gres', 'Ceramiche Decorative', 'Arredo Bagno', 'Rubinetterie', 'Sanitari', 'Box Doccia & Vasche', 'Progetto Completo']

// Chiave Web3Forms per l'invio automatico delle richieste a euroceram2002@hotmail.it.
// Creala gratis su https://web3forms.com (inserendo quella email), poi incollala qui.
const WEB3FORMS_KEY: string = 'b987d673-b06d-4654-9529-0ed7000d431c'

/* Floating label input — label springs up when focused or filled */
function FloatingInput({
  label, value, onChange, type = 'text', required = false, inputKey,
}: {
  label: string; value: string; onChange: (v: string) => void
  type?: string; required?: boolean; inputKey: string
}) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0

  return (
    <div className="relative" style={{ paddingTop: '1.75rem' }}>
      {/* Floating label */}
      <motion.label
        htmlFor={inputKey}
        className="absolute left-0 pointer-events-none font-medium tracking-widest uppercase"
        style={{ top: 0 }}
        animate={active
          ? { y: 0, fontSize: '9px', color: 'var(--teal)', letterSpacing: '0.25em' }
          : { y: 30, fontSize: '9px', color: 'rgba(255,255,255,0.72)', letterSpacing: '0.2em' }
        }
        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
      >
        {label}
      </motion.label>

      <input
        id={inputKey}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full pb-2 pt-1 outline-none bg-transparent preventivo-input"
        style={{ fontSize: '1rem', color: '#ffffff', caretColor: '#ffffff', borderBottom: `1px solid ${active ? 'rgba(111,168,144,0.6)' : 'rgba(255,255,255,0.12)'}` }}
        autoComplete="off"
      />

      {/* Teal line draws left→right on focus */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1.5px]"
        style={{ background: 'var(--teal)', originX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
      />
    </div>
  )
}

function FloatingTextarea({
  label, value, onChange, inputKey,
}: {
  label: string; value: string; onChange: (v: string) => void; inputKey: string
}) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0

  return (
    <div className="relative" style={{ paddingTop: '1.75rem' }}>
      <motion.label
        htmlFor={inputKey}
        className="absolute left-0 pointer-events-none font-medium tracking-widest uppercase"
        style={{ top: 0 }}
        animate={active
          ? { y: 0, fontSize: '9px', color: 'var(--teal)' }
          : { y: 72, fontSize: '9px', color: 'rgba(255,255,255,0.72)' }
        }
        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
      >
        {label}
      </motion.label>
      <textarea
        id={inputKey}
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full pb-2 pt-1 outline-none bg-transparent resize-none"
        style={{ fontSize: '1rem', color: '#ffffff', caretColor: '#ffffff', borderBottom: `1px solid ${active ? 'rgba(111,168,144,0.6)' : 'rgba(255,255,255,0.12)'}` }}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-[1.5px]"
        style={{ background: 'var(--teal)', originX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
      />
    </div>
  )
}

function FloatingSelect({
  label, value, onChange, options, inputKey,
}: {
  label: string; value: string; onChange: (v: string) => void
  options: string[]; inputKey: string
}) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0

  // <select> nativo: su mobile apre il selettore di sistema, sempre cliccabile e affidabile
  return (
    <div className="relative" style={{ paddingTop: '1.75rem' }}>
      <motion.label
        htmlFor={inputKey}
        className="absolute left-0 pointer-events-none font-medium tracking-widest uppercase"
        style={{ top: 0 }}
        animate={active
          ? { y: 0, fontSize: '9px', color: 'var(--teal)' }
          : { y: 30, fontSize: '9px', color: 'rgba(255,255,255,0.72)' }
        }
        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
      >
        {label}
      </motion.label>

      <select
        id={inputKey}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full pb-2 pt-1 outline-none cursor-pointer"
        style={{
          fontSize: '0.95rem',
          background: 'transparent',
          color: '#ffffff',
          WebkitTextFillColor: '#ffffff',
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          appearance: 'none',
          borderTop: 'none', borderLeft: 'none', borderRight: 'none',
          borderBottom: `1px solid ${active ? 'rgba(111,168,144,0.6)' : 'rgba(255,255,255,0.12)'}`,
          borderRadius: 0,
          paddingRight: '1.5rem',
        }}
      >
        <option value="" disabled style={{ color: '#888', background: '#1e2620' }}></option>
        {options.map((o) => (
          <option key={o} value={o} style={{ color: '#ffffff', background: '#1e2620' }}>{o}</option>
        ))}
      </select>

      {/* Chevron */}
      <svg className="absolute right-0 pointer-events-none" style={{ top: 'calc(1.75rem + 6px)' }} width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 4l4 4 4-4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export default function Preventivo() {
  const [form, setForm] = useState({
    nome: '', cognome: '', telefono: '', citta: '',
    categoria: '', superficie: '', messaggio: '',
  })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const set = (key: string) => (v: string) => setForm((f) => ({ ...f, [key]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)

    const righe = [
      `RICHIESTA PREVENTIVO — EUROCERAM 2002`,
      ``,
      `Nome: ${form.nome} ${form.cognome}`,
      `Telefono: ${form.telefono}`,
      `Città: ${form.citta}`,
      `Categoria: ${form.categoria}`,
      `Superficie: ${form.superficie} mq`,
      ``,
      `Messaggio:`,
      form.messaggio || '(nessun messaggio)',
    ]
    const subject = `Richiesta Preventivo — ${form.nome} ${form.cognome}`
    const testo = righe.join('\n')

    // Invio AUTOMATICO via Web3Forms: la richiesta arriva da sola a euroceram2002@hotmail.it
    // (l'email di destinazione è quella collegata alla chiave su web3forms.com).
    // Finché la chiave non è inserita, si usa il fallback all'app email.
    if (WEB3FORMS_KEY) {
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject,
            from_name: `${form.nome} ${form.cognome}`,
            Nome: form.nome,
            Cognome: form.cognome,
            Telefono: form.telefono,
            Città: form.citta,
            Categoria: form.categoria,
            'Superficie (mq)': form.superficie,
            Messaggio: form.messaggio || '(nessun messaggio)',
          }),
        })
        if (res.ok) { setSending(false); setSent(true); return }
      } catch {
        // se l'invio automatico fallisce, si passa al fallback qui sotto
      }
    }

    // Fallback: apre l'app email del visitatore già compilata verso Euroceram
    const link = document.createElement('a')
    link.href = `mailto:euroceram2002@hotmail.it?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(testo)}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setTimeout(() => { setSending(false); setSent(true) }, 400)
  }

  return (
    <section id="preventivo" className="pt-12 pb-16 lg:pt-[var(--section-gap-md)] lg:pb-[var(--section-gap-lg)]" style={{ position: 'relative', overflow: 'hidden', background: '#10130F', borderTop: '1px solid rgba(111,168,144,0.12)' }}>
      {/* Foto di sfondo */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'url(/images/bagno-spa-preventivo.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Leggera pellicola per leggibilità */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'linear-gradient(rgba(16,19,15,0.55) 0%, rgba(16,19,15,0.62) 100%)',
        }}
      />
      <AuroraBackground />
      <div className="w-full" style={{ position: 'relative', zIndex: 1, paddingLeft: "clamp(16px, 3vw, 60px)", paddingRight: "clamp(16px, 3vw, 60px)" }}>
        <div
          className="grid lg:grid-cols-5 gap-8 lg:gap-20"
          style={{
            maxWidth: '80rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: 24,
            border: '1px solid rgba(255,255,255,0.18)',
            background: 'rgba(10,18,18,0.42)',
            backdropFilter: 'blur(30px) saturate(1.7)',
            WebkitBackdropFilter: 'blur(30px) saturate(1.7)',
            boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.18), inset -1px -1px 0 rgba(255,255,255,0.05), 0 20px 60px rgba(0,0,0,0.4)',
            padding: 'clamp(1.25rem, 4vw, 4rem)',
          }}
        >

          {/* Left */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: 'var(--teal)' }} />
              <span className="section-label" style={{ color: 'rgba(255,255,255,0.72)' }}>Preventivo</span>
            </div>
            <h2 className="font-display text-white mb-3 lg:mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}>
              Richiedi il Tuo<br />
              <span style={{ color: 'var(--teal)' }}>Preventivo Gratuito</span>
            </h2>
            <p className="text-sm leading-relaxed mb-4 lg:mb-8" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Compila il modulo e ti contatteremo entro 24 ore con un preventivo personalizzato.
              Nessun impegno, nessun costo.
            </p>

            <div className="gap-2.5 lg:gap-4 mt-2 lg:mt-6" style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                'Progettazione 3D gratuita inclusa',
                'Sopralluogo su richiesta',
                'Risposta entro 24 ore',
                'Nessun impegno d\'acquisto',
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span
                    className="w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: 'var(--teal)', color: '#fff' }}
                  >
                    ✓
                  </span>
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.82)' }}>{text}</span>
                </div>
              ))}
            </div>

            <div
              className="p-4 lg:p-6 border mt-5 lg:mt-12"
              style={{ borderColor: 'rgba(111,168,144,0.2)' }}
            >
              <div style={{ fontSize: '0.9rem', color: 'var(--teal)', marginBottom: '0.5rem', fontWeight: 500 }}>Preferisci chiamare?</div>
              <a href="tel:0817313025" style={{ fontSize: '1.75rem', fontWeight: 600, color: '#fff', display: 'block', lineHeight: 1.1 }} className="hover:text-[var(--teal)] transition-colors">
                081 731 3025
              </a>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', marginTop: '0.5rem' }}>Lun–Ven 8:30–13 / 15–18 · Sab 8:30–13</p>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3 pt-0 lg:pt-12">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  className="h-full flex flex-col items-center justify-center text-center p-16 border"
                  style={{ borderColor: 'rgba(111,168,144,0.3)', background: 'rgba(111,168,144,0.04)' }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <motion.div
                    className="w-14 h-14 flex items-center justify-center mb-6"
                    style={{ background: 'var(--teal)' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <motion.path
                        d="M4 12l6 6L20 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.3 }}
                      />
                    </svg>
                  </motion.div>
                  <h3 className="font-display text-2xl text-white mb-3">Richiesta Inviata!</h3>
                  <p style={{ color: 'rgba(255,255,255,0.75)' }}>Ti contatteremo entro 24 ore con il tuo preventivo personalizzato.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="gap-6 lg:gap-10" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 lg:gap-y-8 gap-x-6">
                    <FloatingInput label="Nome *" value={form.nome} onChange={set('nome')} required inputKey="nome" />
                    <FloatingInput label="Cognome *" value={form.cognome} onChange={set('cognome')} required inputKey="cognome" />
                    <FloatingInput label="Telefono *" value={form.telefono} onChange={set('telefono')} type="tel" required inputKey="telefono" />
                    <FloatingInput label="Città *" value={form.citta} onChange={set('citta')} required inputKey="citta" />
                  </div>

                  <FloatingSelect label="Categoria prodotto" value={form.categoria} onChange={set('categoria')} options={CATEGORIE} inputKey="categoria" />
                  <FloatingInput label="Superficie stimata (m²)" value={form.superficie} onChange={set('superficie')} type="number" inputKey="superficie" />
                  <FloatingTextarea label="Note aggiuntive" value={form.messaggio} onChange={set('messaggio')} inputKey="messaggio" />

                  {/* Submit — liquid glass */}
                  <motion.button
                    type="submit"
                    className="relative w-full py-4 text-sm font-semibold tracking-[0.2em] uppercase overflow-hidden"
                    style={{
                      background: 'rgba(111,168,144,0.22)',
                      backdropFilter: 'blur(16px) saturate(1.6)',
                      WebkitBackdropFilter: 'blur(16px) saturate(1.6)',
                      border: '1px solid rgba(111,168,144,0.5)',
                      boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.22), 0 4px 24px rgba(111,168,144,0.18)',
                      color: 'var(--teal)',
                      borderRadius: 2,
                    }}
                    whileHover={{
                      background: 'rgba(111,168,144,0.38)',
                      scale: 1.01,
                    }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.2 }}
                    disabled={sending}
                  >
                    {sending ? 'Apertura email…' : 'Invia Richiesta Preventivo'}
                  </motion.button>

                  <p className="text-[10px] text-center" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    I tuoi dati sono al sicuro · Nessuna cessione a terzi
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
