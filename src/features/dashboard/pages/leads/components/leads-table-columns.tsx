"use client";

import { useMemo } from "react";
import { Lead, LeadScoreTag, LeadStatus, LeadChannel } from "@/features/dashboard/pages/leads/types/lead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { LeadActionsDropdown } from "./leads-actions-dropdown";
import { MessageSquare, Phone, Sparkles } from "lucide-react";
import { format } from "date-fns";

export const tagStyles: Record<LeadScoreTag, { pill: string; dot: string; label: string }> = {
  hot: {
    pill: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30 dark:bg-emerald-500/20 dark:text-emerald-400 font-semibold",
    dot: "bg-emerald-500 animate-pulse",
    label: "Hot",
  },
  warm: {
    pill: "bg-amber-500/10 text-amber-700 border-amber-500/30 dark:bg-amber-500/20 dark:text-amber-400 font-semibold",
    dot: "bg-amber-500",
    label: "Warm",
  },
  cold: {
    pill: "bg-slate-500/10 text-slate-700 border-slate-500/30 dark:bg-slate-500/20 dark:text-slate-400 font-medium",
    dot: "bg-slate-400",
    label: "Cold",
  },
};

export const statusStyles: Record<LeadStatus, { pill: string; label: string }> = {
  active: {
    pill: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400",
    label: "Active",
  },
  contacted: {
    pill: "bg-blue-500/10 text-blue-700 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400",
    label: "Contacted",
  },
  scheduled: {
    pill: "bg-purple-500/10 text-purple-700 border-purple-500/20 dark:bg-purple-500/20 dark:text-purple-400",
    label: "Viewing Scheduled",
  },
  negotiating: {
    pill: "bg-orange-500/10 text-orange-700 border-orange-500/20 dark:bg-orange-500/20 dark:text-orange-400",
    label: "Negotiating",
  },
  closed: {
    pill: "bg-teal-500/10 text-teal-700 border-teal-500/20 dark:bg-teal-500/20 dark:text-teal-400",
    label: "Closed / Won",
  },
  unresponsive: {
    pill: "bg-zinc-500/10 text-zinc-700 border-zinc-500/20 dark:bg-zinc-500/20 dark:text-zinc-400",
    label: "Unresponsive",
  },
};

export const channelLabels: Record<LeadChannel, { name: string; color: string }> = {
  property_finder: { name: "Property Finder", color: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20" },
  bayut: { name: "Bayut", color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20" },
  dubizzle: { name: "Dubizzle", color: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20" },
  meta_ads: { name: "Meta Ads", color: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20" },
  google_ads: { name: "Google Ads", color: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20" },
  walk_in: { name: "Walk-in", color: "bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-500/20" },
  referral: { name: "Referral", color: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20" },
};

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

interface UseLeadColumnsProps {
  onSelectLead: (lead: Lead) => void;
}

export const useLeadColumns = ({ onSelectLead }: UseLeadColumnsProps) => {
  return useMemo<ColumnDef<Lead>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Contact",
        cell: ({ row }) => {
          const lead = row.original;
          const initials = getInitials(lead.name);
          const leadDate = new Date(lead.date);

          return (
            <div className="flex items-center gap-3 py-1">
              {/* Square initial tile */}
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 font-bold text-xs border border-orange-500/20 dark:bg-orange-500/20 dark:text-orange-400">
                {initials}
              </div>
              <div className="flex flex-col min-w-0">
                <button
                  onClick={() => onSelectLead(lead)}
                  className="text-left font-semibold text-sm text-foreground hover:text-orange-600 transition-colors truncate cursor-pointer"
                >
                  {lead.name}
                </button>
                <span className="text-[11px] text-muted-foreground">
                  {format(leadDate, "MMM d, yyyy • h:mm a")}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "phoneNormalized",
        header: "Phone",
        cell: ({ row }) => {
          const lead = row.original;
          const cleanPhone = lead.phoneNormalized.replace(/\D/g, "");

          return (
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="font-mono text-xs text-foreground font-medium">
                {lead.phoneNormalized}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="size-7 rounded-lg text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10"
                asChild
                title="WhatsApp Buyer"
              >
                <a
                  href={`https://wa.me/${cleanPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare className="size-3.5" />
                  <span className="sr-only">WhatsApp</span>
                </a>
              </Button>
            </div>
          );
        },
      },
      {
        accessorKey: "channel",
        header: "Channel",
        cell: ({ row }) => {
          const channel = row.original.channel;
          const channelInfo = channelLabels[channel] || {
            name: channel,
            color: "bg-muted text-muted-foreground",
          };

          return (
            <Badge
              variant="outline"
              className={`text-xs px-2.5 py-0.5 rounded-full border whitespace-nowrap font-medium ${channelInfo.color}`}
            >
              {channelInfo.name}
            </Badge>
          );
        },
      },
      {
        accessorKey: "score",
        header: "Score & Intent",
        cell: ({ row }) => {
          const lead = row.original;
          const tagInfo = tagStyles[lead.tag];

          return (
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold font-mono text-foreground w-6">
                {lead.score}
              </span>
              <Badge
                variant="outline"
                className={`text-xs uppercase px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${tagInfo.pill}`}
              >
                <span className={`size-1.5 rounded-full ${tagInfo.dot}`} />
                {tagInfo.label}
              </Badge>
            </div>
          );
        },
      },
      {
        accessorKey: "reason",
        header: "AI Intent Reason",
        cell: ({ row }) => {
          const lead = row.original;

          return (
            <div
              onClick={() => onSelectLead(lead)}
              className="group cursor-pointer max-w-md py-1"
              title="Click to view full AI intelligence card"
            >
              <p className="text-xs text-muted-foreground line-clamp-2 group-hover:text-foreground transition-colors leading-relaxed">
                {lead.intelligence.intentReason}
              </p>
              <div className="flex items-center gap-1 mt-0.5 text-[10px] font-medium text-orange-600 dark:text-orange-400 opacity-80 group-hover:opacity-100">
                <Sparkles className="size-2.5" />
                <span>View AI Breakdown</span>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          const statusInfo = statusStyles[status] || {
            pill: "bg-muted text-muted-foreground",
            label: status,
          };

          return (
            <Badge
              variant="outline"
              className={`text-xs px-2.5 py-0.5 rounded-full border font-medium whitespace-nowrap ${statusInfo.pill}`}
            >
              {statusInfo.label}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <LeadActionsDropdown
            lead={row.original}
            onOpenIntelligence={() => onSelectLead(row.original)}
          />
        ),
      },
    ],
    [onSelectLead]
  );
};
