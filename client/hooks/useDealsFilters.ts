import { useState, useMemo } from "react";
import { Deal, DealStage } from "@shared/types";

interface UseDealsFiltersProps {
  deals: Deal[];
  itemsPerPage?: number;
}

export function useDealsFilters({
  deals,
  itemsPerPage = 3,
}: UseDealsFiltersProps) {
  const [filters, setFilters] = useState({
    dealName: "",
    customer: "all",
    stage: "all" as DealStage | "all",
  });

  const [currentPage, setCurrentPage] = useState(1);

  // Get unique customers for filter dropdown
  const uniqueCustomers = useMemo(() => {
    const customers = deals.map((deal) => deal.customer.name);
    return [...new Set(customers)].sort();
  }, [deals]);

  // Filter deals based on current filters
  const filteredDeals = useMemo(() => {
    return deals.filter((deal) => {
      const matchesDealName =
        filters.dealName === "" ||
        deal.dealName.toLowerCase().includes(filters.dealName.toLowerCase());

      const matchesCustomer =
        filters.customer === "all" || deal.customer.name === filters.customer;

      const matchesStage =
        filters.stage === "all" || deal.stage === filters.stage;

      return matchesDealName && matchesCustomer && matchesStage;
    });
  }, [deals, filters]);

  // Pagination logic
  const totalPages = Math.ceil(filteredDeals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDeals = filteredDeals.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ dealName: "", customer: "all", stage: "all" });
  };

  return {
    filters,
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    uniqueCustomers,
    filteredDeals,
    paginatedDeals,
    handleFilterChange,
    clearFilters,
    setCurrentPage,
  };
}
