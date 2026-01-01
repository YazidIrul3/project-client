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
import {
  Calendar,
  CircleDashed,
  EllipsisVertical,
  Pencil,
  Plus,
  Trash,
  UsersRound,
} from "lucide-react";
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
import React, { useState } from "react";
import { DateTimePicker } from "@/components/shared/datetime-picker";
import {
  ItemProjectGroupBodyRequest,
  ItemProjectGroupEntity,
} from "../../../../types/api/item-project-group";
import { SelectPriority } from "@/components/shared/select-priority";
import { SelectAssigned } from "@/components/shared/select-assigned";
import SheetSideBackground from "../../_components/sheets/sheet-side-background";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UpdateItemProjectSheet from "./sheet/update-item-project";

const ItemProject = ({
  data,
  projectGroupId,
}: {
  data: ItemProjectGroupEntity;
  projectGroupId: string;
}) => {
  return (
    <div className=" min-w-full flex flex-row items-center gap-2 shadow-sm px-2 py-2.5 rounded-md">
      <h1 className=" truncate max-w-11/12 min-w-11/12">{data.title}</h1>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVertical
            className=" text-slate-900  top-2 right-2"
            size={10}
            strokeWidth={"3px"}
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent side="right" className=" max-w-fit">
          <DropdownMenuItem
            className=" min-w-full"
            onSelect={(e) => e.preventDefault()}
          >
            <div>
              <UpdateItemProjectSheet
                data={data}
                projectGroupId={projectGroupId}
              />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className=" min-w-full">
            <span className=" flex flex-row items-center gap-1.5">
              <Trash size={10} strokeWidth={"3px"} className=" text-red-600" />
              <p className="  font-semibold">Delete</p>
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ItemProject;
