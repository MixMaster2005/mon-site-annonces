import { useNavigate } from 'react-router-dom'

export default function AnnonceCard({ annonce, onClick, variant = 'default' }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) {
      onClick(annonce)
      return
    }

    navigate(`/annonser/${annonce.id}`)
  }

  if (variant === 'search-featured') {
    return (
      <article
        onClick={handleClick}
        className="group cursor-pointer overflow-hidden rounded-[1.6rem] border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <div className="grid min-h-[420px] lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[260px] overflow-hidden bg-muted">
            <img
              src={annonce.image}
              alt={annonce.title}
              loading="lazy"
              onError={(event) => {
                event.currentTarget.onerror = null
                event.currentTarget.src = 'https://via.placeholder.com/860x620?text=No+image'
              }}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute left-4 top-4">
              <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-secondary-foreground">
                Fremhevet
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between p-6 lg:p-7">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <span>{annonce.category}</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span>{annonce.location}</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold leading-tight text-foreground lg:text-[1.9rem]">
                {annonce.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {annonce.descriptionLong}
              </p>
            </div>

            <div className="mt-8 border-t border-border pt-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Pris</p>
                  <p className="mt-2 text-4xl font-semibold text-primary">{annonce.price}</p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>{annonce.seller}</p>
                  <p>{annonce.age}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    )
  }

  if (variant === 'search-compact') {
    return (
      <article
        onClick={handleClick}
        className="group cursor-pointer overflow-hidden rounded-[1.4rem] border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <div className="relative h-52 overflow-hidden bg-muted">
          <img
            src={annonce.image}
            alt={annonce.title}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null
              event.currentTarget.src = 'https://via.placeholder.com/640x420?text=No+image'
            }}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-950/75 via-neutral-950/20 to-transparent px-4 py-4">
            <div className="flex items-end justify-between gap-3">
              <div className="text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">{annonce.category}</p>
                <p className="mt-1 text-sm font-medium">{annonce.location}</p>
              </div>
              <p className="rounded-full bg-white/12 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm">{annonce.price}</p>
            </div>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-semibold leading-snug text-foreground">{annonce.title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{annonce.description}</p>

          <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
            <span>{annonce.seller}</span>
            <span>{annonce.age}</span>
          </div>
        </div>
      </article>
    )
  }

  if (variant === 'latest') {
    return (
      <article
        onClick={handleClick}
        className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md"
      >
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <img
            src={annonce.image || 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop'}
            alt={annonce.title}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null
              event.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+image'
            }}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {annonce.location && (
            <div className="absolute bottom-3 left-3 rounded-md bg-neutral-900/70 px-2 py-0.5">
              <p className="text-[11px] text-white">{annonce.location}</p>
            </div>
          )}
          <div className="absolute bottom-3 right-3 rounded-md bg-neutral-900/80 px-3 py-1">
            <p className="text-sm font-semibold text-primary">{annonce.price}</p>
          </div>
        </div>

        <div className="flex flex-grow flex-col p-4">
          <p className="text-xs text-muted-foreground">{annonce.location}</p>
          <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
            {annonce.title}
          </h3>
          <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-3">
            <span className="inline-flex rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">
              {annonce.category}
            </span>
            <p className="text-xs text-muted-foreground">{annonce.age}</p>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article
      onClick={handleClick}
      className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
    >
      <div className="relative h-52 overflow-hidden bg-muted">
        <img
          src={annonce.image}
          alt={annonce.title}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null
            event.currentTarget.src = 'https://via.placeholder.com/640x420?text=No+image'
          }}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-neutral-950/80 to-transparent px-5 py-4 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">{annonce.location}</p>
            <p className="mt-1 text-sm font-medium">{annonce.district}</p>
          </div>
          <p className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold backdrop-blur-sm">{annonce.price}</p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {annonce.category}
          </span>
          <span className="inline-flex rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground">
            {annonce.age}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-semibold text-foreground">{annonce.title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{annonce.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {annonce.tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Selger</p>
            <p className="mt-1 text-sm font-medium text-foreground">{annonce.seller}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Tilstand</p>
            <p className="mt-1 text-sm font-medium text-foreground">{annonce.condition}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClick}
          className="mt-6 inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          Se annonse
        </button>
      </div>
    </article>
  )
}
