/**
 * Protected Route component
 *
 * This component is used in conjunction with the Permission Context component.
 * It uses the usePermission hook to check the boolean value of isAllowed.
 * If it is false it navigates the user to the start.
 * This is important as it prevents users accessing routes via the url.
 *
 *
 * It creates context, a context provider, a custom hook to consume the context
 *
 * @author Pavan Sahadevan
 * @version 1.0
 * Developed as a proof of concept for NHS England and as a final year project for CI601 from the University of Brighton.
 */

import { Navigate, Outlet } from 'react-router-dom';
import { usePermission } from './PermissionContext';

export default function ProtectedRoute() {

  // Destructure isAllowed state from permission context to check value
  const { isAllowed } = usePermission();

  // If not allowed, redirect to start
  if (!isAllowed) {
    return <Navigate to="/start" replace />;
  }

  // Otherwise, render the nested routes
  return <Outlet />;  
}
