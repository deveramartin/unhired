"use server";

import { createClient } from "@/lib/supabase/server";

export async function GetCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data: { user } };
}

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

  return { success: true, url: data?.url };
}

export async function SignOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true };
}
