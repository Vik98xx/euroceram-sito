'use client'

import { motion } from './motion'
import LogoSVG from './LogoSVG'
import { SocialIcons } from './ui/social-icons'

const NAV = [
  { label: 'Chi Siamo', href: '#chi-siamo' },
  { label: 'Prodotti', href: '#prodotti' },
  { label: 'Brand', href: '#brand' },
  { label: 'Ispirazione', href: '#ispirazione' },
  { label: 'Offerte', href: '#offerte' },
  { label: 'Preventivo', href: '#preventivo' },
  { label: 'Contatti', href: '#contatti' },
]

const PRODUCTS = [
  'Piastrelle & Gres',
  'Ceramiche Decorative',
  'Arredo Bagno',
  'Rubinetterie',
  'Sanitari',
  'Box Doccia & Vasche',
]

export default function Footer() {
  return (
    <footer style={{ background: '#060E0E', borderTop: '1px solid rgba(91,164,164,0.12)' }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-20 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <LogoSVG height={36} className="brightness-0 invert mb-4 opacity-90" />
            <div className="h-px w-10 mb-4" style={{ background: 'var(--teal)' }} />
            <SocialIcons />
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white text-[10px] tracking-[0.3em] uppercase font-bold mb-6">Navigazione</h4>
            <ul className="space-y-3">
              {NAV.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                    whileHover={{ x: 4, color: 'var(--teal)' }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white text-[10px] tracking-[0.3em] uppercase font-bold mb-6">Prodotti</h4>
            <ul className="space-y-3">
              {PRODUCTS.map((p) => (
                <li key={p}>
                  <motion.a
                    href="#prodotti"
                    className="text-sm transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                    whileHover={{ x: 4, color: 'var(--teal)' }}
                  >
                    {p}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-[10px] tracking-[0.3em] uppercase font-bold mb-6">Contatti</h4>
            <ul className="space-y-4">
              {[
                { label: 'Via G. Carducci 3\n80022 Arzano (NA)', href: '#', icon: '📍' },
                { label: '081 731 3025', href: 'tel:0817313025', icon: '📞' },
                { label: '+39 353 392 8484', href: 'tel:+393533928484', icon: '📱' },
                { label: 'euroceram2002@hotmail.it', href: 'mailto:euroceram2002@hotmail.it', icon: '✉️' },
              ].map((c, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-sm mt-0.5 opacity-60">{c.icon}</span>
                  <motion.a
                    href={c.href}
                    className="text-sm leading-snug whitespace-pre-line transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                    whileHover={{ color: 'var(--teal)' }}
                  >
                    {c.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t px-6 lg:px-20 py-5" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            © {new Date().getFullYear()} Euroceram 2002 S.R.L. · P.IVA IT07340530634 · Tutti i diritti riservati
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Artigianato digitale · Arzano, Napoli
          </p>
        </div>
      </div>
    </footer>
  )
}
