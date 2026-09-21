"use client";

import {
  LeadFilters,
  LeadScoreTag,
  LeadStatus,
  LeadChannel,
} from "@/features/dashboard/pages/leads/types/lead";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LeadsFiltersProps {
  filters: LeadFilters;
  onFiltersChange: (filters: Partial<LeadFilters>) => void;
  onResetFilters: () => void;
}

const TAG_OPTIONS: { label: string; value: LeadScoreTag | "all" }[] = [
  { label: "All Priority", value: "all" },
  { label: "🔥 Hot Priority (85-100)", value: "hot" },
  { label: "⚡ Warm Intent (65-84)", value: "warm" },
  { label: "❄️ Cold / Exploring (<65)", value: "cold" },
];

const CHANNEL_OPTIONS: { label: string; value: LeadChannel | "all" }[] = [
  { label: "All Channels", value: "all" },
  { label: "Property Finder", value: "property_finder" },
  { label: "Bayut", value: "bayut" },
  { label: "Dubizzle", value: "dubizzle" },
  { label: "Meta Ads", value: "meta_ads" },
  { label: "Google Ads", value: "google_ads" },
  { label: "Walk-in", value: "walk_in" },
  { label: "Referral", value: "referral" },
];

const STATUS_OPTIONS: { label: string; value: LeadStatus | "all" }[] = [
  { label: "All Statuses", value: "all" },
  { label: "Active", value: "active" },
  { label: "Contacted", value: "contacted" },
  { label: "Viewing Scheduled", value: "scheduled" },
  { label: "Negotiating", value: "negotiating" },
  { label: "Closed / Won", value: "closed" },
  { label: "Unresponsive", value: "unresponsive" },
];

export function LeadsFilters({
  filters,
  onFiltersChange,
  onResetFilters,
}: LeadsFiltersProps) {
  const hasActiveFilters =
    filters.search !== "" ||
    filters.tag !== "all" ||
    filters.channel !== "all" ||
    filters.status !== "all";

  return (
    <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center">
      {/* Search box */}
      <div className="relative flex-1">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Search by name, phone (+971), area (Palm, Downtown), or keywords..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ search: e.target.value })}
          className="pl-9 h-9.5 rounded-xl border-border/80 bg-background text-sm"
        />
      </div>

      {/* Dropdown Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Score Tag Filter */}
        <Select
          value={filters.tag}
          onValueChange={(value) =>
            onFiltersChange({ tag: value as LeadScoreTag | "all" })
          }
        >
          <SelectTrigger className="w-full sm:w-[170px] h-9.5 rounded-xl border-border/80 text-xs">
            <SelectValue placeholder="Priority Tag" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {TAG_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="text-xs">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Channel Filter */}
        <Select
          value={filters.channel}
          onValueChange={(value) =>
            onFiltersChange({ channel: value as LeadChannel | "all" })
          }
        >
          <SelectTrigger className="w-full sm:w-[155px] h-9.5 rounded-xl border-border/80 text-xs">
            <SelectValue placeholder="Channel" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {CHANNEL_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="text-xs">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Pipeline Status Filter */}
        <Select
          value={filters.status}
          onValueChange={(value) =>
            onFiltersChange({ status: value as LeadStatus | "all" })
          }
        >
          <SelectTrigger className="w-full sm:w-[150px] h-9.5 rounded-xl border-border/80 text-xs">
            <SelectValue placeholder="Pipeline Status" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="text-xs">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            className="h-9.5 rounded-xl text-xs text-muted-foreground hover:text-foreground gap-1.5"
          >
            <RotateCcw className="size-3.5" />
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}
