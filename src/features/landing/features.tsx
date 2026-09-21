"use client";

// External imports
import {
  FileSpreadsheet,
  Sparkles,
  RotateCcw,
  Phone,
  ShieldCheck,
  Building2,
  BrainCircuit,
  MapPin,
  Clock,
  DollarSign,
} from "lucide-react";

// Internal imports
import { Card, CardTitle } from "@/components/ui/card";

/**
 * SectionTitle component for consistent headings across sections
 */
const SectionTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
      <h2 className="text-3xl font-bold tracking-tight uppercase sm:text-4xl">
        <span className="relative">
          {title.split(" ").map((word, i) => (
            <span key={i} className={i === 1 ? "text-primary" : ""}>
              {word}{" "}
            </span>
          ))}
        </span>
      </h2>
      <p className="text-muted-foreground mt-4 max-w-2xl text-center text-lg">
        {subtitle}
      </p>
    </div>
  );
};

/**
 * FeatureCard component displaying individual feature with icon and description
 */
const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
  return (
    <Card
      key={index}
      className="border-border/50 bg-background/60 hover:border-primary/20 group overflow-hidden rounded-xl border p-1 transition-all duration-300 hover:shadow-lg"
    >
      <div className="relative p-5">
        <div
          className="group-hover:bg-opacity-80 mb-3 flex h-14 w-14 items-center justify-center rounded-lg transition-all duration-300"
          style={{ backgroundColor: feature.bgColor, color: feature.textColor }}
          aria-hidden="true"
        >
          {feature.icon}
        </div>
        <CardTitle className="mb-1 text-xl font-semibold tracking-tight">
          {feature.title}
        </CardTitle>
        <p className="text-muted-foreground">{feature.description}</p>
      </div>
    </Card>
  );
};

/**
 * PropEase V1 feature cards — the 6 core capabilities
 */
const features = [
  {
    title: "AI Lead Scoring",
    description:
      "Every lead is scored 0–100 by buyer intent, budget clarity, area specificity, and closing urgency. Hot / Warm / Cold tags assigned automatically.",
    icon: <Sparkles className="h-7 w-7" aria-hidden="true" />,
    bgColor: "rgba(249, 115, 22, 0.1)",
    textColor: "rgb(249, 115, 22)",
  },
  {
    title: "Reactivation Engine",
    description:
      "AI flags dormant leads worth reviving when market events, new launches, or buyer signals create a high-probability window.",
    icon: <RotateCcw className="h-7 w-7" aria-hidden="true" />,
    bgColor: "rgba(168, 85, 247, 0.1)",
    textColor: "rgb(168, 85, 247)",
  },
  {
    title: "CSV & Excel Import",
    description:
      "Upload messy real-world files (.csv, .xlsx, .xls). Handles Arabic text, mixed encodings, empty rows, and inconsistent date formats without crashing.",
    icon: <FileSpreadsheet className="h-7 w-7" aria-hidden="true" />,
    bgColor: "rgba(34, 197, 94, 0.1)",
    textColor: "rgb(34, 197, 94)",
  },
  {
    title: "Smart Column Mapping",
    description:
      "Auto-detects common CRM headers (name, phone, channel, budget, date). Confirm or fix the mapping before a single lead is imported.",
    icon: <ShieldCheck className="h-7 w-7" aria-hidden="true" />,
    bgColor: "rgba(14, 165, 233, 0.1)",
    textColor: "rgb(14, 165, 233)",
  },
  {
    title: "UAE Phone Deduplication",
    description:
      "Normalizes all Dubai phone formats to E.164 (+971). Deduplicates across your entire workspace so you never score the same lead twice.",
    icon: <Phone className="h-7 w-7" aria-hidden="true" />,
    bgColor: "rgba(234, 179, 8, 0.1)",
    textColor: "rgb(234, 179, 8)",
  },
  {
    title: "Multi-Tenant Workspaces",
    description:
      "Each agency gets its own isolated workspace. Row-level security ensures no broker can ever see another org's leads.",
    icon: <Building2 className="h-7 w-7" aria-hidden="true" />,
    bgColor: "rgba(99, 102, 241, 0.1)",
    textColor: "rgb(99, 102, 241)",
  },
];

/**
 * Main Features component
 */
export function Features() {
  return (
    <section
      id="features"
      className="relative"
      aria-labelledby="features-heading"
    >
      {/* Background elements */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"
        aria-hidden="true"
      ></div>
      <div
        className="absolute top-1/4 left-1/4 -z-10 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl"
        aria-hidden="true"
      ></div>
      <div
        className="absolute right-1/4 bottom-1/4 -z-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl"
        aria-hidden="true"
      ></div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <SectionTitle
          title="Powerful Features"
          subtitle="Everything Dubai real estate brokers need to know which leads to call first — and which dormant leads to revive."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>

        {/* Feature highlight — Dubai real estate AI context */}
        <div className="border-border/50 bg-background/50 mt-24 rounded-xl border p-8 lg:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
            <div
              className="flex h-20 w-20 items-center justify-center rounded-lg bg-orange-500/10 md:h-24 md:w-24"
              aria-hidden="true"
            >
              <BrainCircuit className="h-10 w-10 text-orange-500 md:h-12 md:w-12" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold tracking-tight">
                WHY AI SCORING WORKS FOR DUBAI REAL ESTATE
              </h3>
              <p className="text-muted-foreground mt-4 text-lg">
                PropEase's AI is trained on Dubai-specific intent signals — not generic CRM data.
                It scores on what actually predicts a sale: stated budget in AED, area specificity
                (Marina vs JVC vs Palm), off-plan vs secondary preference, timeline urgency, and
                engagement responsiveness. Every score comes with a 1–2 sentence reason your broker
                can act on immediately.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/10"
                    aria-hidden="true"
                  >
                    <DollarSign className="h-4 w-4 text-orange-500" />
                  </span>
                  <span className="text-sm font-medium">
                    Budget clarity (AED)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/10"
                    aria-hidden="true"
                  >
                    <MapPin className="h-4 w-4 text-orange-500" />
                  </span>
                  <span className="text-sm font-medium">Area specificity</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/10"
                    aria-hidden="true"
                  >
                    <Clock className="h-4 w-4 text-orange-500" />
                  </span>
                  <span className="text-sm font-medium">
                    Timeline urgency signals
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
