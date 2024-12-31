import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

interface HeaderWithBackButtonProps {
  backLink: string;
  title: string;
  subtitle: string;
}

const HeaderWithBackButton = ({
  backLink,
  title,
  subtitle,
}: HeaderWithBackButtonProps) => {
  return (
    <div className="flex gap-3 items-center mb-5 bg-white p-4 shadow-sm border border-gray-200 rounded-xl">
      <Link to={backLink}>
        <button className="px-2 py-2 rounded-lg border hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <IoIosArrowRoundBack size={24} />
        </button>
      </Link>
      <div>
        <p className="text-sm text-gray-400">{subtitle}</p>
        <h1 className="font-semibold text-lg text-gray-900">{title}</h1>
      </div>
    </div>
  );
};

export default HeaderWithBackButton;
