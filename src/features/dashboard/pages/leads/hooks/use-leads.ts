import { useState, useMemo } from "react";
import { Lead, LeadFilters } from "@/features/dashboard/pages/leads/types/lead";
import { mockLeads } from "../data/mock-leads";
import {
  SortingState,
  PaginationState,
  OnChangeFn,
} from "@tanstack/react-table";

interface UseLeadsProps {
  initialLeads?: Lead[];
  onlyReactivation?: boolean;
}

export function useLeads({
  initialLeads = mockLeads,
  onlyReactivation = false,
}: UseLeadsProps = {}) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [filters, setFilters] = useState<LeadFilters>({
    tag: "all",
    channel: "all",
    status: "all",
    search: "",
    dateRange: {
      from: undefined,
      to: undefined,
    },
  });

  // Default sort: score descending per agent.md
  const [sorting, setSorting] = useState<SortingState>([
    { id: "score", desc: true },
  ]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const baseLeads = useMemo(() => {
    if (onlyReactivation) {
      return initialLeads.filter((l) => l.intelligence.reactivationCandidate);
    }
    return initialLeads;
  }, [initialLeads, onlyReactivation]);

  const filteredLeads = useMemo(() => {
    return baseLeads.filter((lead) => {
      // Score Tag filter
      if (filters.tag !== "all" && lead.tag !== filters.tag) {
        return false;
      }

      // Channel filter
      if (filters.channel !== "all" && lead.channel !== filters.channel) {
        return false;
      }

      // Status filter
      if (filters.status !== "all" && lead.status !== filters.status) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const searchableFields = [
          lead.name,
          lead.phoneNormalized,
          lead.phoneRaw,
          lead.email,
          lead.leadNumber,
          lead.intelligence.intentReason,
          lead.intelligence.budgetFormatted || "",
          ...lead.intelligence.preferredAreas,
          lead.intelligence.revivalReason || "",
        ]
          .filter(Boolean)
          .map((field) => field.toLowerCase());

        if (!searchableFields.some((field) => field.includes(searchLower))) {
          return false;
        }
      }

      // Date range filter
      if (filters.dateRange.from || filters.dateRange.to) {
        const leadDate = new Date(lead.date);
        if (filters.dateRange.from && leadDate < filters.dateRange.from) {
          return false;
        }
        if (filters.dateRange.to && leadDate > filters.dateRange.to) {
          return false;
        }
      }

      return true;
    });
  }, [baseLeads, filters]);

  // Handle sorting and pagination
  const paginatedAndSortedLeads = useMemo(() => {
    if (filteredLeads.length === 0) return [];

    if (sorting.length === 0) {
      const startIdx = pagination.pageIndex * pagination.pageSize;
      const endIdx = startIdx + pagination.pageSize;
      return filteredLeads.slice(startIdx, endIdx);
    }

    const sortedLeads = [...filteredLeads].sort((a, b) => {
      for (const sort of sorting) {
        const desc = sort.desc;
        const direction = desc ? -1 : 1;

        if (sort.id === "score") {
          return (a.score - b.score) * direction;
        }

        if (sort.id === "date") {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return (dateA - dateB) * direction;
        }

        if (sort.id === "name") {
          return a.name.localeCompare(b.name) * direction;
        }

        if (sort.id === "phoneNormalized") {
          return a.phoneNormalized.localeCompare(b.phoneNormalized) * direction;
        }

        if (sort.id === "channel") {
          return a.channel.localeCompare(b.channel) * direction;
        }

        if (sort.id === "status") {
          return a.status.localeCompare(b.status) * direction;
        }
      }
      return 0;
    });

    const startIdx = pagination.pageIndex * pagination.pageSize;
    const endIdx = startIdx + pagination.pageSize;
    return sortedLeads.slice(startIdx, endIdx);
  }, [filteredLeads, sorting, pagination]);

  const updateFilters = (newFilters: Partial<LeadFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const handleSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
    setSorting(
      updaterOrValue instanceof Function
        ? updaterOrValue(sorting)
        : updaterOrValue
    );
  };

  const handlePaginationChange: OnChangeFn<PaginationState> = (
    updaterOrValue
  ) => {
    setPagination(
      updaterOrValue instanceof Function
        ? updaterOrValue(pagination)
        : updaterOrValue
    );
  };

  const handleClearFilters = () => {
    setFilters({
      tag: "all",
      channel: "all",
      status: "all",
      search: "",
      dateRange: { from: undefined, to: undefined },
    });
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const handleOpenLeadModal = (lead: Lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  return {
    allLeads: filteredLeads,
    leads: paginatedAndSortedLeads,
    pageCount: Math.ceil(filteredLeads.length / pagination.pageSize),
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
  };
}
