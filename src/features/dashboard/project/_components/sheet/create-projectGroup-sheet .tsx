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
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import SheetSideBackground from "../../../_components/sheets/sheet-side-background";
import { authClient } from "@/libs/auth-client";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { ProjectGroupColors } from "@/helpers/color";
import {
  createProjectGroupSchema,
  CreateProjectGroupSchema,
  useCreateProjectGroup,
} from "@/features/api/projectGroup/create-projectGroup";
import { zodResolver } from "@hookform/resolvers/zod";

type CreateProjectGroupSheetProps = {
  projectId: string;
};

const CreateProjectGroupSheet = (props: CreateProjectGroupSheetProps) => {
  const form = useForm<CreateProjectGroupSchema>({
    resolver: zodResolver(createProjectGroupSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      color: ProjectGroupColors[0].value,
      projectId: props.projectId,
    },
  });
  const { control, getValues, setValue } = form;
  const { data } = authClient.useSession();

  const { mutate: createProjectGroupMutation } = useCreateProjectGroup({
    token: data?.session.token as string,
    mutationConfig: {
      onSuccess: () => {
        toast.success("Project Group created successfully");

        window.location.reload();
      },
    },
  });

  const handleOnSubmit = () => {
    createProjectGroupMutation({
      color: getValues("color"),
      name: getValues("name"),
      projectId: getValues("projectId"),
    });
  };

  return (
    <Sheet>
      <SheetTrigger
        asChild
        className=" min-w-full justify-start flex font-normal text-sm px-2 py-2"
      >
        <Card className="min-w-[300px] min-h-[200px] h-full flex relative">
          <Button
            variant={"ghost"}
            className=" min-h-full h-full w-full absolute"
          >
            <Plus size={20} />
          </Button>
        </Card>
      </SheetTrigger>

      <SheetContent className=" flex flex-row justify-between  min-w-9/12 mx-auto h-fit translate-x-[-50%] translate-y-[-50%] left-1/2 top-1/2 rounded-xl ">
        <Form {...form}>
          <div className=" flex flex-col w-full ">
            <SheetHeader className=" mb-3">
              <SheetTitle className=" text-xl font-bold">
                Create New Project Group
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

            <SheetFooter className="flex justify-end flex-row">
              <Button
                onClick={handleOnSubmit}
                className=" justify-start flex font-normal text-sm px-4 w-fit"
              >
                Create
              </Button>
            </SheetFooter>
          </div>
        </Form>

        <SheetSideBackground />
      </SheetContent>
    </Sheet>
  );
};

export default CreateProjectGroupSheet;
