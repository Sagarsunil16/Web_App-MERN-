import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);
    console.log(children,"sadsadsd")
  // If the user is logged in, redirect them to the appropriate home page
  if (currentUser) {
    return currentUser.is_Admin ? <Navigate to="/" replace /> : <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
