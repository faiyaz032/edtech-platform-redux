import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useRole from '../../hooks/useRole';

export default function AdminOutlet() {
  const role = useRole();
  return role === 'admin' ? <Outlet /> : <Navigate to={'/course-player'} />;
}
