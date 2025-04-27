/**
 * Route Container component
 *
 * This component is the main route container and it displays a list of routes and additionally navigates them to each routes.
 *
 * It uses route completion context to determine which routes have been completed and disables routes that are not completed,
 * or not completed in order e.g. if the user skips oral and injection and goes straight to inhaled,
 * The oral and injection routes are disabled as there is no point going to those routes if skipped as it could skew results.
 *
 * @author Pavan Sahadevan
 * @version 1.0
 * Developed as a proof of concept for NHS England and as a final year project for CI601 from the University of Brighton.
 */

/**
 * Dependencies & Components :
 *
 *  criteria - JSON file that contains question data and or other data regarding route information.
 *
 * React Router Dom (Link) -  Client-side routing via React-router-dom.
 *
 * Route Completion - Context handler to provide information to steroid routes page to show visual changes on which route has been completed
 *
 * Icons-  Icons for respective routes
 *
 * React Router Dom(Link) - A <a href=> wrapper that additionally has accomodation for client side routing
 */
import { Link } from "react-router-dom";
import criteria from "../criteria.json";
import { useRouteCompletion } from "./RouteCompletionContext";
import React from "react";

import oralIcon from "@/assets/icons/oral_icon.webp";
import injectionIcon from "@/assets/icons/injection_icon.webp";
import inhaledIcon from "@/assets/icons/inhaled_icon.webp";
import nasalIcon from "@/assets/icons/nasal_icon.webp";
import topicalIcon from "@/assets/icons/topical_icon.webp";
import rectalIcon from "@/assets/icons/rectal_icon.webp";
import eyeIcon from "@/assets/icons/eye_icon.webp";

function RouteContainer() {
  // Retrieve all available routes from criteria file
  const routes = criteria.routeOptions[0].routes;

  // Destructure function from respective context
  const { completedRoutes } = useRouteCompletion();

  // Map over the routes array to get the indices of routes that have been completed
  // For routes that are completed, return their index; otherwise, return -1
  const completedIndices = routes
    .map((route, i) => (completedRoutes.includes(route) ? i : -1))
    .filter((i) => i !== -1);

  // Find the highest completed index or set to -1 if no highest
  const highestCompletedIndex =
    completedIndices.length > 0 ? Math.max(...completedIndices) : -1;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Iterate and create routes, can either be links or divs if disabled */}
      {routes.map((route, index) => {
        // Check if the current route is completed
        const isCompleted = completedRoutes.includes(route);
        // Disable a route if incomplete and its index is less than the highest completed index
        const isDisabled = !isCompleted && index < highestCompletedIndex;

        // Determine the indicator based on the route status
        let indicator = null;


        // Array of icons correspodning to each route
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

        // Completed routes get a green check
        // Skipped routes get a red X
        if (isCompleted) {
          indicator = <span className="ml-8 text-green-500">✓</span>;
        } else if (isDisabled) {
          indicator = <span className="ml-8 text-red-500">X</span>;
        }

        // Content for the route, each route has an icon, the route name and the indicator when used
        const content = (
          <div className="flex items-center">
            <span className="mr-2">{index + 1}.</span>
            <img
              src={icon}
              alt={`${route} icon`}
              className="mr-2"
              style={{ height: "50px", width: "50px" }}
            />
            <span className="mr-2">{route}</span>
            {indicator}
          </div>
        );

        // Render as disabled (div) or enabled (link)
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
              to={`${route.toLowerCase()}`} // To pages under routes /
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
