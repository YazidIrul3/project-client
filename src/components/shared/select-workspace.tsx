import { useCurrentWorkspace } from "@/features/dashboard/_hooks/use-current-workspace";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { WorkspaceEntity } from "@/types/api/workspace";

type SelectWorkspaceProps = {
  onChange: (value: unknown) => void;
  workspacesData: WorkspaceEntity[];
};

export const SelectWorkspace = (props: SelectWorkspaceProps) => {
  const { workspaceId } = useCurrentWorkspace();

  return (
    <Select defaultValue={workspaceId} onValueChange={props.onChange}>
      <SelectTrigger className=" min-w-full">
        <SelectValue placeholder="Select a priority" />
      </SelectTrigger>

      <SelectContent className=" min-w-full w-full">
        <SelectGroup className=" text-slate-900 text-xs min-w-full w-full">
          {props.workspacesData?.map((item: WorkspaceEntity, i) => (
            <SelectItem
              key={i}
              value={item.id}
              className=" w-full min-w-full border shadow-sm"
            >
              <h1 className="min-w-full w-full   text-slate-900 px-4 py-1 rounded-sm text-xs">
                {item.name}
              </h1>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
