import Navbar from "../components/share/Navbar";
import { Outlet } from "react-router-dom";

const Mainlayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Mainlayout;
