import { useState } from "react";
import { useSearchRepositories } from "@/shared/hooks/useSearchRespositories";
import { usePagination } from "@/shared/hooks/usePagination";
import { useSort } from "@/shared/hooks/useSort";
import { useRepoSelection } from "@/shared/hooks/useRepoSelection";
import { Header } from "@/components/Header";
import { Welcome } from "@/components/Welcome";
import { SearchResults } from "@/components/SearchResults";
import type { SortField } from "@/shared/types/sort";

export function App() {
  const [query, setQuery] = useState("");

  const { page, setPage, perPage, setPerPage, resetPagination } =
    usePagination();
  const { sortField, sortOrder, handleSortChange } = useSort(
    "stargazers_count",
    "desc",
  );
  const { selected, setSelected, resetSelection } = useRepoSelection<
    number | undefined
  >();

  // Не делаем запрос, если query пустая
  const shouldFetch = !!query.trim();
  const { data, isFetching, isError, error } = useSearchRepositories(
    {
      query,
      page,
      per_page: perPage,
      sort:
        sortField === "updated_at"
          ? "updated"
          : sortField === "forks_count"
            ? "forks"
            : "stars",
      order: sortOrder,
    },
    shouldFetch,
  );

  const handleSearch = (q: string) => {
    setQuery(q);
    resetPagination();
    resetSelection();
  };

  const handleSort = (field: SortField) => {
    handleSortChange(field);
    setPage(1);
  };

  return (
    <div>
      <Header handleSearch={handleSearch} />
      <h1 className="visually-hidden">GitHub Search</h1>

      {!query && (!data || data.items.length === 0) ? (
        <Welcome />
      ) : (
        <SearchResults
          isError={isError}
          error={error}
          isFetching={isFetching}
          data={data}
          selected={selected}
          setSelected={setSelected}
          page={page}
          setPage={setPage}
          sortField={sortField}
          sortOrder={sortOrder}
          handleSortChange={handleSort}
          perPage={perPage}
          setPerPage={setPerPage}
        />
      )}
    </div>
  );
}
