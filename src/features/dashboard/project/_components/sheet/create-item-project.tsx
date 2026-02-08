"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar, CircleDashed, Plus, UsersRound } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  createItemProjectGroupSchema,
  CreateItemProjectGroupSchema,
  useCreateItemProjectGroup,
} from "@/features/api/itemProject/create-itemProjectGroup";
import { DateTimePicker } from "@/components/shared/datetime-picker";
import { SelectPriority } from "@/components/shared/select-priority";
import { SelectAssigned } from "@/components/shared/select-assigned";
import SheetSideBackground from "../../../_components/sheets/sheet-side-background";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthenticated } from "@/hooks/use-authenticated";
import { WYSIWYGTextEditor } from "../../../../../components/shared/text-editor";

type CreateItemProjectProps = {
  id: string;
  borderColor: string;
};

const CreateItemProject = ({
  projectGroupId,
  borderColor,
  lengthItemProject,
}: {
  projectGroupId: string;
  borderColor: string;
  lengthItemProject: number;
}) => {
  const { token, user } = useAuthenticated();
  const { mutate: CreateItemProjectMutate } = useCreateItemProjectGroup({
    token: token,
    mutationConfig: {
      onSuccess: () => {
        toast.success("Create Item Project Success");

        window.location.reload();
      },
    },
  });
  // const editor = useEditor({
  //   immediatelyRender: false,
  //   editorProps: {
  //     attributes: {
  //       autocomplete: "off",
  //       autocorrect: "off",
  //       autocapitalize: "off",
  //       "aria-label": "Main content area, start typing to enter text.",
  //       class: "simple-editor",
  //     },
  //   },
  //   extensions: [
  //     StarterKit.configure({
  //       horizontalRule: false,
  //       link: {
  //         openOnClick: false,
  //         enableClickSelection: true,
  //       },
  //     }),
  //     HorizontalRule,
  //     TextAlign.configure({ types: ["heading", "paragraph"] }),
  //     TaskList,
  //     TaskItem.configure({ nested: true }),
  //     Highlight.configure({ multicolor: true }),
  //     Image,
  //     Typography,
  //     Superscript,
  //     Subscript,
  //     Selection,
  //     ImageUploadNode.configure({
  //       accept: "image/*",
  //       maxSize: MAX_FILE_SIZE,
  //       limit: 3,
  //       upload: handleImageUpload,
  //       onError: (error) => console.error("Upload failed:", error),
  //     }),
  //   ],
  // });
  const form = useForm<CreateItemProjectGroupSchema>({
    mode: "onChange",
    resolver: zodResolver(createItemProjectGroupSchema),
    defaultValues: {
      title: "",
      description: "",
      projectGroupId,
      startDate: new Date(),
      endDate: new Date(),
      startTime: "07:00",
      endTime: "07:00",
      priority: "LOW",
      index: lengthItemProject,
      assignedUsers: [
        {
          name: user.name,
          id: user.id,
          email: user.email,
        },
      ],
    },
  });
  const { control, getValues } = form;

  const handleOnSubmit = () => {
    CreateItemProjectMutate({
      title: getValues("title"),
      endDate: getValues("endDate"),
      startDate: getValues("startDate"),
      startTime: getValues("startTime"),
      endTime: getValues("endTime"),
      priority: getValues("priority"),
      projectGroupId: getValues("projectGroupId"),
      description: "",
      // description: editor?.getHTML() as string,
      assignedUsers: getValues("assignedUsers"),
      index: lengthItemProject,
    });
  };

  console.log(lengthItemProject);

  return (
    <Sheet>
      <SheetTrigger
        asChild
        style={{
          borderColor: borderColor || "gray",
        }}
        className=" min-w-full border-dashed border-2 z-40"
      >
        <Button variant={"ghost"}>
          <Plus />
        </Button>
      </SheetTrigger>

      <SheetContent className=" flex flex-row  items-center min-w-fit   h-11/12 translate-x-[-50%] translate-y-[-50%] left-1/2 top-1/2 rounded-xl px-4">
        <Form {...form}>
          <div className="flex flex-col w-full min-h-full p-4">
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" flex flex-row items-center gap-2 min-w-[120px]">
                    <Calendar strokeWidth={"3px"} size={17} />
                    <h1 className=" text-sm">Start Date</h1>
                  </FormLabel>

                  <FormControl>
                    <input
                      {...field}
                      placeholder="Title Item"
                      name="title"
                      className=" placeholder-shown:text-3xl font-bold text-3xl focus:outline-none shadow-none"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <main className="  left-0 text-gray-500 ">
              <div className=" flex flex-col flex-wrap mt-3 justify-start items-start  w-11/12 gap-2">
                <div className=" flex flex-col justify-start items-start  min-h-full">
                  <FormField
                    control={control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className=" w-full flex flex-col gap-3 justify-start items-start">
                        <FormLabel className=" flex flex-row items-center gap-2 min-w-[120px]">
                          <Calendar strokeWidth={"3px"} size={17} />
                          <h1 className=" text-sm">Start Date</h1>
                        </FormLabel>
                        <FormControl className="">
                          <DateTimePicker {...field} name="start" />
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
                            {...field}
                            assignedData={getValues("assignedUsers")}
                            name="assignedUsers"
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
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className=" w-full flex flex-row gap-3 justify-center items-center">
                        <FormLabel className=" flex flex-row items-center gap-2 min-w-[120px]">
                          <Calendar strokeWidth={"3px"} size={17} />
                          <h1 className=" text-sm">Due Date</h1>
                        </FormLabel>
                        <FormControl className="">
                          <DateTimePicker {...field} name="endDate" />
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
                          <SelectPriority {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* <WYSIWYGTextEditor /> */}
            </main>

            <SheetFooter className=" flex flex-row justify-end">
              <Button
                className="  w-fit font-semibold z-40"
                onClick={handleOnSubmit}
              >
                Create
              </Button>
            </SheetFooter>
          </div>
          {/* mobile sidebar */}
        </Form>

        {/* <SheetSideBackground /> */}
      </SheetContent>
    </Sheet>
  );
};

export default CreateItemProject;
