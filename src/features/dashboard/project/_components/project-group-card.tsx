import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SettingsIcon } from "lucide-react";
import CreateItemProject from "./create-item-project";
import ItemProject from "./item-project";
import { ItemProjectGroupEntity } from "@/types/api/project-group";
import CreateProjectGroupSheet from "../../_components/sheets/create-projectGroup-sheet ";

type CardProjectGroup = {
  data?: ItemProjectGroupEntity;
};

const CardProjectGroup = (props: CardProjectGroup) => {
  const CardProjectGroupStyle: React.CSSProperties = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Sans-Serif",
  };
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
          {/* <CreateProjectGroupSheet /> */}
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
