"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar, CircleDashed, Pencil, Plus, UsersRound } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Selection } from "@tiptap/extensions";
import { useEditor } from "@tiptap/react";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node";
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";
import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import { DateTimePicker } from "@/components/shared/datetime-picker";
import { SelectPriority } from "@/components/shared/select-priority";
import { SelectAssigned } from "@/components/shared/select-assigned";
import { toast } from "sonner";
import {
  ItemProjectGroupBodyRequest,
  ItemProjectGroupEntity,
} from "@/types/api/item-project-group";
import SheetSideBackground from "@/features/dashboard/_components/sheets/sheet-side-background";
import { useUpdateItemProjectGroup } from "@/features/api/itemProject/update-itemProject";

type AssignedType = {
  assigned: {
    id: string;
    name: string;
    email: string;
  };
};

const UpdateItemProjectSheet = ({
  data,
  projectGroupId,
}: {
  data: ItemProjectGroupEntity;
  projectGroupId: string;
}) => {
  const form = useForm();
  const { data: user } = authClient.useSession();
  const [bodyRequest, setBodyRequest] = useState<ItemProjectGroupBodyRequest>({
    title: data?.title,
    description: data.description,
    projectGroupId: projectGroupId,
    startDate: data.startDate,
    endDate: data.endDate,
    startTime: data.startDate.toString().split("T")[1],
    endTime: data.endDate.toString().split("T")[1],
    priority: data.priority,
    assignedUsers: data.assignedUsers.map((item: AssignedType | any) => {
      return {
        id: item.assigned.id,
        email: item.assigned.email,
        name: item.assigned.name,
      };
    }) as any,
  });

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
    ],
  });
  const { formState, control, handleSubmit } = form;
  const { mutate: UpdateItemProjectMutate } = useUpdateItemProjectGroup({
    id: data.id,
    token: user?.session.token as string,
    mutationConfig: {
      onSuccess: () => {
        toast.success("Update Item Project Success");

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
    UpdateItemProjectMutate({
      title: bodyRequest.title,
      endDate: bodyRequest.endDate,
      startDate: bodyRequest.startDate,
      startTime: bodyRequest.startTime,
      endTime: bodyRequest.endTime,
      priority: bodyRequest.priority,
      projectGroupId: bodyRequest.projectGroupId,
      description: editor?.getHTML() as string,
      assignedUsers: bodyRequest?.assignedUsers as any,
    });

    setBodyRequest({
      title: data.title,
      description: data.description,
      projectGroupId: projectGroupId,
      startDate: data.startDate,
      endDate: data.endDate,
      startTime: data.startDate.toString().split("T")[1],
      endTime: data.endDate.toString().split("T")[1],
      priority: data.priority,
      assignedUsers: data.assignedUsers.map((item: AssignedType | any) => {
        return {
          id: item.assigned.id,
          email: item.assigned.email,
          name: item.assigned.name,
        };
      }) as any,
    });
  };

  useEffect(() => {
    if (data.description) {
      editor?.commands.setContent(data.description);
    }
  }, [editor, data.description]);

  console.log(projectGroupId);

  return (
    <Sheet>
      <SheetTrigger asChild className=" min-w-full border-dashed border-2">
        <div className=" flex flex-row items-center gap-1.5">
          <Pencil size={10} strokeWidth={"3px"} className=" text-yellow-600" />
          <p className="  font-semibold">Edit</p>
        </div>
      </SheetTrigger>

      <SheetContent className=" flex flex-row  items-center min-w-11/12  h-11/12 translate-x-[-50%] translate-y-[-50%] left-1/2 top-1/2 rounded-xl px-4">
        <Form {...form}>
          <div className="flex flex-col w-full min-h-full relative">
            <SheetTitle className=" z-50 px-3 py-5 mb-3">
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        placeholder="Title Item"
                        name="title"
                        value={bodyRequest.title}
                        onChange={(e) => {
                          field.onChange(e);
                          handleOnChange(e);
                        }}
                        className=" placeholder-shown:text-3xl font-bold text-3xl focus:outline-none shadow-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </SheetTitle>

            <main className=" absolute left-0 mt-14 px-4 text-gray-500 ">
              <div className=" flex flex-col flex-wrap mt-3 justify-start items-start  w-11/12 gap-2">
                <div className=" flex flex-col justify-start items-start  min-h-full">
                  <FormField
                    control={control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className=" w-full flex flex-row gap-3 justify-center items-center">
                        <FormLabel className=" flex flex-row items-center gap-2 min-w-[120px]">
                          <Calendar strokeWidth={"3px"} size={17} />
                          <h1 className=" text-sm">Start Date</h1>
                        </FormLabel>
                        <FormControl className="">
                          <DateTimePicker
                            onChange={(e) => {
                              field.onChange(e);
                              handleOnChange(e);
                            }}
                            name="start"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=" flex flex-col justify-start items-start  min-h-full">
                  <FormField
                    control={control}
                    name="assignedUsers"
                    render={({ field }) => (
                      <FormItem className=" w-full flex flex-row gap-3 items-center">
                        <FormLabel className=" flex flex-row items-center gap-2 min-w-[120px]">
                          <UsersRound strokeWidth={"3px"} size={16} />
                          Assigned
                        </FormLabel>
                        <FormControl className="  w-full">
                          <SelectAssigned
                            assignedData={bodyRequest?.assignedUsers}
                            name="assignedUsers"
                            onChange={(value) => {
                              field.onChange(value);
                              handleOnChange({
                                target: { name: "assignedUsers", value },
                              } as any);
                            }}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=" flex flex-col justify-start items-start  min-h-full">
                  <FormField
                    control={control}
                    name="timezone"
                    render={({ field }) => (
                      <FormItem className=" w-full flex flex-row gap-3 justify-center items-center">
                        <FormLabel className=" flex flex-row items-center gap-2 min-w-[120px]">
                          <Calendar strokeWidth={"3px"} size={17} />
                          <h1 className=" text-sm">Due Date</h1>
                        </FormLabel>
                        <FormControl className="">
                          <DateTimePicker name="start" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=" flex flex-col justify-start items-start  min-h-full">
                  <FormField
                    control={control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem className=" w-full flex flex-row gap-3 items-center">
                        <FormLabel className=" flex flex-row items-center gap-2 min-w-[120px]">
                          <CircleDashed strokeWidth={"3px"} size={16} />
                          Priority
                        </FormLabel>
                        <FormControl className="  w-full">
                          <SelectPriority
                            onChange={(value) => {
                              field.onChange(value);
                              handleOnChange({
                                target: { name: "priority", value },
                              } as any);
                            }}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <SimpleEditor editor={editor} />
            </main>

            <SheetFooter className=" flex flex-row justify-end">
              <Button
                className="  w-fit font-semibold z-40"
                onClick={handleOnSubmit}
              >
                Save
              </Button>
            </SheetFooter>
          </div>
          {/* mobile sidebar */}
        </Form>

        <SheetSideBackground />
      </SheetContent>
    </Sheet>
  );
};

export default UpdateItemProjectSheet;
