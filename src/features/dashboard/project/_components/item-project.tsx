"use client";

import { EllipsisVertical, Trash } from "lucide-react";
import { ItemProjectGroupEntity } from "../../../../types/api/item-project-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UpdateItemProjectSheet from "./sheet/update-item-project";
import DeleteItemProjectGroupSheet from "./sheet/delete-item-project";

const ItemProject = ({
  data,
  projectGroupId,
}: {
  data: ItemProjectGroupEntity;
  projectGroupId: string;
}) => {
  return (
    <div className=" min-w-full flex flex-row items-center gap-2 shadow-sm px-2 py-2.5 rounded-md">
      <h1 className=" truncate max-w-11/12 min-w-11/12">{data.title}</h1>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVertical
            className=" text-slate-900  top-2 right-2"
            size={10}
            strokeWidth={"3px"}
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent side="right" className=" max-w-fit">
          <DropdownMenuItem
            className=" min-w-full"
            onSelect={(e) => e.preventDefault()}
          >
            <div>
              <UpdateItemProjectSheet
                data={data}
                projectGroupId={projectGroupId}
              />
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className=" min-w-full"
          >
            <div>
              <DeleteItemProjectGroupSheet id={data.id} />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ItemProject;
