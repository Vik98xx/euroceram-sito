import Image from 'next/image'

export default function LogoSVG({
  className = '',
  height = 52,
}: {
  className?: string
  height?: number
  dark?: boolean
}) {
  const w = Math.round(height * 1.85)

  return (
    <Image
      src="/images/euroceram-logo-v2.png"
      alt="Euroceram 2002"
      height={height}
      width={w}
      className={className}
      style={{ objectFit: 'contain', width: w, height: height }}
      priority
    />
  )
}
