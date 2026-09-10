"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { LogIn } from "lucide-react";
import { useState } from "react";

export const LoginButton = ({ className = "" }: { className?: string }) => {
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button className={className} onClick={handleClick} disabled={loading}>
      <LogIn />
      {loading ? "Signing in..." : "Sign in with Google"}
    </Button>
  );
};
