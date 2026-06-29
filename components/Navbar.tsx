'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from './motion'
import LogoSVG from './LogoSVG'

const NAV = [
  { label: 'Chi Siamo',   href: '/#chi-siamo' },
  { label: 'Prodotti',    href: '/#prodotti' },
  { label: 'Catalogo',    href: '/catalogo' },
  { label: 'Brand',       href: '/#brand' },
  { label: 'Ispirazione', href: '/#ispirazione' },
  { label: 'Preventivo',  href: '/#preventivo' },
  { label: 'Contatti',    href: '/#contatti' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Per gli anchor "/#id" sulla home: scrolla sempre manualmente, anche se l'hash
  // nell'URL non cambia (altrimenti il secondo click sullo stesso link non fa nulla).
  const handleAnchorClick = (href: string) => (e: React.MouseEvent) => {
    if (!href.startsWith('/#')) return
    if (pathname !== '/') return
    e.preventDefault()
    const id = href.slice(2)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    window.history.replaceState(null, '', href)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 transition-all duration-500"
      style={{
        zIndex: 130,
        // Bar di sezione SEMPRE presente: logo e hamburger poggiano su una superficie
        // visibile in ogni parte del sito, non più simboli sospesi sul contenuto.
        background: scrolled ? 'rgba(16,19,15,0.97)' : 'rgba(16,19,15,0.82)',
        backdropFilter: 'blur(16px) saturate(1.3)',
        WebkitBackdropFilter: 'blur(16px) saturate(1.3)',
        borderBottom: '1px solid rgba(111,168,144,0.18)',
        boxShadow: scrolled ? '0 2px 40px rgba(0,0,0,0.35)' : '0 1px 20px rgba(0,0,0,0.22)',
      }}
    >
      <div className="w-full flex items-center justify-between h-[70px]" style={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 'clamp(16px, 3vw, 60px)', paddingRight: 'clamp(16px, 3vw, 60px)' }}>
        {/* Logo */}
        <Link href="/" className="transition-transform duration-200 hover:scale-[1.02] inline-block">
          <LogoSVG height={56} />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-7">
          {NAV.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              prefetch={link.href === '/catalogo' ? false : undefined}
              onClick={handleAnchorClick(link.href)}
              className="relative text-white/80 hover:text-white text-[11px] tracking-[0.18em] uppercase font-medium group transition-colors hover:-translate-y-px"
            >
              {link.label}
              <span
                className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                style={{ background: 'var(--teal)' }}
              />
            </Link>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-4">
          <motion.a
            href="tel:0817313025"
            className="hidden md:flex items-center justify-center gap-2 tracking-[0.12em] uppercase font-semibold relative overflow-hidden"
            style={{ color: 'var(--teal)', borderRadius: '999px', fontSize: '11px', padding: '12px 22px' }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          >
            {/* glass layers */}
            <span className="absolute inset-0 pointer-events-none" style={{
              borderRadius: '999px',
              backdropFilter: 'blur(14px) saturate(1.5)',
              WebkitBackdropFilter: 'blur(14px) saturate(1.5)',
              background: 'rgba(255,255,255,0.06)',
            }} />
            <span className="absolute inset-0 pointer-events-none" style={{
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.18)',
              boxShadow: [
                'inset 1px 1px 0 rgba(255,255,255,0.20)',
                'inset -1px -1px 0 rgba(255,255,255,0.05)',
                'inset 0 2px 6px rgba(255,255,255,0.08)',
                '0 4px 16px rgba(0,0,0,0.18)',
              ].join(','),
            }} />
            <span className="relative z-10 flex items-center gap-2">
              <PhoneIcon />
              081 731 3025
            </span>
          </motion.a>

          <button
            type="button"
            className="lg:hidden flex flex-col items-center justify-center gap-[5px] p-3 -mr-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
            style={{ background: 'transparent', position: 'relative', zIndex: 2, WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-6 h-[2px] transition-all duration-200"
                style={{
                  background: 'var(--teal)',
                  transform:
                    i === 0 ? (open ? 'translateY(7px) rotate(45deg)' : 'none')
                    : i === 2 ? (open ? 'translateY(-7px) rotate(-45deg)' : 'none')
                    : 'none',
                  opacity: i === 1 && open ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu — render condizionale con animazione CSS fluida (robusta su iOS) */}
      {open && (
        <div className="menu-drop lg:hidden bg-[#10130F] border-t border-white/5 px-6 pb-6">
          {NAV.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              prefetch={link.href === '/catalogo' ? false : undefined}
              className="block py-3.5 text-white/70 text-xs tracking-[0.2em] uppercase border-b border-white/5 last:border-0"
              style={{ animationDelay: `${0.05 + i * 0.04}s` }}
              onClick={(e) => { handleAnchorClick(link.href)(e); setOpen(false) }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:0817313025"
            className="mt-4 flex items-center gap-2 text-[var(--teal)] text-xs tracking-wider uppercase font-semibold"
          >
            <PhoneIcon /> 081 731 3025
          </a>
        </div>
      )}
    </nav>
  )
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 1.5h3l1.5 3.5-1.5 1a8 8 0 004 4l1-1.5 3.5 1.5V13a1 1 0 01-1 1C5.716 14 0 8.284 0 2.5A1 1 0 011 1.5h1z" fill="currentColor"/>
    </svg>
  )
}
