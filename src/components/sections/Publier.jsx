export default function Publier() {
  return (
    <section id="publier" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 md:px-16">
          {/* Gradient Blob - Top Right */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/20 rounded-full blur-3xl opacity-40" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* Left Content */}
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-semibold text-white">Publiser din annonse</h2>
              <p className="mt-4 text-sm md:text-base text-white/90">
                Nå tusenvis av potensielle kjøpere. Lag en annonse i bare noen få minutter.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button className="px-6 py-3 bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-lg transition">
                  Opprett annonse
                </button>
                <button className="px-6 py-3 bg-primary/60 hover:bg-primary/80 text-white font-semibold rounded-lg transition border border-white/20">
                  Lær mer
                </button>
              </div>
            </div>

            {/* Right Blob Decoration */}
            <div className="hidden md:block flex-shrink-0 w-48 h-48">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/5 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}