import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSidebar } from "@/components/ui/sidebar";
import { Plus, SettingsIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import SheetSideBackground from "./sheet-side-background";
import { useCreateProject } from "@/features/api/project/create-project";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import { ProjectBodyRequest } from "@/types/api/project";
import { useGetWorkspace } from "@/features/api/workspace/get-workspace";
import { useGetWorkspaceSidebar } from "@/features/api/workspace/get-workspace-sidebar";
import { useCurrentWorkspace } from "../../_hooks/use-current-workspace";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectGroupBodyRequest } from "@/types/api/project-group";
import { ProjectGroupColors } from "@/helpers/color";
import { useCreateProjectGroup } from "@/features/api/projectGroup/create-projectGroup";
import DeleteProjectGroupSheet from "./delete-projectGroup-sheet";
import { useUpdateProjectGroup } from "@/features/api/projectGroup/update-project";
import { ItemProjectGroupEntity } from "@/types/api/item-project-group";

type UpdateProjectGroupSheetProps = {
  id: string;
  data: ItemProjectGroupEntity | any;
};

const UpdateProjectGroupSheet = (props: UpdateProjectGroupSheetProps) => {
  const form = useForm();
  const { control } = form;
  const { data } = authClient.useSession();
  const [bodyRequest, setBodyRequest] = useState<ProjectGroupBodyRequest>({
    name: props.data.name,
    color: props.data.color,
    projectId: props.data.projectId,
  });

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setBodyRequest((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const { mutate: updateProjectGroupMutation } = useUpdateProjectGroup({
    token: data?.session.token as string,
    id: props.id,
    mutationConfig: {
      onSuccess: (data) => {
        toast.success("Project Group updated successfully");

        window.location.reload();
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to update Project Group"
        );
      },
    },
  });

  const handleOnSubmit = () => {
    updateProjectGroupMutation({
      color: bodyRequest.color as string,
      name: bodyRequest.name as string,
    });

    setBodyRequest({
      name: props.data.name,
      color: props.data.color,
    });
  };

  return (
    <Sheet>
      <SheetTrigger
        asChild
        className=" min-w-full justify-start flex font-normal text-sm px-2 py-2"
      >
        <div>
          <SettingsIcon size={20} />
        </div>
      </SheetTrigger>

      <SheetContent className=" flex flex-row justify-between  min-w-9/12 mx-auto h-fit translate-x-[-50%] translate-y-[-50%] left-1/2 top-1/2 rounded-xl ">
        <Form {...form}>
          <div className=" flex flex-col w-full ">
            <SheetHeader className=" mb-3">
              <SheetTitle className=" text-xl font-bold">
                Update Project Group
              </SheetTitle>
              <SheetDescription>
                Project will help you for making flow of your project
              </SheetDescription>
            </SheetHeader>

            <div className=" px-3 flex flex-col gap-8">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" mb-2">Project Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type Project name"
                        name="name"
                        value={bodyRequest.name}
                        onChange={(e) => {
                          field.onChange(e);
                          handleOnChange(e);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Color</FormLabel>
                    <div className=" flex flex-row items-center gap-3">
                      {ProjectGroupColors.map((item, i: number) => (
                        <div
                          key={i}
                          onClick={() =>
                            setBodyRequest({
                              color: item.value,
                            })
                          }
                          style={{
                            backgroundColor: `${item.value}`,
                          }}
                          className={` flex flex-row gap-3 items-center w-[35px] h-[35px] rounded-full ${
                            bodyRequest.color == item.value
                              ? "outline-2 outline-black"
                              : "outline-none"
                          }`}
                        ></div>
                      ))}
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Card className=" bg-red-50 shadow-red-600 shadow-xs pb-4 mx-3 my-7">
              <CardHeader>
                <CardTitle className=" text-red-600 font-bold">
                  Delete Project Group
                </CardTitle>
                <CardDescription className=" text-red-600">
                  Are you sure to delete workspace permanently, including
                  content and team
                </CardDescription>
              </CardHeader>

              <CardFooter>
                <DeleteProjectGroupSheet id={props.id} />
              </CardFooter>
            </Card>

            <SheetFooter className="flex justify-end flex-row">
              <Button
                onClick={handleOnSubmit}
                className=" justify-start flex font-normal text-sm px-4 w-fit"
              >
                Save
              </Button>
            </SheetFooter>
          </div>
        </Form>

        <SheetSideBackground />
      </SheetContent>
    </Sheet>
  );
};

export default UpdateProjectGroupSheet;
