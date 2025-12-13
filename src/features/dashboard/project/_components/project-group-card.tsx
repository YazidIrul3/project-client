import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SettingsIcon } from "lucide-react";
import CreateItemProject from "./create-item-project";
import ItemProject from "./item-project";
import { ItemProjectGroupEntity } from "@/types/api/project-group";
import UpdateProjectGroupSheet from "../../_components/sheets/update-projectGroup-sheet";

type CardProjectGroup = {
  data?: ItemProjectGroupEntity;
};

const CardProjectGroup = (props: CardProjectGroup) => {
  return (
    <Card className=" min-w-[300px] p-3">
      <div className=" flex flex-row items-center justify-between px-2">
        <CardTitle className=" flex flex-row items-center gap-3">
          <div
            style={{
              backgroundColor: props.data?.color || "gray",
            }}
            className={`h-[13px] w-[13px] rounded-full `}
          ></div>
          <h1 className=" font-bold text-sm capitalize">{props.data?.name}</h1>
        </CardTitle>

        <div className=" flex flex-row gap-4">
          <UpdateProjectGroupSheet
            data={props.data}
            id={props.data?.id as string}
          />
          <SettingsIcon size={20} />
        </div>
      </div>

      <CardContent className=" flex flex-col gap-3">
        <ItemProject data={""} />
        <CreateItemProject />
      </CardContent>
    </Card>
  );
};

export default CardProjectGroup;
