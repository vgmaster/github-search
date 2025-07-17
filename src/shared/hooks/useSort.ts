import { useState } from "react";
import type { SortField, SortOrder } from "@/shared/types/sort";

export function useSort(initialField: SortField, initialOrder: SortOrder) {
  const [sortField, setSortField] = useState<SortField>(initialField);
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialOrder);

  const handleSortChange = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  return { sortField, setSortField, sortOrder, setSortOrder, handleSortChange };
}
