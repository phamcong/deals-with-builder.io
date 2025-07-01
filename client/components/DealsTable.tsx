import { Deal } from "@shared/types";
import { CustomerAvatar } from "./ui/CustomerAvatar";
import { StatusBadge } from "./ui/StatusBadge";
import { MoreVertical } from "lucide-react";
import { Button } from "./ui/button";

interface DealsTableProps {
  deals: Deal[];
  formatCurrency: (value: number) => string;
}

export function DealsTable({ deals, formatCurrency }: DealsTableProps) {
  return (
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
          {deals.map((deal) => (
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
  );
}
