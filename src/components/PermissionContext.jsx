/**
 * Permission Context component
 *
 * This component creates a context provider to be used in conjunction with the ProtectedRoute component.
 * It is essentially a global flag that provides permission to users to access the application.
 *
 *
 * It creates context, a context provider, a custom hook to consume the context
 *
 * @author Pavan Sahadevan
 * @version 1.0
 * Developed as a proof of concept for NHS England and as a final year project for CI601 from the University of Brighton.
 */

import { createContext, useState, useContext } from "react";
// Create a new context for permission context
const PermissionContext = createContext();

// Provider component that wraps the app  to provide access to the permission provider state

export function PermissionProvider({ children }) {
  // Start with false — user is not “allowed” initially
  const [isAllowed, setIsAllowed] = useState(false);

  // The Provider supplies the state and its updater function to children components
  return (
    <PermissionContext.Provider value={{ isAllowed, setIsAllowed }}>
      {children}
    </PermissionContext.Provider>
  );
}

// Custom hook to use context
// Only used in one location (start page)
export function usePermission() {
  return useContext(PermissionContext);
}
