import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { InputGroup, InputGroupInput } from "../ui/input-group";

interface AssignedCreateUser {
  id: string;
  email: string;
  name: string;
}

interface AssignedUpdateUser {
  assigned: AssignedCreateUser;
}

type SelectAssignedProps = {
  name: string;
  assignedData: AssignedCreateUser[] | AssignedUpdateUser | any; // ✅ ARRAY
  onChange?: (users: AssignedCreateUser[] | AssignedUpdateUser) => void;
  type?: string;
};

export const SelectAssigned = ({
  name,
  assignedData,
  onChange,
  type = "create",
}: SelectAssignedProps) => {
  const [date, setDate] = useState<Date>();
  const [searchInputValue, setSearchInputValue] = useState<string>("");

  const assignedUsers = assignedData?.filter((item: AssignedCreateUser) =>
    item.name.includes(searchInputValue)
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className=" flex flex-row text-sm min-w-full shadow rounded-md p-2">
          {assignedData?.map((item: AssignedCreateUser, i: number) => {
            return (
              <div
                key={i}
                className="w-7.5 h-7.5 text-sm flex justify-center items-center text-slate-50 font-bold uppercase rounded-md bg-gray-500"
              >
                {item?.name[0]}
              </div>
            );
          })}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex flex-col w-full max-w-sm gap-6 p-2">
          <InputGroup>
            <InputGroupInput
              onChange={(e) => setSearchInputValue(e.target.value)}
              className=" text-sm"
              placeholder="Search..."
            />
          </InputGroup>

          <div>
            {assignedData?.map((item: AssignedCreateUser, i: number) => {
              return (
                <div key={i} className=" flex flex-row items-center gap-2 py-2">
                  <div className="w-7.5 h-7.5 text-sm flex justify-center items-center text-slate-50 font-bold uppercase rounded-md bg-gray-500">
                    {item?.name[0]}
                  </div>
                  <h1 className=" text-sm">{item?.name}</h1>
                </div>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
