'use client'

import { useState } from 'react'

const accordionItems = [
  {
    id: 1,
    title: 'Gres Effetto Marmo',
    cat: 'Pavimenti',
    imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1932&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Bagno di Design',
    cat: 'Arredo Bagno',
    imageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Living Contemporaneo',
    cat: 'Rivestimenti',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Outdoor & Terrazze',
    cat: 'Esterni',
    imageUrl: 'https://images.unsplash.com/photo-1615971677499-5467cbab01b0?q=80&w=1928&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Cucina Moderna',
    cat: 'Cucina',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070&auto=format&fit=crop',
  },
]

interface AccordionItemProps {
  item: typeof accordionItems[0]
  isActive: boolean
  onMouseEnter: () => void
}

function AccordionItem({ item, isActive, onMouseEnter }: AccordionItemProps) {
  return (
    <div
      className="relative overflow-hidden cursor-pointer flex-shrink-0"
      style={{
        height: 460,
        width: isActive ? 360 : 64,
        borderRadius: 16,
        transition: 'width 600ms cubic-bezier(0.4,0,0.2,1)',
        border: isActive ? '1px solid rgba(91,164,164,0.35)' : '1px solid rgba(91,164,164,0.1)',
      }}
      onMouseEnter={onMouseEnter}
    >
      {/* Immagine */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transition: 'transform 600ms ease',
          transform: isActive ? 'scale(1.04)' : 'scale(1)',
        }}
        onError={(e) => {
          const t = e.target as HTMLImageElement
          t.src = 'https://placehold.co/360x460/0F1C1C/5BA4A4?text=Euroceram'
        }}
      />

      {/* Overlay scuro */}
      <div
        className="absolute inset-0"
        style={{
          background: isActive
            ? 'linear-gradient(to top, rgba(6,14,14,0.85) 0%, rgba(6,14,14,0.2) 60%, transparent 100%)'
            : 'linear-gradient(to top, rgba(6,14,14,0.9) 0%, rgba(6,14,14,0.6) 100%)',
          transition: 'background 600ms ease',
        }}
      />

      {/* Glow teal sul bordo sinistro quando attivo */}
      {isActive && (
        <div
          className="absolute left-0 top-0 bottom-0 w-[2px]"
          style={{ background: 'linear-gradient(to bottom, transparent, #5BA4A4, transparent)' }}
        />
      )}

      {/* Testo verticale (inattivo) */}
      <span
        className="absolute text-white text-sm font-semibold whitespace-nowrap"
        style={{
          bottom: 80,
          left: '50%',
          transform: isActive ? 'translateX(-50%) rotate(0deg)' : 'translateX(-50%) rotate(90deg)',
          opacity: isActive ? 0 : 1,
          transition: 'all 400ms ease',
          letterSpacing: '0.08em',
        }}
      >
        {item.title}
      </span>

      {/* Testo orizzontale (attivo) */}
      <div
        className="absolute bottom-0 left-0 right-0 p-6"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'translateY(0)' : 'translateY(12px)',
          transition: 'all 400ms ease 150ms',
        }}
      >
        <div
          className="text-[10px] tracking-[0.35em] uppercase font-bold mb-1"
          style={{ color: 'var(--teal)' }}
        >
          {item.cat}
        </div>
        <div className="text-white text-lg font-semibold" style={{ fontFamily: 'var(--font-display, serif)' }}>
          {item.title}
        </div>
        <div
          className="mt-3 h-px"
          style={{ background: 'linear-gradient(to right, rgba(91,164,164,0.6), transparent)' }}
        />
      </div>
    </div>
  )
}

export function InteractiveImageAccordion() {
  const [activeIndex, setActiveIndex] = useState(2)

  return (
    <div className="flex flex-row items-center justify-center gap-2 overflow-x-auto pb-2">
      {accordionItems.map((item, index) => (
        <AccordionItem
          key={item.id}
          item={item}
          isActive={index === activeIndex}
          onMouseEnter={() => setActiveIndex(index)}
        />
      ))}
    </div>
  )
}
