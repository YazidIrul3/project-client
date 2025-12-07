import DashbaordLayout from "../../_components/layout";
import CardProjectGroup from "./project-group-card";

const ProjectSectionHeader = () => {
  return (
    <div>
      <div>
        <h1 className=" uppercase font-semibold text-slate-500 text-sm">
          Project
        </h1>
        <h1 className=" uppercase font-bold text-slate-900 text-2xl">Tes</h1>
      </div>
    </div>
  );
};

const ProjectSectionMain = () => {
  return (
    <div className=" flex flex-row items-center gap-3 overflow-x-scroll w-full scrollbar-hide">
      <CardProjectGroup />
      <CardProjectGroup />
      <CardProjectGroup />
      <CardProjectGroup />
    </div>
  );
};

export const ProjectSection = () => {
  return (
    <DashbaordLayout>
      <section className=" min-h-screen max-w-screen overflow-hidden p-5">
        <ProjectSectionHeader />

        <div className=" py-5">
          <ProjectSectionMain />
        </div>
      </section>
    </DashbaordLayout>
  );
};
