import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import WhatsAppButton from '../../components/WhatsAppButton'
import { FullCatalogGallery } from '../../components/ui/full-catalog-gallery'
import { CATALOGO_DATA } from '../../lib/catalogo-data'

export const metadata: Metadata = {
  title: 'Catalogo Completo | Euroceram 2002 — Ambientazioni Emil Ceramica, FAP, Tipo Vietrese',
  description:
    'Tutte le ambientazioni ufficiali dei brand trattati da Euroceram 2002: Emil Ceramica (Crystal, Forme, I-Wood, Portland Stone, Unique Infinity), FAP Ceramiche e Tipo Vietrese.',
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export default function CatalogoPage() {
  const sections = [
    ...CATALOGO_DATA.emilCeramica.map((c) => ({
      id: slug('emil-' + c.name),
      label: c.name,
      sub: 'Emil Ceramica',
      photos: c.photos,
    })),
    { id: 'fap-ceramiche', label: 'FAP Ceramiche', sub: 'Lavorazione artigianale e ambientazioni', photos: CATALOGO_DATA.fapCeramiche },
    { id: 'tipo-vietrese', label: 'Tipo Vietrese', sub: 'Riggiola amalfitana e sorrentina', photos: CATALOGO_DATA.tipoVietrese },
    { id: 'rubinetterie', label: 'Rubinetterie', sub: 'Frisone Rubinetterie', photos: CATALOGO_DATA.rubinetterie },
    ...CATALOGO_DATA.boxDoccia.map((c) => ({
      id: slug('box-doccia-' + c.name),
      label: c.name,
      sub: 'Box Doccia',
      photos: c.photos,
    })),
    { id: 'piatto-doccia', label: 'Piatto Doccia', sub: 'Thermodesign', photos: CATALOGO_DATA.piattoDoccia },
  ]

  const totalPhotos = sections.reduce((n, s) => n + s.photos.length, 0)

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
              Tutte le Ambientazioni <span style={{ color: 'var(--teal)' }}>Ufficiali</span>
            </h1>
            <p className="text-sm mt-4" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '38rem', marginLeft: 'auto', marginRight: 'auto' }}>
              {totalPhotos} foto ufficiali dei brand trattati da Euroceram 2002 — Emil Ceramica, FAP Ceramiche, Tipo Vietrese,
              Frisone Rubinetterie, Weiss-Stern, Hafro e Thermodesign. Clicca una foto per ingrandirla.
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
                {s.label} <span style={{ color: 'var(--teal)', marginLeft: 4 }}>· {s.photos.length}</span>
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
