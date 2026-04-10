import AnnonceGrid from '../annonces/AnnonceGrid.jsx'
import { useAnnonces } from '../../hooks/useAnnonces.js'

export default function Annonces() {
  const { annonces } = useAnnonces()

  return (
    <section id="annonces" className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-foreground">Siste annonser</h2>
          <p className="mt-2 text-sm text-muted-foreground">Utforsk de nyeste annonsene</p>
        </div>
        <AnnonceGrid annonces={annonces} variant="horizontal" />
      </div>
    </section>
  )
}