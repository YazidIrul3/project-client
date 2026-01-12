"use client";

import { useParams } from "next/navigation";
import { ProjectSection } from "../_components/project-section";

const ProjectPage = () => {
  const p = useParams();

  return <ProjectSection projectId={p?.id as string} />;
};

export default ProjectPage;
