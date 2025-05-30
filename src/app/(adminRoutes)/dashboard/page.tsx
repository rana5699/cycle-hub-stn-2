import { getDashboardStats } from "@/actions/Dashboard";
import { myProfile } from "@/actions/User";
import AdminHome from "@/components/Module/Dashboard/Admin/AdminHome/AdminHome";
import UserHome from "@/components/Module/Dashboard/User/UserHome";

const DashboardHomePage = async () => {
  const data = await getDashboardStats();
  const { data: user } = await myProfile();

  console.log("Admin Dashboard Data:", data);

  return (
    <div>{user && user?.role === "admin" ? <AdminHome /> : <UserHome />}</div>
  );
};

export default DashboardHomePage;
