"use client";

import { LoginButton } from "@/components/login-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";

export const SiteHeader = () => {
  const { user, loading, signOut } = useAuth();

  return (
    <header className="flex items-center justify-between border-b px-6 py-3">
      <Link href="/" className="font-semibold">
        Propose
      </Link>

      <div className="flex items-center gap-3">
        {!loading && user && (
          <>
            <Button
              variant="ghost"
              render={<Link href="/dashboard">Dashboard</Link>}
            />
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button className="rounded-full">
                    <Avatar>
                      <AvatarImage
                        src={user.photoURL ?? undefined}
                        alt={user.displayName ?? "User"}
                      />
                      <AvatarFallback>
                        {user.displayName?.[0] ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                }
              />
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => signOut()}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}

        {!loading && !user && <LoginButton />}
      </div>
    </header>
  );
};
