import React from "react";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ItemSidebar = ({
  icon,
  name,
}: {
  icon: React.ReactNode;
  name: string;
}) => {
  const { open } = useSidebar();

  return (
    <div className=" flex flex-row items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>{icon}</TooltipTrigger>
        {!open && (
          <TooltipContent>
            <p>{name}</p>
          </TooltipContent>
        )}
      </Tooltip>

      {open && <h1 className=" text-[0.9em] capitalize">{name}</h1>}
    </div>
  );
};

export default ItemSidebar;
