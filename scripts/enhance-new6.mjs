import sharp from 'sharp'

const SRC = './public/images'

const JOBS = [
  {
    src: '468279289_10160406685347617_4611950258959794398_n.jpg',
    dest: 'img-progetto-corten.jpg',
    // Render 3D bagno con parete corten/rame e sanitari sospesi - progetto Euroceram
  },
  {
    src: '468297676_10160401291737617_9121462982176573803_n.jpg',
    dest: 'img-tagina-luxury.jpg',
    // Showroom luxury con logo Euroceram + Tagina, pavimento nero lucido
    // crop logo Tagina in basso a sinistra (ultimi 120px altezza)
    crop: { bottom: 120 },
  },
  {
    src: '468299238_10160384934497617_4911816563642071461_n.jpg',
    dest: 'img-cucina-corten.jpg',
    // Cucina moderna isola nera corten + pavimento grigio chiaro
  },
  {
    src: '468524168_10160492457937617_8172107219064907172_n.jpg',
    dest: 'img-living-lusso.jpg',
    // Living luxury marmo travertino lucido + poltrone beige
  },
  {
    src: '468831299_10160571778757617_3678310360061516645_n.jpg',
    dest: 'img-bagno-completo.jpg',
    // Bagno completo effetto legno + sanitari classici + vista città notturna
  },
  {
    src: '471494160_10160637726877617_1834585950511312489_n.jpg',
    dest: 'img-bagno-industrial.jpg',
    // Bagno industrial/loft gres scuro + doccia walk-in + doppio lavabo su trespolo
  },
]

for (const job of JOBS) {
  const srcPath  = `${SRC}/${job.src}`
  const destPath = `${SRC}/${job.dest}`

  try {
    const meta = await sharp(srcPath).metadata()
    let pipeline = sharp(srcPath)

    if (job.crop?.bottom) {
      pipeline = pipeline.extract({
        left: 0, top: 0,
        width: meta.width,
        height: meta.height - job.crop.bottom,
      })
    }

    await pipeline
      .resize({ width: 1800, height: 1800, fit: 'inside', withoutEnlargement: true })
      .sharpen({ sigma: 1.1, m1: 0.5, m2: 0.7 })
      .modulate({ brightness: 1.02, saturation: 1.10 })
      .linear(1.05, -(0.05 * 255 / 2))
      .jpeg({ quality: 91, chromaSubsampling: '4:4:4', progressive: true, mozjpeg: true })
      .toFile(destPath)

    const out = await sharp(destPath).metadata()
    console.log(`✓  ${job.dest.padEnd(32)} ${out.width}x${out.height}`)
  } catch(e) {
    console.error(`✗  ${job.dest}: ${e.message}`)
  }
}
console.log('\nDone.')
