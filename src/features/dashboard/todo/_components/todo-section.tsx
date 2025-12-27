"use client";

import { List } from "lucide-react";
import DashbaordLayout from "../../_components/layout";

export const TodoSection = () => {
  return (
    <DashbaordLayout>
      <section className=" p-4">
        <div className=" flex flex-row items-center gap-3">
          <List strokeWidth={"3px"} size={27} />
          <h1 className=" font-bold text-3xl">To Do List</h1>
        </div>
      </section>
    </DashbaordLayout>
  );
};
