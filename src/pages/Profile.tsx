import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div>
      <h2>{user.firstName} {user.lastName}</h2>
      <p>Age: {user.age}</p>
      <p>Gender: {user.gender}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;