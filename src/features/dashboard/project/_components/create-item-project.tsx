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
import { Plus } from "lucide-react";
import SheetSideBackground from "../../_components/sheets/sheet-side-background";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

const CreateItemProject = () => {
  const form = useForm();

  return (
    <Sheet>
      <SheetTrigger
        asChild
        className=" min-w-full border-dashed border-red-500 border-2"
      >
        <Button variant={"ghost"}>
          <Plus />
        </Button>
      </SheetTrigger>

      <SheetContent className=" flex flex-row  items-center min-w-11/12  h-11/12 translate-x-[-50%] translate-y-[-50%] left-1/2 top-1/2 rounded-xl ">
        <Form {...form}>
          <div className="flex flex-col w-full min-h-full relative">
            <SheetTitle className=" z-50 px-3 py-5 mb-3">
              <input
                placeholder="Title Item"
                className=" placeholder-shown:text-3xl font-bold text-3xl focus:outline-none shadow-none"
              />
            </SheetTitle>

            <div className=" absolute left-0 mt-5">
              <SimpleEditor />
            </div>

            <SheetFooter className=" flex flex-row justify-end">
              <Button
                className="  w-fit font-semibold"
                //   onClick={handleOnDelete}
              >
                Save
              </Button>
            </SheetFooter>
          </div>
        </Form>

        <SheetSideBackground />
      </SheetContent>
    </Sheet>
  );
};

export default CreateItemProject;
