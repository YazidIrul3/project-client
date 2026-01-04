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
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useDeleteItemProjectGroup } from "@/features/api/itemProject/delete-itemProject";
import { Trash } from "lucide-react";

type DeleteItemProjectGroupSheet = {
  id: string;
};

const DeleteItemProjectGroupSheet = (props: DeleteItemProjectGroupSheet) => {
  const { data: session } = authClient.useSession();
  const { mutate: deleteItemProjectGroupMutation } = useDeleteItemProjectGroup({
    token: session?.session.token as string,
    id: props?.id,
    mutationConfig: {
      onSuccess: () => {
        toast.success("Delete Project Group success");

        window.location.reload();
      },
    },
  });
  const form = useForm();

  const handleOnDelete = () => {
    if (session) {
      deleteItemProjectGroupMutation({
        token: session?.session.token as string,
        id: props?.id,
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger
        asChild
        className=" min-w-fit justify-start flex font-normal text-sm px-2 py-2"
      >
        <div className=" flex flex-row items-center gap-1.5">
          <Trash size={10} strokeWidth={"3px"} className=" text-red-600" />
          <p className="  font-semibold">Delete</p>
        </div>
      </SheetTrigger>
      
      <SheetContent className=" flex flex-row justify-center items-center max-w-[550px]  h-fit translate-x-[-50%] translate-y-[-50%] left-1/2 top-1/2 rounded-xl ">
        <Form {...form}>
          <div className="flex flex-col w-full">
            <SheetHeader>
              <SheetTitle className="text-red-600 font-bold">
                Delete Item Project Group
              </SheetTitle>
              <SheetDescription>
                Warning! If you delete this, that will deletes all data what's
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

export default DeleteItemProjectGroupSheet;
