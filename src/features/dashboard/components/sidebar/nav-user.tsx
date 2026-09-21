"use client";

import { useState } from "react";
import { LogOut, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { logout } from "@/app/(auth)/actions";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/hooks/use-user";

export function NavUser({
  user: initialUser,
}: {
  user?: {
    name: string;
    email: string;
    avatar: string;
    workspace?: string;
  };
}) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isPending, setIsPending] = useState(false);
  const authUser = useUser();

  const name = authUser.name || initialUser?.name || "Agent";
  const email = authUser.email || initialUser?.email || "";
  const avatar = authUser.avatar || initialUser?.avatar || "/avatars/avatar.png";
  const initials = authUser.initials;

  const handleSignOut = async () => {
    setIsPending(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      await logout();
    } catch {
      // Ignore network errors on sign out
    } finally {
      window.location.href = "/login";
    }
  };

  if (isCollapsed) {
    return (
      <div className="flex flex-col items-center gap-2 py-2">
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="rounded-lg text-xs font-semibold bg-orange-500/10 text-orange-600">
            {initials}
          </AvatarFallback>
        </Avatar>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSignOut}
          disabled={isPending}
          className="h-8 w-8 text-muted-foreground hover:text-destructive cursor-pointer"
          title="Sign out"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4" />
          )}
        </Button>
      </div>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center justify-between gap-2 p-1">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <Avatar className="h-8 w-8 shrink-0 rounded-lg border border-border">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback className="rounded-lg text-xs font-semibold bg-orange-500/10 text-orange-600">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-xs leading-tight overflow-hidden">
              <span className="truncate font-semibold text-foreground">
                {name}
              </span>
              <span className="truncate text-muted-foreground text-[11px]" title={email}>
                {email}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              disabled={isPending}
              className="h-8 w-8 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
              title="Sign out"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <LogOut className="h-4 w-4" aria-hidden="true" />
              )}
              <span className="sr-only">Sign out</span>
            </Button>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
