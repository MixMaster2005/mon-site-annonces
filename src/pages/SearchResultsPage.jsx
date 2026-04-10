import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import AnnonceGrid from '../components/annonces/AnnonceGrid.jsx'
import SearchResultsSidebar from '../components/annonces/SearchResultsSidebar.jsx'
import { useAnnonces } from '../hooks/useAnnonces.js'
import { DATE_FILTERS, FILTER_CONSTANTS, filterAnnonces, getFilterOptions } from '../hooks/useFilters.js'

const ITEMS_PER_PAGE = 6

function getValidOption(value, options, fallback) {
  return value && options.includes(value) ? value : fallback
}

export default function SearchResultsPage() {
  const { annonces } = useAnnonces()
  const [searchParams, setSearchParams] = useSearchParams()

  const { categories, locations, dateFilters } = useMemo(() => getFilterOptions(annonces), [annonces])

  const query = searchParams.get('query') ?? ''
  const category = getValidOption(
    searchParams.get('category') ?? FILTER_CONSTANTS.allCategories,
    categories,
    FILTER_CONSTANTS.allCategories,
  )
  const location = getValidOption(
    searchParams.get('location') ?? FILTER_CONSTANTS.allLocations,
    locations,
    FILTER_CONSTANTS.allLocations,
  )
  const dateRange = getValidOption(
    searchParams.get('date') ?? FILTER_CONSTANTS.allDates,
    DATE_FILTERS.map((option) => option.value),
    FILTER_CONSTANTS.allDates,
  )

  const rawPage = Number(searchParams.get('page') ?? 1)
  const currentPage = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1

  const filteredAnnonces = useMemo(() => {
    return filterAnnonces(annonces, { query, category, location, dateRange })
  }, [annonces, category, dateRange, location, query])

  const totalPages = Math.max(1, Math.ceil(filteredAnnonces.length / ITEMS_PER_PAGE))
  const safeCurrentPage = Math.min(currentPage, totalPages)

  const paginatedAnnonces = useMemo(() => {
    const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE
    return filteredAnnonces.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredAnnonces, safeCurrentPage])

  const paginationItems = useMemo(() => {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }, [totalPages])

  const updateSearchParams = (updates = {}, options = {}) => {
    const params = new URLSearchParams(searchParams)

    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '' || value === FILTER_CONSTANTS.allCategories || value === FILTER_CONSTANTS.allLocations || value === FILTER_CONSTANTS.allDates) {
        params.delete(key)
      } else {
        params.set(key, String(value))
      }
    })

    if (options.resetPage) {
      params.delete('page')
    }

    const nextQueryString = params.toString()
    const currentQueryString = searchParams.toString()

    if (nextQueryString !== currentQueryString) {
      setSearchParams(params, { replace: true })
    }
  }

  const resultSummary =
    filteredAnnonces.length > 0
      ? `${(safeCurrentPage - 1) * ITEMS_PER_PAGE + 1}-${Math.min(safeCurrentPage * ITEMS_PER_PAGE, filteredAnnonces.length)} av ${filteredAnnonces.length} annonser`
      : '0 annonser'

  return (
    <main className="min-h-[calc(100vh-8rem)] bg-background pb-16 pt-6">
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-[1.75rem] border border-border bg-card px-5 py-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Hjem / Utforsk / Søk</p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-semibold text-foreground">Viser {filteredAnnonces.length} resultater</h1>
                <span className="text-sm text-muted-foreground">Kuraterte oppføringer for deg</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-muted-foreground">Sorter etter</span>
              <button type="button" className="font-semibold text-foreground transition hover:text-primary">
                Nyeste først
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <SearchResultsSidebar
            query={query}
            category={category}
            location={location}
            dateRange={dateRange}
            categories={categories}
            locations={locations}
            dateFilters={dateFilters}
            onQueryChange={(value) => updateSearchParams({ query: value }, { resetPage: true })}
            onCategoryChange={(value) => updateSearchParams({ category: value }, { resetPage: true })}
            onLocationChange={(value) => updateSearchParams({ location: value }, { resetPage: true })}
            onDateRangeChange={(value) => updateSearchParams({ date: value }, { resetPage: true })}
            onReset={() => {
              if (searchParams.toString()) {
                setSearchParams({}, { replace: true })
              }
            }}
          />

          <div className="space-y-5">
            <div className="rounded-[1.75rem] border border-border bg-card p-5 shadow-sm">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Resultater</p>
                  <h2 className="mt-1 text-xl font-semibold text-foreground">Utvalgte annonser</h2>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {category !== FILTER_CONSTANTS.allCategories && (
                    <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">{category}</span>
                  )}
                  {location !== FILTER_CONSTANTS.allLocations && (
                    <span className="rounded-full bg-background px-3 py-1 font-semibold text-foreground ring-1 ring-border">{location}</span>
                  )}
                  {dateRange !== FILTER_CONSTANTS.allDates && (
                    <span className="rounded-full bg-muted px-3 py-1 font-semibold text-muted-foreground">{dateRange}</span>
                  )}
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4 text-sm sm:flex-row sm:items-center sm:justify-between">
                <p className="text-muted-foreground">{resultSummary}</p>
                <p className="text-muted-foreground">Samlet oversikt over de nyeste relevante annonsene.</p>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-border bg-card p-4 shadow-sm sm:p-5">
              <AnnonceGrid annonces={paginatedAnnonces} variant="search" />
            </div>

            <div className="flex flex-col gap-4 rounded-[1.75rem] border border-border bg-card px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">{resultSummary}</p>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateSearchParams({ page: Math.max(1, safeCurrentPage - 1) })}
                  disabled={safeCurrentPage === 1}
                  className="inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-border bg-background px-3 text-sm text-foreground transition hover:border-primary/40 hover:text-primary disabled:pointer-events-none disabled:opacity-40"
                >
                  ‹
                </button>
                {paginationItems.map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => updateSearchParams({ page })}
                    className={[
                      'inline-flex h-9 min-w-9 items-center justify-center rounded-full border px-3 text-sm font-semibold transition',
                      safeCurrentPage === page
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-background text-foreground hover:border-primary/40 hover:text-primary',
                    ].join(' ')}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => updateSearchParams({ page: Math.min(totalPages, safeCurrentPage + 1) })}
                  disabled={safeCurrentPage === totalPages}
                  className="inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-border bg-background px-3 text-sm text-foreground transition hover:border-primary/40 hover:text-primary disabled:pointer-events-none disabled:opacity-40"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
