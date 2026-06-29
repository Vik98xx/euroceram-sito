'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from '../motion'

/**
 * Schermata di benvenuto all'avvio: "Benvenuto!" grande, centrato, in rilievo.
 * Si dissolve dopo un breve istante rivelando il sito. Rispetta prefers-reduced-motion.
 */
export function WelcomeIntro() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Su mobile la pagina "Benvenuto!" è integrata nell'hero, non serve l'overlay separato
    if (window.matchMedia('(max-width: 767px)').matches) return
    if (sessionStorage.getItem('ec-welcome-shown')) return
    sessionStorage.setItem('ec-welcome-shown', '1')
    setShow(true)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = setTimeout(() => setShow(false), reduce ? 600 : 2200)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="welcome"
          aria-hidden
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 120,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(ellipse at center, #16201b 0%, #10130f 70%)',
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h1
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(2.6rem, 10vw, 8.5rem)',
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: '-0.01em',
              color: '#D8EBE0',
              // Rilievo 3D: estrusione celadon verso il basso + ombra di profondità + bagliore
              textShadow: [
                '0 1px 0 #7FB39E',
                '0 2px 0 #5E957F',
                '0 3px 0 #4E8270',
                '0 4px 0 #3f6b5c',
                '0 5px 0 #335649',
                '0 10px 22px rgba(0,0,0,0.6)',
                '0 0 70px rgba(127,179,158,0.30)',
              ].join(','),
            }}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            Benvenuto!
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
