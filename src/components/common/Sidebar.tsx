import { useState } from "react";
import { Link } from "react-router-dom";
import { IoChevronDown } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { SidebarLink } from "../../types/types";

const Sidebar = ({
  sidebarLinks,
  visible,
  onClose,
}: {
  sidebarLinks: SidebarLink[];
  visible: boolean;
  onClose: () => void;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const toggleDropdown = (id: number) =>
    setDropdownOpen((prev) => (prev === id ? null : id));

  return (
    <div
      className={`fixed top-0 left-0 h-screen  w-60 bg-[#111c43] z-40 transition-transform 
        ${visible ? "translate-x-0" : "-translate-x-64"} 
        lg:translate-x-0 md:block`}
    >
      {/* Sidebar Header */}
      <div className="px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl text-white">Logo</h1>
        </div>
        <button className="lg:hidden text-gray-400" onClick={onClose}>
          ✕
        </button>
      </div>

      {/* Sidebar Links */}
      <div className="no-scrollbar flex flex-col overflow-y-scroll duration-300 ease-linear text-white h-[90vh]">
        <nav className="mt-5 py-4 px-4 lg:px-6">
          <h3 className="mb-4 ml-4 text-[.87rem] font-medium text-gray-400">
            MENU
          </h3>
          <ul className="flex flex-col gap-2">
            {sidebarLinks.map((link) => (
              <li key={link.id}>
                <div>
                  <Link
                    to={link.path || "#"}
                    className={`flex text-[.87rem] items-center justify-between gap-3 rounded-md px-4 py-2 font-medium duration-300 ease-in-out hover:bg-[#f4f4f717] ${
                      link.subMenu && dropdownOpen === link.id
                        ? "bg-[#f4f4f717]"
                        : ""
                    }`}
                    onClick={
                      link.subMenu
                        ? (e) => {
                            e.preventDefault();
                            toggleDropdown(link.id);
                          }
                        : undefined
                    }
                  >
                    <div className="flex items-center gap-3">
                      <span>{link.icon}</span>
                      <span>{link.name}</span>
                    </div>
                    {link.subMenu && (
                      <span className="text-gray-400 transition-transform duration-200">
                        {dropdownOpen === link.id ? (
                          <IoIosArrowUp />
                        ) : (
                          <IoChevronDown />
                        )}
                      </span>
                    )}
                  </Link>
                </div>
                {/* Nested Submenu */}
                {link.subMenu && dropdownOpen === link.id && (
                  <ul className="ml-6 mt-3 space-y-3 border-l border-gray-600 pl-4">
                    {link.subMenu.map((subItem) => (
                      <li key={subItem.id}>
                        <Link
                          to={subItem.path}
                          className="block text-[.84rem] text-gray-400 hover:text-gray-200"
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
