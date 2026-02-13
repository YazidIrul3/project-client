import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useGetTasksByUserIdAndTaskName } from "@/features/api/task/get-tasksByUserIdAndTaskName";
import { useAuthenticated } from "@/hooks/use-authenticated";
import { useLoading } from "@/hooks/use-loading";
import { TaskEntity } from "@/types/api/task";
import { useEffect } from "react";
import { TaskCard } from "./task-card";
import { WorkspaceEntity } from "@/types/api/workspace";
import { ProjectEntity } from "@/types/api/project";

type TodoKanbanCard = {
  name: string;
  workspacesData: WorkspaceEntity[];
  projectsData: ProjectEntity[];
};

const TodoKanbanCard = ({
  name,
  workspacesData,
  projectsData,
}: TodoKanbanCard) => {
  const { token, user } = useAuthenticated();
  const { setIsLoading } = useLoading();
  const {
    data: tasksByUserIdAndTaskNameData,
    isLoading: tasksByUserIdAndTaskNameIsLoading,
  } = useGetTasksByUserIdAndTaskName({
    token,
    userId: user.id,
    taskName: name,
  });

  useEffect(() => {
    if (tasksByUserIdAndTaskNameIsLoading) setIsLoading(true);
    setIsLoading(false);
  }, [tasksByUserIdAndTaskNameIsLoading]);

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
          <h1 className=" font-bold text-sm capitalize">{name}</h1>
        </CardTitle>

        <div className=" flex flex-row items-center gap-2">
          <div className=" ">
            {/* <UpdateProjectGroupSheet data={data} id={data?.id as string} /> */}
          </div>
        </div>
      </div>

      <div className=" flex flex-col gap-3">
        {tasksByUserIdAndTaskNameData?.data?.map(
          (item: TaskEntity, i: number) => {
            return (
              <TaskCard
                key={i}
                taskData={item}
                workspacesData={workspacesData}
                projectsData={projectsData}
              />
              // <div
              //   key={i}
              //   className=" text-slate-900 font-bold shadow-sm text-sm border  border-black rounded-lg p-3 min-w-full w-full min-h-[70px]"
              // >
              //   <h1 className="w-11/12 line-clamp-3">{item.name}</h1>

              //   <div></div>
              // </div>
            );
          },
        )}

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
      </div>
    </Card>
  );
};

export default TodoKanbanCard;
