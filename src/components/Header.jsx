/**
 * Header component
 *
 * A reusable header component that is used throughout the application.
 * It renders the logo, a title and additionally a link to the main routes page after the routes page has been visited atleast once.
 * @author Pavan Sahadevan
 * @version 1.0
 * Developed as a proof of concept for NHS England and as a final year project for CI601 from the University of Brighton.
 */


/**
 * Dependencies and components:
 * Logo - logo image
 *
 * React router dom - client side routing
 *
 * Route Completion - Context handler to provide information to steroid routes page to show visual changes on which route has been completed
 *
 * Button - Shadcn ui button
 */

import logo from "@/assets/temp1.webp";
import { useNavigate } from "react-router-dom";
import { useRouteCompletion } from "./RouteCompletionContext";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

function Header() {
  // React Router navigation hook
  const nav = useNavigate();

  // Destruture objects and functions from respective context provider
  const { hasVisitedRoutePage, setHasVisitedRoutePage } = useRouteCompletion();

  // Set local state to show "Routes" link in header
  const [showRouteLink, setShowRouteLink] = useState(false);

  // useEffect runs when the hasVisitedRoutePage value changes.
  // If the user has visited the route page, update the local state to show the route link.
  useEffect(() => {
    if (hasVisitedRoutePage) {
      setShowRouteLink(true);
    }
  }, [hasVisitedRoutePage]);

  
  // Function to handle navigation back to the start page.
  const handleClick = () => {
    nav("/start");
  };

  return (
    <header className="bg-sapphire shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 ">
        <div className="flex items-center">
          {/* Container is clickable to navigate back to start page */}
          <div
            className="flex items-center cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 p-1"
            onClick={() => {
              // If clicked reset has visited flag and navigate to start
              setHasVisitedRoutePage(false);
              handleClick();
            }}
            tabIndex="0"
            role="button"
            aria-label="Navigate to Start"
          >
            <img src={logo} alt="Logo" className="h-14 w-auto border-1" />
            <h1 className="ml-3 text-xl pr-2 font-medium text-white hidden sm:block">
              AI Guard
            </h1>
          </div>
          {/* Conditionally render the "Routes" link if showRouteLink is true */}
          {showRouteLink && (
            <>
              <div className="p-3 border-l border-white">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-sapphire hover:bg-opacity-20 focus:ring-2 
                  focus:ring-white focus:ring-offset-2 focus:ring-offset-sapphire ml-1 h-8 py-0
                  sm:text-lg text-xl "
                  onClick={() => {
                    nav("/routes"); // navigate to routes page
                  }}
                >
                  Routes
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
