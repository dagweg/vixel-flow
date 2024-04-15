"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

function RedirectButton({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <Button onClick={() => router.push("/workspace")}>
      <span className="pointer-events-none">{children}</span>
    </Button>
  );
}

export default RedirectButton;
