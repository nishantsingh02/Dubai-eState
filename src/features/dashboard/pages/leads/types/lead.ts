export type LeadScoreTag = "hot" | "warm" | "cold";

export type LeadStatus =
  | "active"
  | "contacted"
  | "scheduled"
  | "negotiating"
  | "closed"
  | "unresponsive";

export type LeadChannel =
  | "property_finder"
  | "bayut"
  | "dubizzle"
  | "meta_ads"
  | "google_ads"
  | "walk_in"
  | "referral";

export type PropertyType =
  | "apartment"
  | "villa"
  | "townhouse"
  | "penthouse"
  | "duplex";

export interface LeadIntelligence {
  budgetAed?: number;
  budgetFormatted?: string;
  preferredAreas: string[];
  propertyType?: PropertyType;
  purchaseTimeline: string; // e.g. "Immediate (< 14 days)", "1-3 Months", "Exploring"
  buyerType: "investor" | "end_user" | "renter";
  intentReason: string; // 1-2 concise actionable sentences
  keySignals: string[];
  recommendedAction: string;
  reactivationCandidate?: boolean;
  dormantDays?: number;
  revivalReason?: string;
  revivalCatalyst?: string;
  lastActiveDate?: string;
}

export interface Lead {
  id: string;
  leadNumber: string;
  name: string;
  email: string;
  phoneRaw: string;
  phoneNormalized: string;
  channel: LeadChannel;
  score: number; // 0-100
  tag: LeadScoreTag; // hot | warm | cold
  status: LeadStatus;
  date: string;
  intelligence: LeadIntelligence;
  notes?: string;
  sourceType: "new" | "imported";
  assignedAgent?: string;
}

export interface LeadFilters {
  tag: LeadScoreTag | "all";
  status: LeadStatus | "all";
  channel: LeadChannel | "all";
  search: string;
  minScore?: number;
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
}
