"use client";

import { useState } from "react";
import {
  Building2,
  ShieldCheck,
  Sparkles,
  Users,
  Save,
  CheckCircle2,
  Sliders,
  Globe,
  Key,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export function SettingsPage() {
  const [saved, setSaved] = useState(false);

  // Agency Profile
  const [agencyName, setAgencyName] = useState("Apex Real Estate Dubai");
  const [reraLicense, setReraLicense] = useState("RERA-ORN-28941");
  const [defaultCurrency, setDefaultCurrency] = useState("AED");
  const [primaryFocus, setPrimaryFocus] = useState("Luxury Residential & Off-Plan");

  // Scoring Settings
  const [modelProvider, setModelProvider] = useState("openai");
  const [hotThreshold, setHotThreshold] = useState("85");
  const [dormancyDays, setDormancyDays] = useState("45");
  const [autoRevival, setAutoRevival] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Agency Workspace Settings
          </h1>
          <Badge
            variant="outline"
            className="text-xs font-semibold bg-orange-500/10 text-orange-600 border-orange-500/20"
          >
            Multi-Tenant Workspace
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Configure your Dubai brokerage profile, RERA compliance details, AI intent thresholds, and lead scoring parameters.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Agency Profile */}
        <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border/60 pb-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
              <Building2 className="size-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">
                Agency & RERA License Profile
              </h3>
              <p className="text-xs text-muted-foreground">
                Organization details displayed on exported intelligence briefs and client dossiers.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase">
                Agency Name
              </Label>
              <Input
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
                className="rounded-xl h-9.5 text-xs font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase">
                Dubai RERA ORN License
              </Label>
              <Input
                value={reraLicense}
                onChange={(e) => setReraLicense(e.target.value)}
                className="rounded-xl h-9.5 text-xs font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase">
                Default Currency
              </Label>
              <Select value={defaultCurrency} onValueChange={setDefaultCurrency}>
                <SelectTrigger className="rounded-xl h-9.5 text-xs font-medium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="AED">AED (United Arab Emirates Dirham)</SelectItem>
                  <SelectItem value="USD">USD (US Dollar)</SelectItem>
                  <SelectItem value="EUR">EUR (Euro)</SelectItem>
                  <SelectItem value="GBP">GBP (British Pound)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase">
                Primary Asset Focus
              </Label>
              <Input
                value={primaryFocus}
                onChange={(e) => setPrimaryFocus(e.target.value)}
                className="rounded-xl h-9.5 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Section 2: AI Intent Scoring Parameters */}
        <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border/60 pb-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
              <Sparkles className="size-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">
                AI Intent Engine & Scoring Thresholds
              </h3>
              <p className="text-xs text-muted-foreground">
                Tune AI provider preferences, priority tag cutoffs, and dormant revival rules.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase">
                AI Scoring Provider
              </Label>
              <Select value={modelProvider} onValueChange={setModelProvider}>
                <SelectTrigger className="rounded-xl h-9.5 text-xs font-medium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="openai">OpenAI (GPT-4o mini — Fast & Cost-Effective)</SelectItem>
                  <SelectItem value="anthropic">Anthropic (Claude 3.5 Sonnet — Deep Reasoning)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase">
                Hot Priority Threshold (Min Score)
              </Label>
              <Input
                type="number"
                min="70"
                max="95"
                value={hotThreshold}
                onChange={(e) => setHotThreshold(e.target.value)}
                className="rounded-xl h-9.5 text-xs font-mono"
              />
              <span className="text-[10px] text-muted-foreground">
                Leads scoring ≥ {hotThreshold} receive 🔥 Hot Priority tag and immediate broker alert.
              </span>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase">
                Dormant Revival Window (Days)
              </Label>
              <Input
                type="number"
                min="14"
                max="180"
                value={dormancyDays}
                onChange={(e) => setDormancyDays(e.target.value)}
                className="rounded-xl h-9.5 text-xs font-mono"
              />
              <span className="text-[10px] text-muted-foreground">
                Uncontacted leads older than {dormancyDays} days enter the Reactivation evaluation pool.
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/20">
              <div className="space-y-0.5">
                <Label className="text-xs font-semibold text-foreground cursor-pointer">
                  Auto-Detect Revival Triggers
                </Label>
                <p className="text-[11px] text-muted-foreground">
                  Match dormant leads against new Dubai developer project handovers.
                </p>
              </div>
              <Switch checked={autoRevival} onCheckedChange={setAutoRevival} />
            </div>
          </div>
        </div>

        {/* Section 3: Workspace Members */}
        <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
                <Users className="size-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">
                  Workspace Team & Brokers
                </h3>
                <p className="text-xs text-muted-foreground">
                  Active licensed agents with access to this agency workspace.
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-border/40">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-lg bg-orange-500 text-white font-bold text-xs">
                  TM
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Tariq Mansoor (You)</p>
                  <p className="text-[11px] text-muted-foreground">tariq@apexrealty.ae</p>
                </div>
              </div>
              <Badge variant="outline" className="text-[11px] bg-orange-500/10 text-orange-600 border-orange-500/20">
                Principal Broker (Admin)
              </Badge>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-lg bg-muted text-foreground font-bold text-xs">
                  SJ
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Sarah Jenkins</p>
                  <p className="text-[11px] text-muted-foreground">sarah.j@apexrealty.ae</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-[11px]">
                Senior Luxury Broker
              </Badge>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-2">
          {saved ? (
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 animate-in fade-in">
              <CheckCircle2 className="size-4 text-emerald-600" />
              <span>Workspace settings saved successfully!</span>
            </div>
          ) : (
            <div />
          )}

          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs h-9.5 px-6 gap-2 shadow-sm font-semibold"
          >
            <Save className="size-3.5" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
