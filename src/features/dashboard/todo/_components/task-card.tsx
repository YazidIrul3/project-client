import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TaskEntity } from "@/types/api/task";
import { ChatIcon } from "@phosphor-icons/react";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import DeleteTaskSheet from "./delete-task-sheet";
import UpdateTaskSheet from "./update-task.sheet";
import { WorkspaceEntity } from "@/types/api/workspace";
import { ProjectEntity } from "@/types/api/project";

export const TaskCard = ({
  taskData,
  workspacesData,
  projectsData,
}: {
  taskData: TaskEntity;
  workspacesData: WorkspaceEntity[];
  projectsData: ProjectEntity[];
}) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={` relative  font-bold shadow-inner text-sm bg-slate-50 rounded-lg  min-w-full w-full min-h-[70px]`}
    >
      <h1 className="w-11/12 line-clamp-3 p-3">{taskData.name}</h1>

      {taskData?.project?.name && (
        <div className=" flex bg-slate-900 px-3 py-2 0w-full rounded-b-lg">
          <h1 className=" bg-white text-slate-900 px-3 text-sm font-normal py-1 rounded-full">
            {taskData?.project?.name}
          </h1>
        </div>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild className=" p-2">
          <div
            className={`${isHovering ? "opacity-100" : "opacity-0"} absolute top-0 right-0 p-2 bg-slate-50 shadow-sm rounded-full `}
          >
            <EllipsisVertical
              className=" text-slate-900"
              size={13}
              strokeWidth={"3px"}
            />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="bottom" className=" max-w-fit">
          <DropdownMenuItem
            className=" min-w-full flex flex-row items-center gap-2"
            onSelect={(e) => e.preventDefault()}
          >
            <ChatIcon />

            <h1 className=" text-sm">Add Commant</h1>
          </DropdownMenuItem>

          <DropdownMenuItem
            className=" min-w-full flex flex-row items-center gap-2"
            onSelect={(e) => e.preventDefault()}
          >
            <div>
              <UpdateTaskSheet
                projectsData={projectsData}
                workspacesData={workspacesData}
                taskData={taskData}
              />
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <div>
              <DeleteTaskSheet id={taskData.id} />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
