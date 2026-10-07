import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function GET() {
  try {
    const result = await pool.query("SELECT NOW()");
    return NextResponse.json({ connected: true, time: result.rows[0].now });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ connected: false, error: message });
  }
}
