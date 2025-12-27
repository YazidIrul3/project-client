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
import { ItemProjectGroupEntity } from "@/types/api/project-group";

type Props = {
  data: ItemProjectGroupEntity;
};

const ItemProject = (props: Props) => {
  const form = useForm();
  const { control } = form;

  return (
    <Sheet>
      <SheetTrigger asChild className=" min-w-full ">
        <Button variant={"outline"} className=" max-w-0">
          <h1 className=" truncate max-w-11/12">{props.data.title}</h1>
        </Button>
      </SheetTrigger>

      <SheetContent className=" flex flex-row  items-center min-w-11/12  h-11/12 translate-x-[-50%] translate-y-[-50%] left-1/2 top-1/2 rounded-xl ">
        <Form {...form}>
          <div className="flex flex-col w-full min-h-full">
            <SheetHeader>
              <SheetTitle className=" font-bold">Delete Workspace</SheetTitle>
              <SheetDescription>
                Aksi ini tidak bisa dibatalkan. Ini akan menghapus space Tes dan
                semua data.
              </SheetDescription>
            </SheetHeader>

            <div className=" px-3 gap-8"></div>

            <SheetFooter className=" flex flex-row justify-end">
              <Button
                className=" w-fit font-semibold"
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

export default ItemProject;
