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
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSheet } from "@/hooks/use-sheet";
import { useCreateChatChannel } from "@/features/api/chatChannel/create-chatChannel";
import { useCurrentWorkspace } from "@/features/dashboard/_hooks/use-current-workspace";
import { useDebounce } from "use-debounce";
import {
  WorkspaceMemberEntity,
  WorkspaceTypeEntity,
} from "@/types/api/workspace";
import { useAuthenticated } from "@/hooks/use-authenticated";
import { UserEntity } from "@/types/api/user";
import { useGetAccountSearch } from "@/features/api/user/get-account-search";
import { Plus, SearchIcon } from "lucide-react";
import { ItemMedia } from "@/components/ui/item";
import { useCreateWorkspaceMember } from "@/features/api/workspaceMember/create-workspace-member";

const CreateWorkspaceMemberSheet = ({
  workspaceType,
  workspaceMembersData,
}: {
  workspaceType: WorkspaceTypeEntity;
  workspaceMembersData: WorkspaceMemberEntity[];
}) => {
  const { workspace: currentWorkspace } = useCurrentWorkspace();
  const { token } = useAuthenticated();
  const { open, setOpen } = useSheet();

  // 1. Manage the raw input state
  const [searchInput, setSearchInput] = useState("");

  // 2. Debounce that input (delay of 500ms is usually safer for APIs)
  const [debouncedEmail] = useDebounce(searchInput, 500);

  // 3. Pass the DEBOUNCED value to your query hook
  const {
    data: accountSearchData,
    isLoading,
    isFetching,
  } = useGetAccountSearch({
    token: token,
    email: debouncedEmail,
    // Add this to prevent searching for empty strings
    queryConfig: {
      enabled: !!debouncedEmail && debouncedEmail.length > 3,
    },
  });
  const memberExisted = workspaceMembersData?.filter(
    (item) => item.member.email == accountSearchData?.data?.email,
  );
  const {
    mutate: createWorkspaceMemberMutation,
    isPending: createWorkspaceMemberLoading,
  } = useCreateWorkspaceMember({
    token,
    mutationConfig: {
      onSuccess: () => {
        toast.success("Invite new workspace member success");

        window.location.reload();
      },

      onError: () => {
        toast.error("Invite new workspace member error");
      },
    },
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className=" w-full font-normal text-sm px-2 py-2">
        <Button
          className=" w-fit"
          disabled={
            workspaceType?.name.toLowerCase() == "personal" ? true : false
          }
        >
          <Plus />
          Add
        </Button>
      </SheetTrigger>
      <div className="min-w-full mx-auto h-full p-2">
        <SheetContent className=" flex flex-row justify-between h-fit   rounded-xl translate-x-[-50%] translate-y-[-50%] left-1/2 top-1/2">
          {/* <Form {...form}> */}
          <div className=" flex flex-col w-full ">
            <SheetHeader className=" mb-3">
              <SheetTitle className=" text-xl font-bold">
                Add New Workspace Member{" "}
              </SheetTitle>
            </SheetHeader>

            <div className=" px-3 flex flex-col gap-8">
              <div
                data-slot="command-input-wrapper"
                className="flex h-9 flex-row justify-evenly items-center w-full gap-2 border-b pl-3 pr-7 bg-slate-50  shadow-sm"
              >
                <Input
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search wokrspace member"
                  className=" min-w-full focus:outline-none outline-none border-0 focus-visible:ring-0 px-0"
                />

                <SearchIcon className="size-4 shrink-0 opacity-50" />
              </div>

              <div>
                {accountSearchData?.data && (
                  <div className=" flex justify-between flex-row items-center">
                    <div className=" flex flex-row gap-3 items-center ">
                      <div className=" w-[43px] h-[43px] bg-red-600 rounded-sm flex justify-center items-center font-bold text-slate-50 text-lg uppercase">
                        {accountSearchData?.data?.name[0]}
                      </div>

                      <div className=" flex flex-col">
                        <h1 className=" font-semibold">
                          {accountSearchData?.data?.name}
                        </h1>
                        <p className=" text-xs font-normal">
                          {accountSearchData?.data?.email}
                        </p>
                      </div>
                    </div>

                    {memberExisted.length <= 0 && (
                      <Button
                        onClick={() => {
                          createWorkspaceMemberMutation({
                            memberId: accountSearchData?.data?.id,
                            role: "member",
                            workspaceId: workspaceMembersData[0]?.workspaceId,
                            status: "pending",
                          });
                        }}
                        variant={"outline"}
                        disabled={createWorkspaceMemberLoading ? true : false}
                      >
                        Add
                      </Button>
                    )}
                  </div>
                )}
              </div>

              <div className=" flex flex-row items-center gap-2"></div>
            </div>

            {/* <SheetFooter className="flex justify-end flex-row">
              <Button
                variant={"outline"}
                onClick={() => setOpen(false)}
                className=" justify-start flex font-normal text-sm px-4 w-fit"
              >
                Cancel
              </Button>
              <Button
                // onClick={handleOnSubmit}
                className=" justify-start flex font-normal text-sm px-4 w-fit"
              >
                Simpan
              </Button>
            </SheetFooter> */}
          </div>
          {/* </Form> */}
        </SheetContent>
      </div>
    </Sheet>
  );
};

export default CreateWorkspaceMemberSheet;
