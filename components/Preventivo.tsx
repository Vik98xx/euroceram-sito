'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from './motion'

const CATEGORIE = ['Piastrelle & Gres', 'Ceramiche Decorative', 'Arredo Bagno', 'Rubinetterie', 'Sanitari', 'Box Doccia & Vasche', 'Progetto Completo']

export default function Preventivo() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [form, setForm] = useState({
    nome: '', cognome: '', telefono: '', citta: '',
    categoria: '', superficie: '', messaggio: '',
  })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  const inputCls = "w-full px-4 py-3.5 text-sm outline-none border-b-2 bg-transparent transition-colors duration-300"
  const labelCls = "block text-[10px] tracking-[0.25em] uppercase mb-2"

  const borderColor = (key: string) => focused === key ? 'var(--teal)' : 'var(--border)'

  return (
    <section id="preventivo" ref={ref} className="py-24 lg:py-32" style={{ background: '#0C1616' }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-20">
        <div className="grid lg:grid-cols-5 gap-16 lg:gap-20">

          {/* Left: info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: 'var(--teal)' }} />
              <span className="section-label" style={{ color: 'rgba(255,255,255,0.45)' }}>Preventivo</span>
            </div>
            <h2 className="font-display text-white mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}>
              Richiedi il Tuo<br />
              <span style={{ color: 'var(--teal)' }}>Preventivo Gratuito</span>
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Compila il modulo e ti contatteremo entro 24 ore con un preventivo personalizzato.
              Nessun impegno, nessun costo.
            </p>

            <div className="space-y-5">
              {[
                { icon: '✓', text: 'Progettazione 3D gratuita inclusa' },
                { icon: '✓', text: 'Sopralluogo su richiesta' },
                { icon: '✓', text: 'Risposta entro 24 ore' },
                { icon: '✓', text: 'Nessun impegno d\'acquisto' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  <span className="w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'var(--teal)', color: '#fff' }}>
                    {item.icon}
                  </span>
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 p-6 border" style={{ borderColor: 'rgba(91,164,164,0.2)' }}>
              <div className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--teal)' }}>Preferisci chiamare?</div>
              <a href="tel:0817313025" className="font-display text-2xl text-white hover:text-[var(--teal)] transition-colors">
                081 731 3025
              </a>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Lun–Ven 8:30–13 / 15–18 · Sab 8:30–13</p>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {sent ? (
              <motion.div
                className="h-full flex flex-col items-center justify-center text-center p-16 border"
                style={{ borderColor: 'rgba(91,164,164,0.3)', background: 'rgba(91,164,164,0.04)' }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-14 h-14 flex items-center justify-center mb-6" style={{ background: 'var(--teal)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12l6 6L20 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-display text-2xl text-white mb-3">Richiesta Inviata!</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)' }}>Ti contatteremo entro 24 ore con il tuo preventivo personalizzato.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-5">
                  {[
                    { key: 'nome', label: 'Nome *', type: 'text', req: true },
                    { key: 'cognome', label: 'Cognome *', type: 'text', req: true },
                    { key: 'telefono', label: 'Telefono *', type: 'tel', req: true },
                    { key: 'citta', label: 'Città *', type: 'text', req: true },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className={labelCls} style={{ color: 'rgba(255,255,255,0.4)' }}>{f.label}</label>
                      <input
                        type={f.type} required={f.req}
                        value={form[f.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        onFocus={() => setFocused(f.key)} onBlur={() => setFocused(null)}
                        className={inputCls}
                        style={{ borderColor: borderColor(f.key), color: 'white' }}
                      />
                    </div>
                  ))}
                </div>

                {/* Categoria */}
                <div>
                  <label className={labelCls} style={{ color: 'rgba(255,255,255,0.4)' }}>Categoria Prodotto</label>
                  <select
                    value={form.categoria}
                    onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                    onFocus={() => setFocused('categoria')} onBlur={() => setFocused(null)}
                    className={inputCls}
                    style={{ borderColor: borderColor('categoria'), color: form.categoria ? 'white' : 'rgba(255,255,255,0.35)' }}
                  >
                    <option value="">Seleziona categoria...</option>
                    {CATEGORIE.map((c) => <option key={c} value={c} style={{ background: '#0C1616' }}>{c}</option>)}
                  </select>
                </div>

                {/* Superficie */}
                <div>
                  <label className={labelCls} style={{ color: 'rgba(255,255,255,0.4)' }}>Superficie stimata (m²)</label>
                  <input
                    type="number" min="1"
                    value={form.superficie}
                    onChange={(e) => setForm({ ...form, superficie: e.target.value })}
                    onFocus={() => setFocused('superficie')} onBlur={() => setFocused(null)}
                    placeholder="Es: 50"
                    className={inputCls}
                    style={{ borderColor: borderColor('superficie'), color: 'white' }}
                  />
                </div>

                {/* Note */}
                <div>
                  <label className={labelCls} style={{ color: 'rgba(255,255,255,0.4)' }}>Note aggiuntive</label>
                  <textarea
                    rows={3} value={form.messaggio}
                    onChange={(e) => setForm({ ...form, messaggio: e.target.value })}
                    onFocus={() => setFocused('messaggio')} onBlur={() => setFocused(null)}
                    placeholder="Descrivi brevemente il tuo progetto..."
                    className={inputCls + ' resize-none'}
                    style={{ borderColor: borderColor('messaggio'), color: 'white' }}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="btn-primary w-full justify-center py-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Invia Richiesta Preventivo
                </motion.button>

                <p className="text-[10px] text-center" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  I tuoi dati sono al sicuro · Nessuna cessione a terzi
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
