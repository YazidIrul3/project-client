import { useGetProject } from "@/features/api/project/get-project";
import DashbaordLayout from "../../_components/layout";
import CardProjectGroup from "./project-group-card";
import { authClient } from "@/lib/auth-client";
import { ItemProjectGroupEntity } from "@/types/api/project-group";
import { ItemProjectEntity } from "@/types/api/project";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import ProjectKanbanView from "./view/project-kanban";

type ProjectSectionHeaderProps = {
  data?: ItemProjectEntity;
};

const ProjectSectionHeader = (props: ProjectSectionHeaderProps) => {
  return (
    <div>
      <div>
        <h1 className=" uppercase font-semibold text-slate-500 text-sm">
          Project
        </h1>
        <h1 className=" uppercase font-bold text-slate-900 text-2xl">
          {props.data?.name}
        </h1>
      </div>
    </div>
  );
};

type ProjectSectionMainProps = {
  projectId: string;
  projectGroups?: [ItemProjectGroupEntity];
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

  const { data: project } = useGetProject({
    token: data?.session.token as string,
    id: props.projectId,
  });

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
