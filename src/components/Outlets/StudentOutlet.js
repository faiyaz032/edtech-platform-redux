import { Navigate, Outlet } from 'react-router-dom';
import useRole from '../../hooks/useRole';

export default function StudentOutlet() {
  const role = useRole();
  return role === 'student' ? <Outlet /> : <Navigate to={'/admin/dashboard'} />;
}
