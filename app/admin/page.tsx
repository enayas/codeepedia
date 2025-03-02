import { getIsAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import App from "./app";

const AdminPage = async () => {
const isAdmin = getIsAdmin();

  if(!isAdmin){
    redirect("/");
  }
  return(
    <div>
      <App/>
    </div>
  );
};

export default AdminPage;