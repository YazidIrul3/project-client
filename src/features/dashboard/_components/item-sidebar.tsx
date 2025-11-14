import React from "react";
import { useAppSidebarToogle } from "../../../hooks/use-sidebar";
import { useSidebar } from "@/components/ui/sidebar";

const ItemSidebar = ({
  icon,
  name,
}: {
  icon: React.ReactNode;
  name: string;
}) => {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();

  return (
    <div className=" flex flex-row items-center gap-2">
      {icon}

      {open && <h1 className=" text-[0.9em] capitalize">{name}</h1>}
    </div>
  );
};

export default ItemSidebar;
