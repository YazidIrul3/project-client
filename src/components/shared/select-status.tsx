import { SelectInputData } from "@/helpers/select-input-data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type SelectStatusProps = {
  onChange: (value: unknown) => void;
  taskStatus?: string;
};

export const SelectStatus = (props: SelectStatusProps) => {
  return (
    <Select
      defaultValue={
        props.taskStatus
          ? props.taskStatus
          : SelectInputData.status[0].toLowerCase()
      }
      onValueChange={props.onChange}
    >
      <SelectTrigger className=" min-w-full">
        <SelectValue placeholder="Select a priority" />
      </SelectTrigger>

      <SelectContent className=" min-w-full w-full">
        <SelectGroup className=" text-slate-900 text-xs">
          {SelectInputData.status.map((item, i: number) => (
            <SelectItem key={i} value={item.toLowerCase()}>
              <h1
                className={`min-w-full capitalize w-full  text-slate-50 font-bold px-4 py-1 rounded-sm text-xs ${item.toLocaleLowerCase() == "backlog" ? "bg-gray-600" : item.toLocaleLowerCase() == "planning" ? "bg-yellow-500" : item.toLocaleLowerCase() == "todo" ? " bg-yellow-600" : "bg-green-600"}`}
              >
                {item}
              </h1>
            </SelectItem>
          ))}

          {props.taskStatus && (
            <SelectItem value={props.taskStatus.toLowerCase()}>
              <h1
                className={`min-w-full capitalize w-full  text-slate-50 font-bold px-4 py-1 rounded-sm text-xs bg-pink-600`}
              >
                Other
              </h1>
            </SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
