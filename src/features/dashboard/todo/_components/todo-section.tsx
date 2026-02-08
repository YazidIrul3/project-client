"use client";

import { List } from "lucide-react";
import DashboardLayout from "../../_components/layout";
import TodoKanbanCard from "./todo-kanban-card";
import CreateTaskSheet from "./create-task.sheet";
import { useCurrentWorkspace } from "../../_hooks/use-current-workspace";
import { useGetProjectsByWorkspaceId } from "@/features/api/project/get-projectsByWorkspaceId";
import { useAuthenticated } from "@/hooks/use-authenticated";
import { useEffect } from "react";
import { useLoading } from "@/hooks/use-loading";
import { useGetWorkspacesByUserId } from "@/features/api/workspace/get-workspacesByuserId";

export const TodoSection = () => {
  const { workspaceId } = useCurrentWorkspace();
  const { token, user } = useAuthenticated();
  const { setIsLoading, isLoading } = useLoading();
  const {
    data: projectsByWorkspaceIdData,
    isLoading: projectsByWorkspaceIdIsLoading,
  } = useGetProjectsByWorkspaceId({
    token,
    workspaceId,
  });
  const {
    data: workspacesByUserIdData,
    isLoading: workspacesByUserIdIsLoading,
  } = useGetWorkspacesByUserId({
    token,
    userId: user.id,
  });

  useEffect(() => {
    if (projectsByWorkspaceIdIsLoading || workspacesByUserIdIsLoading)
      setIsLoading(true);

    setIsLoading(false);
  }, [projectsByWorkspaceIdIsLoading]);

  return (
    <DashboardLayout>
      <section className=" p-9">
        <div className=" flex flex-col gap-3 w-fit">
          <div className=" flex flex-row items-center gap-3">
            <List strokeWidth={"3px"} size={27} />
            <h1 className=" font-bold text-3xl">To Do List</h1>
          </div>

          <CreateTaskSheet
            projectsData={projectsByWorkspaceIdData?.data}
            workspacesData={workspacesByUserIdData?.data}
          />
        </div>

        <main className=" mt-3">
          <div className="flex flex-row gap-3 overflow-x-auto w-full scrollbar-hide  p-4">
            <TodoKanbanCard data={[]} />
            <TodoKanbanCard data={[]} />
            <TodoKanbanCard data={[]} />
            <TodoKanbanCard data={[]} />
          </div>
        </main>
      </section>
    </DashboardLayout>
  );
};
