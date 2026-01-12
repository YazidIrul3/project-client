import { useGetProject } from "@/features/api/project/get-project";
import DashbaordLayout from "../../_components/layout";
import { authClient } from "@/libs/auth-client";
import { Button } from "@/components/ui/button";
import { ProjectKanbanView } from "./view/kanban/project-kanban";
import { ItemProjectGroupEntity } from "@/types/api/item-project-group";
import { ProjectGroupEntity } from "@/types/api/project-group";
import { useAuthenticated } from "@/hooks/use-authenticated";
import { useEffect } from "react";
import { useLoading } from "@/hooks/use-loading";

type ProjectSectionHeaderProps = {
  data?: ItemProjectGroupEntity;
};

const ProjectSectionHeader = (props: ProjectSectionHeaderProps) => {
  return (
    <div>
      <div>
        <h1 className=" uppercase font-semibold text-slate-500 text-sm">
          Project
        </h1>
        <h1 className=" uppercase font-bold text-slate-900 text-2xl">
          {props.data?.title}
        </h1>
      </div>
    </div>
  );
};

type ProjectSectionMainProps = {
  projectId: string;
  projectGroups?: [ProjectGroupEntity];
};

const ProjectSectionMain = (props: ProjectSectionMainProps) => {
  return (
    <div className=" flex flex-col gap-4">
      <div className=" flex flex-row items-center gap-3">
        <Button variant={"outline"}>Kanban</Button>
        <Button variant={"outline"}>List</Button>
      </div>

      <ProjectKanbanView
        projectId={props.projectId}
        projectGroups={props.projectGroups}
      />
    </div>
  );
};

export const ProjectSection = (props: { projectId: string }) => {
  const { data } = authClient.useSession();
  const { token } = useAuthenticated();
  const { setIsLoading } = useLoading();

  const { data: project, isLoading: isProjectLoading } = useGetProject({
    token: token,
    id: props.projectId,
  });

  useEffect(() => {
    if (isProjectLoading) setIsLoading(true);

    setIsLoading(false);
  }, [isProjectLoading]);

  return (
    <DashbaordLayout>
      <section className=" min-h-screen max-w-screen overflow-hidden p-5">
        <ProjectSectionHeader data={project?.data} />

        <div className=" py-5">
          <ProjectSectionMain
            projectId={props.projectId}
            projectGroups={project?.data?.projectGroups}
          />
        </div>
      </section>
    </DashbaordLayout>
  );
};
