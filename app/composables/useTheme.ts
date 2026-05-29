type Theme = 'light' | 'dark'

const STORAGE_KEY = 'pxlc-theme'
const MEDIA_QUERY = '(prefers-color-scheme: dark)'

const systemTheme = (): Theme =>
  import.meta.client && window.matchMedia(MEDIA_QUERY).matches ? 'dark' : 'light'

export const useTheme = () => {
  // Initial value is overwritten by hydrate() on mount; SSR renders with
  // 'light' but the anti-flash inline script in app.vue has already set
  // the right data-theme on <html> before paint, so the CSS is correct.
  const theme = useState<Theme>('pxlc-theme', () => 'light')

  // True once the user has explicitly toggled — from that point on we
  // stop tracking system pref live and trust the stored override.
  const userOverride = useState<boolean>('pxlc-theme-override', () => false)

  const apply = (next: Theme) => {
    if (!import.meta.client) return
    document.documentElement.setAttribute('data-theme', next)
  }

  const toggle = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    userOverride.value = true
    if (import.meta.client) {
      try { localStorage.setItem(STORAGE_KEY, theme.value) } catch {}
    }
    apply(theme.value)
  }

  const hydrate = () => {
    if (!import.meta.client) return

    let stored: string | null = null
    try { stored = localStorage.getItem(STORAGE_KEY) } catch {}

    userOverride.value = stored === 'light' || stored === 'dark'
    theme.value = userOverride.value ? (stored as Theme) : systemTheme()
    apply(theme.value)

    // Live-track OS theme changes until the user explicitly toggles.
    const mq = window.matchMedia(MEDIA_QUERY)
    const onSystemChange = (e: MediaQueryListEvent) => {
      if (userOverride.value) return
      theme.value = e.matches ? 'dark' : 'light'
      apply(theme.value)
    }
    mq.addEventListener('change', onSystemChange)
    return () => mq.removeEventListener('change', onSystemChange)
  }

  return { theme, toggle, hydrate }
}
