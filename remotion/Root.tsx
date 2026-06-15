import { Composition, registerRoot } from 'remotion'
import { PromoVideo } from './compositions/PromoVideo'
import { TerrazaViva } from './compositions/TerrazaViva'

const FPS = 30
const SLIDE_DURATION = 90
const OUTRO_DURATION = 90
const TOTAL_FRAMES = 4 * SLIDE_DURATION + OUTRO_DURATION  // 15s

// TerrazaViva: 20s loop senza cuciture @ 30fps
const TERRAZA_FRAMES = 600

function RemotionRoot() {
  return (
    <>
      {/* ── Video promo 15s 16:9 ── */}
      <Composition
        id="PromoVideo"
        component={PromoVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/* ── Video promo 12s verticale 9:16 per Reels ── */}
      <Composition
        id="PromoVideoShort"
        component={PromoVideo}
        durationInFrames={4 * SLIDE_DURATION}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      {/* ── Living Photo: terrazza con micro-movimenti, 20s loop ── */}
      <Composition
        id="TerrazaViva"
        component={TerrazaViva}
        durationInFrames={TERRAZA_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  )
}

registerRoot(RemotionRoot)
