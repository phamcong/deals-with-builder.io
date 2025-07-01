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
    <div className="bg-gray-50 min-h-0 relative flex">
      {/* Side Panel Overlay */}
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
      <div className="flex-1 transition-all duration-300">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white border border-slate-200/40 rounded-lg overflow-hidden transition-all duration-100">
              {/* Header */}
              <div className="bg-gray-200 px-4 py-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSidePanelOpen(true)}
                    className="lg:hidden"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                  <h3 className="text-lg font-semibold text-gray-800">
                    List of Deals
                  </h3>
                </div>
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
