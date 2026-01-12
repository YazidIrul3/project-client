import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/libs/auth-client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useDeleteProject } from "@/features/api/project/delete-project";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";

type DeleteProjectSheet = {
  id: string;
};

const DeleteProjectSheet = (props: DeleteProjectSheet) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const { mutate: deleteProjectMutation } = useDeleteProject({
    token: session?.session.token as string,
    id: props?.id,
    mutationConfig: {
      onSuccess: () => {
        toast.success("Delete Project success");

        router.replace("/account/profile");
      },
    },
  });
  const form = useForm();

  const handleOnDelete = () => {
    if (session) {
      deleteProjectMutation({
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
        <Button className=" bg-red-600 w-fit font-semibold">Delete</Button>
      </SheetTrigger>
      <SheetContent className=" flex flex-row justify-center items-center max-w-[550px]  h-fit translate-x-[-50%] translate-y-[-50%] left-1/2 top-1/2 rounded-xl ">
        <Form {...form}>
          <div className="flex flex-col w-full">
            <SheetHeader>
              <SheetTitle className="text-red-600 font-bold">
                Delete Project
              </SheetTitle>
              <SheetDescription>
                Warning! If you delete project, all items in project will
                disapear
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

export default DeleteProjectSheet;
