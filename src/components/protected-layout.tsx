"use client";

import { LoginButton } from "@/components/login-button";
import { useAuth } from "@/context/auth-context";
import type { ReactNode } from "react";

export const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center py-24 text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
        <p className="text-lg font-medium">
          You need to log in to make your custom page.
        </p>
        <LoginButton />
      </div>
    );
  }

  return <>{children}</>;
};
