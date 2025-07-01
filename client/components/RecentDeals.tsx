import { Deal, DealStage } from "@shared/types";
import { CustomerAvatar } from "./ui/CustomerAvatar";
import { StatusBadge } from "./ui/StatusBadge";
import { ArrowRight, MoreVertical, Search, Filter, X, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState, useMemo } from "react";

// Sample data matching the provided design
const sampleDeals: Deal[] = [
  {
    id: "1",
    dealName: "Enterprise Software Package",
    customer: { name: "Acme Corp", initial: "A" },
    value: 125000,
    stage: "proposal",
    probability: 75,
    closingDate: "Sep 30, 2023",
  },
  {
    id: "2",
    dealName: "Cloud Migration Service",
    customer: { name: "TechSolutions Inc", initial: "T" },
    value: 87500,
    stage: "negotiation",
    probability: 90,
    closingDate: "Oct 15, 2023",
  },
  {
    id: "3",
    dealName: "Website Redesign Project",
    customer: { name: "Global Media", initial: "G" },
    value: 45000,
    stage: "discovery",
    probability: 60,
    closingDate: "Nov 5, 2023",
  },
  {
    id: "4",
    dealName: "CRM Implementation",
    customer: { name: "RetailGiant", initial: "R" },
    value: 95000,
    stage: "closed-won",
    probability: 100,
    closingDate: "Sep 15, 2023",
  },
  {
    id: "5",
    dealName: "IT Infrastructure Upgrade",
    customer: { name: "HealthCare Pro", initial: "H" },
    value: 135000,
    stage: "negotiation",
    probability: 85,
    closingDate: "Oct 22, 2023",
  },
];

export function RecentDeals() {
  const [filters, setFilters] = useState({
    dealName: "",
    customer: "all",
    stage: "all" as DealStage | "all",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Get unique customers for filter dropdown
  const uniqueCustomers = useMemo(() => {
    const customers = sampleDeals.map(deal => deal.customer.name);
    return [...new Set(customers)].sort();
  }, []);

  // Filter deals based on current filters
  const filteredDeals = useMemo(() => {
    return sampleDeals.filter(deal => {
      const matchesDealName = filters.dealName === "" ||
        deal.dealName.toLowerCase().includes(filters.dealName.toLowerCase());

      const matchesCustomer = filters.customer === "all" ||
        deal.customer.name === filters.customer;

      const matchesStage = filters.stage === "all" ||
        deal.stage === filters.stage;

      return matchesDealName && matchesCustomer && matchesStage;
    });
  }, [filters]);

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
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ dealName: "", customer: "all", stage: "all" });
  };

  return (
    <div className="bg-gray-50 min-h-0 relative">
      {/* Side Panel Overlay */}
      {isSidePanelOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidePanelOpen(false)}
        />
      )}

      {/* Side Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 lg:relative lg:w-80 lg:shadow-none lg:translate-x-0 ${
          isSidePanelOpen ? "translate-x-0" : "-translate-x-full"
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
              onClick={() => setIsSidePanelOpen(false)}
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
                onChange={(e) => handleFilterChange("dealName", e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Customer Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Customer</label>
            <Select
              value={filters.customer}
              onValueChange={(value) => handleFilterChange("customer", value)}
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
              onValueChange={(value) => handleFilterChange("stage", value as DealStage | "all")}
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
          {(filters.dealName || filters.customer !== "all" || filters.stage !== "all") && (
            <Button
              variant="outline"
              onClick={clearFilters}
              className="w-full"
            >
              Clear All Filters
            </Button>
          )}

          {/* Results Count */}
          <div className="pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-600">
              Showing {filteredDeals.length} of {sampleDeals.length} deals
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 lg:ml-80`}>
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
                  <h3 className="text-lg font-semibold text-gray-800">List of Deals</h3>
                </div>
              </div>

          {/* Table Container */}
          <div className="flex-1 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left font-medium py-3 px-4 border-b border-gray-100">
                    Deal Name
                  </th>
                  <th className="text-left font-medium py-3 px-4 border-b border-gray-100">
                    Customer
                  </th>
                  <th className="text-right font-medium py-3 px-4 border-b border-gray-100">
                    Value
                  </th>
                  <th className="text-left font-medium py-3 px-4 border-b border-gray-100">
                    Stage
                  </th>
                  <th className="text-right font-medium py-3 px-4 border-b border-gray-100">
                    Probability
                  </th>
                  <th className="text-left font-medium py-3 px-4 border-b border-gray-100">
                    Closing Date
                  </th>
                  <th className="text-right font-medium py-3 px-4 border-b border-gray-100">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedDeals.map((deal) => (
                  <tr
                    key={deal.id}
                    className="border-b border-gray-100 last:border-b-0"
                  >
                    <td className="py-3 px-4 font-medium">{deal.dealName}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <CustomerAvatar initial={deal.customer.initial} />
                        <p className="text-sm">{deal.customer.name}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {formatCurrency(deal.value)}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge stage={deal.stage} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span>{deal.probability}</span>
                      <span>%</span>
                    </td>
                    <td className="py-3 px-4">{deal.closingDate}</td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 w-9 p-0 bg-slate-50/30 border-slate-300 hover:bg-slate-100 transition-colors"
                        aria-label="more options"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="border-t border-gray-100 px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredDeals.length)} of {filteredDeals.length} results
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="h-9 px-3"
                  >
                    Previous
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={page === currentPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="h-9 w-9 p-0"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="h-9 px-3"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}