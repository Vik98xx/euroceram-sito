import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import SmoothScrollHero from '../components/ui/smooth-scroll-hero'
import ChiSiamo from '../components/ChiSiamo'
import PuntiForza from '../components/PuntiForza'
import Prodotti from '../components/Prodotti'
import Brand from '../components/Brand'
import GalleriaIspirazione from '../components/GalleriaIspirazione'
import OfferteOutlet from '../components/OfferteOutlet'
import Recensioni from '../components/Recensioni'
import Preventivo from '../components/Preventivo'
import Contatti from '../components/Contatti'
import Footer from '../components/Footer'
import Preloader from '../components/Preloader'
import ScrollProgress from '../components/ScrollProgress'
import WhatsAppButton from '../components/WhatsAppButton'

export default function Home() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <SmoothScrollHero
          scrollHeight={1500}
          desktopImage="https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=2532&auto=format&fit=crop"
          mobileImage="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop"
          initialClipPercentage={25}
          finalClipPercentage={75}
        />
        <ChiSiamo />
        <PuntiForza />
        <Prodotti />
        <Brand />
        <GalleriaIspirazione />
        <OfferteOutlet />
        <Recensioni />
        <Preventivo />
        <Contatti />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
