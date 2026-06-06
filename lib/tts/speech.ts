import Vapi from "@vapi-ai/web";

const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);

export async function speech(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!, {
      firstMessage: text,
    });

    vapi.on("speech-end", () => {
      vapi.stop();
      resolve();
    });

    vapi.on("call-end", () => resolve());

    vapi.on("error", (err) => {
      vapi.stop();
      reject(err);
    });
  });
}
