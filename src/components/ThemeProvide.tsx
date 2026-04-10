import { useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme, syncWithSystem } = useThemeStore()

  useEffect(() => {
    // Applique le thème au montage
    setTheme(theme)

    // Écoute les changements système
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', syncWithSystem)
    return () => media.removeEventListener('change', syncWithSystem)
  }, [theme, setTheme, syncWithSystem])

  return <>{children}</>
}

// Hook pratique à utiliser dans tes composants
export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useThemeStore()
  return { theme, setTheme, resolvedTheme }
}