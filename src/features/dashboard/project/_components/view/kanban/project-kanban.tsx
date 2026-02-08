import { ItemProjectGroupEntity } from "@/types/api/item-project-group";
import CreateProjectGroupSheet from "@/features/dashboard/project/_components/sheet/create-projectGroup-sheet ";
import ColumnContainerKanban from "./column-kanban";
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { ProjectGroupEntity } from "@/types/api/project-group";
import { toast } from "sonner";
import { useAuthenticated } from "@/hooks/use-authenticated";
import { useUpdateProjectGroupPosition } from "@/features/api/projectGroup/update-projectGroupPosition";
import { queryClient } from "@/libs/react-query";

type ProjectKanbanView = {
  projectId: string;
  projectGroups?: ProjectGroupEntity[];
};

export const ProjectKanbanView = (props: ProjectKanbanView) => {
  const columnId = useMemo(
    () => props.projectGroups?.map((group) => group.id) || [],
    [props.projectGroups],
  );
  const { token } = useAuthenticated();

  const { mutate: updateProjectGroupMutation } = useUpdateProjectGroupPosition({
    token: token,
    mutationConfig: {
      onSuccess: () => {
        toast.success("Project Group updated successfully");
      },
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    console.log(active?.data.current?.data?.index);

    if (over && active.id !== over.id) {
      updateProjectGroupMutation({
        body: {
          activeId: active?.data.current?.data?.id,
          activeIndex: active?.data.current?.data?.index,
          overId: over?.data.current?.data?.id,
          overIndex: over?.data.current?.data?.index,
        },
        id: active.data.current?.data?.id,
      });
    }
  };

  return (
    <div className="flex flex-row gap-3 overflow-x-auto w-full scrollbar-hide  p-4">
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <SortableContext
          items={columnId}
          strategy={horizontalListSortingStrategy}
        >
          {props.projectGroups?.map((group) => (
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
