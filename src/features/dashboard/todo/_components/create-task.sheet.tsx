import { DateTimePicker } from "@/components/shared/datetime-picker";
import { SelectAssigned } from "@/components/shared/select-assigned";
import { SelectPriority } from "@/components/shared/select-priority";
import { SelectProject } from "@/components/shared/select-project";
import { SelectStatus } from "@/components/shared/select-status";
import { SelectWorkspace } from "@/components/shared/select-workspace";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Textarea } from "@/components/ui/textarea";
import {
  createTaskSchema,
  CreateTaskSchema,
  useCreateTask,
} from "@/features/api/task/create-task";
import { useAuthenticated } from "@/hooks/use-authenticated";
import { useSheet } from "@/hooks/use-sheet";
import { ProjectEntity } from "@/types/api/project";
import { WorkspaceEntity } from "@/types/api/workspace";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRightCircle,
  Calendar,
  Clock,
  Plus,
  UsersRound,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateTaskSheet = ({
  projectsData,
  workspacesData,
}: {
  projectsData: ProjectEntity[];
  workspacesData: WorkspaceEntity[];
}) => {
  const { user, token } = useAuthenticated();
  const [taskOwners, setTaskOwners] = useState([
    {
      name: user.name,
      email: user.email,
      id: user.id,
    },
  ]);

  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    mode: "onChange",
    defaultValues: {
      description: "",
      title: "",
      startDate: new Date(),
      endDate: new Date(),
      startTime: "07:00",
      endTime: "07:00",
      status: "todo",
      priority: "LOW",
    },
  });
  const { open, setOpen } = useSheet();
  const { control, watch, getValues } = form;
  const { mutate: createTaskMutation } = useCreateTask({
    token: token,
    mutationConfig: {
      onSuccess: () => {
        toast.success("Created task succesfully");
      },

      onError: () => {
        toast.error("Created task error");
      },
    },
  });

  const handleOnSubmit = () => {
    createTaskMutation({
      description: getValues("description"),
      title: getValues("title"),
      status: getValues("status"),
      priority: getValues("priority"),
      projectId: getValues("projectId"),
      startDate: getValues("startDate"),
      endDate: getValues("endDate"),
      startTime: getValues("startTime"),
      endTime: getValues("endTime"),
      workspaceId: getValues("workspaceId"),
      taskOwners: taskOwners,
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className=" w-fit font-normal text-sm px-2 py-2">
        <Button className=" w-fit">
          <Plus />
          Add Task
        </Button>
      </SheetTrigger>
      <div className="min-w-full mx-auto h-full">
        <SheetContent className=" flex flex-row justify-between w-6/12 min-w-[400px] max-w-[1600px] max-h-11/12 overflow-y-scroll scrollbar-hide py-2 px-2   rounded-xl translate-x-[-50%] translate-y-[-50%] left-1/2 top-1/2">
          <Form {...form}>
            <div className=" flex flex-col w-full ">
              <SheetHeader className="">
                <SheetTitle className=" text-xl font-bold">
                  Create New Task
                </SheetTitle>
              </SheetHeader>

              <div className=" px-4 flex flex-col gap-3.5  overflow-y-scroll scrollbar-hide">
                <FormField
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-xs">Name</FormLabel>
                      <FormDescription className=" text-xs">
                        Berikan kalimat yang ringkas namun mudah dipahami dan
                        kontekstual
                      </FormDescription>
                      <FormControl className="">
                        <Input
                          {...field}
                          placeholder="Task Name"
                          className=" md:text-2xl text-2xl md:py-2  font-bold "
                          name="title"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className=" grid md:grid-cols-3 grid-cols-1 gap-3">
                  <FormField
                    control={control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="  min-w-full flex flex-col gap-2 ">
                        <FormLabel className=" flex flex-row items-center gap-2 text-xs">
                          {/* <CircleDashed strokeWidth={"3px"} size={16} /> */}
                          Status
                        </FormLabel>

                        <FormControl className="  w-full">
                          <SelectStatus {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="workspaceId"
                    render={({ field }) => (
                      <FormItem className=" min-w-full flex flex-col gap-2">
                        <FormLabel className=" flex flex-row items-center gap-2 text-xs">
                          {/* <CircleDashed strokeWidth={"3px"} size={16} /> */}
                          Workspace
                        </FormLabel>

                        <FormControl className="  min-w-full">
                          <div className=" min-w-full w-full">
                            <SelectWorkspace
                              {...field}
                              workspacesData={workspacesData}
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="projectId"
                    render={({ field }) => (
                      <FormItem className=" min-w-full flex flex-col gap-2">
                        <FormLabel className=" flex flex-row items-center gap-2 text-xs">
                          {/* <CircleDashed strokeWidth={"3px"} size={16} /> */}
                          Project
                        </FormLabel>

                        <FormControl className="  min-w-full">
                          <div className=" min-w-full w-full">
                            <SelectProject
                              {...field}
                              projectsData={projectsData}
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=" grid md:grid-cols-2 grid-cols-1 gap-3">
                  <FormField
                    control={control}
                    name="taskOwners"
                    render={({ field }) => (
                      <FormItem className=" w-full flex flex-col gap-2">
                        <FormLabel className=" flex flex-row items-center gap-2 text-xs ">
                          {/* <UsersRound strokeWidth={"3px"} size={16} /> */}
                          PIC
                        </FormLabel>
                        <FormControl className="  w-full">
                          <SelectAssigned
                            {...field}
                            assignedData={taskOwners}
                            name="taskOwners"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="taskOwners"
                    render={({ field }) => (
                      <FormItem className=" w-full flex flex-col gap-2">
                        <FormLabel className=" flex flex-row items-center gap-2 text-xs ">
                          {/* <UsersRound strokeWidth={"3px"} size={16} /> */}
                          CC
                        </FormLabel>
                        <FormControl className="  w-full">
                          <SelectAssigned
                            {...field}
                            assignedData={taskOwners}
                            name="taskOwners"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=" grid md:grid-cols-3 grid-cols-1 gap-3 items-center">
                  <FormField
                    control={control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem className="  min-w-full flex flex-col gap-2 ">
                        <FormLabel className=" flex flex-row items-center gap-2 text-xs">
                          {/* <CircleDashed strokeWidth={"3px"} size={16} /> */}
                          Priority
                        </FormLabel>

                        <FormControl className="  w-full">
                          <SelectPriority {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className=" w-full flex flex-col gap-2 ">
                        <FormLabel className=" flex flex-row items-center gap-2 text-xs ">
                          {/* <Calendar strokeWidth={"3px"} size={17} /> */}
                          <h1 className=" text-sm">Start Date</h1>
                        </FormLabel>
                        <FormControl className="">
                          <DateTimePicker {...field} name="start" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className=" w-full flex flex-col gap-2 ">
                        <FormLabel className=" flex flex-row items-center gap-2 text-xs ">
                          {/* <Calendar strokeWidth={"3px"} size={17} /> */}
                          <h1 className=" text-sm">End Date</h1>
                        </FormLabel>
                        <FormControl className="">
                          <DateTimePicker {...field} name="end" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=" grid md:grid-cols-3 grid-cols-1 gap-3 items-center">
                  <div className=" flex flex-col gap-1.5">
                    <FormLabel className=" text-xs">Next Status</FormLabel>
                    <FormDescription className=" text-xs">
                      Change to next status
                    </FormDescription>
                    <Button className=" w-fit text-xs px-2 py-0 font-bold bg-purple-700">
                      <ArrowRightCircle />
                      Move to Backlog
                    </Button>
                  </div>

                  <div className=" flex flex-col gap-1.5">
                    <FormLabel className=" text-xs">Set Today</FormLabel>
                    <FormDescription className=" text-xs">
                      Set deadline today
                    </FormDescription>
                    <Button className=" w-fit text-xs px-2 py-0  font-bold bg-sky-700">
                      <Calendar />
                      Change to Today
                    </Button>
                  </div>

                  <div className=" flex flex-col gap-1.5">
                    <FormLabel className=" text-xs">Need Extra Day</FormLabel>
                    <FormDescription className=" text-xs">
                      Set deadline tomorrow
                    </FormDescription>
                    <Button className=" w-fit text-xs px-2 py-0  font-bold bg-amber-700">
                      <Clock />
                      Set Tomorrow
                    </Button>
                  </div>
                </div>

                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" mb-2">Description</FormLabel>
                      <FormControl className=" w-full">
                        <Textarea
                          {...field}
                          placeholder="Description"
                          name="description"
                          className=" w-full"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end flex-row">
                {/* <Button
              variant={"ghost"}
              className=" justify-start flex font-normal text-sm px-4 w-fit"
              >
              Cancel
              </Button> */}
                <Button
                  onClick={handleOnSubmit}
                  className=" justify-start flex font-normal z-50 text-sm px-4 w-fit"
                >
                  Create
                </Button>
              </div>
            </div>
          </Form>
        </SheetContent>
      </div>
    </Sheet>
  );
};

export default CreateTaskSheet;
