import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { AuthForm } from "@/components/auth-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { auth } from "@/lib/auth"
export default async function SignupPage(){const session=await auth.api.getSession({headers:await headers()});if(session?.user)redirect("/dashboard");return <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-16"><Card className="w-full max-w-md"><CardHeader><p className="text-xs uppercase tracking-[.2em] text-accent">Membership</p><CardTitle className="font-serif text-4xl">A wardrobe without limits.</CardTitle></CardHeader><CardContent><AuthForm mode="sign-up"/></CardContent></Card></div>}
