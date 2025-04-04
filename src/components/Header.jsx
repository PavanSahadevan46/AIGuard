import logo from "../assets/temp1.png";
import { useNavigate } from "react-router-dom";
import { useRouteCompletion } from "./RouteCompletionContext";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

function Header() {
  const nav = useNavigate();
  const { hasVisitedRoutePage, setHasVisitedRoutePage } = useRouteCompletion();

  const [showRouteLink, setShowRouteLink] = useState(false);

  useEffect(() => {
    if (hasVisitedRoutePage) {
      setShowRouteLink(true);
    }
  }, [hasVisitedRoutePage]);

  const handleClick = () => {
    nav("/start");
  };

  return (
    <header className="bg-sapphire shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 ">
        <div className="flex items-center">
          <div
            className="flex items-center cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 p-1"
            onClick={() => {
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
          {showRouteLink && (
            <>
              <div className="p-3 border-l border-white">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-sapphire hover:bg-opacity-20 focus:ring-2 
                  focus:ring-white focus:ring-offset-2 focus:ring-offset-sapphire ml-1 h-8 py-0
                  sm:text-lg text-xl "
                  onClick={() => {
                    nav("/routes");
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
