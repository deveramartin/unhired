"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function SignInWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    return { success: false, message: error.message };
  }

  if (data?.url) {
    redirect(data.url);
  }

  return { success: false, message: "Failed to generate OAuth url" };
}
