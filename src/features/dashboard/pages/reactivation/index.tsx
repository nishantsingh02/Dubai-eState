"use client";

import { useState } from "react";
import { mockLeads } from "../leads/data/mock-leads";
import { Lead } from "../leads/types/lead";
import { LeadIntelligenceModal } from "../leads/components/lead-intelligence-modal";
import {
  RotateCcw,
  Sparkles,
  MessageSquare,
  Building,
  TrendingUp,
  Flame,
  ArrowRight,
  Clock,
  CheckCircle2,
  DollarSign,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { tagStyles, getInitials } from "../leads/components/leads-table-columns";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function ReactivationPage() {
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter for reactivation candidates
  const reactivationLeads = mockLeads.filter(
    (l) => l.intelligence.reactivationCandidate
  );

  const filteredLeads = reactivationLeads.filter((lead) => {
    if (!search) return true;
    const query = search.toLowerCase();
    return (
      lead.name.toLowerCase().includes(query) ||
      lead.phoneNormalized.toLowerCase().includes(query) ||
      lead.intelligence.preferredAreas.some((a) =>
        a.toLowerCase().includes(query)
      ) ||
      (lead.intelligence.revivalCatalyst || "").toLowerCase().includes(query)
    );
  });

  const totalRevivalPipeline = reactivationLeads.reduce(
    (acc, curr) => acc + (curr.intelligence.budgetAed || 0),
    0
  );

  const formattedPipeline = new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(totalRevivalPipeline);

  const handleOpenLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Reactivation Candidates
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20">
              <RotateCcw className="size-3" />
              Dormant Revival Engine
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Old and stalled leads automatically flagged by AI when market conditions, developer launches, or buyer signals trigger a high-probability revival.
          </p>
        </div>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-purple-500/20 bg-purple-500/[0.03] p-4 shadow-sm space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
            <RotateCcw className="size-3.5" />
            Active Revival Candidates
          </span>
          <p className="text-2xl font-bold text-foreground">
            {reactivationLeads.length} Dormant Leads
          </p>
          <p className="text-xs text-muted-foreground">
            Average dormancy: 83 days
          </p>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm space-y-1">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <DollarSign className="size-3.5 text-emerald-500" />
            Locked Revival Pipeline
          </span>
          <p className="text-2xl font-bold text-foreground">
            {formattedPipeline}
          </p>
          <p className="text-xs text-emerald-600 font-medium">
            Qualified historical purchase budgets
          </p>
        </div>

        <div className="rounded-2xl border border-orange-500/20 bg-orange-500/[0.03] p-4 shadow-sm space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-700 dark:text-orange-400 flex items-center gap-1.5">
            <Sparkles className="size-3.5" />
            AI Trigger Accuracy
          </span>
          <p className="text-2xl font-bold text-foreground">
            94.2% Match
          </p>
          <p className="text-xs text-muted-foreground">
            Tied to live Dubai property market events
          </p>
        </div>
      </div>

      {/* Filter and Cards Container */}
      <div className="rounded-2xl border border-border/70 bg-card shadow-sm p-4 space-y-4">
        <div className="relative max-w-md">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Filter reactivation leads by name, community, catalyst..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9.5 rounded-xl border-border/80 bg-background text-sm"
          />
        </div>

        {/* Lead Revival Cards List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredLeads.map((lead) => {
            const initials = getInitials(lead.name);
            const tagInfo = tagStyles[lead.tag];
            const cleanPhone = lead.phoneNormalized.replace(/\D/g, "");

            return (
              <div
                key={lead.id}
                className="group rounded-xl border border-border/80 bg-background hover:border-purple-500/40 p-5 transition-all duration-200 shadow-xs hover:shadow-md"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Left Column: Contact & Dormancy Info */}
                  <div className="flex items-start gap-3.5">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-700 font-bold text-sm border border-purple-500/20 dark:bg-purple-500/20 dark:text-purple-400">
                      {initials}
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => handleOpenLead(lead)}
                          className="font-bold text-base text-foreground hover:text-orange-600 transition-colors text-left"
                        >
                          {lead.name}
                        </button>
                        <Badge
                          variant="outline"
                          className={`text-[11px] uppercase px-2 py-0.5 rounded-full border flex items-center gap-1 ${tagInfo.pill}`}
                        >
                          <span className={`size-1.5 rounded-full ${tagInfo.dot}`} />
                          {lead.score} Score
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="text-[11px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20"
                        >
                          <Clock className="size-3 mr-1" />
                          Dormant {lead.intelligence.dormantDays} Days
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="font-mono text-foreground font-medium">
                          {lead.phoneNormalized}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-foreground font-semibold">
                          <DollarSign className="size-3 text-emerald-500" />
                          {lead.intelligence.budgetFormatted}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3 text-orange-500" />
                          {lead.intelligence.preferredAreas.join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Quick Action */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenLead(lead)}
                      className="rounded-xl text-xs h-9 gap-1.5 border-border/80"
                    >
                      <Sparkles className="size-3.5 text-orange-500" />
                      View AI Card
                    </Button>

                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs h-9 gap-1.5 shadow-sm"
                      asChild
                    >
                      <a
                        href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                          `Hi ${lead.name}, I noticed a great property opportunity in ${lead.intelligence.preferredAreas[0]} that aligns with your criteria...`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageSquare className="size-3.5" />
                        Re-engage on WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Revival Catalyst & Reasoning Banner */}
                <div className="mt-4 pt-3 border-t border-border/60 grid sm:grid-cols-12 gap-3 items-center">
                  <div className="sm:col-span-4">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-400 flex items-center gap-1">
                      <Sparkles className="size-3" />
                      Revival Catalyst
                    </span>
                    <p className="text-xs font-bold text-foreground mt-0.5">
                      {lead.intelligence.revivalCatalyst}
                    </p>
                  </div>

                  <div className="sm:col-span-8">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      AI Revival Reasoning
                    </span>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {lead.intelligence.revivalReason}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Intelligence Modal */}
      <LeadIntelligenceModal
        lead={selectedLead}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}
