import Hero from '../components/sections/Hero.jsx'
import Categories from '../components/sections/Categories.jsx'
import Annonces from '../components/sections/Annonces.jsx'
import Publier from '../components/sections/Publier.jsx'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Categories />
      <Annonces />
      <Publier />
    </main>
  )
}
