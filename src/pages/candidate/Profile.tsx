import HeaderWithAction from "../../components/common/HeaderWithAction";
import { IoIosAdd } from "react-icons/io";
import { MapPin, User, Mail, Phone, Lock } from "lucide-react";
import { InfoRow } from "../../components/common/InfoRow";
import { useEffect, useState } from "react";
import { candidateProfile } from "../../api/Candidate";
import UseAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ProfileDetails } from "../../types/types";



const Profile = () => {
  const useAxiosPrivate = UseAxiosPrivate();
  const [profileDetails, setProfileDetails] = useState<ProfileDetails>({});

  useEffect(() => {
    const fecthProfile = async () => {
      const response = await candidateProfile(useAxiosPrivate);
      if (response) {
        setProfileDetails(response?.data);
      }
    };
    fecthProfile();
  }, []);

  return (
    <div className="space-y-5">
      {/* Header with Back Button */}
      <HeaderWithAction
        title="Profile"
        description="Manage your Profile"
        buttonText="Add Profile"
        buttonLink="/candidate/add-profile" // Fixed typo here
        icon={<IoIosAdd size={22} color="#ffff" />}
      />

      {/* Top Section - Profile Card */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="relative h-32 bg-gradient-to-r from-slate-700 to-slate-800">
          <div className="absolute -bottom-16 left-6">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-md flex items-center justify-center">
              {profileDetails?.profileImage?.url ? (
                <img
                  src={profileDetails.profileImage.url}
                  alt="Branch Owner"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="w-full h-full flex items-center justify-center rounded-full bg-gray-300 text-gray-500 text-2xl">
                  <i className="fas fa-user"></i>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="pt-20 pb-6 px-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{profileDetails.username}</h2>
              <p className="text-gray-500">{profileDetails.email}</p>
            </div>
            <span className="px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Active
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Branch Information */}
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="p-6">
            <h3 className="text-xl font-semibold">Profile Details</h3>
            <div className="space-y-4 mt-4">
              <InfoRow
                icon={User}
                label="User Name"
                value={profileDetails.username}
              />
              <InfoRow icon={Mail} label="Email" value={profileDetails.email} />
              <InfoRow
                icon={Phone}
                label="Mobile"
                value={profileDetails.phone}
              />
              <InfoRow
                icon={Lock}
                label="Password"
                value={profileDetails.userKey}
              />
              <InfoRow
                icon={MapPin}
                label="Address"
                value={profileDetails.address}
              />
            </div>
          </div>
        </div>
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="p-6">
            <h3 className="text-xl font-semibold">Resume</h3>
            <div className="relative group mt-3">
              {profileDetails.resume && profileDetails.resume.url ? (
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                  <iframe
                    src={profileDetails.resume.url}
                    title="Resume"
                    className="w-full h-full"
                  ></iframe>
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="text-white font-medium">Resume</h3>
                  </div>
                </div>
              ) : (
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-500">Resume is not available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
