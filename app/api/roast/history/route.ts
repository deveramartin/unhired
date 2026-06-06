import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db/client";
import { roastRecords } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const records = await db.query.roastRecords.findMany({
    where: eq(roastRecords.userId, user.id),
    orderBy: [desc(roastRecords.createdAt)],
  });

  return NextResponse.json({ data: records });
}

export async function DELETE(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "No id provided" }, { status: 400 });

  await db.delete(roastRecords).where(eq(roastRecords.id, id));
  return NextResponse.json({ success: true });
}