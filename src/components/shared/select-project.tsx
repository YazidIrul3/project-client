import { ProjectEntity } from "@/types/api/project";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type SelectProjectProps = {
  onChange: (value: unknown) => void;
  projectsData: ProjectEntity[];
};

export const SelectProject = (props: SelectProjectProps) => {
  return (
    <Select defaultValue="LOW" onValueChange={props.onChange}>
      <SelectTrigger className=" min-w-full">
        <SelectValue placeholder="Select a priority" />
      </SelectTrigger>

      <SelectContent className=" min-w-full w-full">
        <SelectGroup className=" text-slate-900 text-xs min-w-full w-full">
          {props.projectsData?.map((item: ProjectEntity, i) => (
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
