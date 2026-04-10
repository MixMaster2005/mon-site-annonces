import { Link, Navigate, useParams } from 'react-router-dom'
import {
  ArrowLeftIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  HeartIcon,
  MapPinIcon,
  ShareIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'
import AnnonceGrid from '../components/annonces/AnnonceGrid.jsx'
import { Button } from '../components/ui/Button.jsx'
import { getAnnonceById, useAnnonces } from '../hooks/useAnnonces.js'

function DetailStat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border bg-background p-4">
      <div className="rounded-full bg-primary/10 p-2 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
        <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  )
}

export default function AnnonceDetailsPage() {
  const { id } = useParams()
  const { annonces } = useAnnonces()
  const annonce = getAnnonceById(id)

  if (!annonce) {
    return <Navigate to="/recherche" replace />
  }

  const similarAnnonces = annonces
    .filter((item) => item.id !== annonce.id && item.category === annonce.category)
    .slice(0, 4)

  return (
    <main className="min-h-[calc(100vh-8rem)] bg-background pb-16 pt-6">
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-[1.6rem] border border-border bg-card px-5 py-4 shadow-sm">
          <div>
            <p className="text-xs text-muted-foreground">Hjem / Annonser / {annonce.category}</p>
            <h1 className="mt-2 text-2xl font-semibold text-foreground">{annonce.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/recherche"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Tilbake til søk
            </Link>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_360px]">
          <div className="space-y-6">
            <section className="overflow-hidden rounded-[1.8rem] border border-border bg-card shadow-sm">
              <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_140px]">
                <div className="relative min-h-[320px] bg-muted sm:min-h-[440px]">
                  <img
                    src={annonce.image}
                    alt={annonce.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-6">
                    <div className="flex flex-wrap items-center gap-2 text-white/90">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-sm">
                        {annonce.category}
                      </span>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                        {annonce.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-border bg-card p-3 lg:grid-cols-1 lg:border-l lg:border-t-0">
                  {[annonce.image, annonce.image, annonce.image].map((image, index) => (
                    <div key={`${annonce.id}-${index}`} className="overflow-hidden rounded-2xl border border-border bg-muted">
                      <img src={image} alt={`${annonce.title} ${index + 1}`} className="h-24 w-full object-cover lg:h-28" loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-[1.6rem] border border-border bg-card p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{annonce.location}, {annonce.district}</p>
                  <h2 className="mt-2 text-3xl font-semibold text-foreground">{annonce.title}</h2>
                </div>
                <div className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm">
                  {annonce.price}
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <DetailStat icon={ClockIcon} label="Lagt ut" value={annonce.age} />
                <DetailStat icon={ShieldCheckIcon} label="Tilstand" value={annonce.condition} />
                <DetailStat icon={MapPinIcon} label="Område" value={`${annonce.location} / ${annonce.district}`} />
                <DetailStat icon={ChatBubbleLeftRightIcon} label="Svarstid" value={annonce.responseTime} />
              </div>
            </section>

            <section className="rounded-[1.6rem] border border-border bg-card p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-foreground">Detaljert beskrivelse</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{annonce.descriptionLong}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {annonce.highlights?.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-muted/50 px-4 py-3 text-sm text-foreground">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {annonce.tags?.map((tag) => (
                  <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-[1.6rem] border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Kart og område</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{annonce.mapLabel}</p>
                </div>
                <span className="text-sm text-muted-foreground">{annonce.location}</span>
              </div>
              <div className="mt-5 overflow-hidden rounded-[1.4rem] border border-border bg-muted">
                <div className="h-72 w-full bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_25%,transparent_25%),linear-gradient(225deg,rgba(255,255,255,0.04)_25%,transparent_25%),linear-gradient(45deg,rgba(255,255,255,0.04)_25%,transparent_25%),linear-gradient(315deg,rgba(255,255,255,0.04)_25%,hsl(var(--muted))_25%)] bg-[length:28px_28px] bg-[position:14px_0,14px_0,0_0,0_0] p-6 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.03)_25%,transparent_25%),linear-gradient(225deg,rgba(255,255,255,0.03)_25%,transparent_25%),linear-gradient(45deg,rgba(255,255,255,0.03)_25%,transparent_25%),linear-gradient(315deg,rgba(255,255,255,0.03)_25%,hsl(var(--muted))_25%)]">
                  <div className="flex h-full items-end justify-between rounded-[1.2rem] border border-border/60 bg-background/50 p-5 backdrop-blur-sm">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Lokasjon</p>
                      <p className="mt-2 text-lg font-semibold text-foreground">{annonce.location} · {annonce.district}</p>
                    </div>
                    <MapPinIcon className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </div>
            </section>

            {similarAnnonces.length > 0 && (
              <section className="rounded-[1.6rem] border border-border bg-card p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Lignende annonser</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Flere forslag i samme kategori.</p>
                  </div>
                  <Link to="/recherche" className="text-sm font-semibold text-primary transition hover:text-primary/80">
                    Se alle
                  </Link>
                </div>
                <AnnonceGrid annonces={similarAnnonces} />
              </section>
            )}
          </div>

          <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
            <section className="rounded-[1.6rem] border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/12 text-lg font-semibold text-primary">
                  {annonce.seller.split(' ').map((part) => part[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">{annonce.seller}</p>
                  <p className="text-sm text-muted-foreground">{annonce.sellerTitle}</p>
                </div>
              </div>

              <div className="mt-5 rounded-[1.3rem] bg-muted/50 p-4 text-sm text-muted-foreground">
                <p>{annonce.memberSince}</p>
                <p className="mt-2">{annonce.delivery}</p>
              </div>

              <div className="mt-5 space-y-3">
                <Button className="w-full">Kontakt selger</Button>
                <Button variant="ghost" className="w-full">Send melding</Button>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-5 text-center">
                <div>
                  <p className="text-lg font-semibold text-foreground">{annonce.stats.views}</p>
                  <p className="text-xs text-muted-foreground">Visninger</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">{annonce.stats.saves}</p>
                  <p className="text-xs text-muted-foreground">Lagringer</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">{annonce.stats.shares}</p>
                  <p className="text-xs text-muted-foreground">Delinger</p>
                </div>
              </div>
            </section>

            <section className="rounded-[1.6rem] border border-border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground">Trygg handel</h3>
              <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <ShieldCheckIcon className="h-5 w-5 text-primary" />
                  <span>Betal med en metode du stoler på</span>
                </div>
                <div className="flex items-center gap-3">
                  <HeartIcon className="h-5 w-5 text-primary" />
                  <span>Lagre annonsen hvis du vil sammenligne senere</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShareIcon className="h-5 w-5 text-primary" />
                  <span>Del annonsen med venner eller familie</span>
                </div>
              </div>
            </section>

            <section className="rounded-[1.6rem] border border-border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground">Betaling og levering</h3>
              <div className="mt-4 space-y-4 text-sm text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground">Betalingsmetoder</p>
                  <p className="mt-1">{annonce.paymentMethods.join(' · ')}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Levering</p>
                  <p className="mt-1">{annonce.delivery}</p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </section>
    </main>
  )
}
