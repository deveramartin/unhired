import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { NextRequest, NextResponse } from "next/server";

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text)
      return NextResponse.json({ error: "No text provided" }, { status: 400 });

    const audioStream = await elevenlabs.textToSpeech.convert(
      process.env.VOICE_ID!,
      {
        text,
        modelId: "eleven_v3",
        outputFormat: "mp3_44100_128",
      },
    );

    const reader = audioStream.getReader();
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
    const audioBuffer = Buffer.from(
      chunks.reduce((acc, chunk) => {
        const merged = new Uint8Array(acc.length + chunk.length);
        merged.set(acc);
        merged.set(chunk, acc.length);
        return merged;
      }, new Uint8Array(0)),
    );

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.byteLength.toString(),
      },
    });
  } catch (err: any) {
    console.error("ElevenLabs TTS error:", err);
    const message = err?.body?.detail?.message ?? err?.message ?? "TTS failed";
    return NextResponse.json(
      { error: message },
      { status: err?.statusCode ?? 500 },
    );
  }
}
