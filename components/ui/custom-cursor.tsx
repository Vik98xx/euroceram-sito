'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from '../motion'

/**
 * Cursore-alone teal "magnetico": un anello che insegue il puntatore con inerzia
 * e si espande/illumina sopra gli elementi interattivi.
 * Solo desktop (pointer: fine), rispetta prefers-reduced-motion, non nasconde il
 * cursore di sistema, pointer-events:none.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)
  const [down, setDown] = useState(false)

  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { stiffness: 380, damping: 30, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 380, damping: 30, mass: 0.4 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    setEnabled(true)

    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY) }
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null
      setActive(!!t?.closest('a, button, [role="button"], input, select, textarea, label'))
    }
    const onDown = () => setDown(true)
    const onUp = () => setDown(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [x, y])

  if (!enabled) return null

  const size = active ? 58 : 26

  return (
    <motion.div
      aria-hidden
      style={{ position: 'fixed', left: 0, top: 0, x: sx, y: sy, zIndex: 100, pointerEvents: 'none' }}
    >
      {/* Anello */}
      <motion.div
        animate={{
          width: size,
          height: size,
          opacity: active ? 0.95 : 0.55,
          backgroundColor: active ? 'rgba(111,168,144,0.14)' : 'rgba(111,168,144,0)',
          scale: down ? 0.82 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          border: '1.5px solid #6FA890',
          boxShadow: '0 0 18px rgba(111,168,144,0.45)',
        }}
      />
      {/* Punto centrale */}
      <motion.div
        animate={{ opacity: active ? 0 : 0.9 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          translateX: '-50%',
          translateY: '-50%',
          width: 4,
          height: 4,
          borderRadius: '50%',
          background: '#97C3B0',
        }}
      />
    </motion.div>
  )
}
