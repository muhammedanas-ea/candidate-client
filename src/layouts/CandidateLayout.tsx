import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import { HiOutlineUsers } from "react-icons/hi";

const CandidateLayout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
  const closeSidebar = () => setSidebarVisible(false);

  const sidebarLinks = [
    {
      id: 1,
      name: "Profile",
      icon: <HiOutlineUsers size={20} />,
      subMenu: [
        { id: 91, name: "Profile", path: "/candidate" },
        { id: 92, name: "Add profile", path: "/candidate/add-profile" },
      ],
    },
  ];

  return (
    <div className="bg-[#F0F1f7]">
      <div className="flex">
        <Sidebar
          sidebarLinks={sidebarLinks}
          visible={sidebarVisible}
          onClose={closeSidebar}
        />
        <div className="lg:ml-60 w-full">
          <Navbar toggleSidebar={toggleSidebar} />
          <div className="p-5 min-h-[88vh]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateLayout;
