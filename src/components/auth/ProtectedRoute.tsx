import { Navigate } from 'react-router-dom';
import { useAuthContext } from './AuthProvider';
import { AuthCard } from './AuthCard';

interface Props {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: Props) {
  // For development, bypass authentication
  return <>{children}</>;
}