"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"

interface LocationMapProps {
  location?: string
  coordinates?: string
  className?: string
}

export function LocationMap({
  location = "Arzano (NA)",
  coordinates = "40.9167° N, 14.2667° E",
  className,
}: LocationMapProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-50, 50], [8, -8])
  const rotateY = useTransform(mouseX, [-50, 50], [-8, 8])

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - (rect.left + rect.width / 2))
    mouseY.set(e.clientY - (rect.top + rect.height / 2))
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={containerRef}
      className={`relative cursor-pointer select-none ${className}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl border"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
          background: '#121511',
          borderColor: 'rgba(111,168,144,0.2)',
        }}
        animate={{
          width: isExpanded ? 320 : 220,
          height: isExpanded ? 260 : 130,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.06]" />

        {/* Expanded map */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="absolute inset-0" style={{ background: '#121511' }} />

              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                {/* Strade principali */}
                {[35, 65].map((y, i) => (
                  <motion.line key={`h${i}`} x1="0%" y1={`${y}%`} x2="100%" y2={`${y}%`}
                    stroke="rgba(111,168,144,0.3)" strokeWidth="4"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }} />
                ))}
                {[30, 70].map((x, i) => (
                  <motion.line key={`v${i}`} x1={`${x}%`} y1="0%" x2={`${x}%`} y2="100%"
                    stroke="rgba(111,168,144,0.2)" strokeWidth="3"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }} />
                ))}
                {/* Strade secondarie */}
                {[20, 50, 80].map((y, i) => (
                  <motion.line key={`hs${i}`} x1="0%" y1={`${y}%`} x2="100%" y2={`${y}%`}
                    stroke="rgba(111,168,144,0.08)" strokeWidth="1.5"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }} />
                ))}
                {[15, 45, 55, 85].map((x, i) => (
                  <motion.line key={`vs${i}`} x1={`${x}%`} y1="0%" x2={`${x}%`} y2="100%"
                    stroke="rgba(111,168,144,0.08)" strokeWidth="1.5"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }} />
                ))}
              </svg>

              {/* Edifici */}
              {[
                { top: '40%', left: '10%', w: '15%', h: '20%', delay: 0.5 },
                { top: '15%', left: '35%', w: '12%', h: '15%', delay: 0.6 },
                { top: '70%', left: '75%', w: '18%', h: '18%', delay: 0.7 },
                { top: '20%', right: '10%', w: '10%', h: '25%', delay: 0.55 },
                { top: '55%', left: '5%',  w: '8%',  h: '12%', delay: 0.65 },
                { top: '8%',  left: '75%', w: '14%', h: '10%', delay: 0.75 },
              ].map((b, i) => (
                <motion.div key={i} className="absolute rounded-sm"
                  style={{ top: b.top, left: (b as any).left, right: (b as any).right, width: b.w, height: b.h,
                    background: 'rgba(111,168,144,0.15)', border: '1px solid rgba(111,168,144,0.12)' }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: b.delay }}
                />
              ))}

              {/* Pin */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.3 }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                  style={{ filter: "drop-shadow(0 0 10px rgba(111,168,144,0.6))" }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#6FA890" />
                  <circle cx="12" cy="9" r="2.5" fill="#10130F" />
                </svg>
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#10130F] via-transparent to-transparent opacity-60" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid (solo collapsed) */}
        <motion.div className="absolute inset-0" animate={{ opacity: isExpanded ? 0 : 0.04 }} transition={{ duration: 0.3 }}>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="mapgrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mapgrid)" />
          </svg>
        </motion.div>

        {/* Contenuto */}
        <div className="relative z-10 h-full flex flex-col justify-between p-5">
          <div className="flex items-start justify-between">
            <motion.div animate={{ opacity: isExpanded ? 0 : 1 }} transition={{ duration: 0.3 }}>
              <motion.svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="#6FA890" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                animate={{ filter: isHovered ? "drop-shadow(0 0 8px rgba(111,168,144,0.7))" : "drop-shadow(0 0 4px rgba(111,168,144,0.3))" }}
                transition={{ duration: 0.3 }}>
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                <line x1="9" x2="9" y1="3" y2="18" />
                <line x1="15" x2="15" y1="6" y2="21" />
              </motion.svg>
            </motion.div>

            <motion.div
              className="flex items-center gap-1.5 px-2 py-1 rounded-full"
              style={{ background: 'rgba(111,168,144,0.08)' }}
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#6FA890' }} />
              <span className="text-[10px] font-medium tracking-wide uppercase" style={{ color: 'var(--teal)' }}>Aperto</span>
            </motion.div>
          </div>

          <div className="space-y-1">
            <motion.h3
              className="font-medium text-sm tracking-tight text-white"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {location}
            </motion.h3>

            <AnimatePresence>
              {isExpanded && (
                <motion.p
                  className="text-xs font-mono"
                  style={{ color: 'var(--teal)' }}
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {coordinates}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.div
              className="h-px"
              style={{ background: 'linear-gradient(to right, rgba(111,168,144,0.5), rgba(111,168,144,0.2), transparent)' }}
              initial={{ scaleX: 0.3, originX: 0 }}
              animate={{ scaleX: isHovered || isExpanded ? 1 : 0.3 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </motion.div>

      <motion.p
        className="absolute -bottom-6 left-1/2 text-[10px] whitespace-nowrap"
        style={{ x: "-50%", color: 'var(--muted)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered && !isExpanded ? 1 : 0, y: isHovered ? 0 : 4 }}
        transition={{ duration: 0.2 }}
      >
        Clicca per espandere
      </motion.p>
    </motion.div>
  )
}
