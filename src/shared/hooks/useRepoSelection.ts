import { useState } from "react";

export function useRepoSelection<T = number | undefined>(initial?: T) {
  const [selected, setSelected] = useState<T | undefined>(initial);
  const resetSelection = () => setSelected(undefined);
  return { selected, setSelected, resetSelection };
}
