import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { User } from "../types/user";
import { fetchProfile } from "../api/user";

const useFetchProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetchProfile();
        setUser(res.data);
      } catch (error) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return { user, loading };
};

export default useFetchProfile;