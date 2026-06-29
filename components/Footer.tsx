'use client'

import { motion } from './motion'
import LogoSVG from './LogoSVG'
import { SocialIcons } from './ui/social-icons'

const NAV = [
  { label: 'Chi Siamo',   href: '#chi-siamo' },
  { label: 'Prodotti',    href: '#prodotti' },
  { label: 'Brand',       href: '#brand' },
  { label: 'Ispirazione', href: '#ispirazione' },
  { label: 'Offerte',     href: '#offerte' },
  { label: 'Preventivo',  href: '#preventivo' },
  { label: 'Contatti',    href: '#contatti' },
]

const PRODUCTS = [
  'Piastrelle & Gres',
  'Ceramiche Decorative',
  'Arredo Bagno',
  'Rubinetterie',
  'Sanitari',
  'Box Doccia & Vasche',
]

const CONTACTS = [
  { label: 'Via G. Carducci 3, 80022 Arzano (NA)', href: '#', type: 'address' },
  { label: '081 731 3025', href: 'tel:0817313025', type: 'tel' },
  { label: '+39 353 392 8484', href: 'tel:+393533928484', type: 'tel' },
  { label: 'euroceram2002@hotmail.it', href: 'mailto:euroceram2002@hotmail.it', type: 'email' },
]

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4
      className="font-display mb-5"
      style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', fontWeight: 400, letterSpacing: '0.04em' }}
    >
      {children}
    </h4>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      className="block text-xs leading-relaxed transition-colors duration-200"
      style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-manrope)' }}
      whileHover={{ x: 3, color: 'var(--teal)' }}
    >
      {children}
    </motion.a>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: '#080A07', borderTop: '1px solid rgba(111,168,144,0.10)' }}>
      <div
        className="w-full py-16"
        style={{ paddingLeft: 'clamp(16px, 3vw, 60px)', paddingRight: 'clamp(16px, 3vw, 60px)' }}
      >
        {/* 5-col grid: brand | nav | prodotti | contatti */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.4fr] gap-10 lg:gap-8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <LogoSVG height={120} className="mb-5 opacity-90" />
            <p className="text-xs leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.3)', maxWidth: 220 }}>
              Showroom di ceramiche e arredo bagno ad Arzano (NA). Oltre 70 anni di esperienza, 200+ brand selezionati.
            </p>
          </div>

          {/* Navigazione */}
          <div>
            <ColHeading>Navigazione</ColHeading>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {NAV.map((link) => (
                <FooterLink key={link.label} href={link.href}>{link.label}</FooterLink>
              ))}
            </div>
          </div>

          {/* Prodotti */}
          <div>
            <ColHeading>Prodotti</ColHeading>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {PRODUCTS.map((p) => (
                <FooterLink key={p} href="#prodotti">{p}</FooterLink>
              ))}
            </div>
          </div>

          {/* Orari */}
          <div className="hidden lg:block">
            <ColHeading>Orari</ColHeading>
            <div className="space-y-3">
              {[
                { giorni: 'Lun — Ven', ore: '8:30 – 13:00 / 15:00 – 18:00' },
                { giorni: 'Sabato', ore: '8:30 – 13:00' },
                { giorni: 'Domenica', ore: 'Chiuso' },
              ].map((r) => (
                <div key={r.giorni}>
                  <div className="text-[10px] tracking-[0.2em] uppercase mb-0.5" style={{ color: 'var(--teal)' }}>{r.giorni}</div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{r.ore}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contatti */}
          <div>
            <ColHeading>Contatti</ColHeading>
            <div className="space-y-3">
              {CONTACTS.map((c, i) => (
                <div key={i}>
                  <div
                    className="text-[9px] tracking-[0.25em] uppercase mb-0.5"
                    style={{ color: 'rgba(111,168,144,0.6)' }}
                  >
                    {c.type === 'address' ? 'Indirizzo' : c.type === 'tel' ? (i === 1 ? 'Telefono' : 'Mobile') : 'Email'}
                  </div>
                  <motion.a
                    href={c.href}
                    className="text-xs leading-snug transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                    whileHover={{ color: 'var(--teal)' }}
                  >
                    {c.label}
                  </motion.a>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t py-4" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
        <div
          className="w-full flex flex-col md:flex-row items-center justify-between gap-2"
          style={{ paddingLeft: 'clamp(16px, 3vw, 60px)', paddingRight: 'clamp(16px, 3vw, 60px)' }}
        >
          <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-manrope)' }}>
            © {new Date().getFullYear()} Euroceram 2002 S.R.L. · P.IVA IT07340530634 · Tutti i diritti riservati
          </p>
          <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-manrope)' }}>
            Arzano, Napoli
          </p>
        </div>
      </div>
    </footer>
  )
}
