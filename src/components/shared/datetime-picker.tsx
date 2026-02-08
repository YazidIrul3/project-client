import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { Input } from "../ui/input";

type DateTimePickerProps = {
  name: string;
  onChange?: (date: unknown) => void;
};

export const DateTimePicker = (props: DateTimePickerProps) => {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className=" flex flex-row gap-2 text-sm">
          {date ? (
            <Input
              onChange={() => props.onChange}
              className="
                text-sm
    text-slate-900
  
  "
              value={date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
              name={`${props.name}Date`}
            />
          ) : (
            <Input
              onChange={() => props.onChange}
              className="
                text-sm
    text-slate-900
  
  "
              value={new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
              name={`${props.name}Date`}
            />
          )}

          {date ? (
            <Input
              type="time"
              className=" text-slate-900"
              defaultValue={"07:00"}
              name={`${props.name}Time`}
            />
          ) : null}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
};
