import clsx from "clsx";
import { format } from "date-fns";
import type { GithubRepository } from "@/shared/types/github";
import styles from "./RepoTable.module.scss";
import { SortArrow } from "./components/SortArrow/SortArrow";
import { RepoTablePagination } from "./components/Pagination/Pagination";
import type { SortField, SortOrder } from "@/shared/types/sort";

type RepoTableProps = {
  repos: GithubRepository[];
  selectedId?: number;
  onSelect: (repo: GithubRepository) => void;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  sortField: SortField;
  sortOrder: SortOrder;
  onSortChange: (field: SortField) => void;
  perPage?: number;
  onPerPageChange?: (perPage: number) => void;
};

const formatDate = (dateStr: string) => format(new Date(dateStr), "dd.MM.yyyy");

export function RepoTable({
  repos,
  selectedId,
  onSelect,
  page,
  totalPages,
  onPageChange,
  sortField,
  sortOrder,
  onSortChange,
  perPage = 10,
  onPerPageChange,
}: RepoTableProps) {
  const from = repos.length === 0 ? 0 : (page - 1) * perPage + 1;
  const to = repos.length === 0 ? 0 : (page - 1) * perPage + repos.length;

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Название</th>
            <th>Язык</th>
            <th
              className={styles.sortable}
              onClick={() => onSortChange("forks_count")}
            >
              <SortArrow
                active={sortField === "forks_count"}
                direction={sortOrder}
              />
              Число форков
            </th>
            <th
              className={styles.sortable}
              onClick={() => onSortChange("stargazers_count")}
            >
              <SortArrow
                active={sortField === "stargazers_count"}
                direction={sortOrder}
              />
              Число звезд
            </th>
            <th
              className={styles.sortable}
              onClick={() => onSortChange("updated_at")}
            >
              <SortArrow
                active={sortField === "updated_at"}
                direction={sortOrder}
              />
              Дата обновления
            </th>
          </tr>
        </thead>
        <tbody>
          {repos.map((repo) => (
            <tr
              key={repo.id}
              className={clsx({ [styles.selected]: repo.id === selectedId })}
              onClick={() => onSelect(repo)}
            >
              <td>{repo.name}</td>
              <td>{repo.language || "-"}</td>
              <td>{repo.forks_count}</td>
              <td>{repo.stargazers_count}</td>
              <td>{formatDate(repo.updated_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <RepoTablePagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
        perPage={perPage}
        onPerPageChange={onPerPageChange}
        from={from}
        to={to}
      />
    </div>
  );
}
