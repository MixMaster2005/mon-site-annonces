import { Input } from '../ui/Input.jsx'

const fallbackCategories = ['Alle kategorier', 'Eiendom', 'Jobber', 'Kjøretøy', 'Hjem & Hage', 'Elektronikk', 'Tjenester']

export default function Filtres({
  query,
  category,
  categories = fallbackCategories,
  onQueryChange,
  onCategoryChange,
}) {
  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground">Filtrer annonser</h2>
      <p className="mt-1 text-sm text-muted-foreground">Avgrens søket med nøkkelord og kategorier.</p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Søk</label>
          <Input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Hus, bil, jobb..." />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Kategori</label>
          <select
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
          >
            {categories.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </section>
  )
}
