import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db/client";
import { roastRecords } from "@/db/schema";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    await db.insert(roastRecords).values({
      userId: user.id,
      fileName: body.fileName,
      parsedName: body.parsedName,
      role: body.role,
      rating: body.rating,
      roastText: body.roastText,
      buzzwords: body.buzzwords ?? [],
      grammarSins: body.grammarSins ?? [],
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Save roast error:", err);
    return NextResponse.json({ error: err.message ?? "Failed to save roast" }, { status: 500 });
  }
}