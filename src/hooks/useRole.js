import { useSelector } from 'react-redux';

export default function useRole() {
  const { user } = useSelector(state => state.auth) || {};
  return user.role;
}
