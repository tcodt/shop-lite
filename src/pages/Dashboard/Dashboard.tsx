import DashboardLayout from "@/features/dashboard/components/DashboardLayout";
import LogoutModal from "@/features/dashboard/components/LogoutModal";
import {
  ModalContextProvider,
  useModalDashboard,
} from "@/features/dashboard/contexts/ModalContext";
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <>
      <ModalContextProvider>
        <DashboardLayout>
          <DashboardContent />
        </DashboardLayout>
      </ModalContextProvider>
    </>
  );
};

const DashboardContent = () => {
  const { isOpen } = useModalDashboard();

  return (
    <div className="p-8">
      {isOpen && <LogoutModal />}
      <Outlet />
    </div>
  );
};

export default Dashboard;
