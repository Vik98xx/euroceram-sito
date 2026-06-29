'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import LogoSVG from '../LogoSVG';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  children?: ReactNode;
}

export default function ScrollExpandMedia({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  children,
}: ScrollExpandMediaProps) {
  const [done, setDone] = useState(false);
  const [logoDropped, setLogoDropped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const triggered = useRef(false);
  const progress = useMotionValue(0);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const mediaWidth    = useTransform(progress, [0, 0.8], [320, 9999]);
  const mediaHeight   = useTransform(progress, [0, 0.8], [420, 9999]);
  const borderRadius  = useTransform(progress, [0, 0.72, 0.8], [18, 4, 0]);
  const bgOpacity     = useTransform(progress, [0, 0.8], [1, 0]);
  const hintOpacity   = useTransform(progress, [0, 0.2], [1, 0]);
  // Su desktop il titolo scivola a sinistra per affiancarsi al logo. Su mobile niente:
  // con -35vw il titolo finirebbe quasi fuori schermo, sovrapposto al logo — resta centrato.
  const titleXDesktop = useTransform(progress, [0, 0.4], ['0vw', '-40vw']);
  const titleXMobile  = useTransform(progress, [0, 0.4], [0, 0]);
  // Dark gradient that wipes in from the left, finishing when logo/title land
  const gradientClip = useTransform(progress, [0, 0.9], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']);

  // Se la pagina viene caricata già scrollata (refresh più in basso, link diretto, ecc.)
  // l'utente non sta guardando l'hero: salta l'intro, niente blocco scroll.
  const [skipIntro] = useState(() => typeof window !== 'undefined' && window.scrollY > 10);


  const unlock = () => {
    // Rimuove il blocco scroll iOS (tecnica position:fixed)
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    document.body.style.overflow = '';
    if (scrollY) window.scrollTo(0, -parseInt(scrollY));
    setDone(true);
  };

  const trigger = () => {
    if (triggered.current) return;
    triggered.current = true;
    setLogoDropped(true);

    // Rete di sicurezza: se per qualsiasi motivo onComplete non scattasse, sblocca comunque.
    const safety = setTimeout(unlock, 2800);

    animate(progress, 1, {
      duration: 2.4,
      ease: 'linear',
      onComplete: () => { clearTimeout(safety); unlock(); },
    });
  };

  // Blocca lo scroll SOLO se l'utente è davvero in cima alla pagina (prima visita all'hero),
  // mai altrove — questo evita il blocco "fantasma" lontano dall'hero o dopo un reload a metà pagina.
  useEffect(() => {
    if (skipIntro) {
      // Salta direttamente allo stato finale (video a piena pagina, contenuto visibile),
      // mai a metà animazione: altrimenti la pagina sotto resterebbe invisibile.
      progress.set(1);
      setLogoDropped(true);
      setDone(true);
      return;
    }

    // Blocco scroll iOS-safe: position:fixed + top negativo
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.overflow = 'hidden';
    // Rete di sicurezza: dopo 6 secondi senza interazione, parte l'animazione automaticamente
    const hardSafety = setTimeout(() => { if (!triggered.current) trigger(); }, 6000);

    return () => {
      clearTimeout(hardSafety);
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.overflow = '';
    };
  }, [skipIntro]);

  useEffect(() => {
    if (done || skipIntro) return;

    const onWheel = (e: WheelEvent) => { e.preventDefault(); if (e.deltaY > 20) trigger(); };
    const onKey = (e: KeyboardEvent) => { if (['ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); trigger(); } };

    // Mobile: swipe verso il basso (dito che sale) trigghera l'animazione.
    // body.position:fixed blocca già lo scroll fisico — qui rileviamo solo il gesto.
    let ty = 0;
    const onTouchStart = (e: TouchEvent) => { ty = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      if (ty - e.touches[0].clientY > 40) trigger();
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [done, skipIntro]);

  const firstWord   = title?.split(' ')[0] ?? '';
  const restOfTitle = title?.split(' ').slice(1).join(' ') ?? '';

  return (
    <div style={{ minHeight: '100dvh', overflow: 'hidden' }}>
      <section
        style={{ position: 'relative', width: '100%', height: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
      >

        {/* Background image — fades out as video expands */}
        <motion.div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: bgOpacity }}>
          <Image
            src={bgImageSrc}
            alt=""
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(8,10,7,0.6) 0%, rgba(8,10,7,0.25) 60%, rgba(8,10,7,0.65) 100%)' }} />
        </motion.div>

        {/* Expanding media */}
        <motion.div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          x: '-50%', y: '-50%',
          width: mediaWidth,
          height: mediaHeight,
          maxWidth: '100vw',
          maxHeight: '100vh',
          borderRadius,
          overflow: 'hidden',
          zIndex: 1,
          boxShadow: '0 24px 80px rgba(0,0,0,0.55)',
        }}>
          {mediaType === 'video' ? (
            <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
              <video
                src={mediaSrc}
                poster={posterSrc}
                autoPlay muted loop playsInline preload="auto"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          ) : (
            <Image src={mediaSrc} alt="" fill style={{ objectFit: 'cover' }} />
          )}

          {/* Transparent grid overlay on the media — solo desktop, maglia piccola */}
          <div className="hidden md:block" style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }} />
        </motion.div>

        {/* Dark gradient sweep — wipes in from the left */}
        <motion.div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            pointerEvents: 'none',
            background:
              'linear-gradient(to right, rgba(8,10,7,0.92) 0%, rgba(8,10,7,0.6) 28%, rgba(8,10,7,0.25) 52%, transparent 75%)',
            clipPath: gradientClip,
            WebkitClipPath: gradientClip,
          }}
        />

        {/* Logo mobile — centrato in alto — visibile solo sotto md */}
        <motion.div
          className="md:hidden"
          initial={{ y: '-110vh', opacity: 1 }}
          animate={logoDropped ? { y: 0, opacity: 1 } : { y: '-110vh', opacity: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'absolute', left: '50%', top: 'clamp(40px, 9vh, 80px)', x: '-50%', zIndex: 3, pointerEvents: 'none' }}
        >
          <LogoSVG height={104} />
        </motion.div>

        {/* Logo desktop — a sinistra a metà altezza — visibile solo sopra md */}
        <motion.div
          className="hidden md:block"
          initial={{ y: '-110vh', opacity: 1 }}
          animate={logoDropped ? { y: 0, opacity: 1 } : { y: '-110vh', opacity: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'absolute', left: 'clamp(6px, 1.5vw, 32px)', top: 'calc(50% - clamp(3rem, 7vw, 6.5rem) * 2.2)', zIndex: 3, pointerEvents: 'none' }}
        >
          <LogoSVG height={100} />
        </motion.div>

        {/* Title mobile — centrato, più grande */}
        <motion.div className="md:hidden" style={{
          position: 'relative', zIndex: 2,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          pointerEvents: 'none', x: titleXMobile,
        }}>
          {firstWord && (
            <h1 className="font-display" style={{ fontSize: 'clamp(3.8rem, 16vw, 7rem)', letterSpacing: '-0.02em', lineHeight: 1.02, color: '#fff', textShadow: '0 2px 28px rgba(0,0,0,0.7)', margin: 0 }}>
              {firstWord}
            </h1>
          )}
          {restOfTitle && (
            <h1 className="font-display" style={{ fontSize: 'clamp(3.8rem, 16vw, 7rem)', letterSpacing: '-0.02em', lineHeight: 1.02, color: 'var(--teal)', textShadow: '0 2px 28px rgba(111,168,144,0.5)', margin: 0 }}>
              {restOfTitle}
            </h1>
          )}
        </motion.div>

        {/* Title desktop — scivola a sinistra */}
        <motion.div className="hidden md:flex" style={{
          position: 'relative', zIndex: 2,
          flexDirection: 'column', alignItems: 'flex-start', gap: 4,
          pointerEvents: 'none', x: titleXDesktop,
        }}>
          {firstWord && (
            <h1 className="font-display" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)', letterSpacing: '-0.02em', lineHeight: 1.05, color: '#fff', textShadow: '0 2px 28px rgba(0,0,0,0.7)', margin: 0 }}>
              {firstWord}
            </h1>
          )}
          {restOfTitle && (
            <h1 className="font-display" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)', letterSpacing: '-0.02em', lineHeight: 1.05, color: 'var(--teal)', textShadow: '0 2px 28px rgba(111,168,144,0.5)', margin: 0 }}>
              {restOfTitle}
            </h1>
          )}
        </motion.div>

        {/* Scroll/click hint */}
        <motion.div
          onClick={trigger}
          onTouchEnd={(e) => { e.preventDefault(); trigger(); }}
          style={{
            position: 'absolute',
            bottom: isMobile ? 14 : 36,
            left: '50%',
            x: '-50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: isMobile ? 12 : 8,
            zIndex: 2,
            opacity: hintOpacity,
            pointerEvents: 'auto',
            cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          {date && (
            <span style={{ fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--teal)' }}>
              {date}
            </span>
          )}
          {scrollToExpand && (
            <span style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
              {scrollToExpand}
            </span>
          )}
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v12M3 9l5 5 5-5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>

      </section>

      {children && (
        <motion.div
          style={{ opacity: useTransform(progress, [0.85, 1], [0, 1]) }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
