"use client";

import { Button } from "@/components/ui/button";
import AccountLayout from "../_components/account-layout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { useGetWorkspaceSidebar } from "@/features/api/workspace/get-workspace-sidebar";
import { useCurrentWorkspace } from "../../_hooks/use-current-workspace";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import withAuthUser from "@/utils/withAuthUser";
import React, { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WorkspaceupdateEntity } from "@/types/api/workspace";
import { useUpdatWorkspace } from "@/features/api/workspace/update-workspace";
import { useDeleteWorkspace } from "@/features/api/workspace/delete-workspace";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import DeleteWorkspaceSheet from "../../_components/sheets/delete-workspace-sheet";

export const WorkspaceOverview = () => {
  const form = useForm();
  const { control } = form;
  const { workspace: currentWorkspace } = useCurrentWorkspace();
  const { data: session } = authClient.useSession();
  const { data: workspace, isLoading: workspaceSidebarDataLoading } =
    useGetWorkspaceSidebar({
      token: session?.session.token as string,
      userId: currentWorkspace.userId as string,
      workspaceName: currentWorkspace.name as string,
      queryConfig: {
        enabled:
          !!session?.session.token &&
          !!currentWorkspace.userId &&
          !!currentWorkspace.name,
      },
    });
  const [bodyRequest, setBodyRequest] = useState<WorkspaceupdateEntity>({
    name: workspace?.name,
    avatar: "",
    timezone: "",
  });
  const { mutate: updateWorkspaceMutation } = useUpdatWorkspace({
    id: workspace?.id,
    token: session?.session.token!,
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

  const handleOnSubmit = () => {
    updateWorkspaceMutation({ name: workspace?.name, timezone: "" });
    setBodyRequest({ name: workspace?.name, avatar: "", timezone: "" });
  };

  return (
    <Form {...form}>
      <Card className=" ">
        <CardHeader>
          <CardTitle className=" font-bold">Overview</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          <h4 className=" font-semibold">Avatar</h4>
          <div className=" bg-red-600 uppercase text-slate-50 font-bold w-fit text-2xl px-5 py-3 flex justify-center items-center rounded-xl">
            {workspace?.name[0]}
          </div>

          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl className=" lg:w-9/12 w-full">
                  <Input
                    {...field}
                    placeholder="Type Workspace name"
                    value={bodyRequest?.name}
                    onChange={(e) => handleOnChange(e)}
                  />
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

          {bodyRequest?.name == workspace?.name ? (
            <Button className=" w-fit" type="button" disabled>
              Save
            </Button>
          ) : (
            <Button className=" w-fit" type="button" onClick={handleOnSubmit}>
              Save
            </Button>
          )}
        </CardContent>
      </Card>
    </Form>
  );
};

export const WorkspaceDeleteView = () => {
  const { workspace: currentWorkspace } = useCurrentWorkspace();
  const { data: session } = authClient.useSession();
  const { data: workspace, isLoading: workspaceSidebarDataLoading } =
    useGetWorkspaceSidebar({
      token: session?.session.token!,
      userId: currentWorkspace.userId,
      workspaceName: currentWorkspace.name,
    });

  return (
    <Card className=" bg-red-50 shadow-red-600 shadow-xs pb-4">
      <CardHeader>
        <CardTitle className=" text-red-600 font-bold">
          Delete Workspace
        </CardTitle>
        <CardDescription className=" text-red-600">
          Are you sure to delete workspace permanently, including content and
          team
        </CardDescription>
      </CardHeader>

      {workspace?.workspaceType?.name == "personal" && (
        <CardContent>
          <h1 className=" bg-red-100 rounded-lg w-full container mx-auto p-3 text-sm text-red-600">
            Personal's Workspace is not available to delete
          </h1>
        </CardContent>
      )}

      <CardFooter>
        <DeleteWorkspaceSheet />
      </CardFooter>
    </Card>
  );
};

export const WorkspaceSection = () => {
  const { workspace: currentWorkspace } = useCurrentWorkspace();
  const { data: session } = authClient.useSession();
  const { data: workspace, isLoading: workspaceSidebarDataLoading } =
    useGetWorkspaceSidebar({
      token: session?.session.token as string,
      userId: currentWorkspace.userId,
      workspaceName: currentWorkspace.name,
      queryConfig: {
        enabled: !!session?.session.token,
      },
    });

  return (
    <section>
      {workspaceSidebarDataLoading && <Spinner />}
      <AccountLayout>
        <div className=" flex flex-col gap-3 pb-4">
          {/* overview card */}
          <WorkspaceOverview />

          {/* delete card*/}
          <WorkspaceDeleteView />
        </div>
      </AccountLayout>
    </section>
  );
};
