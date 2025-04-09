/**
 * Topical Route component
 *
 * This component uses data from the SEC - Is it needed spreadsheet, page :  Topical page
 * 
 * This component is used for the topical route of the application.
 * It prompts user a question and provides examples of potent steroids and rates of absorption in differing locations.
 *
 * If the initial question's answer is yes the patient requires an sec and is redirected,
 * otherwise if answered no takes user to next question.
 * If the second question is answered yes the patient requires an sec and is redirected,
 * otherwise if answered no the user is presented advice and is given the option to go back to routes
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
 * UserAnswerContext - Context handler to keep state for end page active incase of browser or go back button.
 *
 * BackButton - Allows navigation to previous page or step with prop handling.
 *
 * Route Completion - Context handler to provide information to steroid routes page to show visual changes on which route has been completed
 *
 * Table - A reusable shadn UI component
 */
import Header from "../components/Header";
import Footer from "../components/Footer";
import criteria from "../criteria.json";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRouteCompletion } from "../components/RouteCompletionContext";

import { useUserAnswers } from "@/components/UserAnswerContext";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BackButton from "@/components/BackButton";

function Topical() {
  // Retrieve question data from  criteria
  {/* Spreadsheet location - Topical A1 & A5*/}
  const firstQuestion = criteria.Questions.find((q) => q.id === 7).question;
  const secondQuestion = criteria.Questions.find((q) => q.id === 8).question;

  // Retrieve topical data from criteria
  const topicalData = criteria.topicalRoute;
  const topicalRate = criteria.topicalRatesOfAbsorption;
  const topicalAdditional = criteria.absorptionAdditionalInfo;

  // React Router navigation hook
  const nav = useNavigate();

  // Destructure objects from respsective context
  const { markRouteDone } = useRouteCompletion();
  const [step, setStep] = useState("initialQuestion");

  const { setIsSECRequired } = useUserAnswers();

  // Define main content
  let content;
  let questionTitle = firstQuestion;

  // Define potency information which uses shadcn table component to render data
  const potencyInfo = (
    <>
      <div className="text-sm text-gray-600 font-bold">
        <span>Example of potent glucocorticoids: </span>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-normal font-bold">
                Generic Name
              </TableHead>
              <TableHead className="whitespace-normal font-bold">
                Examples of trade names including steroids in combination with
                other medicines
              </TableHead>
              <TableHead className="whitespace-normal font-bold">
                Potency
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Iterate over each glucorticoid rendering necessary data in tabular format */}
            {/* Spreadsheet location - Topical A1 (note)*/}
            {topicalData.map((glucorticoid) => (
              <TableRow key={glucorticoid.id}>
                <TableCell className="whitespace-normal">
                  {glucorticoid.name}
                </TableCell>
                <TableCell className="whitespace-normal">
                  {glucorticoid.tradeNames
                    ? glucorticoid.tradeNames.join(", ")
                    : "N/A"}
                </TableCell>
                <TableCell className="whitespace-normal">
                  {glucorticoid.potency}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );

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
          {/* Spreadsheet location - Topical A1*/}
          <h1 className="text-2xl font-semibold mb-4 text-left">
            {questionTitle}
          </h1>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li className="text-slate-700 p-0.5 text-xl">
              More than 30g a <span className="underline">month</span> to rectal
              or vaginal areas, or
            </li>
            <li className="text-slate-700 p-0.5 text-xl">
              More than 200g a <span className="underline">week</span> to any
              other area
            </li>
          </ul>
          {potencyInfo} {/* Render potency info content*/}
          <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
            <Button
              className="btn-primary"
              onClick={() => {
                // If answered yes the patient is at risk and needs an SEC,
                // set SEC requirement and navigate to end page
                {/* Spreadsheet location - Topical A3*/}
                setIsSECRequired(true);
                nav("/end");
              }}
            >
              Yes
            </Button>
            <Button
              className="btn-secondary"
              // Spreadsheet location - Topical A5
              onClick={() => setStep("otherCheck")} // proceed to next question
            >
              No
            </Button>
          </div>
        </>
      );
      break;

    case "otherCheck":
      questionTitle = secondQuestion;
      content = (
        <>
          {/* Back button to go back to previous step */}
          <BackButton
            onClick={() => {
              setStep("initialQuestion");
            }}
          />
          {/* Spreadsheet location - Topical A5 */}
          <h1 className="text-2xl font-semibold mb-4 text-left">
            {questionTitle}
          </h1>
          <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
            <Button
              className="btn-primary"
              onClick={() => {
                // If answered yes the patient is at risk and needs an SEC,
                // set SEC requirement and navigate to end page
                /// Spreadsheet location - Topical A7
                setIsSECRequired(true);
                nav("/end");
              }}
            >
              Yes
            </Button>
            <Button
              className="btn-secondary"
              // Spreadsheet location - Topical A10
              onClick={() => setStep("noAdvice")} // Proceed to advice if no answered
            >
              No
            </Button>
          </div>
        </>
      );
      break;
    case "noAdvice":
      content = (
        <>
          {/* Back button to go back to previous step */}
          <BackButton
            onClick={() => {
              setStep("otherCheck");
            }}
          />
          <section>
            {/* Spreadsheet location - Topical A10 */}
            <p className="text-gray-800 p-0.5 text-xl">
              It is <strong> unlikely</strong> that the patient needs an steroid
              emergency card.
            </p>

            <p className="text-gray-800 p-0.5 text-xl">
              <strong>However</strong> do consider that systemic absorption
              varies depending on the area of application.
            </p>
            <div className="grid grid-cols-2 gap-2 mt-5">
              {/* iterate through topical rates of absorption and render them */}
              {/* Spreadsheet location - Topical A10 (Note) */}
              {topicalRate.map((rate) => (
                <div
                  key={rate.location}
                  className=" border-b border-gray-200 flex flex-col"
                >
                  <p className="text-xl">
                    <strong>{rate.location}: </strong>
                    {rate.absorptionRate} absorption rate
                  </p>
                </div>
              ))}
            </div>
            <p className="text-gray-800 p-0.5 mt-3 text-base">
              {/* Spreadsheet location - Topical A10 (Note) */}
              <strong>Additionally:</strong>
              {topicalAdditional} {/** Additional advice for topical route */}
            </p>
          </section>
          <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-4 max-w-md w-full mx-auto">
            <Button
              className="btn-primary"
              onClick={() => {
                // if clicked patient does not need an SEC solely because of this route,
                // mark route as done and redirect user to main routes page
                markRouteDone("Topical");
                nav("/routes");
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

export default Topical;
