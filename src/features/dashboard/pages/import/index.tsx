"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Upload,
  FileSpreadsheet,
  Plus,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  HelpCircle,
  FileText,
  User,
  Phone,
  Building,
  DollarSign,
  MapPin,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock detected columns from uploaded file
const SAMPLE_CSV_ROWS = [
  {
    rawName: "Sultan Al-Nuaimi",
    rawPhone: "050 443 8912",
    rawChannel: "Property Finder",
    rawNotes: "Looking for 4BR villa in Tilal Al Ghaf with private pool. Budget around 7.5M.",
    rawDate: "2026-03-27",
    rawBudget: "AED 7,500,000",
    status: "valid",
    normalizedPhone: "+971 50 443 8912",
  },
  {
    rawName: "Dmitry Volkov",
    rawPhone: "+971559981234",
    rawChannel: "Bayut",
    rawNotes: "Off-plan investor interested in Binghatti or Damac Lagoon launches.",
    rawDate: "2026-03-26",
    rawBudget: "AED 2,200,000",
    status: "valid",
    normalizedPhone: "+971 55 998 1234",
  },
  {
    rawName: "Claire Beauchamp",
    rawPhone: "058-123-4567",
    rawChannel: "Meta Ads",
    rawNotes: "Relocating from Paris in July. Wants 2BR apartment in Downtown or Marina.",
    rawDate: "2026-03-25",
    rawBudget: "AED 3,100,000",
    status: "valid",
    normalizedPhone: "+971 58 123 4567",
  },
  {
    rawName: "Ahmed Mansoor",
    rawPhone: "+971 50 892 4192",
    rawChannel: "Dubizzle",
    rawNotes: "Duplicate inquiry test",
    rawDate: "2026-03-24",
    rawBudget: "AED 5,000,000",
    status: "duplicate",
    normalizedPhone: "+971 50 892 4192",
  },
];

