'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from './motion'
import { LocationMap } from './ui/expand-map'

export default function Contatti() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({ nome: '', cognome: '', telefono: '', citta: '', messaggio: '' })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  const fields = [
    { key: 'nome', label: 'Nome *', type: 'text', required: true, half: true },
    { key: 'cognome', label: 'Cognome *', type: 'text', required: true, half: true },
    { key: 'telefono', label: 'Telefono *', type: 'tel', required: true, half: true },
    { key: 'citta', label: 'Città *', type: 'text', required: true, half: true },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  const inputStyle = (key: string) => ({
    borderColor: focused === key ? 'var(--teal)' : 'var(--border)',
    color: 'var(--dark)',
    background: 'transparent',
  })

  return (
    <section id="contatti" ref={ref} className="py-28 lg:py-36" style={{ background: 'var(--bg)' }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-20">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: 'var(--teal)' }} />
            <span className="section-label">Contatti</span>
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', lineHeight: 1.1, color: 'var(--dark)' }}>
            Vieni a Trovarci<br />
            <span style={{ color: 'var(--teal)' }}>o Scrivici</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left: info + map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { icon: '📍', label: 'Indirizzo', value: 'Via Giosuè Carducci, 3\n80022 Arzano (NA)', href: 'https://maps.google.com/?q=Euroceram+2002+Arzano' },
                { icon: '📞', label: 'Telefono', value: '081 731 3025\n+39 353 392 8484', href: 'tel:0817313025' },
                { icon: '✉️', label: 'Email', value: 'euroceram2002@hotmail.it', href: 'mailto:euroceram2002@hotmail.it' },
                { icon: '🕐', label: 'Orario', value: 'Lun–Ven 8:30–13 / 15–18\nSab 8:30–13:00', href: null },
              ].map((item, i) => {
                const card = (
                  <motion.div
                    key={i}
                    className="card-hover p-5 border"
                    style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.08 }}
                  >
                    <span className="text-xl block mb-2">{item.icon}</span>
                    <div className="text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: 'var(--teal)' }}>{item.label}</div>
                    <div className="text-sm leading-relaxed whitespace-pre-line font-medium" style={{ color: 'var(--dark)' }}>{item.value}</div>
                  </motion.div>
                )
                return item.href ? (
                  <a key={i} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{card}</a>
                ) : <div key={i}>{card}</div>
              })}
            </div>

            {/* Map */}
            <motion.div
              className="flex items-start gap-6 pb-2"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              <LocationMap
                location="Via G. Carducci 3, Arzano (NA)"
                coordinates="40.9167° N, 14.2667° E"
              />
              <div className="pt-2 flex flex-col gap-2">
                <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--teal)' }}>Dove Siamo</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  Euroceram 2002 S.R.L.<br />
                  Via Giosuè Carducci, 3<br />
                  80022 Arzano (NA)
                </p>
                <a
                  href="https://maps.google.com/?q=Euroceram+2002+Arzano"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] underline mt-1 transition-opacity hover:opacity-80"
                  style={{ color: 'var(--teal)' }}
                >
                  Apri in Google Maps →
                </a>
              </div>
            </motion.div>

            {/* Social */}
            <motion.div
              className="flex gap-4 mt-6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              {[
                { label: 'WhatsApp', href: 'https://wa.me/393533928484', color: '#25D366' },
                { label: 'Facebook', href: 'https://facebook.com/euroceram2002', color: '#1877F2' },
                { label: 'Instagram', href: 'https://instagram.com/euroceram2002', color: '#E1306C' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] tracking-wider uppercase font-semibold px-4 py-2 border transition-all duration-300 hover:text-white"
                  style={{ borderColor: s.color + '44', color: s.color }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = s.color + '22')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  {s.label}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {sent ? (
              <motion.div
                className="h-full flex flex-col items-center justify-center text-center p-16 border"
                style={{ borderColor: 'var(--teal)', background: 'rgba(91,164,164,0.04)' }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-14 h-14 flex items-center justify-center mb-6" style={{ background: 'var(--teal)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12l6 6L20 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-display text-2xl mb-3" style={{ color: 'var(--dark)' }}>Messaggio Inviato!</h3>
                <p style={{ color: 'var(--muted)' }}>Ti risponderemo al più presto. Grazie per averci contattato.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="font-display text-xl" style={{ color: 'var(--dark)' }}>Inviaci un Messaggio</h3>

                <div className="grid grid-cols-2 gap-5">
                  {fields.map((field) => (
                    <div key={field.key}>
                      <label className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        required={field.required}
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        onFocus={() => setFocused(field.key)}
                        onBlur={() => setFocused(null)}
                        className="w-full px-4 py-3 text-sm outline-none border-b-2 transition-colors duration-300"
                        style={inputStyle(field.key)}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
                    Messaggio (opzionale)
                  </label>
                  <textarea
                    rows={4}
                    value={form.messaggio}
                    onChange={(e) => setForm({ ...form, messaggio: e.target.value })}
                    onFocus={() => setFocused('messaggio')}
                    onBlur={() => setFocused(null)}
                    className="w-full px-4 py-3 text-sm outline-none border-b-2 resize-none transition-colors duration-300"
                    style={inputStyle('messaggio')}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="btn-primary w-full justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Invia Messaggio
                </motion.button>

                <p className="text-[11px] text-center" style={{ color: 'var(--muted)' }}>
                  Oppure chiamaci: <a href="tel:0817313025" className="underline" style={{ color: 'var(--teal)' }}>081 731 3025</a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
