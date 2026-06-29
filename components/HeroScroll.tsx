'use client'

import * as React from 'react'
import { motion, useMotionValue, useMotionTemplate, useTransform, animate } from 'framer-motion'
import LogoSVG from './LogoSVG'

const DURATION = 2.0

export default function HeroScroll() {
  const progress = useMotionValue(0)
  const started = React.useRef(false)
  const [playing, setPlaying] = React.useState(false) // pilota la caduta dei loghi
  const gridRef = React.useRef<HTMLDivElement>(null)

  // Griglia rivelata intorno al puntatore del mouse (desktop)
  React.useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = gridRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  React.useEffect(() => {
    // L'intro + blocco scroll riparte ad ogni ricaricamento fatto dalla CIMA (pagina principale).
    let unlockTimer: ReturnType<typeof setTimeout>
    let decideTimer: ReturnType<typeof setTimeout>
    let raf1 = 0, raf2 = 0

    const lock = () => { document.documentElement.style.overflow = 'hidden'; document.body.style.overflow = 'hidden' }
    const unlock = () => { document.documentElement.style.overflow = ''; document.body.style.overflow = '' }

    const cleanup = () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('keydown', onKey)
    }

    const play = () => {
      if (started.current) return
      started.current = true
      setPlaying(true)
      animate(progress, 1, { duration: DURATION, ease: [0.22, 1, 0.36, 1] })
      unlockTimer = setTimeout(() => { unlock(); cleanup() }, DURATION * 700)
    }

    // I listener bloccano lo scroll fisico e, al primo gesto, avviano l'animazione.
    const onWheel = (e: WheelEvent) => { e.preventDefault(); play() }
    const onTouchMove = (e: TouchEvent) => { e.preventDefault(); play() }
    const onKey = (e: KeyboardEvent) => { if (['ArrowDown', 'PageDown', ' '].includes(e.key)) play() }

    const startIntro = () => {
      lock()
      window.addEventListener('wheel', onWheel, { passive: false })
      window.addEventListener('touchmove', onTouchMove, { passive: false })
      window.addEventListener('keydown', onKey)
    }

    // Decide DOPO che il browser ha ripristinato la posizione di scroll (al reload
    // arriva con un piccolo ritardo, soprattutto su pagine lunghe):
    //  - in cima → l'intro riparte e attende lo scroll dell'utente
    //  - più in basso → niente blocco, si resta dov'eri (stato finale)
    const decide = () => {
      if (window.scrollY > 10) {
        started.current = true
        setPlaying(true)
        progress.set(1)
      } else {
        startIntro()
      }
    }
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => { decideTimer = setTimeout(decide, 90) })
    })

    return () => {
      clearTimeout(unlockTimer)
      clearTimeout(decideTimer)
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      unlock()
      cleanup()
    }
  }, [progress])

  // Video: da riquadro centrale 44% → schermo intero 100%
  const videoSize = useTransform(progress, [0, 1], [44, 100])
  const videoSizeStr = useMotionTemplate`${videoSize}%`
  const borderRadius = useTransform(progress, [0, 0.85, 1], [14, 3, 0])

  // "Benvenuto!" sparisce appena parte l'animazione
  const benvenutoOpacity = useTransform(progress, [0, 0.3], [1, 0])
  // Titolo + showroom compaiono durante l'animazione e restano
  const mobileReveal = useTransform(progress, [0.2, 0.7], [0, 1])
  // Ingressi distinti — "Euroceram" da sinistra, "2002" da destra, "Showroom" dal basso
  const mEuroX = useTransform(progress, [0.2, 0.85], ['-55vw', '0vw'])
  const m2002X = useTransform(progress, [0.2, 0.85], ['55vw', '0vw'])
  const mShowroomY = useTransform(progress, [0.35, 0.95], [44, 0])
  // Griglia: compare appena parte l'animazione
  const gridOpacity = useTransform(progress, [0, 0.35], [0, 1])

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">

      {/* Sfondo terrazza */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: 'url(/images/terrazza.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="absolute inset-0" style={{ background: 'rgba(8,10,7,0.50)' }} />

      {/* Video che si espande dal centro */}
      <motion.div
        className="absolute overflow-hidden"
        style={{
          width: videoSizeStr, height: videoSizeStr,
          top: '50%', left: '50%', x: '-50%', y: '-50%',
          borderRadius, pointerEvents: 'none', zIndex: 1,
        }}
      >
        <video
          autoPlay muted loop playsInline poster="/images/terrazza.jpg"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, rgba(8,10,7,0.55) 0%, rgba(8,10,7,0.12) 55%, rgba(8,10,7,0.50) 100%)' }}
        />
      </motion.div>

      {/* Griglia A TUTTO SCHERMO — separata dal video, compare appena parte l'animazione */}
      <motion.div
        ref={gridRef}
        className="absolute inset-0"
        style={{
          opacity: gridOpacity,
          pointerEvents: 'none',
          zIndex: 2,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.19) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.19) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          maskImage: 'radial-gradient(circle 200px at var(--mx, -999px) var(--my, -999px), #000 0%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.32) 100%)',
          WebkitMaskImage: 'radial-gradient(circle 200px at var(--mx, -999px) var(--my, -999px), #000 0%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.32) 100%)',
        }}
      />

      {/* Overlay testo — identico su mobile e desktop */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ zIndex: 5 }}>

        {/* Logo — cade dall'alto solo dopo lo scroll, poi RESTA sopra "Euroceram" */}
        <motion.div
          className="mb-6"
          initial={{ y: '-120vh' }}
          animate={playing ? { y: 0 } : { y: '-120vh' }}
          transition={{ duration: DURATION, ease: [0.22, 1, 0.36, 1] }}
        >
          <LogoSVG height={132} />
        </motion.div>

        {/* Titolo — "Euroceram" entra da sinistra, "2002" da destra */}
        <h1
          className="font-display text-white text-center"
          style={{ position: 'relative', top: '-1.8rem', fontSize: 'clamp(4.2rem, 12vw, 7rem)', letterSpacing: '-0.02em', lineHeight: 1.0, margin: 0, textShadow: '0 0 26px rgba(255,255,255,0.40), 0 2px 30px rgba(0,0,0,0.55)' }}
        >
          <motion.span style={{ display: 'block', x: mEuroX, opacity: mobileReveal }}>Euroceram</motion.span>
          <motion.span style={{ display: 'block', x: m2002X, opacity: mobileReveal, color: 'var(--teal)' }}>2002</motion.span>
        </h1>

        {/* Sottotitolo — entra dal basso verso l'alto e RESTA */}
        <motion.p
          className="text-center"
          style={{
            fontSize: 15,
            letterSpacing: '0.34em',
            textTransform: 'uppercase',
            color: '#ffffff',
            marginTop: '1.6rem',
            y: mShowroomY,
            opacity: mobileReveal,
            textShadow: '0 0 24px rgba(111,168,144,0.9), 0 0 48px rgba(111,168,144,0.5)',
          }}
        >
          Showroom · Arzano (NA)
        </motion.p>

        {/* "Benvenuto!" iniziale (dove c'era lo scroll hint) — sparisce appena parte l'animazione */}
        <motion.div
          className="absolute left-0 right-0 flex flex-col items-center gap-3"
          style={{ bottom: '12vh', opacity: benvenutoOpacity }}
        >
          <span
            className="font-display"
            style={{ fontSize: 'clamp(3rem, 15vw, 5rem)', fontWeight: 600, color: '#EDE8DF', lineHeight: 1, textShadow: '0 0 30px rgba(127,179,158,0.35), 0 2px 24px rgba(0,0,0,0.55)' }}
          >
            Benvenuto!
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v12M3 9l5 5 5-5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

    </section>
  )
}
