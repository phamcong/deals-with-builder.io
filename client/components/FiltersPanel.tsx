import { DealStage } from "@shared/types";
import { Search, Filter, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface FiltersPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    dealName: string;
    customer: string;
    stage: DealStage | "all";
  };
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
  uniqueCustomers: string[];
  filteredCount: number;
  totalCount: number;
}

export function FiltersPanel({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearFilters,
  uniqueCustomers,
  filteredCount,
  totalCount,
}: FiltersPanelProps) {
  const hasActiveFilters =
    filters.dealName || filters.customer !== "all" || filters.stage !== "all";

  return (
    <div
      className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 lg:static lg:w-80 lg:shadow-none lg:translate-x-0 lg:flex-shrink-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Deal Name Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Deal Name</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search deal name..."
              value={filters.dealName}
              onChange={(e) => onFilterChange("dealName", e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Customer Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Customer</label>
          <Select
            value={filters.customer}
            onValueChange={(value) => onFilterChange("customer", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All customers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All customers</SelectItem>
              {uniqueCustomers.map((customer) => (
                <SelectItem key={customer} value={customer}>
                  {customer}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Stage Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Stage</label>
          <Select
            value={filters.stage}
            onValueChange={(value) => onFilterChange("stage", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All stages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All stages</SelectItem>
              <SelectItem value="proposal">Proposal</SelectItem>
              <SelectItem value="negotiation">Negotiation</SelectItem>
              <SelectItem value="discovery">Discovery</SelectItem>
              <SelectItem value="closed-won">Closed Won</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button variant="outline" onClick={onClearFilters} className="w-full">
            Clear All Filters
          </Button>
        )}

        {/* Results Count */}
        <div className="pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-600">
            Showing {filteredCount} of {totalCount} deals
          </div>
        </div>
      </div>
    </div>
  );
}
