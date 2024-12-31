import { IoIosAdd } from "react-icons/io";
import HeaderWithAction from "../../components/common/HeaderWithAction";
import { useEffect, useState } from "react";
import UseAxiosPrivate from "../../hooks/useAxiosPrivate";
import { candidateList, deleteCandidate } from "../../api/Admin";
import { IoPerson } from "react-icons/io5";
import { Candidate } from "../../types/types";
import { GenerateSuccess } from "../../toast/Toast";

const CandidateList = () => {
  const useAxiosPrivate = UseAxiosPrivate();
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const fetchCandidates = async () => {
    const response = await candidateList(useAxiosPrivate);
    if (response) {
      setCandidates(response.data.data);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [useAxiosPrivate]);

  const handleDelete = async (candidateId: string) => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      const response = await deleteCandidate(useAxiosPrivate, candidateId);
      if (response) {
        GenerateSuccess(response.data.message);
        fetchCandidates();
      }
    }
  };

  return (
    <div>
      <HeaderWithAction
        title="Candidate List"
        description="Manage your Candidate"
        buttonText="Add Candidate"
        buttonLink="/admin/add-candidate"
        icon={<IoIosAdd size={22} color="#ffff" />}
      />
      <div className="mt-5 h-auto rounded-lg shadow-lg bg-white border p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-500 border-collapse">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-6 py-3 font-medium">#</th>
                <th className="px-6 py-3 font-medium">Profile</th>
                <th className="px-6 py-3 font-medium">User Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Mobile Number</th>
                <th className="px-6 py-3 font-medium">Password</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {candidates.length > 0 ? (
                candidates.map((item, index) => (
                  <tr key={item._id} className="hover:bg-gray-100">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">
                      {item?.profileImage?.url ? (
                        <img
                          src={item?.profileImage?.url}
                          alt={item.username}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <IoPerson size={20} className="text-gray-500" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {item.username}
                    </td>
                    <td className="px-6 py-4">{item.email}</td>
                    <td className="px-6 py-4">{item.phone}</td>
                    <td className="px-6 py-4">{item.userKey}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="h-36">
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No candidates found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CandidateList;
