// PrivateRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // custom hook for JWT auth

function PrivateRoute({ children, roles }) {
  const { user } = useAuth();

  if (!user) {
    // not logged in → redirect to login
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    // role not authorized → redirect to home
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;
