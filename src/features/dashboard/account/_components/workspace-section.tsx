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
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  WorkspaceMemberEntity,
  WorkspaceSidebarEntity,
  WorkspaceTypeEntity,
} from "@/types/api/workspace";
import {
  updatWorkspaceSchema,
  UpdatWorkspaceSchema,
  useUpdatWorkspace,
} from "@/features/api/workspace/update-workspace";
import DeleteWorkspaceSheet from "../../_components/sheets/delete-workspace-sheet";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoading } from "@/hooks/use-loading";
import { useAuthenticated } from "@/hooks/use-authenticated";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateWorkspaceMemberSheet from "./create-workspace-member-sheet";
import DeleteWorkspaceMemberSheet from "./delete-workspace-member-sheet";

export const WorkspaceForm = ({
  workspaceSidebarData,
}: {
  workspaceSidebarData: WorkspaceSidebarEntity;
}) => {
  const { workspace: currentWorkspace, setCurrentWorkspace } =
    useCurrentWorkspace();
  // const { data: session } = authClient.useSession();
  const { setIsLoading, isLoading } = useLoading();
  const form = useForm<UpdatWorkspaceSchema>({
    resolver: zodResolver(updatWorkspaceSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      timezone: "",
    },
  });
  const { token, user } = useAuthenticated();
  const { control, getValues, watch } = form;
  const {
    mutate: updateWorkspaceMutation,
    isPending: updateWorkspaceMutationLoading,
  } = useUpdatWorkspace({
    id: workspaceSidebarData?.workspace?.id,
    token: token,
    mutationConfig: {
      onSuccess: () => {
        toast.success("Update workspace success");
      },
    },
  });

  const handleOnSubmit = () => {
    updateWorkspaceMutation({
      name: getValues("name"),
      timezone: getValues("timezone"),
    });

    setCurrentWorkspace({
      name: getValues("name"),
      userId: user.id,
    });
  };

  useEffect(() => {
    if (updateWorkspaceMutationLoading) setIsLoading(true);

    form.reset({
      name: workspaceSidebarData?.workspace?.name,
      timezone: workspaceSidebarData?.workspace?.timezone,
    });
  }, [workspaceSidebarData]);

  return (
    <Form {...form}>
      <Card className=" ">
        <CardHeader>
          <CardTitle className=" font-bold">Overview</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          <h4 className=" font-semibold">Avatar</h4>
          <div className=" bg-red-600 uppercase text-slate-50 font-bold w-fit text-2xl px-5 py-3 flex justify-center items-center rounded-xl">
            {workspaceSidebarData?.workspace?.name[0]}
          </div>

          <FormField
            control={control}
            defaultValue={getValues("name")}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl className=" lg:w-9/12 w-full">
                  <Input
                    {...field}
                    name="name"
                    placeholder="Type Workspace name"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            defaultValue={getValues("timezone")}
            name="timezone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" mb-2">Timezone</FormLabel>
                <FormControl className=" lg:w-9/12 w-full">
                  <Select
                    {...field}
                    name="timezone"
                    value={field.value}
                    onValueChange={field.onChange}
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

          <Button
            className=" w-fit"
            type="button"
            onClick={handleOnSubmit}
            disabled={
              workspaceSidebarData?.workspace?.name === watch("name") &&
              workspaceSidebarData?.workspace?.timezone === watch("timezone")
                ? true
                : false
            }
          >
            Save
          </Button>
        </CardContent>
      </Card>
    </Form>
  );
};

export const WorkspaceMembers = ({
  workspaceMembers,
  workspaceType,
}: {
  workspaceMembers: WorkspaceMemberEntity[];
  workspaceType: WorkspaceTypeEntity;
}) => {
  return (
    <Card>
      <CardHeader className=" flex flex-col gap-3 w-full">
        <div className=" flex flex-row justify-between items-center min-w-full">
          <CardTitle className=" w-full">Workspace Members</CardTitle>

          <div>
            <CreateWorkspaceMemberSheet
              workspaceType={workspaceType}
              workspaceMembersData={workspaceMembers}
            />
          </div>
        </div>

        {workspaceType?.name.toLowerCase() == "personal" && (
          <div className=" w-full bg-red-50 px-4 text-sm py-2 rounded-lg border shadow-inner shadow-slate-50 border-red-600 ">
            <h1 className=" text-red-600">
              You cannot add additional member in personal workspace
            </h1>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined / Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {workspaceMembers?.map((item, i: number) => {
              return (
                <TableRow key={i}>
                  <TableCell className="">
                    <div className=" flex flex-row gap-3 items-center">
                      <div className=" bg-red-600 text-slate-50 font-bold text-xl px-5 py-3 uppercase flex justify-center items-center rounded-2xl">
                        {item.member.name[0]}
                      </div>

                      <div className=" flex flex-col ">
                        <h1 className=" text-slate-900 text-lg font-bold truncate min-w-[200px]  max-w-[200px]">
                          {item.member.name}
                        </h1>
                        <p className=" text-xs">{item.member.email}</p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className=" w-full">
                    <div className=" flex justify-center items-center bg-slate-900 text-slate-50 w-fit px-4 py-1 text-sm font-bold rounded-full">
                      <h1>{item.role}</h1>
                    </div>
                  </TableCell>

                  <TableCell className=" flex flex-row items-center justify-center min-w-full">
                    {item.status.toLocaleLowerCase() == "pending" ? (
                      <div className=" flex justify-center items-center bg-yellow-200 border border-yellow-600 text-slate-50 w-fit px-6 py-1 text-sm font-bold rounded-full">
                        <h1 className=" capitalize text-slate-900">
                          {item.status}
                        </h1>
                      </div>
                    ) : (
                      <h3 className=" font-semibold text-sm">
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </h3>
                    )}

                    {item.role.toLocaleLowerCase() != "owner" && (
                      <DeleteWorkspaceMemberSheet id={item.id} />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export const WorkspaceDeleteView = ({
  workspaceSidebarData,
}: {
  workspaceSidebarData: WorkspaceSidebarEntity;
}) => {
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

      {workspaceSidebarData?.workspace?.workspaceType?.name == "personal" && (
        <CardContent>
          <h1 className=" bg-red-100 rounded-lg w-full container mx-auto p-3 text-sm text-red-600">
            Personal is Workspace is not available to delete
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
  const { setIsLoading } = useLoading();
  // const { data: session } = authClient.useSession();
  const { token } = useAuthenticated();
  const { data: workspaceSidebarData, isLoading: workspaceSidebarDataLoading } =
    useGetWorkspaceSidebar({
      token: token,
      userId: currentWorkspace.userId,
      workspaceName: currentWorkspace.name,
    });

  useEffect(() => {
    if (workspaceSidebarDataLoading) {
      setIsLoading(true);
    }

    setIsLoading(false);
  }, [workspaceSidebarDataLoading]);

  return (
    <section>
      <AccountLayout>
        <div className=" flex flex-col gap-3 pb-4">
          {/* overview card */}
          <WorkspaceForm workspaceSidebarData={workspaceSidebarData} />

          <WorkspaceMembers
            workspaceMembers={workspaceSidebarData?.workspace?.workspaceMembers}
            workspaceType={workspaceSidebarData?.workspace?.workspaceType}
          />

          {/* delete card*/}
          <WorkspaceDeleteView workspaceSidebarData={workspaceSidebarData} />
        </div>
      </AccountLayout>
    </section>
  );
};
