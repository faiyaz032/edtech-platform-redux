import { Navigate, Outlet, useMatch } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function PublicOutlet() {
  const adminRequested = useMatch('/admin/*');

  //decide where to redirect the user based on role
  let redirectTo;
  if (adminRequested) {
    redirectTo = '/admin/dashboard';
  }
  if (!adminRequested) {
    redirectTo = '/course-player';
  }

  const isAuthenticated = useAuth();
  return !isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
}
