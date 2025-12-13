import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SettingsIcon } from "lucide-react";
import { ProjectBodyRequest } from "@/types/api/project";
import SheetSideBackground from "./sheet-side-background";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DeleteProjectSheet from "./delete-project-sheet";
import { useUpdatProject } from "@/features/api/project/update-project";

type UpdateDeleteProjectSheet = {
  id: string;
  name: string;
};

const UpdateDeleteProjectSheet = (props: UpdateDeleteProjectSheet) => {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const form = useForm();
  const { control } = useForm();
  const [bodyRequest, setBodyRequest] = useState<ProjectBodyRequest>({
    name: props?.name,
    template: "",
  });
  const { mutate: updateProjectMutation } = useUpdatProject({
    id: props.id,
    token: session?.session.token as string,
    mutationConfig: {
      onSuccess: () => {
        toast.success("Update project success");

        window.location.reload();
      },
    },
  });

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;

    setBodyRequest((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleOnSubmit = () => {
    updateProjectMutation({
      name: bodyRequest.name,
    });

    setBodyRequest({
      name: props.name,
      template: "",
    });
  };

  return (
    <Sheet>
      <SheetTrigger
        asChild
        className=" min-w-fit justify-start items-center flex font-normal text-sm px-2 py-2"
      >
        <Button
          className={` text-xs z-30 flex justify-end items-center`}
          variant={"secondary"}
        >
          <SettingsIcon size={15} />
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
                        placeholder="Type Project name"
                        name="name"
                        value={bodyRequest?.name}
                        onChange={(e) => {
                          field.onChange(e);
                          handleOnChange(e);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Card className=" bg-red-50 shadow-red-600 shadow-xs pb-4 mx-3 my-7">
              <CardHeader>
                <CardTitle className=" text-red-600 font-bold">
                  Delete Project
                </CardTitle>
                <CardDescription className=" text-red-600">
                  Are you sure to delete workspace permanently, including
                  content and team
                </CardDescription>
              </CardHeader>

              <CardFooter>
                <DeleteProjectSheet id={props.id} />
              </CardFooter>
            </Card>

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

export default UpdateDeleteProjectSheet;
