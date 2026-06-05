import RoastView from "@/components/RoastView";
import { GetCurrentUser } from "@/services/auth.service";
import { redirect } from "next/navigation";

export default async function RoastPage() {
  const res = await GetCurrentUser();

  if (!res?.data?.user) {
    redirect("/login");
  }

  return <RoastView user={res.data.user} />;
}
