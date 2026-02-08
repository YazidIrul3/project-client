import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { MoveIcon } from "lucide-react";
import CreateItemProject from "../../sheet/create-item-project";
import { ProjectGroupEntity } from "@/types/api/project-group";
import UpdateProjectGroupSheet from "../../sheet/update-projectGroup-sheet";
import { useGetItemProjectGroupByProjectGroupId } from "@/features/api/itemProject/get-itemProject";
import { authClient } from "@/libs/auth-client";
import { ItemProjectGroupEntity } from "@/types/api/item-project-group";
import ItemProject from "../../item-project";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useMemo } from "react";
import { useAuthenticated } from "@/hooks/use-authenticated";
import { toast } from "sonner";
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import { useUpdateItemProjectGroupPosition } from "@/features/api/itemProject/update-itemProjectGroupPosition";

type ColumnContainerKanban = {
  data: ProjectGroupEntity;
};

const ColumnContainerKanban = (props: ColumnContainerKanban) => {
  const { data } = props;
  const { user, token } = useAuthenticated();
  const { data: itemProjectGroups } = useGetItemProjectGroupByProjectGroupId({
    token: token,
    projectGroupId: data?.id,
  });
  const taksIds = useMemo(
    () =>
      itemProjectGroups?.data?.map((item: ItemProjectGroupEntity) => item.id) ||
      [],
    [itemProjectGroups],
  );

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({
    id: data?.id as string,
    data: {
      type: "Column",
      data,
    },
  });
  const { mutate: updateItemProjectGroupMutation } =
    useUpdateItemProjectGroupPosition({
      token: token,
      projectGroupId: props.data.id,
      mutationConfig: {
        onSuccess: () => {
          toast.success("Item Project Group updated successfully");
        },
      },
    });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    updateItemProjectGroupMutation({
      body: {
        activeId: active?.data?.current?.data?.id,
        activeIndex: active?.data?.current?.data?.index,
        overId: over?.data?.current?.data?.id,
        overIndex: over?.data?.current?.data?.index,
      },
    });
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className=" text-blue-900 min-h-[400px] border-dashed min-w-[300px] border border-slate-900 rounded-2xl"
      ></div>
    );
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className=" min-w-[300px] min-h-[400px] p-3"
    >
      <div className=" flex flex-row items-center justify-between px-2">
        <CardTitle className=" flex flex-row items-center gap-3">
          <div
            style={{
              backgroundColor: data?.color || "gray",
            }}
            className={`h-[13px] w-[13px] rounded-full `}
          ></div>
          <h1 className=" font-bold text-sm capitalize">{data?.name}</h1>
        </CardTitle>

        <div className=" flex flex-row items-center gap-2">
          <div className=" ">
            <UpdateProjectGroupSheet data={data} id={data?.id as string} />
          </div>

          <div className=" right-0">
            <MoveIcon {...attributes} {...listeners} size={20} />
          </div>
        </div>
      </div>

      <CardContent className=" flex flex-col gap-3">
        <DndContext
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
        >
          <SortableContext
            items={taksIds}
            strategy={verticalListSortingStrategy}
          >
            {itemProjectGroups?.data?.map(
              (item: ItemProjectGroupEntity, i: number) => {
                return (
                  <ItemProject
                    key={i}
                    data={item}
                    projectGroupId={props?.data?.id as string}
                  />
                );
              },
            )}
          </SortableContext>
        </DndContext>

        <CreateItemProject
          borderColor={data?.color as string}
          projectGroupId={data?.id as string}
          lengthItemProject={itemProjectGroups?.data.length}
        />
      </CardContent>
    </Card>
  );
};

export default ColumnContainerKanban;
