import { Link } from "react-router-dom";
import criteria from "../criteria.json";
import { useRouteCompletion } from "./RouteCompletionContext";
import React from "react";

function RouteContainer() {
  const routes = criteria.routeOptions[0].routes;
  const { completedRoutes } = useRouteCompletion();

  return (
    <div className="container mx-auto px-4 py-8">
      {routes.map((route, index) => {
        if (completedRoutes.includes(route)) {
          return <React.Fragment key={index}/>;
        }
        return (
          <Link
            key={index}
            className="block mx-auto px-2 py-3 font-bold text-center mb-3 align-middle border-1 rounded"
            to={`${route.toLowerCase()}`}
          >
            {route}
          </Link>
        );
      })}
    </div>
  );
}

export default RouteContainer;
