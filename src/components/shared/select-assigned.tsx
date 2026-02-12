import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { WorkspaceMemberEntity } from "@/types/api/workspace";
import { CheckIcon } from "lucide-react";

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
  assignedData: AssignedCreateUser[]; // ✅ ARRAY
  onChange?: (users: AssignedCreateUser[] | AssignedUpdateUser) => void;
  type?: string;
  workspaceMembersData?: WorkspaceMemberEntity[];
  handleOnClick?: (member: AssignedCreateUser) => void;
};

export const SelectAssigned = ({
  assignedData,
  type = "create",
  workspaceMembersData,
  handleOnClick,
}: SelectAssignedProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className=" flex flex-row text-sm min-w-full shadow-sm rounded-md p-2 min-h-[50px] ">
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

      <PopoverContent className="w-full min-w-full p-0  ">
        <div className="flex flex-col w-full  max-w-sm gap-6 p-2 ">
          {/* <InputGroup>
            <InputGroupInput
              onChange={(e) => setSearchInputValue(e.target.value)}
              className=" text-sm"
              placeholder="Search..."
            />
          </InputGroup> */}

          <div className="">
            {workspaceMembersData?.map(
              (item: WorkspaceMemberEntity, i: number) => {
                return (
                  <div
                    key={i}
                    onClick={() =>
                      handleOnClick &&
                      item.member.name !== assignedData[i]?.name &&
                      handleOnClick({
                        name: item.member.name,
                        email: item.member.email,
                        id: item.member.id,
                      })
                    }
                    className=" flex flex-row items-center place-content-between gap-2 py-2 min-w-[200px] w-full hover:cursor-default"
                  >
                    <div className=" flex flex-row gap-3 items-center">
                      <div className=" text-sm flex justify-center items-center text-slate-50 font-bold uppercase w-[30px] h-[30px] rounded-md bg-gray-500">
                        {item?.member?.name[0]}
                      </div>
                      <h1 className=" text-sm">{item?.member?.name}</h1>
                    </div>

                    {item.member.name == assignedData[i]?.name && (
                      <div>
                        <CheckIcon />
                      </div>
                    )}
                  </div>
                );
              },
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
