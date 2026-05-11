import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    // Call the protected /api/me route to verify token and fetch user
    api.get('/api/me')
      .then((res) => {
        setUser(res.data.user);
        setLoading(false);
      })
      .catch(() => {
        // Token invalid or expired — authMiddleware returns 401,
        // api.js interceptor clears token and redirects to /
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500 text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-10 text-center max-w-md w-full">
        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl font-bold">
            {user?.email?.[0]?.toUpperCase() ?? '?'}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Welcome Back!</h1>
        {user && (
          <p className="text-blue-600 font-medium mb-2">{user.email}</p>
        )}
        <p className="text-gray-500 text-sm mb-8">
          You are securely logged in to your Financial Dashboard.
        </p>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
