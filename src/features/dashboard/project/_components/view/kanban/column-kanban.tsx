import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EllipsisVertical, SettingsIcon } from "lucide-react";
import CreateItemProject from "../../sheet/create-item-project";
import { ProjectGroupEntity } from "@/types/api/project-group";
import UpdateProjectGroupSheet from "../../../../_components/sheets/update-projectGroup-sheet";
import { useGetItemProjectGroupByProjectGroupId } from "@/features/api/itemProject/get-itemProject";
import { authClient } from "@/lib/auth-client";
import { ItemProjectGroupEntity } from "@/types/api/item-project-group";
import ItemProject from "../../item-project";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type ColumnContainerKanban = {
  data?: ProjectGroupEntity;
};

const ColumnContainerKanban = (props: ColumnContainerKanban) => {
  const { data } = props;
  const { data: user } = authClient.useSession();
  const { data: itemProjectGroups } = useGetItemProjectGroupByProjectGroupId({
    token: user?.session.token as string,
    projectGroupId: data?.id as string,
  });

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: data?.id as string,
      data: {
        type: "Column",
        data,
      },
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className=" min-w-[300px] min-h-[400px] p-3"
    >
      <div className=" flex flex-row items-center justify-between px-2">
        <CardTitle className=" flex flex-row items-center gap-3">
          <div
            style={{
              backgroundColor: data?.color || "gray",
            }}
            className={`h-[13px] w-[13px] rounded-full `}
          ></div>
          <h1 className=" font-bold text-sm capitalize">{data?.name}</h1>
        </CardTitle>

        <div className=" flex flex-row gap-4">
          <UpdateProjectGroupSheet data={data} id={data?.id as string} />
          <SettingsIcon size={20} />
        </div>
      </div>

      <CardContent className=" flex flex-col gap-3">
        {itemProjectGroups?.data?.map(
          (item: ItemProjectGroupEntity, i: number) => {
            return (
              <ItemProject
                key={i}
                data={item}
                projectGroupId={props?.data?.id as string}
              />
            );
          }
        )}
        <CreateItemProject
          borderColor={data?.color as string}
          id={data?.id as string}
        />
      </CardContent>
    </Card>
  );
};

export default ColumnContainerKanban;
