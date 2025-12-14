import { ItemProjectGroupEntity } from "@/types/api/project-group";
import CardProjectGroup from "../project-group-card";
import CreateProjectGroupSheet from "@/features/dashboard/_components/sheets/create-projectGroup-sheet ";

type ProjectKanbanView = {
  projectId: string;
  projectGroups?: [ItemProjectGroupEntity];
};

const ProjectKanbanView = (props: ProjectKanbanView) => {
  return (
    <div className=" flex flex-row gap-3 overflow-x-scroll overflow-y-hidden w-full scrollbar-hide">
      {props.projectGroups?.map((group: any) => (
        <CardProjectGroup key={group.id} data={group} />
      ))}

      <CreateProjectGroupSheet projectId={props.projectId} />
    </div>
  );
};

export default ProjectKanbanView;
