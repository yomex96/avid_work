
import ScrollToTop from "react-scroll-up";
import AdminPanel from "../Components/AdminPanel";

const AdminProfile = () => {
  return (
    <div className="">
      {/* <Navbar /> */}
      <ScrollToTop showUnder={160}>
        <span>↑</span> 
      </ScrollToTop>
      <AdminPanel />
    </div>
  );
};

export default AdminProfile;

