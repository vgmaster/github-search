import styles from "./Pagination.module.scss";

type RepoTablePaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  perPage: number;
  onPerPageChange?: (perPage: number) => void;
  from: number;
  to: number;
};

const PER_PAGE_OPTIONS = [5, 10, 20, 50];

export function RepoTablePagination({
  page,
  totalPages,
  onPageChange,
  perPage,
  onPerPageChange,
  from,
  to,
}: RepoTablePaginationProps) {
  return (
    <div className={styles.paginationBar}>
      <div className={styles.rowsSelectWrapper}>
        <span className={styles.rowsLabel}>Rows per page:</span>
        <select
          className={styles.rowsSelect}
          value={perPage}
          onChange={(e) =>
            onPerPageChange && onPerPageChange(Number(e.target.value))
          }
        >
          {PER_PAGE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <span className={styles.range}>
        {from} - {to} of{" "}
        {perPage * totalPages >= to ? perPage * totalPages : to}
      </span>

      <div className={styles.buttonsWrapper}>
        <button
          className={styles.arrowBtn}
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          &#60;
        </button>
        <button
          className={styles.arrowBtn}
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
        >
          &#62;
        </button>
      </div>
    </div>
  );
}
