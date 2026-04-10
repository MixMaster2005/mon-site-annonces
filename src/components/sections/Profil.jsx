import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth.js'
import AnnonceGrid from '../annonces/AnnonceGrid.jsx'
import { useAnnonces } from '../../hooks/useAnnonces.js'

export default function Profil() {
  const { user } = useAuth()
  const { annonces } = useAnnonces()
  const mesAnnonces = annonces.slice(0, 3)
  const [selectedAnnonce, setSelectedAnnonce] = useState(null)

  const handleAnnonceClick = (annonce) => {
    setSelectedAnnonce(annonce)
    // Scroll vers la section détail
    document.getElementById('profil-detail')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="profil" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-3xl border border-border bg-card p-8 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Mon profil</p>
              <h2 className="mt-3 text-3xl font-semibold text-foreground">Bonjour, {user.name}</h2>
            </div>
            <div className="rounded-3xl border border-border bg-background p-5 text-sm text-foreground">
              <p className="font-semibold">Email</p>
              <p className="mt-2 text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xl font-semibold text-foreground">Mes annonces</h3>
            <p className="text-sm text-muted-foreground">Dernières publications</p>
          </div>
          <AnnonceGrid annonces={mesAnnonces} onAnnonceClick={handleAnnonceClick} />
        </div>

        {selectedAnnonce && (
          <div id="profil-detail" className="mt-16 rounded-3xl border border-border bg-card p-8 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {selectedAnnonce.category}
                </span>
                <h3 className="mt-4 text-3xl font-semibold text-foreground">{selectedAnnonce.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{selectedAnnonce.location} · Publiée il y a {selectedAnnonce.age}</p>
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