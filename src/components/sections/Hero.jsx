import { SparklesIcon } from '@heroicons/react/24/outline'
import placeholder from '@/assets/images/hero/placeholder.jpg'

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[calc(100vh-73px)] flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/5 to-tertiary/10">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:gap-8 items-center lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Finn din neste <span className="text-primary">mulighet</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-xl">
              Oppdag de beste lokale annonsene for jobb, eiendom, kjøretøy og mye mer.
              Kjøp, selg og bytt enkelt.
            </p>
            <div className="mt-10 flex items-center gap-x-6 flex-wrap">
              <a
                href="#annonces"
                className="rounded-full bg-tertiary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition"
              >
                Se annonser
              </a>
              <a
                href="#publier"
                className="rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition"
              >
                Opprett annonse
              </a>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative w-full h-96 rounded-3xl bg-gradient-to-br from-primary/10 to-tertiary/10 border border-border overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <img src={placeholder} alt="Placeholder" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}