"use client";

import Link from "next/link";
import {
  Flame,
  Upload,
  Plus,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Building2,
  Users,
} from "lucide-react";
import { useLeads } from "./hooks/use-leads";
import { LeadsTable } from "./components/leads-table";
import { LeadsFilters } from "./components/leads-filters";
import { LeadIntelligenceModal } from "./components/lead-intelligence-modal";
import { Button } from "@/components/ui/button";

export function LeadsPage() {
  const {
    leads,
    allLeads,
    pageCount,
    filters,
    sorting,
    pagination,
    selectedLead,
    isModalOpen,
    setIsModalOpen,
    handleOpenLeadModal,
    updateFilters,
    handleSortingChange,
    handlePaginationChange,
    handleClearFilters,
  } = useLeads();

  const totalHotLeads = allLeads.filter((l) => l.tag === "hot").length;
  const avgScore = allLeads.length
    ? Math.round(
        allLeads.reduce((acc, curr) => acc + curr.score, 0) / allLeads.length
      )
    : 0;
  const reactivationCount = allLeads.filter(
    (l) => l.intelligence.reactivationCandidate
  ).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              New Leads Intelligence
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-600 border border-orange-500/20">
              <Sparkles className="size-3" />
              AI Prioritized
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time Dubai portal inquiries scored 0–100 by buyer intent, budget, and closing velocity.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            className="rounded-xl border-border/80 text-xs font-medium h-9 gap-1.5"
            asChild
          >
            <Link href="/dashboard/import">
              <Upload className="size-3.5 text-muted-foreground" />
              Import CSV / Excel
            </Link>
          </Button>

          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-medium h-9 gap-1.5 shadow-sm shadow-orange-500/20"
            asChild
          >
            <Link href="/dashboard/import?tab=manual">
              <Plus className="size-3.5" />
              Add Single Lead
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Active Leads */}
        <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Total Inquiries
            </span>
            <div className="flex size-8 items-center justify-center rounded-lg bg-muted text-foreground">
              <Users className="size-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-foreground">
              {allLeads.length}
            </span>
            <span className="text-xs font-medium text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="size-3" />
              100% Normalized
            </span>
          </div>
        </div>

        {/* Hot Priority Leads */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-4 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <Flame className="size-3.5 text-emerald-600" />
              Hot Priority
            </span>
            <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <Flame className="size-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-foreground">
              {totalHotLeads} Leads
            </span>
            <span className="text-xs font-medium text-emerald-600">
              Act within 15 min
            </span>
          </div>
        </div>

        {/* Average Intent Score */}
        <div className="rounded-2xl border border-orange-500/20 bg-orange-500/[0.03] p-4 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-700 dark:text-orange-400 flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-orange-600" />
              Avg Intent Score
            </span>
            <div className="flex size-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
              <Building2 className="size-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-foreground">
              {avgScore} <span className="text-sm font-normal text-muted-foreground">/ 100</span>
            </span>
            <span className="text-xs font-medium text-orange-600">
              High Intent Cohort
            </span>
          </div>
        </div>

        {/* Reactivation Candidates Banner */}
        <Link
          href="/dashboard/reactivation"
          className="group rounded-2xl border border-border/70 bg-card p-4 shadow-sm space-y-2 hover:border-orange-500/40 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <RotateCcw className="size-3.5 text-purple-600" />
              Revival Pool
            </span>
            <div className="flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 group-hover:bg-orange-500 group-hover:text-white transition-colors">
              <RotateCcw className="size-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-foreground">
              {reactivationCount} Leads
            </span>
            <span className="text-xs font-medium text-purple-600 group-hover:text-orange-600 transition-colors">
              View Candidates →
            </span>
          </div>
        </Link>
      </div>

      {/* Main Table Card */}
      <div className="rounded-2xl border border-border/70 bg-card shadow-sm">
        {/* Filters bar */}
        <div className="p-4 border-b border-border/60">
          <LeadsFilters
            filters={filters}
            onFiltersChange={updateFilters}
            onResetFilters={handleClearFilters}
          />
        </div>

        {/* Table content */}
        <div className="p-4">
          <LeadsTable
            leads={leads}
            totalRows={allLeads.length}
            sorting={sorting}
            onSort={handleSortingChange}
            pagination={pagination}
            onPaginationChange={handlePaginationChange}
            pageCount={pageCount}
            onSelectLead={handleOpenLeadModal}
          />
        </div>
      </div>

      {/* AI Intelligence Drawer / Modal */}
      <LeadIntelligenceModal
        lead={selectedLead}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}
