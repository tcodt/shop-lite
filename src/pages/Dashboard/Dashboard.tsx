import DashboardLayout from "@/features/dashboard/components/DashboardLayout";
import LogoutModal from "@/features/dashboard/components/LogoutModal";
import {
  ModalContextProvider,
  useModalDashboard,
} from "@/features/dashboard/contexts/ModalContext";

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
      <h1>This is Dashboard Content</h1>
    </div>
  );
};

export default Dashboard;
