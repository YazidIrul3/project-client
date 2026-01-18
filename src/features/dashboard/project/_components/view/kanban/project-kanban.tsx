import { ItemProjectGroupEntity } from "@/types/api/item-project-group";
import CreateProjectGroupSheet from "@/features/dashboard/project/_components/sheet/create-projectGroup-sheet ";
import ColumnContainerKanban from "./column-kanban";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { ProjectGroupEntity } from "@/types/api/project-group";

type ProjectKanbanView = {
  projectId: string;
  projectGroups?: ProjectGroupEntity[];
};

export const ProjectKanbanView = (props: ProjectKanbanView) => {
  const [columns, setColumns] = useState<ProjectGroupEntity[]>([]);
  const columnId = useMemo(
    () => props.projectGroups?.map((group) => group.id) || [],
    [props.projectGroups]
  );
  return (
    <div
      className=" flex flex-row gap-3 overflow-x-scroll overflow-y-hidden w-full scrollbar-hide"
      style={{
        scrollbarWidth: "none",
      }}
    >
      <DndContext>
        <SortableContext items={columnId}>
          {props.projectGroups?.map((group: ProjectGroupEntity) => (
            <ColumnContainerKanban key={group.id} data={group} />
          ))}
        </SortableContext>
      </DndContext>

      <CreateProjectGroupSheet
        projectId={props.projectId}
        projectLength={columnId.length}
      />
    </div>
  );
};
