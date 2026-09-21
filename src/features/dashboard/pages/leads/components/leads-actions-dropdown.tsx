"use client";

import { Lead } from "@/features/dashboard/pages/leads/types/lead";
import {
  MoreHorizontal,
  Sparkles,
  PhoneCall,
  MessageSquare,
  Copy,
  Calendar,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface LeadActionsProps {
  lead: Lead;
  onOpenIntelligence?: () => void;
}

export function LeadActionsDropdown({
  lead,
  onOpenIntelligence,
}: LeadActionsProps) {
  const [copied, setCopied] = useState(false);
  const cleanPhone = lead.phoneNormalized.replace(/\D/g, "");

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(lead.phoneNormalized);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0 rounded-lg">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52 rounded-xl shadow-lg">
          <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
            Lead Actions
          </DropdownMenuLabel>
          {onOpenIntelligence && (
            <DropdownMenuItem
              onClick={onOpenIntelligence}
              className="cursor-pointer text-orange-600 focus:text-orange-700 font-medium"
            >
              <Sparkles className="mr-2 h-4 w-4 text-orange-500" />
              <span>View AI Brief</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild className="cursor-pointer">
            <a
              href={`https://wa.me/${cleanPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-emerald-600 focus:text-emerald-700 font-medium"
            >
              <MessageSquare className="mr-2 h-4 w-4 text-emerald-500" />
              <span>WhatsApp Buyer</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <a href={`tel:${lead.phoneNormalized}`} className="flex items-center">
              <PhoneCall className="mr-2 h-4 w-4" />
              <span>Call Phone</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyPhone} className="cursor-pointer">
            <Copy className="mr-2 h-4 w-4" />
            <span>{copied ? "Copied!" : "Copy Phone"}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
            Pipeline Update
          </DropdownMenuLabel>
          <DropdownMenuItem className="cursor-pointer">
            <Calendar className="mr-2 h-4 w-4 text-purple-500" />
            <span>Schedule Viewing</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <CheckCircle2 className="mr-2 h-4 w-4 text-teal-500" />
            <span>Mark Won / Closed</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Archive Lead</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
