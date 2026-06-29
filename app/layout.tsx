import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import './globals.css'
import { CustomCursor } from '../components/ui/custom-cursor'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Euroceram 2002 S.R.L. | Ceramiche, Arredo Bagno & Pavimenti — Arzano (NA)',
  description:
    'Dal 1956 leader nel settore ceramiche, arredo bagno, sanitari e pavimenti. Showroom ad Arzano (Napoli) con migliaia di prodotti dei migliori brand. Ufficio progettazione interno con rendering 3D. Spedizione in tutta Italia.',
  keywords:
    'piastrelle, ceramiche, arredo bagno, sanitari, pavimenti, rubinetteria, box doccia, vasche, Arzano, Napoli, gres porcellanato, FAP, Emil Ceramica, Provenza, Ergon',
  openGraph: {
    title: 'Euroceram 2002 S.R.L.',
    description: 'Ceramiche, Arredo Bagno & Pavimenti — Arzano (NA)',
    type: 'website',
    locale: 'it_IT',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <a href="#main" className="skip-link">Vai al contenuto principale</a>
        {/* Console di debug su schermo (eruda) — TEMPORANEA. Script grezzo: parte
            indipendentemente da React, così si vede anche se l'app JS non si avvia.
            Attiva solo con ?debug nell'URL. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(location.search.indexOf('debug')>-1){var s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/eruda';s.onload=function(){try{window.eruda&&window.eruda.init();}catch(e){alert('eruda init error: '+e);}};s.onerror=function(){alert('Impossibile caricare eruda: nessuna connessione internet sul telefono?');};document.body.appendChild(s);}}catch(e){alert('debug error: '+e);}})();",
          }}
        />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
