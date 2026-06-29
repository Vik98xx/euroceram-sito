import Navbar from '../components/Navbar'
import HeroScroll from '../components/HeroScroll'
import SmoothScrollHero from '../components/ui/smooth-scroll-hero'
import ChiSiamo from '../components/ChiSiamo'
import PuntiForza from '../components/PuntiForza'
import Prodotti from '../components/Prodotti'
import Brand from '../components/Brand'
import GalleriaIspirazione from '../components/GalleriaIspirazione'
import Recensioni from '../components/Recensioni'
import Preventivo from '../components/Preventivo'
import Contatti from '../components/Contatti'
import Footer from '../components/Footer'
import ScrollProgress from '../components/ScrollProgress'
import WhatsAppButton from '../components/WhatsAppButton'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <HeroScroll />
        <ChiSiamo />
        <PuntiForza />
        <Prodotti />
        <div className="hidden md:block">
          <SmoothScrollHero
            scrollHeight={1500}
            desktopImage="/images/img-terrazza-piscina.jpg"
            mobileImage="/images/img-outdoor-piscina.jpg"
            initialClipPercentage={25}
            finalClipPercentage={75}
          />
        </div>
        <Brand />
        <GalleriaIspirazione />
        <Recensioni />
        <Preventivo />
        <Contatti />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
