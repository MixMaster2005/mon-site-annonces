import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useTheme } from '../ThemeProvide'
import { Button } from '../ui/Button.jsx'
import { Input } from '../ui/Input.jsx'
import {
  MagnifyingGlassIcon,
  UserIcon,
  BellIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

const base = import.meta.env.BASE_URL

const homeLinks = [
  { href: `${base}#hero`, label: 'Hjem' },
  { href: `${base}#categories`, label: 'Kategorier' },
  { href: `${base}#annonces`, label: 'Siste annonser' },
  { href: `${base}#publier`, label: 'Opprett annonse' },
]

const nextTheme = (theme) => {
  if (theme === 'light') return 'dark'
  if (theme === 'dark') return 'system'
  return 'light'
}

const getThemeIcon = (theme) => {
  if (theme === 'light') return <SunIcon className="h-6 w-6" />
  if (theme === 'dark') return <MoonIcon className="h-6 w-6" />
  return <ComputerDesktopIcon className="h-6 w-6" />
}

export default function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const homeSectionLinks = homeLinks;

  const submitSearch = (event) => {
    event.preventDefault()
    const params = new URLSearchParams()

    if (searchQuery.trim()) {
      params.set('query', searchQuery.trim())
    }

    navigate(`/recherche${params.toString() ? `?${params.toString()}` : ''}`)
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="space-y-1 flex-shrink-0">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Små annonser</p>
          <h1 className="text-xl font-semibold text-foreground">Arngren</h1>
        </Link>

        <nav className="hidden items-center gap-2 md:flex flex-1 justify-center">
          {homeSectionLinks.map((link) => (
            <a
              key={link.href + link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition hover:text-primary hover:underline hover:underline-offset-8 hover:decoration-primary hover:decoration-4"
            >
              {link.label}
            </a>
          ))}
          <NavLink
            to="/recherche"
            className={({ isActive }) =>
              [
                'rounded-full px-3 py-2 text-sm font-medium transition',
                isActive ? 'bg-primary text-primary-foreground' : 'text-foreground/80 hover:bg-muted hover:text-foreground',
              ].join(' ')
            }
          >
            Resultater
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <form onSubmit={submitSearch} className="relative hidden sm:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Søk annonser..."
              className="w-64 pl-10 pr-14"
            />
            <Button type="submit" variant="ghost" className="absolute right-1 top-1 h-9 px-3 py-0 text-xs">
              Aller
            </Button>
          </form>

          <button type="button" className="hidden rounded-full p-2 transition-colors hover:bg-muted sm:block">
            <UserIcon className="h-6 w-6 text-foreground" />
          </button>

          <button type="button" className="hidden rounded-full p-2 transition-colors hover:bg-muted sm:block">
            <BellIcon className="h-6 w-6 text-foreground" />
          </button>

          <button
            type="button"
            onClick={() => setTheme(nextTheme(theme))}
            className="rounded-full p-2 text-tertiary transition-colors hover:bg-muted"
            title={`${resolvedTheme} modus`}
          >
            {getThemeIcon(theme)}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="rounded-full p-2 transition-colors hover:bg-muted md:hidden"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6 text-foreground" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto max-w-7xl space-y-3 px-4 py-4 sm:px-6 lg:px-8">
            <form onSubmit={submitSearch} className="relative mb-4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Søk annonser..."
                className="w-full pl-10 pr-24"
              />
              <Button type="submit" variant="ghost" className="absolute right-1 top-1 h-9 px-3 py-0 text-xs">
                Aller
              </Button>
            </form>

            <nav className="flex flex-col gap-2">
              {homeSectionLinks.map((link) => (
                <a
                  key={link.href + link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <NavLink
                to="/recherche"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  [
                    'rounded-full px-3 py-2 text-sm font-medium transition',
                    isActive ? 'bg-primary text-primary-foreground' : 'text-foreground/80 hover:bg-muted hover:text-foreground',
                  ].join(' ')
                }
              >
                Resultater
              </NavLink>
            </nav>

            <div className="flex items-center gap-2 border-t border-border pt-2">
              <button type="button" className="flex flex-1 items-center justify-center rounded-full p-2 transition-colors hover:bg-muted">
                <UserIcon className="h-6 w-6 text-foreground" />
              </button>
              <button type="button" className="flex flex-1 items-center justify-center rounded-full p-2 transition-colors hover:bg-muted">
                <BellIcon className="h-6 w-6 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
