import { getDashboardStats } from "@/actions/Dashboard";
import AdminHome from "@/components/Module/Dashboard/Admin/AdminHome/AdminHome";

const AdminHomePage = async () => {
  const data = await getDashboardStats();

  console.log("Admin Dashboard Data:", data);

  return (
    <div>
      <AdminHome />
    </div>
  );
};

export default AdminHomePage;
