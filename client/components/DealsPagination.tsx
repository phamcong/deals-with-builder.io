import { Button } from "./ui/button";

interface DealsPaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  filteredCount: number;
  onPageChange: (page: number) => void;
}

export function DealsPagination({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  filteredCount,
  onPageChange,
}: DealsPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="border-t border-gray-100 px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredCount)} of{" "}
          {filteredCount} results
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
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
                onClick={() => onPageChange(page)}
                className="h-9 w-9 p-0"
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="h-9 px-3"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
