import styles from "./Loader.module.scss";

export function Loader() {
  return <div className={styles.loader} aria-label="Загрузка..." />;
}
