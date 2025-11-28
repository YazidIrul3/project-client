"use client";

import withAuthUser from "@/utils/withAuthUser";
import { WorkspaceSection } from "../_components/workspace-section";

const WorkspacePage = () => {
  return <WorkspaceSection />;
};

export default withAuthUser(WorkspacePage);
