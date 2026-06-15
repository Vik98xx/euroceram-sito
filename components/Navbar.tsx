'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from './motion'
import LogoSVG from './LogoSVG'

const NAV = [
  { label: 'Chi Siamo',   href: '#chi-siamo' },
  { label: 'Prodotti',    href: '#prodotti' },
  { label: 'Brand',       href: '#brand' },
  { label: 'Ispirazione', href: '#ispirazione' },
  { label: 'Offerte',     href: '#offerte' },
  { label: 'Preventivo',  href: '#preventivo' },
  { label: 'Contatti',    href: '#contatti' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(12,22,22,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        boxShadow: scrolled ? '0 2px 40px rgba(0,0,0,0.3)' : 'none',
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[70px]">
        {/* Logo */}
        <motion.a href="#" whileHover={{ scale: 1.02 }}>
          <LogoSVG height={38} className="brightness-0 invert" />
        </motion.a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-7">
          {NAV.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="relative text-white/80 hover:text-white text-[11px] tracking-[0.18em] uppercase font-medium group transition-colors"
              whileHover={{ y: -1 }}
            >
              {link.label}
              <span
                className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                style={{ background: 'var(--teal)' }}
              />
            </motion.a>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-4">
          <motion.a
            href="tel:0817313025"
            className="hidden md:flex items-center gap-2 text-white text-[11px] tracking-[0.12em] uppercase font-semibold px-5 py-2.5 border border-white/20 hover:border-[var(--teal)] hover:text-[var(--teal)] transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <PhoneIcon />
            081 731 3025
          </motion.a>

          <button
            className="lg:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block w-6 h-[2px]"
                style={{ background: 'var(--teal)' }}
                animate={
                  i === 0 ? { rotate: open ? 45 : 0, y: open ? 7 : 0 }
                  : i === 1 ? { opacity: open ? 0 : 1 }
                  : { rotate: open ? -45 : 0, y: open ? -7 : 0 }
                }
                transition={{ duration: 0.25 }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="lg:hidden bg-[#0C1616] border-t border-white/5 px-6 pb-6"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {NAV.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="block py-3.5 text-white/70 text-xs tracking-[0.2em] uppercase border-b border-white/5 last:border-0"
                initial={{ x: -16, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <a
              href="tel:0817313025"
              className="mt-4 flex items-center gap-2 text-[var(--teal)] text-xs tracking-wider uppercase font-semibold"
            >
              <PhoneIcon /> 081 731 3025
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 1.5h3l1.5 3.5-1.5 1a8 8 0 004 4l1-1.5 3.5 1.5V13a1 1 0 01-1 1C5.716 14 0 8.284 0 2.5A1 1 0 011 1.5h1z" fill="currentColor"/>
    </svg>
  )
}
