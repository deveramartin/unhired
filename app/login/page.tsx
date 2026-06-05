"use client";

import { useRouter } from "next/navigation";
import LoginView from "@/components/LoginView";
import { User } from "@/types";

export default function LoginPage() {
  const router = useRouter();

  const handleGoogleLogin = (user: User) => {
    console.log(user);
    router.push("/roast");
  };

  return <LoginView onLoginSuccess={handleGoogleLogin} />;
}