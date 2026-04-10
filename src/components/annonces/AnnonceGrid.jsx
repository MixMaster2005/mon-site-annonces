import { useRef } from 'react'
import AnnonceCard from './AnnonceCard.jsx'

export default function AnnonceGrid({ annonces, onAnnonceClick, variant = 'default' }) {
  const containerRef = useRef(null)

  if (!annonces.length) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-center text-muted-foreground">
        Ingen annonser funnet.
      </div>
    )
  }

  if (variant === 'horizontal') {

    const scroll = (dir = 1) => {
      const el = containerRef.current
      if (!el) return
      const amount = el.clientWidth * 0.7
      el.scrollBy({ left: dir * amount, behavior: 'smooth' })
    }

    return (
      <div className="relative">
        {/* Prev/Next buttons for small screens */}
        <button
          onClick={() => scroll(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/70 p-2 shadow-md md:hidden"
          aria-label="Forrige"
        >
          ‹
        </button>
        <button
          onClick={() => scroll(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/70 p-2 shadow-md md:hidden"
          aria-label="Neste"
        >
          ›
        </button>

        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory px-2 md:px-0"
        >
          {annonces.map((annonce) => (
            <div
              key={annonce.id}
              className="flex-shrink-0 w-[90%] sm:w-64 md:w-56 lg:w-56 snap-start"
            >
              <AnnonceCard
                annonce={annonce}
                onClick={onAnnonceClick}
                variant="latest"
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'search') {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {annonces.map((annonce, index) => (
          <div
            key={annonce.id}
            className={index === 0 ? 'md:col-span-2 xl:col-span-2' : ''}
          >
            <AnnonceCard
              annonce={annonce}
              onClick={onAnnonceClick}
              variant={index === 0 ? 'search-featured' : 'search-compact'}
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {annonces.map((annonce) => (
        <AnnonceCard key={annonce.id} annonce={annonce} onClick={onAnnonceClick} />
      ))}
    </div>
  )
}
