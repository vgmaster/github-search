import React from "react";
import clsx from "clsx";
import styles from "./Button.module.scss";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export function Button(props: ButtonProps) {
  const { children, className = "", ...rest } = props;

  return (
    <button className={clsx(styles.button, className)} {...rest}>
      {children}
    </button>
  );
}
