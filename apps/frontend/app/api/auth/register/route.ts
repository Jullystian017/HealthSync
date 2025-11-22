import { NextResponse } from "next/server";
import { supabaseServer } from "../../../../lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }
    const { data, error } = await supabaseServer.auth.signUp({ email, password });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ user: data.user }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unexpected error" }, { status: 500 });
  }
}
