"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { sidebarMenus } from "@/data/sidebar-menus";

export interface Breadcrumb {
  label: string;
  href: string;
  isCurrent: boolean;
}

const customRouteNames: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/leads": "New Leads",
  "/dashboard/reactivation": "Reactivation Candidates",
  "/dashboard/import": "Import Leads",
  "/dashboard/settings": "Settings",
};

export function useBreadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    if (pathname === "/" || !pathname) return [];

    const result: Breadcrumb[] = [];

    if (pathname.startsWith("/dashboard")) {
      result.push({
        label: "PropEase",
        href: "/dashboard/leads",
        isCurrent: pathname === "/dashboard",
      });

      if (pathname !== "/dashboard") {
        const matchingNav = sidebarMenus.navMain.find(
          (item) => item.url === pathname
        );

        const label =
          matchingNav?.title ||
          customRouteNames[pathname] ||
          pathname
            .split("/")
            .pop()
            ?.replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()) ||
          "Page";

        result.push({
          label,
          href: pathname,
          isCurrent: true,
        });
      }
    }

    return result;
  }, [pathname]);

  return breadcrumbs;
}
