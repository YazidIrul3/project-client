import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type SelectPriorityProps = {
  onChange: (value: any) => void;
};

export const SelectPriority = (props: SelectPriorityProps) => {
  return (
    <Select defaultValue="LOW" onValueChange={props.onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a priority" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup className=" text-slate-900 text-xs">
          <SelectItem value="LOW">
            <h1 className=" bg-green-600 text-slate-50 font-bold px-4 py-1 rounded-sm text-xs">
              Low
            </h1>
          </SelectItem>
          <SelectItem value="MEDIUM">
            <h1 className=" bg-yellow-600 text-slate-50 font-bold px-4 py-1 rounded-sm text-xs">
              Medium
            </h1>
          </SelectItem>
          <SelectItem value="HIGH">
            <h1 className=" bg-red-600 text-slate-50 font-bold px-4 py-1 rounded-sm text-xs">
              High
            </h1>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
