"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/auth-context";
import { ProposalsProvider } from "@/context/proposals-context";
import type { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => (
  <AuthProvider>
    <ProposalsProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </ProposalsProvider>
  </AuthProvider>
);
