import clsx from "clsx";
import styles from "./Welcome.module.scss";

export function Welcome() {
  return (
    <div className={clsx("container", styles.welcome)}>
      <span className={styles.welcomeText}>Добро пожаловать</span>
    </div>
  );
}
