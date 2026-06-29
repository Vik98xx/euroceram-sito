import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import WhatsAppButton from '../../components/WhatsAppButton'
import { FullCatalogGallery } from '../../components/ui/full-catalog-gallery'
import { CATALOGO_DATA } from '../../lib/catalogo-data'
import { CATALOGO_EXTRA } from '../../lib/catalogo-extra'

export const metadata: Metadata = {
  title: 'Catalogo Completo | Euroceram 2002 — Piastrelle, Arredo Bagno, Sanitari, Rubinetterie',
  description:
    'Il catalogo completo di Euroceram 2002 organizzato per categoria: Piastrelle & Gres, Ceramiche Decorative, Arredo Bagno, Rubinetterie, Sanitari, Box Doccia & Vasche. Brand: Emil Ceramica, FAP, Savoia, GB Group, Catalano, Galassia, Frisone e altri.',
}

// FAP: escludiamo la prima foto (ambientazione bagno) come richiesto
const fapPhotos = CATALOGO_DATA.fapCeramiche.filter(
  (p) => !p.src.endsWith('/fap-ceramiche/1.jpg'),
)

type Photo = { src: string; title: string; pdfHref?: string; aspect?: number; pages?: readonly string[] }
type SubGroup = { name: string; photos: readonly Photo[] }
type Section = { id: string; label: string; sub?: string; photos?: readonly Photo[]; groups?: readonly SubGroup[] }

// Sanitari organizzati per TIPO (non per brand)
const operaLavabi = CATALOGO_EXTRA.opera.filter((p) => /colors|lavabi-arredo|zero/.test(p.src))
const operaPiatti = CATALOGO_EXTRA.opera.filter((p) => /piatti/.test(p.src))

// Foto spostate da "Lavabi d'Arredo" a "WC e Bidet" (posizioni 2, 4, 13, 18)
const wcMovedSrcs = new Set([
  '/images/vendor-photos/catalano/alvea-02.webp',
  '/images/vendor-photos/catalano/alvea-04.webp',
  '/images/vendor-photos/galassia/core.jpg',
  '/images/vendor-photos/galassia/slide-13.jpg',
])

const lavabiSource = [...CATALOGO_EXTRA.catalano, ...operaLavabi, ...CATALOGO_EXTRA.galassia]

const sanitariLavabiArredo: readonly Photo[] = lavabiSource
  .filter((p) => !wcMovedSrcs.has(p.src))
  .map((p, i) => ({ src: p.src, title: `Lavabo d'arredo — ${i + 1}` }))

const sanitariWcBidet: readonly Photo[] = [
  ...CATALOGO_EXTRA.wcBidetAmbient,
  ...CATALOGO_EXTRA.karag,
  ...lavabiSource.filter((p) => wcMovedSrcs.has(p.src)),
].map((p, i) => ({ src: p.src, title: `WC e Bidet — ${i + 1}` }))

// Piatti doccia: Thermodesign + i 2 piatti doccia di Opera (spostati qui dai Sanitari)
const piattiDoccia: readonly Photo[] = [
  ...CATALOGO_DATA.piattoDoccia,
  ...operaPiatti.map((p) => ({ src: p.src, title: `Piatto doccia — Opera ${p.title.replace('Opera Sanitari — ', '')}` })),
]

