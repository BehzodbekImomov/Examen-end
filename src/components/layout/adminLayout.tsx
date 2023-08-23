import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="">
      <header>header</header>
      <Outlet />
      <footer>footer</footer>
    </div>
  );
};

export default AdminLayout;
