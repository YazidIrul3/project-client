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
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  createProjectSchema,
  CreateProjectSchema,
  useCreateProject,
} from "@/features/api/project/create-project";
import { authClient } from "@/libs/auth-client";
import { toast } from "sonner";
import { useGetWorkspaceSidebar } from "@/features/api/workspace/get-workspace-sidebar";
import { useCurrentWorkspace } from "@/features/dashboard/_hooks/use-current-workspace";
import SheetSideBackground from "@/features/dashboard/_components/sheets/sheet-side-background";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSheet } from "@/hooks/use-sheet";

const CreateProjectSheet = () => {
  const { open } = useSidebar();
  const form = useForm<CreateProjectSchema>({
    resolver: zodResolver(createProjectSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      template: "default",
    },
  });
  const { control, getValues } = form;
  const { workspace: currentWorkspace } = useCurrentWorkspace();
  const { data } = authClient.useSession();
  const { data: workspace } = useGetWorkspaceSidebar({
    token: data?.session.token as string,
    userId: currentWorkspace.userId,
    workspaceName: currentWorkspace.name,
  });
  const { mutate: createProjectMutaion } = useCreateProject({
    token: data?.session.token as string,
    mutationConfig: {
      onSuccess: () => {
        window.location.reload();

        toast.success("Create project success");
      },
    },
  });

  const handleOnSubmit = () => {
    createProjectMutaion({
      name: getValues("name"),
      workspaceId: workspace?.id,
      template: getValues("template"),
    });

    form.reset();
  };

  return (
    <Sheet>
      <SheetTrigger
        asChild
        className=" min-w-full justify-start flex font-normal text-sm px-2 py-2"
      >
        <Button className={` text-xs mx-auto w-fit`} variant={"secondary"}>
          <Plus />
          <h1 className={`${open ? "" : "hidden"}`}> Add Project</h1>
        </Button>
      </SheetTrigger>

      <SheetContent className=" flex flex-row justify-between  min-w-9/12 mx-auto h-fit translate-x-[-50%] translate-y-[-50%] left-1/2 top-1/2 rounded-xl ">
        <Form {...form}>
          <div className=" flex flex-col w-full ">
            <SheetHeader className=" mb-3">
              <SheetTitle className=" text-xl font-bold">
                Create New Project
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
                name="template"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Template Project</FormLabel>
                    <FormControl className=" lg:w-9/12 w-full">
                      <Select {...field} name="template" defaultValue="default">
                        <SelectTrigger value={"tes"}>
                          <SelectValue placeholder="Select a template" />
                        </SelectTrigger>

                        <SelectContent className=" capitalize">
                          <SelectGroup>
                            <SelectItem value="default">default</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <SheetFooter className="flex justify-end flex-row">
              {/* <Button
                    variant={"ghost"}
                    className=" justify-start flex font-normal text-sm px-4 w-fit"
                  >
                    Cancel
                  </Button> */}
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

export default CreateProjectSheet;
