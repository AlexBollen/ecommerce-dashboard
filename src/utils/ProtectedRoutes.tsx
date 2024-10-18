import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
