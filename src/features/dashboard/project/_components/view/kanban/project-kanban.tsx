import { ItemProjectGroupEntity } from "@/types/api/item-project-group";
import CreateProjectGroupSheet from "@/features/dashboard/_components/sheets/create-projectGroup-sheet ";
import COlumnKanban from "./column-kanban";

type ProjectKanbanView = {
  projectId: string;
  projectGroups?: [ItemProjectGroupEntity];
};

export const ProjectKanbanView = (props: ProjectKanbanView) => {
  return (
    <div
      className=" flex flex-row gap-3 overflow-x-scroll overflow-y-hidden w-full scrollbar-hide"
      style={{
        scrollbarWidth: "none",
      }}
    >
      {props.projectGroups?.map((group: any) => (
        <COlumnKanban key={group.id} data={group} />
      ))}

      <CreateProjectGroupSheet projectId={props.projectId} />
    </div>
  );
};
