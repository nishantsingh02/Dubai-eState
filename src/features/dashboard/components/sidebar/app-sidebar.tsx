"use client";

import * as React from "react";
import Link from "next/link";
import { Building2 } from "lucide-react";

import { NavMain } from "@/features/dashboard/components/sidebar/nav-main";
import { NavUser } from "@/features/dashboard/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { sidebarMenus } from "@/data/sidebar-menus";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();

  React.useEffect(() => {
    localStorage.setItem("sidebar-open", open.toString());
  }, [open]);

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      {...props}
      aria-label="Main navigation"
    >
      <SidebarHeader className="border-b border-border/40 pb-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-transparent">
              <Link
                href="/dashboard/leads"
                className="flex items-center gap-3"
                aria-label="PropEase Home"
              >
                <div
                  className="flex aspect-square size-9 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm shadow-orange-500/30"
                  aria-hidden="true"
                >
                  <Building2 className="size-5" />
                </div>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate font-bold tracking-tight text-base text-foreground">
                    PropEase
                  </span>
                  <span className="truncate text-xs text-muted-foreground font-medium">
                    Dubai Lead Intelligence
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="py-2">
        <NavMain items={sidebarMenus.navMain} />
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 pt-2">
        <NavUser user={sidebarMenus.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
