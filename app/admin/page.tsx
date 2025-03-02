import { getIsAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import AdminClient from "./client-app";

const AdminPage = async () => {
const isAdmin = getIsAdmin();

  if(!isAdmin){
    redirect("/");
  }
  return(
    <div>
      <AdminClient/>
    </div>
  );
};

export default AdminPage;