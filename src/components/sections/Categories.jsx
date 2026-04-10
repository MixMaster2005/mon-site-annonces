import {
  HomeIcon,
  BriefcaseIcon,
  TruckIcon,
  HomeModernIcon,
  DevicePhoneMobileIcon,
  WrenchScrewdriverIcon,
  TrophyIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

const categories = [
  { name: 'Eiendom', icon: <HomeIcon className="h-8 w-8" />, count: 45 },
  { name: 'Jobber', icon: <BriefcaseIcon className="h-8 w-8" />, count: 23 },
  { name: 'Kjøretøy', icon: <TruckIcon className="h-8 w-8" />, count: 67 },
  { name: 'Hjem & Hage', icon: <HomeModernIcon className="h-8 w-8" />, count: 34 },
  { name: 'Elektronikk', icon: <DevicePhoneMobileIcon className="h-8 w-8" />, count: 89 },
  { name: 'Tjenester', icon: <WrenchScrewdriverIcon className="h-8 w-8" />, count: 12 },
  { name: 'Sport & Fritid', icon: <TrophyIcon className="h-8 w-8" />, count: 28 },
  { name: 'Dyr', icon: <HeartIcon className="h-8 w-8" />, count: 15 },
]

export default function Categories() {
  return (
    <section id="categories" className="min-h-screen py-24 flex flex-col justify-center bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-foreground">Utforsk kategorier</h2>
          <p className="mt-2 text-sm text-muted-foreground">Finn det du leter etter i våre populære kategorier</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md cursor-pointer"
            >
              <div className="text-center">
                <div className="text-4xl mb-4 flex justify-center text-white bg-primary rounded-full w-16 h-16 mx-auto items-center">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">{category.count} annonser</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}