"use client"
import Script from "next/script"

declare global {
  interface Window {
    googleTranslateElementInit?: () => void
    google?: {
      translate?: {
        TranslateElement?: new (options: object, id: string) => unknown
      }
    }
  }
}

export function GoogleTranslate() {
  return (
    <>
      <div
        id="google_translate_element"
        aria-label="Select language"
        className="fixed bottom-4 left-4 z-40 rounded-lg bg-card p-2 shadow-lg"
      />
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="lazyOnload"
        onLoad={() => {
          window.googleTranslateElementInit = () => {
            const TranslateElement = window.google?.translate?.TranslateElement

            if (!TranslateElement) {
              return
            }

            new TranslateElement(
              {
                pageLanguage: "en",
                includedLanguages: "en,hi,fr,ar",
                layout: 0,
              },
              "google_translate_element"
            )
          }

          window.googleTranslateElementInit?.()
        }}
      />
    </>
  )
}
