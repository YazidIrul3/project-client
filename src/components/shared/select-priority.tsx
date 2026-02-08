import { SelectInputData } from "@/helpers/select-input-data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type SelectPriorityProps = {
  onChange: (value: unknown) => void;
};

export const SelectPriority = (props: SelectPriorityProps) => {
  return (
    <Select
      defaultValue={SelectInputData.priority[0].toLowerCase()}
      onValueChange={props.onChange}
    >
      <SelectTrigger className=" min-w-full">
        <SelectValue placeholder="Select a priority" />
      </SelectTrigger>

      <SelectContent className=" min-w-full w-full">
        <SelectGroup className=" text-slate-900 text-xs">
          {SelectInputData.priority.map((item, i: number) => (
            <SelectItem key={i} value={item.toLowerCase()}>
              <h1
                className={`min-w-full capitalize w-full  text-slate-50 font-bold px-4 py-1 rounded-sm text-xs ${item.toLocaleLowerCase() == "low" ? "bg-yellow-600" : item.toLocaleLowerCase() == "medium" ? "bg-green-600" : "bg-red-600"}`}
              >
                {item}
              </h1>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
