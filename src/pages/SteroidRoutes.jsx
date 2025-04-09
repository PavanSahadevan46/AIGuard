/**
 * Steroid Routes component
 *
 * This component is used for entering each route in the application.
 * It prompts user an inital question, if answered no the patient does not need an SEC otherwise it renders the routes.
 *
 * This route utilizes many context providers to ensure ease of access e.g. keeping the routes rendered if a navigation event occurs
 *
 * This component is the "heart" of the application where users will continuously return to this page, completing routes.
 *
 * * Note: This component assumes that the appropriate question is in the criteria JSON file.
 *
 * @author Pavan Sahadevan
 * @version 1.0
 * Developed as a proof of concept for NHS England and as a final year project for CI601 from the University of Brighton.
 */

/**
 * Dependencies & Components :
 *
 * Header & Footer - Common components that provide a header and footer for the application.
 *
 * criteria - JSON file that contains question data and or other data regarding route information.
 *
 * Button - Shadcn UI component.
 *
 * React Router Dom -  Client-side routing via React-router-dom.
 *
 * State - A built in React object used to contain a stateful value and a function to update it.
 *
 * UseEffect - Built in react hook that allows usage of side effects(actions outside scope of functions)
 *
 * UserAnswerContext - Context handler to keep state for end page active incase of browser or go back button.
 *
 * BackButton - Allows navigation to previous page or step with prop handling.
 *
 * React Hook Form - An external form library that provides out of the box state handling for inputs and sanitization & more.
 *
 * Route Completion - Context handler to provide information to steroid routes page to show visual changes on which route has been completed
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RouteContainer from "../components/RouteContainer";
import { Button } from "@/components/ui/button";
import { useRouteCompletion } from "../components/RouteCompletionContext";
import criteria from "../criteria.json";
import { useUserAnswers } from "@/components/UserAnswerContext";
import BackButton from "@/components/BackButton";

function SteroidRoutes() {
  // Retrieve question data from criteria file
  {/* Spreadsheet location - Start B5 */}
  const questionData = criteria.Questions.find((q) => q.id === 2);

  // Destructure objects from route completion context,
  // these functions are used to update route completion and ensure ease of use
  const { setHasVisitedRoutePage, completedRoutes, resetRoutes } =
    useRouteCompletion();
  const { setIsSECRequired } = useUserAnswers();

  // React Router navigation hook
  const nav = useNavigate();

  // Local state management to manage current steps
  const [step, setStep] = useState("initialQuestion");

  // When completedRoutes is non-empty,
  // automatically go to the route entry step,
  // so users do not need to answer the question every time they come to this page
  useEffect(() => {
    if (completedRoutes.length > 0) {
      setStep("enterRoutes");
    }
  }, [completedRoutes]);

  // Define main content and question title
  let content;
  let questionTitle;

  // Render content based on current step
  switch (step) {
    case "initialQuestion":
      questionTitle = questionData.question;
      content = (
        <>
          {/* Back button to go back to previous page */}
          <BackButton
            onClick={() => {
              nav("/q1");
            }}
          />
          <h1 className="text-2xl font-semibold mb-4 text-left">
            {questionTitle}
          </h1>
          <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
            <Button
              className="btn-primary"
              onClick={() => {
                // Set the step and set the has visited flag to true,
                // this is used to ensure users do not have to reanswer the question everytime
                {/* Spreadsheet location - Start D5 */}
                setStep("enterRoutes");
                setHasVisitedRoutePage(true);
              }}
            >
              Yes
            </Button>
            <Button
              className="btn-primary"
              onClick={() => {
                // If clicked, sec is not needed and proceed to end page
                {/* Spreadsheet location - Start C5 */}
                setIsSECRequired(false);
                nav("/end");
              }}
            >
              No
            </Button>
          </div>
        </>
      );
      break;

    case "enterRoutes":
      content = (
        <>
          {/* Back button to go back to previous step */}

          <BackButton
            onClick={() => {
              setStep("initialQuestion");
            }}
          />
          <h1 className="text-2xl font-semibold mb-4 text-left">
            Please enter the glucocorticoids taken in the{" "}
            <span className="underline">order</span> of the routes shown
          </h1>
          {/* Refresh button that only shows after atleast one route has been completed */}
          {completedRoutes.length > 0 && (
            <div className="mt-4">
              <Button className="btn-secondary !w-40 " onClick={resetRoutes}>
                Refresh routes
              </Button>
            </div>
          )}
          {/* Render the container component that handles the list and entry of routes */}
          <RouteContainer />
          {completedRoutes.length > 0 && (
            <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
              <Button
                className="btn-cta"
                onClick={() => {
                  // If clicked, user is considered "finished" and is sent to end
                  // This always assumes that sec requirement is not met,
                  // as whenever an sec is needed they are immediately taken to the end page
                  setIsSECRequired(false);
                  nav("/end");
                }}
              >
                No more routes
              </Button>
            </div>
          )}
        </>
      );
      break;

    default:
      questionTitle = "";
      content = <></>;
      break;
  }

  // Render the component with a standard layout including header and footer
  return (
    <>
      <div className="grid grid-cols-1 bg-white">
        <Header />
        <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-6">
          {content}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default SteroidRoutes;
