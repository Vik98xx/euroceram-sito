'use client'

import { useScroll, useSpring, motion } from './motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[999]"
      style={{ scaleX, background: 'var(--teal)' }}
    />
  )
}
