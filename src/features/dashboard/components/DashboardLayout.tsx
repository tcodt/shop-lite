import {
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar";
import type { ReactNode } from "react";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SidebarProvider>
        <DashboardSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
