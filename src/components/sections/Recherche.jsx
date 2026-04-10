import { useState } from 'react'
import AnnonceGrid from '../annonces/AnnonceGrid.jsx'
import Filtres from '../annonces/Filtres.jsx'
import { useAnnonces } from '../../hooks/useAnnonces.js'
import { useFilters } from '../../hooks/useFilters.js'

export default function Recherche() {
  const { annonces } = useAnnonces()
  const { query, category, categories, filteredAnnonces, setCategory, setQuery } = useFilters(annonces)
  const [selectedAnnonce, setSelectedAnnonce] = useState(null)

  const handleAnnonceClick = (annonce) => {
    setSelectedAnnonce(annonce)
    document.getElementById('recherche-detail')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="recherche" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-3xl border border-border bg-card p-8 shadow-sm">
          <h2 className="text-3xl font-semibold text-foreground">Recherche d'annonces</h2>
          <p className="mt-2 text-sm text-muted-foreground">Affiner la recherche par mot-clé et catégorie.</p>
        </div>

        <Filtres
          query={query}
          category={category}
          categories={categories}
          onQueryChange={setQuery}
          onCategoryChange={setCategory}
        />

        <div className="mt-12 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xl font-semibold text-foreground">Resultater</h3>
            <span className="text-sm text-muted-foreground">{filteredAnnonces.length} annonces</span>
          </div>
          <AnnonceGrid annonces={filteredAnnonces} onAnnonceClick={handleAnnonceClick} />
        </div>

        {selectedAnnonce && (
          <div id="recherche-detail" className="mt-16 rounded-3xl border border-border bg-card p-8 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {selectedAnnonce.category}
                </span>
                <h3 className="mt-4 text-3xl font-semibold text-foreground">{selectedAnnonce.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {selectedAnnonce.location} · Publiée il y a {selectedAnnonce.age}
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-background p-6 text-right">
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Prix</p>
                <p className="mt-3 text-3xl font-semibold text-foreground">{selectedAnnonce.price}</p>
                <button className="mt-4 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90">
                  Contacter le vendeur
                </button>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-foreground">Description</h4>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{selectedAnnonce.descriptionLong}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
