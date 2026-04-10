import { Input } from '../ui/Input.jsx'

export default function SearchResultsSidebar({
  query,
  category,
  location,
  dateRange,
  categories,
  locations,
  dateFilters,
  onQueryChange,
  onCategoryChange,
  onLocationChange,
  onDateRangeChange,
  onReset,
}) {
  return (
    <aside className="rounded-[1.75rem] border border-border bg-card p-5 shadow-sm lg:sticky lg:top-24">
      <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground">Filtre</p>
          <h2 className="mt-1 text-lg font-semibold text-foreground">Avgrens søket</h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary transition hover:text-primary/80"
        >
          Nullstill
        </button>
      </div>

      <div className="mt-5 space-y-6">
        <div>
          <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Søk</label>
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Kamera, leilighet, design..."
            className="h-10 rounded-xl bg-muted/50 px-3"
          />
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Kategori</h3>
          <div className="mt-3 space-y-1.5">
            {categories.map((option) => {
              const isActive = option === category

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onCategoryChange(option)}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition hover:bg-muted/70"
                >
                  <span className="flex items-center gap-3">
                    <span className={isActive ? 'h-3.5 w-3.5 rounded-sm bg-primary shadow-sm' : 'h-3.5 w-3.5 rounded-sm border border-border bg-background'} />
                    <span className={isActive ? 'font-semibold text-foreground' : 'text-muted-foreground'}>{option}</span>
                  </span>
                  {isActive && <span className="text-xs font-semibold text-primary">Valgt</span>}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Sted</label>
          <select
            value={location}
            onChange={(event) => onLocationChange(event.target.value)}
            className="h-10 w-full rounded-xl border border-border bg-muted/50 px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
          >
            {locations.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Dato lagt ut</h3>
          <div className="mt-3 space-y-2">
            {dateFilters.map((option) => {
              const isActive = option.value === dateRange

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onDateRangeChange(option.value)}
                  className={[
                    'flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm transition',
                    isActive
                      ? 'border-primary bg-primary/8 text-foreground'
                      : 'border-border bg-background text-muted-foreground hover:border-primary/30 hover:bg-muted/60',
                  ].join(' ')}
                >
                  <span>{option.label}</span>
                  <span className={isActive ? 'h-2.5 w-2.5 rounded-full bg-primary' : 'h-2.5 w-2.5 rounded-full bg-border'} />
                </button>
              )
            })}
          </div>
        </div>

        <div className="rounded-[1.25rem] bg-muted/55 p-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Visning</p>
          <p className="mt-2 text-sm leading-6 text-foreground">
            Redaksjonell liste med tydelige kort og rask navigasjon mellom sider.
          </p>
        </div>
      </div>
    </aside>
  )
}
