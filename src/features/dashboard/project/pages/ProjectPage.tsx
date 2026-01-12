"use client";

import { useParams } from "next/navigation";
import { ProjectSection } from "../_components/project-section";
import withAuthUser from "@/utils/withAuthUser";

const ProjectPage = () => {
  const p = useParams();

  return <ProjectSection projectId={p?.id as string} />;
};

export default withAuthUser(ProjectPage);
