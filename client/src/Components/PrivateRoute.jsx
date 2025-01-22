import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ({ adminOnly, children }) => {
  const { currentUser } = useSelector((state) => state.user);

  // If user is not logged in, redirect to SignIn
  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  // Admin-only route check
  if (adminOnly && !currentUser.is_Admin) {
    return <Navigate to="/" replace />;
  }

  if (adminOnly && !currentUser.is_Admin) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
