import clsx from "clsx";
import { RepoTable } from "@/components/RepoTable";
import { RepoDetails } from "@/components/RepoDetails";
import { Loader } from "@/components/Loader";
import type { SortField, SortOrder } from "@/shared/types/sort";
import type {
  GithubRepository,
  GithubSearchResponse,
} from "@/shared/types/github";
import styles from "./SearchResults.module.scss";

type SearchResultsProps = {
  isError: boolean;
  error: unknown;
  isFetching: boolean;
  data: GithubSearchResponse | undefined;
  selected: number | undefined;
  setSelected: (id: number) => void;
  page: number;
  setPage: (page: number) => void;
  sortField: SortField;
  sortOrder: SortOrder;
  handleSortChange: (field: SortField) => void;
  perPage: number;
  setPerPage: (perPage: number) => void;
};

export function SearchResults({
  isError,
  error,
  isFetching,
  data,
  selected,
  setSelected,
  page,
  setPage,
  sortField,
  sortOrder,
  handleSortChange,
  perPage,
  setPerPage,
}: SearchResultsProps) {
  if (isFetching) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <div>Ошибка: {(error as Error).message}</div>;
  }

  if (!data) {
    return <div>Нет данных</div>;
  }

  const totalPages = data ? Math.ceil(data.total_count / perPage) : 1;

  return (
    <div className={styles.outer}>
      <div className={clsx("container", styles.root)}>
        <div className={styles.leftPanel}>
          <h2 className={styles.sectionTitle}>Результаты поиска</h2>

          <RepoTable
            repos={data.items}
            selectedId={selected}
            onSelect={(repo) => setSelected(repo.id)}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            sortField={sortField}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
            perPage={perPage}
            onPerPageChange={(newPerPage) => {
              setPerPage(newPerPage);
              setPage(1);
            }}
          />
        </div>

        <div className={styles.rightPanel}>
          {selected &&
          data &&
          data.items.find((r: GithubRepository) => r.id === selected) ? (
            <RepoDetails
              repo={
                data.items.find((r: GithubRepository) => r.id === selected)!
              }
            />
          ) : (
            <div className={styles.selectPrompt}>Выберите репозиторий</div>
          )}
        </div>
      </div>
    </div>
  );
}
