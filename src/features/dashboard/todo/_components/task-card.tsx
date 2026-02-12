import { TaskEntity } from "@/types/api/task";

export const TaskCard = ({ taskData }: { taskData: TaskEntity }) => {
  return (
    <div
      className={`  font-bold shadow-inner text-sm bg-slate-50 rounded-lg  min-w-full w-full min-h-[70px]`}
    >
      <h1 className="w-11/12 line-clamp-3 p-3">{taskData.name}</h1>

      {taskData?.project?.name && (
        <div className=" flex bg-slate-900 px-3 py-2 0w-full rounded-b-lg">
          <h1 className=" bg-white text-slate-900 px-3 text-sm font-normal py-1 rounded-full">
            {taskData?.project?.name}
          </h1>
        </div>
      )}
    </div>
  );
};

{
  /* <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <EllipsisVertical
      className=" text-slate-900  top-2 right-2"
      size={10}
      strokeWidth={"3px"}
    />
  </DropdownMenuTrigger>

  <DropdownMenuContent side="right" className=" max-w-fit">
    <DropdownMenuItem
      className=" min-w-full"
      onSelect={(e) => e.preventDefault()}
    >
      <div>
        <UpdateItemProjectSheet
          data={data}
          projectGroupId={projectGroupId}
        />
      </div>
    </DropdownMenuItem>

    <DropdownMenuItem
      onSelect={(e) => e.preventDefault()}
      className=" min-w-full z-40"
    >
      <div>
        <DeleteItemProjectGroupSheet id={data.id} />
      </div>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu> */
}
