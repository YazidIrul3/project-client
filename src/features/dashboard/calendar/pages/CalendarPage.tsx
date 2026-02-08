"use client";

import withAuthUser from "@/utils/withAuthUser";
import { CalendarSection } from "../_components/calender-section";
import DashboardLayout from "../../_components/layout";

const CalendarPage = () => {
  return (
    <DashboardLayout>
      <CalendarSection />
    </DashboardLayout>
  );
};

export default withAuthUser(CalendarPage);
