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
import { SelectGroup } from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSidebar } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import SheetSideBackground from "./sheet-side-background";

const CreateProjectSheet = () => {
  const { open } = useSidebar();
  const form = useForm();
  const { control } = form;

  return (
    <Sheet>
      <SheetTrigger
        asChild
        className=" min-w-full justify-start flex font-normal text-sm px-2 py-2"
      >
        <Button className={` text-xs`} variant={"secondary"}>
          <Plus />
          <h1 className={`${open ? "" : "hidden"}`}> Add Project</h1>
          {/* <h1 className={``}> Add Project</h1> */}
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
                          //   handleOnChange(e);
                        }}
                      />
                    </FormControl>
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
                // onClick={handleOnSubmit}
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

export default CreateProjectSheet;
