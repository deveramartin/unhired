import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { analyzeCV } from "@/services/gemini.service";

export async function POST(req: NextRequest) {
  // Auth check
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse multipart form
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json({ error: "Only PDF files are accepted" }, { status: 400 });
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "File size exceeds 10MB limit" }, { status: 400 });
  }

  // Convert to base64 for Gemini
  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  // Analyze with Gemini
  const roast = await analyzeCV(base64);

  return NextResponse.json({
    success: true,
    data: {
      ...roast,
      fileName: file.name,
      fileSize: `${(file.size / 1024).toFixed(1)} KB`,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    },
  });
}