import Navbar from "../components/Shared/Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar></Navbar>
      <div className="container mx-auto px-4 py-6">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default MainLayout;
