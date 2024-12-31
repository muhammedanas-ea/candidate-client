import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";

interface HeaderWithActionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  icon?: React.ReactNode;
}

const HeaderWithAction = ({
  title,
  description,
  buttonText,
  buttonLink,
  icon = <IoIosAdd size={22} color="#ffff" />,
}: HeaderWithActionProps) => {
  return (
    <div className="flex justify-between items-center mb-5 bg-white shadow-sm p-4 border rounded-xl">
      <div>
        <p className="text-sm text-gray-400">{description}</p>
        <h1 className="font-semibold text-lg text-gray-900 tracking-tight">
          {title}
        </h1>
      </div>
      <Link to={buttonLink}>
        <button className="bg-blue-600 hover:bg-blue-500 flex gap-2 rounded-md px-3 text-white py-2">
          {icon}
          <span className="text-sm">{buttonText}</span>
        </button>
      </Link>
    </div>
  );
};

export default HeaderWithAction;
