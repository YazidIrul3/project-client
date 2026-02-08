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
import { Textarea } from "@/components/ui/textarea";
import { useSheet } from "@/hooks/use-sheet";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

const CreateEventSheet = () => {
  const form = useForm();
  const { open, setOpen } = useSheet();
  const { control } = form;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className=" w-fit font-normal text-sm px-2 py-2">
        <Button className="gap-2 font-medium">
          <Plus className="h-4 w-4" />
          Event Baru
        </Button>
      </SheetTrigger>
      <div className="min-w-full mx-auto h-full">
        <SheetContent className=" flex flex-row justify-between min-w-[400px]  max-w-[400px] h-11/12 py-4 px-2   rounded-xl translate-x-[-50%] translate-y-[-50%] left-1/2 top-1/2">
          <Form {...form}>
            <div className=" flex flex-col w-full ">
              <SheetHeader className=" mb-3">
                <SheetTitle className=" text-xl font-bold">
                  Create New Event
                </SheetTitle>
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
                          {...field}
                          placeholder="Your event"
                          name="name"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" mb-2">Location</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="loc:Jakarta"
                          name="location"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" mb-2">Notes</FormLabel>
                      <FormControl className=" w-full">
                        <Textarea
                          {...field}
                          placeholder="Description"
                          name="notes"
                          className=" w-full"
                        />
                      </FormControl>

                      <FormMessage />
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
                  //   onClick={handleOnSubmit}
                  className=" justify-start flex font-normal text-sm px-4 w-fit"
                >
                  Create
                </Button>
              </SheetFooter>
            </div>
          </Form>
        </SheetContent>
      </div>
    </Sheet>
  );
};

export default CreateEventSheet;
