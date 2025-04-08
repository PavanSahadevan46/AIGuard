/**
 * Nasal Route component
 *
 * This component is used for the nasal route of the application.
 * It prompts user a question and depending on the answer provides respective advice.
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
 * UserAnswerContext - Context handler to keep state for end page active incase of browser or go back button.
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
import { useState } from "react";
import { useRouteCompletion } from "../components/RouteCompletionContext";
import { useUserAnswers } from "@/components/UserAnswerContext";
import BackButton from "@/components/BackButton";

function Nasal() {
  // Retrieve question from criteria
  const questionData = criteria.Questions.find((q) => q.id === 6);

  // React router navigation hook
  const nav = useNavigate();

  // Destructure objects from respective context functions
  const { markRouteDone } = useRouteCompletion();
  const [step, setStep] = useState("initialQuestion");
  const { setIsSECRequired } = useUserAnswers();

  // Define main content
  let content;
  let questionTitle = questionData.question;

  // Render content based on the current step
  switch (step) {
    case "initialQuestion":
      content = (
        <>
          {/* Back button to go back to routes page */}
          <BackButton
            onClick={() => {
              nav("/routes");
            }}
          />
          <h1 className="text-2xl font-semibold mb-4 text-left">
            {questionTitle}
          </h1>
          <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
            <Button
              className="btn-primary"
              onClick={() => setStep("yesAdvice")}
            >
              Yes
            </Button>
            <Button
              className="btn-secondary"
              onClick={() => setStep("noAdvice")}
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
          <BackButton
            onClick={() => {
              setStep("initialQuestion");
            }}
          />

          <section>
            <h1 className="text-2xl font-semibold mb-4 text-left">
              Please review the following :
            </h1>

            <p className="text-gray-800 p-0.5 mt-3 text-xl">
              <strong>
                A steroid emergency card may be appropriate and for 12 months
                after stopping
              </strong>
              , particularly if in combination with other glucocorticoids.
            </p>

            <p className="text-gray-800 p-0.5 mt-3 text-xl">
              <strong>Consider</strong> whether patient needs cover with
              hydrocortisone if admitted to hospital unwell or invasive
              procedure.
            </p>
          </section>

          {/* Yes advice buttons */}

          <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
            <Button
              className="btn-primary"
              onClick={() => {
                markRouteDone("Nasal");
                nav("/routes");
              }}
            >
              Back to routes
            </Button>
            <Button
              className="btn-primary"
              onClick={() => {
                setIsSECRequired(true);
                nav("/end");
              }}
            >
              To end
            </Button>
          </div>
        </>
      );
      break;
    case "noAdvice":
      content = (
        <>
          <BackButton
            onClick={() => {
              setStep("initialQuestion");
            }}
          />
          <h1 className="text-2xl font-semibold mb-4 text-left">
            Please review the following :
          </h1>
          <section>
            <p className="text-gray-800 p-0.5 mt-3 text-xl">
              It is <strong>unlikely</strong> that a steroid emergency card is
              needed.
            </p>
            <p className="text-gray-800 p-0.5 mt-3 text-xl">
              <strong>However</strong> do consider the risk if in combination
              with other glucocorticoids.
            </p>
          </section>
          <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
            <Button
              className="btn-primary"
              onClick={() => {
                nav("/routes");
                markRouteDone("Nasal");
              }}
            >
              Back to routes
            </Button>
          </div>
        </>
      );
      break;
    default:
      content = <></>;
      questionTitle = "";
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

export default Nasal;
