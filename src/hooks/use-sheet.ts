import { useState } from "react";

export const useSheet = () => {
  const [open, setOpen] = useState(false);

  const openSheet = () => setOpen(true);
  const closeSheet = () => setOpen(false);
  const toogleSheet = (prev: boolean) => setOpen(!prev);

  return {
    open,
    setOpen,
    openSheet,
    closeSheet,
    toogleSheet,
  };
};
