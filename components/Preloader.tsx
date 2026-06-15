'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from './motion'
import LogoSVG from './LogoSVG'

export default function Preloader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2200)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'var(--bg)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Animated tiles grid */}
          <div className="relative w-24 h-24 mb-8">
            {[
              { x: 0,  y: 0,  delay: 0,    color: '#5BA4A4' },
              { x: 13, y: 0,  delay: 0.1,  color: '#A8A8A8' },
              { x: 0,  y: 13, delay: 0.2,  color: '#1C1C1C' },
              { x: 13, y: 13, delay: 0.15, color: '#5BA4A4', opacity: 0.5 },
            ].map((tile, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  width: 44,
                  height: 44,
                  background: tile.color,
                  opacity: (tile as { opacity?: number }).opacity ?? 1,
                  left: `${tile.x}%`,
                  top:  `${tile.y}%`,
                }}
                initial={{ scale: 0, rotate: 45, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: (tile as { opacity?: number }).opacity ?? 1 }}
                transition={{ duration: 0.5, delay: tile.delay, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <LogoSVG height={40} />
          </motion.div>

          {/* Loading bar */}
          <div className="mt-8 w-40 h-[2px] rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'var(--teal)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
