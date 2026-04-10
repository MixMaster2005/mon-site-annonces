import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeStore {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
  syncWithSystem: () => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'system',
      resolvedTheme: window.matchMedia('(prefers-color-scheme: dark)')
        .matches ? 'dark' : 'light',

      setTheme: (theme) => {
        const resolved = theme === 'system'
          ? (window.matchMedia('(prefers-color-scheme: dark)').matches
              ? 'dark' : 'light')
          : theme

        document.documentElement.classList.toggle('dark', resolved === 'dark')
        set({ theme, resolvedTheme: resolved })
      },

      syncWithSystem: () => {
        const { theme } = get()
        if (theme === 'system') {
          const dark = window.matchMedia('(prefers-color-scheme: dark)').matches
          document.documentElement.classList.toggle('dark', dark)
          set({ resolvedTheme: dark ? 'dark' : 'light' })
        }
      },
    }),
    { name: 'theme-storage' }
  )
)