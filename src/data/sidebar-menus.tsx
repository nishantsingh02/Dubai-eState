import {
  Flame,
  RotateCcw,
  Upload,
  Settings2,
} from "lucide-react";

export const sidebarMenus = {
  brand: {
    name: "PropEase",
    tagline: "Lead Intelligence",
  },
  user: {
    name: "Agent",
    email: "agent@propease.ae",
    avatar: "/avatars/avatar.png",
    workspace: "Apex Real Estate Dubai",
  },
  navMain: [
    {
      title: "New Leads",
      url: "/dashboard/leads",
      icon: Flame,
    },
    {
      title: "Reactivation Candidates",
      url: "/dashboard/reactivation",
      icon: RotateCcw,
    },
    {
      title: "Import Leads",
      url: "/dashboard/import",
      icon: Upload,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
    },
  ],
};
