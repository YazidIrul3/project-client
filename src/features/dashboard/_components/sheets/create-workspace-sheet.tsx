"use client";

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
import {
  createWorkspaceInputSchema,
  CreateWorkspaceInputSchema,
  useCreateWorkspace,
} from "@/features/api/workspace/create-workspace";
import { authClient } from "@/libs/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import SheetSideBackground from "./sheet-side-background";
import { useSheet } from "@/hooks/use-sheet";
import { useCurrentWorkspace } from "../../_hooks/use-current-workspace";

const CreateWorkspaceSheet = () => {
  const { data } = authClient.useSession();
  const token = data?.session.token;
  const { workspace: currentWorkspace } = useCurrentWorkspace();
  const form = useForm<CreateWorkspaceInputSchema>({
    resolver: zodResolver(createWorkspaceInputSchema),
    mode: "onChange",
    defaultValues: {
      avatar: "",
      name: "",
      timezone: "",
      workspaceTypeName: currentWorkspace.name,
      userId: currentWorkspace.userId,
    },
  });
  const { mutate: createWorkspaceMutation } = useCreateWorkspace({
    token,
    mutationConfig: {
      onSuccess: () => {
        toast.success("Workspace created successfully");
        closeSheet();
      },
    },
  });
  const { control, getValues } = form;
  const { open, openSheet, setOpen, closeSheet } = useSheet();

  const handleOnSubmit = () => {
    createWorkspaceMutation({
      avatar: "Tes",
      name: getValues("name"),
      workspaceTypeName: getValues("workspaceTypeName"),
      timezone: getValues("timezone"),
      userId: getValues("userId"),
    });
  };

  console.log(currentWorkspace);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        asChild
        className=" min-w-full justify-start flex font-normal text-sm px-2 py-2"
      >
        <Button
          variant={"ghost"}
          onClick={openSheet}
          className=" justify-start flex font-normal text-sm px-2"
        >
          <Plus size={20} />
          New Workspace
        </Button>
      </SheetTrigger>
      <SheetContent className=" flex flex-row justify-between  min-w-11/12 mx-auto h-11/12 translate-x-[-50%] translate-y-[-50%] left-1/2 top-1/2 rounded-xl ">
        <Form {...form}>
          <div className=" flex flex-col w-full ">
            <SheetHeader className=" mb-3">
              <SheetTitle className=" text-xl font-bold">
                Create New Workspace
              </SheetTitle>
              <SheetDescription>
                Workspace will help you to manage a lot of your projects
              </SheetDescription>
            </SheetHeader>

            <div className=" px-3 flex flex-col gap-8">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" mb-2">Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Type workspace name"
                        name="name"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="workspaceTypeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" mb-2">Workspace Type</FormLabel>
                    <FormControl className=" lg:w-9/12 w-full">
                      <Select
                        {...field}
                        defaultValue="Team"
                        name="workspaceTypeName"
                      >
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={"Team"}
                            placeholder="Select a Workspace Type"
                          />
                        </SelectTrigger>

                        <SelectContent onChange={field.onChange}>
                          <SelectGroup>
                            <SelectItem value="Team">Team</SelectItem>
                            <SelectItem value="Organization">
                              Organization
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" mb-2">Timezone</FormLabel>
                    <FormControl className=" lg:w-9/12 w-full">
                      <Select {...field} name="timezone">
                        <SelectTrigger value={"tes"}>
                          <SelectValue placeholder="Select a timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="est">EST</SelectItem>
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

export default CreateWorkspaceSheet;
