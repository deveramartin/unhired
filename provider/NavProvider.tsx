"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { ViewType } from "@/types";

export default function NavProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [view, setView] = useState<ViewType>("landing");

  return (
    <Navbar
      currentView={view}
      setView={setView}
      user={null}
      logout={() => {}}
    >
      {children}
    </Navbar>
  );
}