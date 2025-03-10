import { createContext, useState, useContext } from "react";
const RouteCompletionContext = createContext();

export const RouteCompletionProvider = ({ children }) => {
  const [completedRoutes, setCompletedRoutes] = useState([]);
  const [hasVisitedRoutePage , setHasVisitedRoutePage] = useState(false);

  const markRouteDone = (routeName) => {
    if (!completedRoutes.includes(routeName)) {
      setCompletedRoutes((prev) => [...prev, routeName]);
    }
  };

  return (
    <RouteCompletionContext.Provider 
    value={{ 
        completedRoutes, 
        markRouteDone,
        hasVisitedRoutePage,
        setHasVisitedRoutePage
         }}>
      {children}
    </RouteCompletionContext.Provider>
  );
};

export const useRouteCompletion = () => {
  return useContext(RouteCompletionContext);
};
