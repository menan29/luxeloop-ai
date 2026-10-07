import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Manrope } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { GoogleTranslate } from "@/components/google-translate"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const sans = Manrope({ subsets:["latin"], variable:"--font-manrope" })
const serif = Cormorant_Garamond({ subsets:["latin"], variable:"--font-cormorant" })
export const metadata: Metadata = { title:{ default:"LuxeLoop AI — Rent luxury. Wear confidence.", template:"%s | LuxeLoop AI" }, description:"AI-powered luxury fashion rentals for weddings, celebrations and defining moments across India." }
export const viewport: Viewport = { themeColor:[{media:"(prefers-color-scheme: light)",color:"#f7f6f2"},{media:"(prefers-color-scheme: dark)",color:"#111111"}], colorScheme:"light dark" }
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning className="bg-background"><body className={`${sans.variable} ${serif.variable} font-sans antialiased`}><Script id="theme-init" strategy="beforeInteractive">{`(function(){var root=document.documentElement;var theme="system";try{var saved=localStorage.getItem("theme");if(saved==="light"||saved==="dark"||saved==="system")theme=saved}catch(error){console.error("Unable to read the saved theme.",error)}if(theme==="system")theme=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";root.classList.toggle("dark",theme==="dark");root.style.colorScheme=theme})()`}</Script><ThemeProvider><SiteHeader/><main>{children}</main><SiteFooter/><GoogleTranslate/><Toaster richColors position="top-center"/></ThemeProvider>{process.env.NODE_ENV === "production" && <Analytics/>}</body></html>}