export default function CatalogoPage() {
  const sections: Section[] = [
    {
      id: 'piastrelle-gres',
      label: 'Piastrelle & Gres',
      sub: 'Gres porcellanato, grande formato, effetto marmo, pietra e legno',
      groups: [
        ...CATALOGO_DATA.emilCeramica.map((c) => ({ name: `Emil Ceramica — ${c.name}`, photos: c.photos })),
        { name: 'FAP Ceramiche', photos: fapPhotos },
      ],
    },
    {
      id: 'ceramiche-decorative',
      label: 'Ceramiche Decorative',
      sub: 'Maioliche, decori artistici e riggiole della tradizione',
      groups: [
        { name: 'Tipo Vietrese', photos: CATALOGO_DATA.tipoVietrese },
        { name: 'Ceramiche Savoia', photos: CATALOGO_EXTRA.savoia },
      ],
    },
    {
      id: 'arredo-bagno',
      label: 'Arredo Bagno',
      sub: 'Mobili bagno, lavabi e specchi — GB Group',
      groups: [
        { name: 'GB Group — Silk', photos: CATALOGO_EXTRA.gbgroupSilk },
        { name: 'GB Group — Extreme', photos: CATALOGO_EXTRA.gbgroupExtreme },
        { name: 'GB Group — Moon', photos: CATALOGO_EXTRA.gbgroupMoon },
        { name: 'GB Group — Onda', photos: CATALOGO_EXTRA.gbgroupOnda },
        { name: 'GB Group — Compact', photos: CATALOGO_EXTRA.gbgroupCompact },
        { name: 'GB Group — Underground', photos: CATALOGO_EXTRA.gbgroupUnderground },
      ],
    },
    {
      id: 'rubinetterie',
      label: 'Rubinetterie',
      sub: 'Frisone Rubinetterie',
      photos: CATALOGO_DATA.rubinetterie,
    },
    {
      id: 'sanitari',
      label: 'Sanitari',
      sub: 'Lavabi d’arredo, WC, bidet e piatti doccia',
      groups: [
        { name: 'Lavabi d’Arredo', photos: sanitariLavabiArredo },
        { name: 'WC e Bidet', photos: sanitariWcBidet },
      ],
    },
    {
      id: 'box-doccia-vasche',
      label: 'Box Doccia & Vasche',
      sub: 'Box doccia, piatti doccia e vasche',
      groups: [
        ...CATALOGO_DATA.boxDoccia.map((c) => ({ name: c.name, photos: c.photos })),
        { name: 'Piatti Doccia', photos: piattiDoccia },
      ],
    },
  ]

  const countOf = (s: Section) => (s.groups ? s.groups.reduce((n, g) => n + g.photos.length, 0) : (s.photos?.length ?? 0))
  const totalPhotos = sections.reduce((n, s) => n + countOf(s), 0)

  return (
    <>
      <Navbar />
      <main id="main" style={{ background: '#10130F', paddingTop: '8rem', paddingBottom: '6rem' }}>
        <div className="w-full" style={{ paddingLeft: 'clamp(16px, 3vw, 60px)', paddingRight: 'clamp(16px, 3vw, 60px)' }}>

          {/* Header */}
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10" style={{ background: 'var(--teal)' }} />
              <span className="section-label">Catalogo</span>
              <div className="h-px w-10" style={{ background: 'var(--teal)' }} />
            </div>
            <h1 className="font-display text-white" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', lineHeight: 1.1 }}>
              Il Nostro <span style={{ color: 'var(--teal)' }}>Catalogo</span>
            </h1>
            <p className="text-sm mt-4" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '38rem', marginLeft: 'auto', marginRight: 'auto' }}>
              {totalPhotos} foto organizzate per categoria. Clicca una foto per ingrandirla e richiedere
              maggiori informazioni sul prodotto direttamente al nostro showroom.
            </p>
            <Link
              href="/#prodotti"
              className="btn-outline inline-flex"
              style={{ marginTop: '1.75rem' }}
            >
              ← Torna ai Prodotti
            </Link>
          </div>

          {/* Quick nav */}
          <nav
            className="flex flex-wrap justify-center gap-2"
            style={{ marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(111,168,144,0.12)' }}
          >
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="relative inline-flex items-center text-[13px] tracking-wider uppercase"
                style={{
                  padding: '14px 26px',
                  borderRadius: 999,
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  backdropFilter: 'blur(14px) saturate(1.5)',
                  WebkitBackdropFilter: 'blur(14px) saturate(1.5)',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.16)',
                  boxShadow: [
                    'inset 1px 1px 0 rgba(255,255,255,0.18)',
                    'inset -1px -1px 0 rgba(255,255,255,0.05)',
                    '0 4px 16px rgba(0,0,0,0.18)',
                  ].join(','),
                  transition: 'background 0.25s, border-color 0.25s',
                }}
              >
                {s.label} <span style={{ color: 'var(--teal)', marginLeft: 4 }}>· {countOf(s)}</span>
              </a>
            ))}
          </nav>

          <FullCatalogGallery sections={sections} />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
