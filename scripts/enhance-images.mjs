import sharp from 'sharp'
import { readdir } from 'fs/promises'
import { join } from 'path'

const SRC = './public/images'
const SKIP = new Set(['terrazza.jpg','hero-chevron.jpg','hero-gold.jpg','hero-marble.jpg','hero-outdoor.jpg'])

const JOBS = [
  {
    src: '480940859_1051446280123832_1182222033029248433_n.jpg',
    dest: 'img-pavimenti-store.jpg',
    // Store con pavimento gres beige
  },
  {
    src: '481273996_1054900023111791_5691173304334709560_n.jpg',
    dest: 'img-ergon-wood-bath.jpg',
    // Ergon I-Wood bagno: croppiamo i ~130px in alto (watermark archiproducts)
    crop: { top: 130 },
  },
  {
    src: '499547788_1116444673623992_1544528292212051610_n.jpg',
    dest: 'img-bagno-minimal.jpg',
    // Bagno minimal caldo con vasca freestanding
  },
  {
    src: '500061799_1116444740290652_2424675201130429685_n.jpg',
    dest: 'img-vaso-texture.jpg',
    // Vaso su parete effetto legno scanalato
  },
  {
    src: '500073677_1116444776957315_5897780077308250800_n.jpg',
    dest: 'img-texture-floreale.jpg',
    // Ceramica texture rilievo floreale beige
  },
  {
    src: '500248167_1116444686957324_2709851312217315827_n.jpg',
    dest: 'img-bagno-caldo.jpg',
    // Bagno terracotta con specchio artwork e lavabo scanalato
  },
  {
    src: '500597628_1116444793623980_3703136219503028728_n.jpg',
    dest: 'img-bagno-moderno.jpg',
    // Bagno moderno con vasca grigio-rosa e parquet
  },
  {
    src: '555439933_1212547844013674_3333815446365221631_n.jpg',
    dest: 'img-golden-ambra.jpg',
    // Golden Ambra marmo lastra con vasca bianca
  },
  {
    src: '684681682_1380188787249578_6171060275563032879_n.jpg',
    dest: 'img-cool-elegance.jpg',
    // Cool Elegance moodboard Euroceram
  },
]

for (const job of JOBS) {
  const srcPath  = join(SRC, job.src)
  const destPath = join(SRC, job.dest)

  try {
    const meta = await sharp(srcPath).metadata()
    let pipeline = sharp(srcPath)

    // Crop opzionale (rimozione watermark in alto)
    if (job.crop?.top) {
      const top  = job.crop.top
      const left = 0
      const width  = meta.width
      const height = meta.height - top
      pipeline = pipeline.extract({ left, top, width, height })
    }

    await pipeline
      // Resize a max 1800px mantenendo aspect ratio
      .resize({ width: 1800, height: 1800, fit: 'inside', withoutEnlargement: true })
      // Unsharp mask: sigma 1.0 (radius ~3px), flat 0.5, jagged 0.6
      .sharpen({ sigma: 1.0, m1: 0.5, m2: 0.6 })
      // Micro-boost luminosità +2%, saturazione +10%, contrasto via linear
      .modulate({ brightness: 1.02, saturation: 1.10 })
      // Curve contrasto leggera (schiaccia neri, alza bianchi)
      .linear(1.05, -(0.05 * 255 / 2))
      // JPEG 91% qualità, 4:4:4 chroma, progressive, mozjpeg
      .jpeg({ quality: 91, chromaSubsampling: '4:4:4', progressive: true, mozjpeg: true })
      .toFile(destPath)

    const metaOut = await sharp(destPath).metadata()
    console.log(`✓  ${job.dest.padEnd(30)} ${metaOut.width}x${metaOut.height}`)
  } catch (e) {
    console.error(`✗  ${job.dest}: ${e.message}`)
  }
}

console.log('\nDone.')
