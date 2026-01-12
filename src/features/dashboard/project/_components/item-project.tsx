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
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

const ItemProject = ({
  data,
  projectGroupId,
}: {
  data: ItemProjectGroupEntity;
  projectGroupId: string;
}) => {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: data?.id as string,
      data: {
        type: "Task",
        data,
      },
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className=" min-w-full flex flex-row items-center gap-2 shadow-sm px-2 py-2.5 rounded-md"
    >
      <h1
        {...attributes}
        {...listeners}
        className=" truncate max-w-11/12 min-w-11/12"
      >
        {data.title}
      </h1>

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
            className=" min-w-full z-40"
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
