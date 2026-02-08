import { Card, CardContent, CardTitle } from "@/components/ui/card";

type TodoKanbanCard = {
  data: [];
};

const TodoKanbanCard = (props: TodoKanbanCard) => {
  //   const { data } = props;
  //   const { user, token } = useAuthenticated();
  //   const { data: itemProjectGroups } = useGetItemProjectGroupByProjectGroupId({
  //     token: token,
  //     projectGroupId: props.data,
  //   });
  //   const taksIds = useMemo(
  //     () =>
  //       itemProjectGroups?.data?.map((item: ItemProjectGroupEntity) => item.id) ||
  //       [],
  //     [itemProjectGroups],
  //   );

  //   const {
  //     setNodeRef,
  //     attributes,
  //     listeners,
  //     transform,
  //     transition,
  //     isDragging,
  //     isOver,
  //   } = useSortable({
  //     id: data?.id as string,
  //     data: {
  //       type: "Column",
  //       data,
  //     },
  //   });
  //   const { mutate: updateItemProjectGroupMutation } =
  //     useUpdateItemProjectGroupPosition({
  //       token: token,
  //       projectGroupId: props.data.id,
  //       mutationConfig: {
  //         onSuccess: () => {
  //           toast.success("Item Project Group updated successfully");
  //         },
  //       },
  //     });
  //   const style = {
  //     transition,
  //     transform: CSS.Transform.toString(transform),
  //   };

  //   const handleDragEnd = (e: DragEndEvent) => {
  //     const { active, over } = e;

  //     updateItemProjectGroupMutation({
  //       body: {
  //         activeId: active?.data?.current?.data?.id,
  //         activeIndex: active?.data?.current?.data?.index,
  //         overId: over?.data?.current?.data?.id,
  //         overIndex: over?.data?.current?.data?.index,
  //       },
  //     });
  //   };

  return (
    <Card className=" min-w-[250px] min-h-[400px] p-3">
      <div className=" flex flex-row items-center justify-between px-2">
        <CardTitle className=" flex flex-row items-center gap-3">
          <div
            style={{
              backgroundColor:
                //   data?.color ||
                "gray",
            }}
            className={`h-[13px] w-[13px] rounded-full `}
          ></div>
          <h1 className=" font-bold text-sm capitalize">{"testing"}</h1>
        </CardTitle>

        <div className=" flex flex-row items-center gap-2">
          <div className=" ">
            {/* <UpdateProjectGroupSheet data={data} id={data?.id as string} /> */}
          </div>
        </div>
      </div>

      <CardContent className=" flex flex-col gap-3">
        {/* <DndContext
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
        */}
      </CardContent>
    </Card>
  );
};

export default TodoKanbanCard;
