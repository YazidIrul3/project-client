import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SettingsIcon } from "lucide-react";
import CreateItemProject from "./create-item-project";
import ItemProject from "./item-project";

const CardProjectGroup = () => {
  return (
    <Card className=" min-w-[300px] p-3">
      <div className=" flex flex-row items-center justify-between px-2">
        <CardTitle className=" flex flex-row items-center gap-3">
          <div className=" h-[13px] w-[13px] rounded-full bg-[#3acd09]"></div>
          <h1 className=" font-bold text-sm">Planning</h1>
        </CardTitle>

        <div className=" flex flex-row gap-4">
          <SettingsIcon size={20} />
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
