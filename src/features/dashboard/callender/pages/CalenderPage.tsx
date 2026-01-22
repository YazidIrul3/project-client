"use client";

import withAuthUser from "@/utils/withAuthUser";
import { CalenderSection } from "../_components/calender-section";
import DashboardLayout from "../../_components/layout";

const CalenderPage = () => {
  return (
    <DashboardLayout>
      <CalenderSection />
    </DashboardLayout>
  );
};

export default withAuthUser(CalenderPage);
