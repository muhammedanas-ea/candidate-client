import { IoMdMenu } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import useLogout from "../../hooks/useLogout";

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const logout = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="z-30 flex px-7 py-4 justify-between items-center sticky top-0 bg-white">
      <div>
        <div className="flex lg:hidden items-center space-x-4">
          <button
            className="border p-2 border-gray-300 rounded-md"
            onClick={toggleSidebar}
          >
            <IoMdMenu size={24} />
          </button>
          <p>Logo</p>
        </div>
      </div>
      <div className="flex space-x-3 items-center cursor-pointer ">
        <li
          onClick={handleLogout}
          className="flex space-x-3 items-center hover:bg-[#F3F5F8] hover:text-[#5F6165] py-2 px-4"
        >
          <span>
            <CiLogout size={20} />
          </span>
          <span className="text-sm font-medium admin-font">Logout</span>
        </li>
      </div>
    </div>
  );
};

export default Navbar;
