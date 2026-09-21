"use client";

import { Lead } from "@/features/dashboard/pages/leads/types/lead";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Phone,
  MessageSquare,
  Building,
  MapPin,
  Clock,
  UserCheck,
  CheckCircle2,
  Copy,
  ExternalLink,
  DollarSign,
} from "lucide-react";
import { useState } from "react";

interface LeadIntelligenceModalProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeadIntelligenceModal({
  lead,
  open,
  onOpenChange,
}: LeadIntelligenceModalProps) {
  const [copied, setCopied] = useState(false);

  if (!lead) return null;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(lead.phoneNormalized);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "hot":
        return "bg-emerald-500/10 text-emerald-700 border-emerald-500/30 dark:bg-emerald-500/20 dark:text-emerald-400";
      case "warm":
        return "bg-amber-500/10 text-amber-700 border-amber-500/30 dark:bg-amber-500/20 dark:text-amber-400";
      case "cold":
      default:
        return "bg-slate-500/10 text-slate-700 border-slate-500/30 dark:bg-slate-500/20 dark:text-slate-400";
    }
  };

  const getChannelLabel = (channel: string) => {
    switch (channel) {
      case "property_finder":
        return "Property Finder";
      case "bayut":
        return "Bayut";
      case "dubizzle":
        return "Dubizzle";
      case "meta_ads":
        return "Meta Ads";
      case "google_ads":
        return "Google Ads";
      case "walk_in":
        return "Walk-in";
      case "referral":
        return "Referral";
      default:
        return channel;
    }
  };

  const cleanWhatsAppPhone = lead.phoneNormalized.replace(/\D/g, "");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0 border-border shadow-2xl rounded-2xl">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent border-b border-border/60 p-6">
          <DialogHeader>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm shadow-orange-500/30">
                  <Sparkles className="size-4" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2.5">
                    {lead.name}
                    <Badge
                      variant="outline"
                      className={`text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full ${getTagColor(
                        lead.tag
                      )}`}
                    >
                      <span
                        className={`size-1.5 rounded-full mr-1.5 ${
                          lead.tag === "hot"
                            ? "bg-emerald-500 animate-pulse"
                            : lead.tag === "warm"
                            ? "bg-amber-500"
                            : "bg-slate-500"
                        }`}
                      />
                      {lead.tag} ({lead.score}/100)
                    </Badge>
                  </DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                    Lead ID: <span className="font-mono">{lead.leadNumber}</span> • Source: {getChannelLabel(lead.channel)}
                  </DialogDescription>
                </div>
              </div>
            </div>
          </DialogHeader>

          {/* Quick Actions Bar */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-border/40">
            <Button
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs h-8 gap-1.5 shadow-sm"
              asChild
            >
              <a
                href={`https://wa.me/${cleanWhatsAppPhone}?text=${encodeURIComponent(
                  `Hello ${lead.name}, regarding your Dubai property inquiry...`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare className="size-3.5" />
                WhatsApp Buyer
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl text-xs h-8 gap-1.5"
              asChild
            >
              <a href={`tel:${lead.phoneNormalized}`}>
                <Phone className="size-3.5" />
                {lead.phoneNormalized}
              </a>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyPhone}
              className="rounded-xl text-xs h-8 gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <Copy className="size-3.5" />
              {copied ? "Copied!" : "Copy Phone"}
            </Button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* AI Intent Summary Card */}
          <div className="rounded-xl border border-orange-500/20 bg-orange-500/[0.03] p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              <Sparkles className="size-3.5" />
              AI Intent Reasoning
            </div>
            <p className="text-sm font-medium text-foreground leading-relaxed">
              {lead.intelligence.intentReason}
            </p>
          </div>

          {/* Key Parameters Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-border/60 bg-card p-3 space-y-1">
              <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
                <DollarSign className="size-3 text-emerald-500" />
                Budget
              </span>
              <p className="text-sm font-bold text-foreground">
                {lead.intelligence.budgetFormatted || "Not Specified"}
              </p>
            </div>

            <div className="rounded-xl border border-border/60 bg-card p-3 space-y-1">
              <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
                <Building className="size-3 text-blue-500" />
                Property Type
              </span>
              <p className="text-sm font-bold capitalize text-foreground">
                {lead.intelligence.propertyType || "Any Residential"}
              </p>
            </div>

            <div className="rounded-xl border border-border/60 bg-card p-3 space-y-1">
              <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
                <Clock className="size-3 text-amber-500" />
                Timeline
              </span>
              <p className="text-sm font-bold text-foreground">
                {lead.intelligence.purchaseTimeline}
              </p>
            </div>

            <div className="rounded-xl border border-border/60 bg-card p-3 space-y-1">
              <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
                <UserCheck className="size-3 text-purple-500" />
                Buyer Profile
              </span>
              <p className="text-sm font-bold capitalize text-foreground">
                {lead.intelligence.buyerType.replace("_", " ")}
              </p>
            </div>
          </div>

          {/* Preferred Communities */}
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <MapPin className="size-3.5 text-orange-500" />
              Target Dubai Communities
            </span>
            <div className="flex flex-wrap gap-2">
              {lead.intelligence.preferredAreas.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-muted text-foreground border border-border"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Key Detected Intent Signals */}
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Detected High-Intent Signals
            </span>
            <div className="grid sm:grid-cols-2 gap-2">
              {lead.intelligence.keySignals.map((signal, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2.5 rounded-lg border border-border/50 bg-muted/30 text-xs text-foreground"
                >
                  <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{signal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Broker Action */}
          <div className="rounded-xl border border-border bg-muted/40 p-4 space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Recommended Broker Next Action
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {lead.intelligence.recommendedAction}
            </p>
          </div>

          {lead.intelligence.reactivationCandidate && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                AI Revival Catalyst (Dormant {lead.intelligence.dormantDays} Days)
              </span>
              <p className="text-xs text-foreground">
                {lead.intelligence.revivalReason}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
