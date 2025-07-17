import clsx from "clsx";
import { SearchBar } from "@/components/SearchBar";
import styles from "./Header.module.scss";

type Props = {
  handleSearch: (search: string) => void;
};

export const Header = (props: Props) => {
  const { handleSearch } = props;

  return (
    <div className={styles.header}>
      <div className={clsx("container", styles.headerInner)}>
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  );
};
