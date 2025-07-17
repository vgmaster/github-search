import React, { useState } from "react";
import { Button } from "@/components/Button";
import styles from "./SearchBar.module.scss";

export type SearchBarProps = {
  onSearch?: (query: string) => void;
};

/**
 * Компонент строки поиска для GitHub репозиториев.
 */
export function SearchBar(props: SearchBarProps) {
  const { onSearch } = props;
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(value.trim());
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <input
        id="search-input"
        name="search"
        type="text"
        placeholder="Поиск репозиториев..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={styles.input}
      />
      <Button type="submit">Найти</Button>
    </form>
  );
}
