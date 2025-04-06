import { Link } from "react-router-dom";
import criteria from "../criteria.json";
import { useRouteCompletion } from "./RouteCompletionContext";
import React from "react";

import oralIcon from "../assets/icons/oral_icon.png";
import injectionIcon from "../assets/icons/injection_icon.png";
import inhaledIcon from "../assets/icons/inhaled_icon.png";
import nasalIcon from "../assets/icons/nasal_icon.png";
import topicalIcon from "../assets/icons/topical_icon.png";
import rectalIcon from "../assets/icons/rectal_icon.png";
import eyeIcon from "../assets/icons/eye_icon.png";
function RouteContainer() {
  const routes = criteria.routeOptions[0].routes;
  const { completedRoutes } = useRouteCompletion();

  // get indexes of routes that are completed
  const completedIndices = routes
    .map((route, i) => (completedRoutes.includes(route) ? i : -1))
    .filter((i) => i !== -1);
  const highestCompletedIndex =
    // check for highest index in completed routes or -1 if no highest
    completedIndices.length > 0 ? Math.max(...completedIndices) : -1;

  return (
    <div className="container mx-auto px-4 py-8">
      {routes.map((route, index) => {
        const isCompleted = completedRoutes.includes(route);
        // disable a route if incomplete and its index is less than the highest completed index
        const isDisabled = !isCompleted && index < highestCompletedIndex;

        // completed routes get a green check
        // skipped routes get a red X
        let indicator = null;

        const icons = [
          oralIcon,
          injectionIcon,
          inhaledIcon,
          nasalIcon,
          topicalIcon,
          rectalIcon,
          eyeIcon,
        ];

        const icon = icons[index];

        if (isCompleted) {
          indicator = <span className="ml-8 text-green-500">✓</span>;
        } else if (isDisabled) {
          indicator = <span className="ml-8 text-red-500">X</span>;
        }

        // content for the route
        const content = (
          <div className="flex items-center">
          <span className="mr-2">{index + 1}.</span>
          <img src={icon} alt={`${route} icon`} className="mr-2" style={{ height: '50px', width: '50px' }} />
          <span className="mr-2">{route}</span>
          {indicator}
        </div>
        );

        // render as disabled (div) or enabled (link)
        if (isDisabled || isCompleted) {
          return (
            <div
              key={index}
              className="justify-between items-center block mx-auto px-2 py-3 font-bold text-center mb-3 align-middle border-2 border-stone-800 rounded bg-gray-200 cursor-not-allowed"
            >
              {content}
            </div>
          );
        } else {
          return (
            <Link
              key={index}
              className="justify-between items-center block mx-auto px-2 py-3 font-bold text-center mb-3 align-middle border-2 hover:bg-gray-200 border-stone-800 rounded"
              to={`${route.toLowerCase()}`}
            >
              {content}
            </Link>
          );
        }
      })}
    </div>
  );
}

export default RouteContainer;
