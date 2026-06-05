'use client';

import LandingView from '@/components/LandingView';
import { ViewType } from '@/types/types';

interface PageProps {
  setView?: (view: ViewType) => void;
  isLoggedIn?: boolean;
}

export default function Home({ 
  setView = () => {}, 
  isLoggedIn = true 
}: PageProps) {
  return (
    <LandingView 
      setView={setView} 
      isLoggedIn={isLoggedIn} 
    />
  );
}
