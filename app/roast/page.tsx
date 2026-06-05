'use client';

import RoastView from "@/components/RoastView";
import { User, RoastRecord } from "@/types/types";

interface RoastPageProps {
  user?: User;
  onRoastCompleted?: (record: RoastRecord) => void;
}

export default function RoastPage({ 
  user = {
    // name?: "John Doe",
    image: "https://api.dicebear.com/7.x/pixel-art/svg?seed=dev",
    email: "john.doe@example.com"
  }, 
  onRoastCompleted = () => {} 
}: RoastPageProps) {
  return (
    <RoastView 
      user={user} 
      onRoastCompleted={onRoastCompleted} 
    />
  );
}
