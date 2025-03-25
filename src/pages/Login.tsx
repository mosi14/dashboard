import React, { useState } from 'react';
import {useAuth} from '../context/AuthContext'
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { loginUser } from '../api/user';

const LoginPage = () => {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {login} = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res =  await loginUser(username, password);
      login(res.data)
      toast.success('Login successful');
      navigate('/profile');
    } catch (err) {
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
      <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-80">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Welcome Back</h2>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-2 border rounded mb-2 dark:bg-gray-700 dark:text-white"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          disabled={loading}
           className="w-full bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;