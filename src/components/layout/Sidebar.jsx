export default function Sidebar() {
  const categories = ['Immobilier', 'Emploi', 'Véhicules', 'Maison', 'Multimédia', 'Services']

  return (
    <aside className="hidden rounded-3xl border border-border bg-card p-6 shadow-sm lg:block">
      <h2 className="text-lg font-semibold text-foreground">Catégories</h2>
      <p className="mt-1 text-sm text-muted-foreground">Explore les annonces par thème.</p>
      <div className="mt-6 space-y-2">
        {categories.map((category) => (
          <span key={category} className="block rounded-2xl border border-border bg-muted px-4 py-2 text-sm text-foreground">
            {category}
          </span>
        ))}
      </div>
    </aside>
  )
}
