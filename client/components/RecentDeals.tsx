import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { FiltersPanel } from "./FiltersPanel";
import { DealsTable } from "./DealsTable";
import { DealsPagination } from "./DealsPagination";
import { useDealsFilters } from "../hooks/useDealsFilters";
import { sampleDeals, formatCurrency } from "../data/dealsData";

export function RecentDeals() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const {
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
  } = useDealsFilters({ deals: sampleDeals });

  return (
    <div className="bg-gray-50 min-h-0 relative">
      {/* Side Panel Overlay - only show on mobile when panel is open */}
      {isSidePanelOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidePanelOpen(false)}
        />
      )}

      {/* Filters Panel */}
      <FiltersPanel
        isOpen={isSidePanelOpen}
        onClose={() => setIsSidePanelOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        uniqueCustomers={uniqueCustomers}
        filteredCount={filteredDeals.length}
        totalCount={sampleDeals.length}
      />

      {/* Main Content */}
      <div className="transition-all duration-300">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Menu Button - Outside of table */}
          {!isSidePanelOpen && (
            <div className="mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSidePanelOpen(true)}
                className="flex items-center gap-2"
              >
                <Menu className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            </div>
          )}

          <div className="max-w-7xl mx-auto">
            <div className="bg-white border border-slate-200/40 rounded-lg overflow-hidden transition-all duration-100">
              {/* Header */}
              <div className="bg-gray-200 px-4 py-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  List of Deals
                </h3>
              </div>

              {/* Deals Table */}
              <DealsTable
                deals={paginatedDeals}
                formatCurrency={formatCurrency}
              />

              {/* Pagination */}
              <DealsPagination
                currentPage={currentPage}
                totalPages={totalPages}
                startIndex={startIndex}
                endIndex={endIndex}
                filteredCount={filteredDeals.length}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
