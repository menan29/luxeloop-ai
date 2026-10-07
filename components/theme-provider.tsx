"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

type Theme = "light" | "dark" | "system"
type ResolvedTheme = "light" | "dark"

type ThemeContextValue = {
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme | ((current: Theme) => Theme)) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setCurrentTheme] = useState<Theme>("system")
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light")
  const [themeReady, setThemeReady] = useState(false)

  const setTheme = useCallback(
    (nextTheme: Theme | ((current: Theme) => Theme)) => {
      const updatedTheme =
        typeof nextTheme === "function" ? nextTheme(theme) : nextTheme
      setCurrentTheme(updatedTheme)

      try {
        window.localStorage.setItem("theme", updatedTheme)
      } catch (error) {
        console.error("Unable to save the selected theme.", error)
      }
    },
    [theme]
  )

  useEffect(() => {
    try {
      const storedTheme = window.localStorage.getItem("theme")
      if (storedTheme === "light" || storedTheme === "dark" || storedTheme === "system") {
        setCurrentTheme(storedTheme)
      }
    } catch (error) {
      console.error("Unable to read the saved theme.", error)
    }
    setThemeReady(true)
  }, [])

  useEffect(() => {
    if (!themeReady) {
      return
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const applyTheme = () => {
      const nextResolvedTheme =
        theme === "system" ? (mediaQuery.matches ? "dark" : "light") : theme

      document.documentElement.classList.toggle("dark", nextResolvedTheme === "dark")
      document.documentElement.style.colorScheme = nextResolvedTheme
      setResolvedTheme(nextResolvedTheme)
    }

    applyTheme()

    if (theme !== "system") {
      return
    }

    mediaQuery.addEventListener("change", applyTheme)
    return () => mediaQuery.removeEventListener("change", applyTheme)
  }, [theme, themeReady])

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== "theme") {
        return
      }

      if (event.newValue === "light" || event.newValue === "dark" || event.newValue === "system") {
        setCurrentTheme(event.newValue)
      } else if (event.newValue === null) {
        setCurrentTheme("system")
      }
    }

    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  return (
    <ThemeContext.Provider value={{ resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider.")
  }

  return context
}
