'use client'

import { AuroraBackground } from './ui/aurora-background'

// scale: fattore opzionale per ridurre i loghi ritagliati stretti (poco spazio bianco
// interno), così risultano bilanciati con gli altri e non appaiono "ingranditi".
const BRANDS = [
  { name: 'FAP Ceramiche',        logo: '/images/brands/fap-ceramiche.png', url: 'https://www.fapceramiche.com/it/' },
  { name: 'Emil Ceramica',        logo: '/images/brands/c2387d01-d444-4a2a-9502-ccd80a9cf71a.png', url: 'https://www.emilgroup.it/', scale: 0.7 },
  { name: 'Provenza',             logo: '/images/brands/128665d4-9400-4092-b2eb-772ccc0e5501.png', url: 'https://www.emilgroup.it/provenza/' },
  { name: 'Ergon',                logo: '/images/brands/7e7c1cec-a484-4834-9f9d-299a781b4b02.png', url: 'https://www.emilgroup.it/ergon/' },
  { name: 'Cooperativa Ceramica', logo: '/images/brands/5022faab-5f32-48b5-acb5-86ae778e24c1.png', url: 'https://ccimola.com/' },
  { name: 'Hafro',                logo: '/images/brands/d43e30fd-e79c-4063-9f3d-786cd9182dd6.png', url: 'https://gruppogeromin.com/en/brand/hafro/', scale: 0.7 },
  { name: 'Catalano',             logo: '/images/brands/9d979bdc-4684-4d7c-8e63-c61dcaa65747.png', url: 'https://www.catalano.it/en/' },
  { name: 'Frisone',              logo: '/images/brands/63a489e3-c446-4475-a645-8396ab2bdd64.png', url: 'https://frisone.com/en/' },
  { name: 'Daniel',               logo: '/images/brands/daniel-nero.png', url: 'https://www.daniel.it/en/', scale: 0.7 },
  { name: 'Bongio',               logo: '/images/brands/logo_pulito.webp', url: 'https://www.bongio.com/en', scale: 0.7 },
]

export default function Brand() {
  return (
    <section id="brand" style={{ position: 'relative', overflow: 'hidden', background: '#10130F', paddingTop: 'var(--section-gap-sm)', paddingBottom: 'var(--section-gap-sm)' }}>
      <AuroraBackground />
      <div className="w-full" style={{ position: 'relative', zIndex: 1, paddingLeft: 'clamp(16px, 3vw, 60px)', paddingRight: 'clamp(16px, 3vw, 60px)' }}>

        {/* Header */}
        <div className="text-center" style={{ marginBottom: '3.5rem' }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: 'var(--teal)' }} />
            <span className="section-label">I Nostri Partner</span>
            <div className="h-px w-10" style={{ background: 'var(--teal)' }} />
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#FFFFFF', lineHeight: 1.1 }}>
            Brand <span style={{ color: '#6FA890' }}>di Eccellenza</span>
          </h2>
        </div>

        {/* Griglia loghi — visibili subito, nessuno slider */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          style={{
            gap: 'clamp(0.75rem, 2vw, 1.25rem)',
            borderTop: '1px solid rgba(111,168,144,0.08)',
            paddingTop: '2rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid rgba(111,168,144,0.08)',
          }}
        >
          {BRANDS.map((brand) => (
            <a
              key={brand.name}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              title={brand.name}
              className="flex items-center justify-center"
              style={{
                borderRadius: 14,
                background: '#FFFFFF',
                padding: 'clamp(0.75rem, 2vw, 1.1rem)',
                height: 'clamp(64px, 12vw, 84px)',
                border: '1.5px solid rgba(111,168,144,0.22)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.28), 0 0 0 0 rgba(111,168,144,0)',
                transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s, border-color 0.3s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.transform = 'translateY(-4px)'
                el.style.boxShadow = '0 10px 32px rgba(0,0,0,0.3), 0 0 0 2px rgba(111,168,144,0.35)'
                el.style.borderColor = 'rgba(111,168,144,0.55)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.28), 0 0 0 0 rgba(111,168,144,0)'
                el.style.borderColor = 'rgba(111,168,144,0.22)'
              }}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                style={{
                  maxHeight: `${(brand.scale ?? 1) * 100}%`,
                  maxWidth: `${(brand.scale ?? 1) * 100}%`,
                  objectFit: 'contain',
                }}
              />
            </a>
          ))}
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
          E molti altri brand disponibili in showroom ·{' '}
          <a href="#contatti" style={{ color: 'var(--teal)' }} className="underline">Contattaci per info</a>
        </p>

        <p style={{ color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem', maxWidth: '32rem', marginLeft: 'auto', marginRight: 'auto' }}>
          Collaboriamo con i migliori produttori italiani ed europei per offrirti qualità certificata e design senza compromessi.
        </p>

      </div>
    </section>
  )
}
