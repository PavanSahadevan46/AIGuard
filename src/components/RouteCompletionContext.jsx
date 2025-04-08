/**
 * Route Completion Context component
 *
 * A context provider component that tracks what routes have been completed and to check if the user has visited the routes page.
 *
 * It creates context, a context provider, a custom hook to consume the context, a reset route helper function
 * and a mark route, a function that marks a route complete by adding it to the completed routes array.
 *
 * @author Pavan Sahadevan
 * @version 1.0
 * Developed as a proof of concept for NHS England and as a final year project for CI601 from the University of Brighton.
 */

import { createContext, useState, useContext } from "react";

// Create a new context for managing route completion state

const RouteCompletionContext = createContext();

// Provider component that wraps parts of the app where route completion info is needed
export const RouteCompletionProvider = ({ children }) => {
  // State to hold an array of completed routes
  const [completedRoutes, setCompletedRoutes] = useState([]);

  // State flag to indicate if the route page has been visited
  const [hasVisitedRoutePage, setHasVisitedRoutePage] = useState(false);

  // Function to mark a route as completed
  // This checks if the routeName is already in the array to avoid duplicates,
  // but also can be used to check if a certain route is completed
  const markRouteDone = (routeName) => {
    if (!completedRoutes.includes(routeName)) {
      setCompletedRoutes((prev) => [...prev, routeName]);
    }
  };

  // Function to reset route-related state
  // Clears the completed routes and resets the visit flag
  const resetRoutes = () => {
    setCompletedRoutes([]);
    setHasVisitedRoutePage(false);
  };

  return (
    // Provide the context value to all children components

    <RouteCompletionContext.Provider
      value={{
        completedRoutes,
        markRouteDone,
        hasVisitedRoutePage,
        setHasVisitedRoutePage,
        resetRoutes,
      }}
    >
      {children}
    </RouteCompletionContext.Provider>
  );
};

// Custom hook for easier usage of the route completion context 

export const useRouteCompletion = () => {
  return useContext(RouteCompletionContext);
};
