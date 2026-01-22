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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SettingsIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import SheetSideBackground from "../../../_components/sheets/sheet-side-background";
import { authClient } from "@/libs/auth-client";
import { toast } from "sonner";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectGroupColors } from "@/helpers/color";
import DeleteProjectGroupSheet from "./delete-projectGroup-sheet";
import {
  updateProjectGroupSchema,
  UpdateProjectGroupSchema,
  useUpdateProjectGroup,
} from "@/features/api/projectGroup/update-project";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectGroupEntity } from "@/types/api/project-group";

type UpdateProjectGroupSheetProps = {
  id: string;
  data: ProjectGroupEntity;
};

const UpdateProjectGroupSheet = (props: UpdateProjectGroupSheetProps) => {
  const form = useForm<UpdateProjectGroupSchema>({
    resolver: zodResolver(updateProjectGroupSchema),
    mode: "onChange",
    defaultValues: {
      color: props.data.color,
      name: props.data.name,
    },
  });
  const { control, getValues, setValue } = form;
  const { data } = authClient.useSession();

  const { mutate: updateProjectGroupMutation } = useUpdateProjectGroup({
    token: data?.session.token as string,
    id: props.id,
    mutationConfig: {
      onSuccess: () => {
        toast.success("Project Group updated successfully");

        window.location.reload();
      },
      // onError: (error: any) => {
      //   toast.error(
      //     error?.response?.data?.message || "Failed to update Project Group"
      //   );
      // },
    },
  });

  const handleOnSubmit = () => {
    updateProjectGroupMutation({
      color: getValues("color"),
      name: getValues("name"),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild className="text-sm px-2 py-2">
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
                        {...field}
                        placeholder="Type Project name"
                        name="name"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="color"
                render={({}) => (
                  <FormItem>
                    <FormLabel>Group Color</FormLabel>
                    <div className=" flex flex-row items-center gap-3">
                      {ProjectGroupColors.map((item, i: number) => (
                        <div
                          key={i}
                          onClick={() => setValue("color", item.value)}
                          style={{
                            backgroundColor: `${item.value}`,
                          }}
                          className={` flex flex-row gap-3 items-center w-[35px] h-[35px] rounded-full ${
                            getValues("color") == item.value
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
