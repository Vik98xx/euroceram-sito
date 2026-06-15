import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
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
    <html lang="it" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  )
}
