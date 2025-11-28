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
import { Label } from "@/components/ui/label";
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
  createWorkspace,
  useCreateWorkspace,
} from "@/features/api/workspace/create-workspace";
import {
  CreateWorkspaceSchema,
  createWorkspaceSchema,
} from "@/features/schema/workspace";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import SheetSideBackground from "./sheet-side-background";

const CreateWorkspaceSheet = () => {
  const { data } = authClient.useSession();
  const token = data?.session.token;
  const form = useForm<CreateWorkspaceSchema>({
    resolver: zodResolver(createWorkspaceSchema),
    mode: "onChange",
  });
  const { mutate: createWorkspaceMutation } = useCreateWorkspace({
    token,
    mutationConfig: {
      onSuccess: () => {
        toast.success("Workspace created successfully");
      },
    },
  });
  const [bodyRequest, setBodyRequest] = useState<CreateWorkspaceSchema>({
    name: "",
    avatar: "",
    timezone: "",
    userId: "",
    workspaceTypeName: "team",
  });
  const { control } = form;

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
    setBodyRequest({
      name: "",
      avatar: "",
      timezone: "",
      userId: "",
      workspaceTypeName: "team",
    });
    createWorkspaceMutation({
      avatar: "Tes",
      name: bodyRequest.name,
      workspaceTypeName: bodyRequest.workspaceTypeName,
      timezone: bodyRequest.timezone,
      userId: data?.user?.id!,
    });
  };

  return (
    <Sheet>
      <SheetTrigger
        asChild
        className=" min-w-full justify-start flex font-normal text-sm px-2 py-2"
      >
        <Button
          variant={"ghost"}
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
                        name="name"
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
                name="workspaceTypeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" mb-2">Workspace Type</FormLabel>
                    <FormControl className=" lg:w-9/12 w-full">
                      <Select
                        defaultValue="Team"
                        name="workspaceTypeName"
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleOnChange({
                            target: { name: "workspaceTypeName", value },
                          } as any);
                        }}
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
                      <Select
                        name="timezone"
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleOnChange({
                            target: { name: "timezone", value },
                          } as any);
                        }}
                      >
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
