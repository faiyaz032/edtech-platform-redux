import { Navigate, Outlet, useMatch } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function PrivateOutlet() {
  const adminRequested = useMatch('/admin/*');

  //decide where to redirect the user based on role
  let redirectTo;
  if (adminRequested) {
    redirectTo = '/admin/login';
  }
  if (!adminRequested) {
    redirectTo = '/';
  }

  const isAuthenticated = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
}
