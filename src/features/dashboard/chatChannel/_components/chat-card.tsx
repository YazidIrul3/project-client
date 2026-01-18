import { ChatEntity } from "@/types/api/chat";
import { MoveRight } from "lucide-react";

export const ChatCard = ({ data }: { data?: ChatEntity }) => {
  return (
    <div className=" p-4 hover:bg-slate-100 hover:bg-opacity-30 h-fit">
      {data?.type == "msg" ? (
        <div className=" flex flex-row gap-4">
          <div className=" bg-red-600 text-slate-50 font-bold text-xl w-[45px] h-[45px] flex justify-center items-center rounded-full">
            {data.sender.name[0]}
          </div>

          <div className=" flex flex-col">
            <div className=" flex flex-row items-center gap-2 font-semibold">
              <h1>{data.sender.name}</h1>
              <div className=" flex flex-row items-center gap-2">
                <h3 className=" text-gray-500 text-sm">
                  {data.createdAt.toString().split("T")[0]}
                </h3>
                <h3 className=" text-gray-500 text-sm">
                  {data.createdAt.toString().split("T")[1]}
                </h3>
              </div>
            </div>

            <div>{data.content}</div>
          </div>
        </div>
      ) : (
        <div className=" flex flex-row gap-3 items-start h-full">
          <div className=" text-green-600 h-full p-1.5">
            <MoveRight size={16} strokeWidth={"3px"} className="" />
          </div>

          <div className=" flex flex-col justify-start items-start">
            <div className=" flex flex-row items-center justify-start gap-2 font-semibold">
              <h1 className=" text-slate-700">
                Everyone welcome
                <span className=" font-bold text-slate-900">
                  {" "}
                  Yazid Khairul
                </span>
              </h1>
              <h3 className=" text-gray-500 text-sm">13/12/2025 05.42</h3>
            </div>

            <div className=" text-sm">
              kt mau setup fl studio gimana pik? ada problem cok
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
