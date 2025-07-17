import clsx from "clsx";
import styles from "./SortArrow.module.scss";

/**
 * Стрелка сортировки для таблицы.
 * @param active Активна ли сортировка для этого столбца
 * @param direction Направление сортировки ('asc' — вверх, 'desc' — вниз)
 */
export type SortArrowProps = {
  active: boolean;
  direction: "asc" | "desc";
};

export function SortArrow(props: SortArrowProps) {
  const { active, direction } = props;

  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(styles.sortArrow, {
        [styles.sortArrowActive]: active,
        [styles.sortArrowDesc]: direction === "desc",
      })}
      aria-hidden="true"
    >
      <path
        d="M0.333252 6.99999L1.50825 8.17499L6.16658 3.52499V13.6667H7.83325V3.52499L12.4833 8.18333L13.6666 6.99999L6.99992 0.333328L0.333252 6.99999Z"
        fill="currentColor"
      />
    </svg>
  );
}
