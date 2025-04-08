/**
 * Rectal Route component
 *
 * This component is used for the rectal route of the application.
 * It prompts user a question and provides advice depending on the answer.
 *
 * This route might not warrant an SEC on its own but an SEC should be considered if used with other routes.
 *
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
 * BackButton - Allows navigation to previous page or step with prop handling.
 *
 * Route Completion - Context handler to provide information to steroid routes page to show visual changes on which route has been completed
 */
import Header from "../components/Header";
import Footer from "../components/Footer";
import criteria from "../criteria.json";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useRouteCompletion } from "../components/RouteCompletionContext";
import BackButton from "@/components/BackButton";
import { useState } from "react";

function Rectal() {
  // Retrieve question from criteria
  const questionData = criteria.Questions.find((q) => q.id === 9);

  // React Router navigation hook
  const nav = useNavigate();

  // Destructure object from respective context and assign stateful object and setter function
  const { markRouteDone } = useRouteCompletion();
  const [step, setStep] = useState("initialQuestion");

  // Define main content and options
  let content;
  let questionTitle = questionData.question;

  // Render content based on the current step
  switch (step) {
    case "initialQuestion":
      content = (
        <>
          {/* Back button to go back to route page */}
          <BackButton
            onClick={() => {
              nav("/routes");
            }}
          />
          <h1 className="text-2xl font-semibold mb-4 text-left">
            {questionTitle}
          </h1>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li className="text-slate-700 p-0.5 text-xl">
              Budesonide enema or rectal foam
            </li>
            <li className="text-slate-700 p-0.5 text-xl">
              Prednisolone rectal solution or suppositories
            </li>
          </ul>

          <div className="mt-6 flex flex-col md:flex-row float-left gap-4 max-w-md w-full mx-auto">
            <Button
              className="btn-primary"
              onClick={() => {
                setStep("yesAdvice"); // if clicked proceed to yesAdvice step
              }}
            >
              Yes
            </Button>
            <Button
              className="btn-secondary"
              onClick={() => {
                // if clicked patient does not need SEC,
                // mark route as done and redirect user to routes page
                markRouteDone("Rectal");
                nav("/routes");
              }}
            >
              No
            </Button>
          </div>
        </>
      );
      break;
    case "yesAdvice":
      content = (
        <>
          {/* Back button to go back to previous step */}
          <BackButton
            onClick={() => {
              setStep("initialQuestion");
            }}
          />
          <section className="mt-4">
            <h1 className="text-2xl font-semibold mb-4 text-left">
              Please review the following:{" "}
            </h1>
            <p className="text-slate-700 p-0.5 text-lg">
              There are some reports of these rectal glucocorticoids causing
              adrenal insufficiency when used for inflammatory bowel disease.
            </p>
            <p className="text-slate-700 p-0.5 text-lg">
              Consider usage of these and any other concomitant steroid use to
              decide if a Steroid Emergency Card is needed. If needed, the card
              is required for 12 months after stopping aswell.
            </p>
            <div className="mt-7 flex flex-col md:flex-row float-left gap-4 max-w-md w-full mx-auto">
              <Button
                className="btn-secondary"
                onClick={() => {
                  // If clicked mark route as done and navigate to routes
                  markRouteDone("Rectal");
                  nav("/routes");
                }}
              >
                Back to routes
              </Button>
            </div>
          </section>
        </>
      );
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

export default Rectal;
