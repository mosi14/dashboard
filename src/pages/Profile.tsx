import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {User} from '../types/user'
import { fetchProfile } from '../api/user';

const ProfilePage = () => {
  const { user :authUser } = useAuth();
console.log(authUser)
    const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        //const res = await fetchProfile()
        const res = await axios.get('https://dummyjson.com/auth/me', {
          headers: {
            Authorization: `Bearer ${authUser?.accessToken}`,
          },
       });
        setUser(res.data);
      } catch {
        toast.error('Failed to load profile');
      }
    };
    fetchUser();
  }, []);

  if (!user) return  <div className="text-center text-xl animate-pulse">Loading profile...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">User Profile</h2>
      <div className="flex items-center space-x-6">
        <img
          src={user.image}
          alt="User"
          className="w-24 h-24 rounded-full border-4 border-indigo-500"
        />
        <div>
          <p><span className="font-semibold">Name:</span> {user.firstName} {user.lastName}</p>
          <p><span className="font-semibold">Age:</span> {user.age}</p>
          <p><span className="font-semibold">Gender:</span> {user.gender}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

