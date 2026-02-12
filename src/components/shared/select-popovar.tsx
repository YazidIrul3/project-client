import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
type DataPicked = {
  id: string;
  email: string;
  name: string;
};

type DataOptions = {
  member: {
    id: string;
    email: string;
    name: string;
  };
  name: string;
};

export const SelectPopovar = ({
  dataPicked,
  dataOptions,
}: {
  dataPicked: [];
  dataOptions: [];
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className=" flex flex-row text-sm min-w-full shadow rounded-md p-2">
          {dataPicked?.map((item: DataPicked, i: number) => {
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
      <PopoverContent className="w-auto p-0 min-w-full ">
        <div>
          {dataOptions?.map((item: DataOptions, i: number) => {
            return (
              <div key={i} className=" flex flex-row items-center gap-2 py-2">
                <div className="w-7.5 h-7.5 text-sm flex justify-center items-center text-slate-50 font-bold uppercase rounded-md bg-gray-500">
                  {item?.member?.name[0]}
                </div>
                <h1 className=" text-sm">{item?.member?.name}</h1>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};
