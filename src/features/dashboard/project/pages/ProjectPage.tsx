"use client";

import { ProjectSection } from "../_components/project-section";
import withAuthUser from "@/utils/withAuthUser";

const ProjectPage = () => {
  return <ProjectSection />;
};

export default withAuthUser(ProjectPage);
