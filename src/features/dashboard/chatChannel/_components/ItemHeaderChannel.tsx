import { useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

export const ItemHeaderChannel = ({
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
      <Tooltip>
        <TooltipTrigger asChild>{icon}</TooltipTrigger>
        {!open && (
          <TooltipContent side="bottom">
            <p>{name}</p>
          </TooltipContent>
        )}
      </Tooltip>

      {open && <h1 className=" text-[0.9em] capitalize">{name}</h1>}
    </div>
  );
};
