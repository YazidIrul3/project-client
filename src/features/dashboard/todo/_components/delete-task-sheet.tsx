import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { TrashIcon } from "lucide-react";
import { useAuthenticated } from "@/hooks/use-authenticated";
import { useDeleteTask } from "@/features/api/task/delete-task";

type DeleteTaskSheet = {
  id: string;
};

const DeleteTaskSheet = (props: DeleteTaskSheet) => {
  const { token, user } = useAuthenticated();
  const { mutate: deleteTaskMutation } = useDeleteTask({
    token: token,
    id: props?.id,
    mutationConfig: {
      onSuccess: () => {
        toast.success("Delete Task success");

        window.location.reload();
      },
    },
  });
  const form = useForm();

  const handleOnDelete = () => {
    if (user.id) {
      deleteTaskMutation({
        token: token,
        id: props?.id,
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild className="">
        <div className=" min-w-full flex flex-row items-center gap-2">
          <TrashIcon />

          <h1 className=" text-sm">Delete every data</h1>
        </div>
      </SheetTrigger>

      <SheetContent className=" flex flex-row justify-center items-center max-w-[550px]  h-fit translate-x-[-50%] translate-y-[-50%] left-1/2 top-1/2 rounded-xl ">
        <Form {...form}>
          <div className="flex flex-col w-full">
            <SheetHeader>
              <SheetTitle className="text-red-600 font-bold">
                Delete Task
              </SheetTitle>
              <SheetDescription>
                Warning! If you delete this, that will deletes all data what is
                have relation with it
              </SheetDescription>
            </SheetHeader>

            <SheetFooter className=" flex flex-row justify-end">
              <Button
                className=" bg-red-600 w-fit font-semibold"
                onClick={handleOnDelete}
              >
                Delete
              </Button>
            </SheetFooter>
          </div>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default DeleteTaskSheet;
