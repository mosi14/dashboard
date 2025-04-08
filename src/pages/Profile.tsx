import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaTransgender,
  FaBirthdayCake,
} from "react-icons/fa";
import useFetchProfile from "../hooks/useFetchProfile";

const ProfilePage = () => {
  const { user, loading } = useFetchProfile();

  if (loading)
    return (
      <div className="text-center text-xl animate-pulse">
        Loading profile...
      </div>
    );

  if (!user)
    return (
      <div className="text-center text-xl">
        Failed to load profile
      </div>
    );

  return (
    <motion.div
      className="max-w-lg mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mt-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
        Profile
      </h2>

      <div className="flex items-center justify-center mt-4">
        <img 
          src={user.image}
          alt="user"
          className="w-24 h-24 rounded-full"
        />
      </div>

      <div className="mt-6 space-y-4">
        <ProfileInfo
          icon={<FaUser />}
          label="Full Name"
          value={`${user.firstName} ${user.lastName}`}
        />
        <ProfileInfo icon={<FaEnvelope />} label="Email" value={user.email} />
        <ProfileInfo
          icon={<FaTransgender />}
          label="Gender"
          value={user.gender}
        />
        <ProfileInfo icon={<FaBirthdayCake />} label="Age" value={user.age} />
      </div>
    </motion.div>
  );
};

export default ProfilePage;

const ProfileInfo = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-center space-x-4 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
    <span className="text-gray-600 dark:text-gray-300 text-xl">{icon}</span>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-lg font-medium text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  </div>
);