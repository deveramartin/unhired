import LandingView from '@/components/LandingView';
import { GetCurrentUser } from '@/services/auth.service';

export default async function Home() {
  const res = await GetCurrentUser();
  const isLoggedIn = !!res?.data?.user;

  return <LandingView isLoggedIn={isLoggedIn} />;
}