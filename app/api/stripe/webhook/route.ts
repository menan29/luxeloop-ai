import Stripe from "stripe"
import { eq } from "drizzle-orm"
import { db } from "@/lib/db"
import { bookings } from "@/lib/db/schema"
export async function POST(request:Request){const stripe=new Stripe(process.env.STRIPE_SECRET_KEY!);const signature=request.headers.get("stripe-signature");const secret=process.env.STRIPE_WEBHOOK_SECRET;if(!signature||!secret)return new Response("Webhook not configured",{status:400});try{const event=stripe.webhooks.constructEvent(await request.text(),signature,secret);if(event.type==="checkout.session.completed"){const checkout=event.data.object;const bookingId=Number(checkout.metadata?.bookingId);if(Number.isInteger(bookingId))await db.update(bookings).set({status:"paid",stripePaymentIntentId:String(checkout.payment_intent||"")}).where(eq(bookings.id,bookingId))}return new Response("ok")}catch{return new Response("Invalid webhook",{status:400})}}
