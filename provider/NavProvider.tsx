import { GetCurrentUser, SignOut } from "@/services/auth.service";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

export default async function NavProvider({
  children,
}: {
  children: ReactNode;
}) {
  const res = await GetCurrentUser();
  const user = res?.data?.user ?? null;

  async function logout() {
    "use server";
    await SignOut();
    redirect("/login");
  }

  return (
    <Navbar user={user} logout={logout}>
      {children}
    </Navbar>
  );
}