export function ImportPage() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") === "manual" ? "manual" : "file";

  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const [selectedFile, setSelectedFile] = useState<string | null>("dubai_leads_march_2026.xlsx");
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);

  // Column Mappings State
  const [columnMap, setColumnMap] = useState({
    name: "Full Name",
    phone: "Mobile Number",
    channel: "Lead Source",
    notes: "Inquiry Message",
    budget: "Budget Range",
    date: "Created Date",
  });

  // Manual Form State
  const [manualForm, setManualForm] = useState({
    name: "",
    phone: "",
    channel: "property_finder",
    budget: "",
    preferredArea: "",
    propertyType: "apartment",
    notes: "",
  });
  const [manualSuccess, setManualSuccess] = useState(false);

  const handleSimulateImport = () => {
    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      setImportSuccess(true);
    }, 1500);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setManualSuccess(true);
    setTimeout(() => {
      setManualSuccess(false);
      setManualForm({
        name: "",
        phone: "",
        channel: "property_finder",
        budget: "",
        preferredArea: "",
        propertyType: "apartment",
        notes: "",
      });
    }, 2500);
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Import Leads & Ingestion
          </h1>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-600 border border-orange-500/20">
            <Sparkles className="size-3" />
            UAE Normalized
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Upload bulk leads from CSV, Excel (.xlsx, .xls), or add single inquiries. Automatically normalized with Dubai phone dedup (+971) and AI scoring.
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2 rounded-xl h-11 p-1 bg-muted">
          <TabsTrigger
            value="file"
            className="rounded-lg text-xs font-semibold flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-xs dark:data-[state=active]:bg-zinc-900"
          >
            <Upload className="size-3.5" />
            File Import (CSV / Excel)
          </TabsTrigger>
          <TabsTrigger
            value="manual"
            className="rounded-lg text-xs font-semibold flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-xs dark:data-[state=active]:bg-zinc-900"
          >
            <Plus className="size-3.5" />
            Single Lead Entry
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: File Upload & Column Mapping */}
        <TabsContent value="file" className="space-y-6">
          {/* Dropzone Card */}
          <div className="rounded-2xl border-2 border-dashed border-border/80 bg-card p-8 text-center hover:border-orange-500/50 transition-colors">
            <div className="mx-auto flex max-w-md flex-col items-center justify-center">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600 mb-4 shadow-sm shadow-orange-500/20">
                <FileSpreadsheet className="size-7" />
              </div>
              <h3 className="text-base font-bold text-foreground">
                Drop your Dubai lead spreadsheet here
              </h3>
              <p className="mt-1 text-xs text-muted-foreground max-w-sm">
                Supports CSV, Excel (.xlsx, .xls). Automatic UTF-8, Arabic text, and mixed Dubai phone format detection.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <Button
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs h-9 px-4 gap-1.5 shadow-sm"
                  onClick={() => setSelectedFile("dubai_crm_export_march_2026.xlsx")}
                >
                  <Upload className="size-3.5" />
                  Browse Files
                </Button>
                {selectedFile && (
                  <Badge variant="secondary" className="text-xs py-1 px-3 rounded-lg font-mono">
                    {selectedFile}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Column Mapping Section */}
          {selectedFile && (
            <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border/60 pb-4">
                <div>
                  <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                    <ShieldCheck className="size-4 text-emerald-500" />
                    Auto-Detected Column Mapping
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    We mapped standard Dubai CRM headers automatically. Confirm or adjust mapping below.
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="text-xs font-semibold bg-emerald-500/10 text-emerald-700 border-emerald-500/30 w-fit"
                >
                  6 Columns Mapped (100%)
                </Badge>
              </div>

              {/* Column mapping grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase">
                    Contact Name *
                  </Label>
                  <Select
                    value={columnMap.name}
                    onValueChange={(val) => setColumnMap({ ...columnMap, name: val })}
                  >
                    <SelectTrigger className="rounded-xl h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full Name">Full Name (Column A)</SelectItem>
                      <SelectItem value="Client Name">Client Name</SelectItem>
                      <SelectItem value="Buyer">Buyer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase">
                    Phone Number (+971) *
                  </Label>
                  <Select
                    value={columnMap.phone}
                    onValueChange={(val) => setColumnMap({ ...columnMap, phone: val })}
                  >
                    <SelectTrigger className="rounded-xl h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mobile Number">Mobile Number (Column B)</SelectItem>
                      <SelectItem value="Phone">Phone</SelectItem>
                      <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase">
                    Channel / Portal *
                  </Label>
                  <Select
                    value={columnMap.channel}
                    onValueChange={(val) => setColumnMap({ ...columnMap, channel: val })}
                  >
                    <SelectTrigger className="rounded-xl h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Lead Source">Lead Source (Column C)</SelectItem>
                      <SelectItem value="Channel">Channel</SelectItem>
                      <SelectItem value="Campaign">Campaign</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase">
                    Budget (AED)
                  </Label>
                  <Select
                    value={columnMap.budget}
                    onValueChange={(val) => setColumnMap({ ...columnMap, budget: val })}
                  >
                    <SelectTrigger className="rounded-xl h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Budget Range">Budget Range (Column D)</SelectItem>
                      <SelectItem value="Price">Price</SelectItem>
                      <SelectItem value="Value">Value</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase">
                    Inquiry Notes / Message
                  </Label>
                  <Select
                    value={columnMap.notes}
                    onValueChange={(val) => setColumnMap({ ...columnMap, notes: val })}
                  >
                    <SelectTrigger className="rounded-xl h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inquiry Message">Inquiry Message (Column E)</SelectItem>
                      <SelectItem value="Notes">Notes</SelectItem>
                      <SelectItem value="Comments">Comments</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase">
                    Inquiry Date
                  </Label>
                  <Select
                    value={columnMap.date}
                    onValueChange={(val) => setColumnMap({ ...columnMap, date: val })}
                  >
                    <SelectTrigger className="rounded-xl h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Created Date">Created Date (Column F)</SelectItem>
                      <SelectItem value="Timestamp">Timestamp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Sample Data Preview Table */}
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Live Sample Data Preview (First 4 Rows)
                </span>
                <div className="rounded-xl border border-border/80 overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-semibold border-b border-border/60">
                      <tr>
                        <th className="py-2.5 px-3">Name</th>
                        <th className="py-2.5 px-3">Raw Phone</th>
                        <th className="py-2.5 px-3">Normalized Phone</th>
                        <th className="py-2.5 px-3">Channel</th>
                        <th className="py-2.5 px-3">Budget</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                      {SAMPLE_CSV_ROWS.map((row, i) => (
                        <tr key={i} className="hover:bg-muted/30">
                          <td className="py-2.5 px-3 font-semibold text-foreground">
                            {row.rawName}
                          </td>
                          <td className="py-2.5 px-3 font-mono text-muted-foreground">
                            {row.rawPhone}
                          </td>
                          <td className="py-2.5 px-3 font-mono font-medium text-foreground">
                            {row.normalizedPhone}
                          </td>
                          <td className="py-2.5 px-3">{row.rawChannel}</td>
                          <td className="py-2.5 px-3 font-medium text-emerald-600">
                            {row.rawBudget}
                          </td>
                          <td className="py-2.5 px-3">
                            {row.status === "valid" ? (
                              <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-500/20 text-[10px] py-0">
                                Ready to Score
                              </Badge>
                            ) : (
                              <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/20 text-[10px] py-0">
                                Duplicate in Org
                              </Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Import Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-border/60">
                <div className="text-xs text-muted-foreground">
                  <span>
                    Ready to import <strong>3 unique leads</strong> (1 duplicate will be skipped).
                  </span>
                </div>
                <Button
                  onClick={handleSimulateImport}
                  disabled={isImporting}
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs h-9 px-5 gap-2 shadow-sm font-semibold"
                >
                  {isImporting ? (
                    <>
                      <Sparkles className="size-3.5 animate-spin" />
                      Normalizing & AI Scoring...
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-3.5" />
                      Confirm & Run AI Lead Scoring
                    </>
                  )}
                </Button>
              </div>

              {importSuccess && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-emerald-600" />
                    <span>
                      Successfully imported and AI scored 3 leads. Deduplication skipped 1 existing contact.
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs bg-white dark:bg-zinc-900"
                    asChild
                  >
                    <a href="/dashboard/leads">View in Pipeline →</a>
                  </Button>
                </div>
              )}
            </div>
          )}
        </TabsContent>

        {/* Tab 2: Manual Single Lead Entry */}
        <TabsContent value="manual">
          <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
            <div className="border-b border-border/60 pb-4 mb-6">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Plus className="size-4 text-orange-500" />
                Quick Add Single Dubai Lead
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Add an individual inquiry from a walk-in, phone call, or direct developer referral for instant AI intent prioritization.
              </p>
            </div>

            <form onSubmit={handleManualSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase">
                    Buyer / Inquirer Full Name *
                  </Label>
                  <Input
                    placeholder="e.g. Tariq Al-Ghurair"
                    required
                    value={manualForm.name}
                    onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
                    className="rounded-xl h-9.5 text-xs"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase">
                    Phone Number (UAE / International) *
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="+971 50 123 4567 or 050..."
                      required
                      value={manualForm.phone}
                      onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
                      className="rounded-xl h-9.5 text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Channel Source */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase">
                    Lead Source Channel *
                  </Label>
                  <Select
                    value={manualForm.channel}
                    onValueChange={(val) => setManualForm({ ...manualForm, channel: val })}
                  >
                    <SelectTrigger className="rounded-xl h-9.5 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="property_finder">Property Finder</SelectItem>
                      <SelectItem value="bayut">Bayut</SelectItem>
                      <SelectItem value="dubizzle">Dubizzle</SelectItem>
                      <SelectItem value="walk_in">Walk-in Client</SelectItem>
                      <SelectItem value="referral">Direct Referral / Network</SelectItem>
                      <SelectItem value="meta_ads">Meta Ads (Facebook/Instagram)</SelectItem>
                      <SelectItem value="google_ads">Google Search Ads</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Budget */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase">
                    Stated Budget (AED)
                  </Label>
                  <Input
                    placeholder="e.g. 4,500,000"
                    value={manualForm.budget}
                    onChange={(e) => setManualForm({ ...manualForm, budget: e.target.value })}
                    className="rounded-xl h-9.5 text-xs"
                  />
                </div>

                {/* Preferred Area */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase">
                    Target Dubai Communities
                  </Label>
                  <Input
                    placeholder="e.g. Palm Jumeirah, Dubai Hills Estate"
                    value={manualForm.preferredArea}
                    onChange={(e) => setManualForm({ ...manualForm, preferredArea: e.target.value })}
                    className="rounded-xl h-9.5 text-xs"
                  />
                </div>

                {/* Property Type */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase">
                    Property Type
                  </Label>
                  <Select
                    value={manualForm.propertyType}
                    onValueChange={(val) => setManualForm({ ...manualForm, propertyType: val })}
                  >
                    <SelectTrigger className="rounded-xl h-9.5 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="penthouse">Penthouse</SelectItem>
                      <SelectItem value="duplex">Duplex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Inquiry Notes */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground uppercase">
                  Inquiry Details / Client Conversation Notes
                </Label>
                <Textarea
                  placeholder="Paste WhatsApp chat snippet, portal inquiry text, or broker conversation notes here for AI intent analysis..."
                  rows={3}
                  value={manualForm.notes}
                  onChange={(e) => setManualForm({ ...manualForm, notes: e.target.value })}
                  className="rounded-xl text-xs"
                />
              </div>

              {/* Submit button */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border/60">
                <Button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs h-9.5 px-6 gap-2 shadow-sm font-semibold"
                >
                  <Sparkles className="size-3.5" />
                  Save Lead & Score Intent
                </Button>
              </div>

              {manualSuccess && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  <span>
                    Lead added successfully! Normalized phone: +971 and added to New Leads pipeline.
                  </span>
                </div>
              )}
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
