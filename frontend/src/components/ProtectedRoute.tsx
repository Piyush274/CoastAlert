// frontend/src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // We are using the hook we just created

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    // You can add a loading spinner here while Firebase checks auth status
    return <div>Loading...</div>;
  }

  if (!user) {
    // If loading is finished and there's no user, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If a user is logged in, show the content of the protected page
  return <Outlet />;
};

export default ProtectedRoute;