/**
 * Rectal Route component
 *
 * This component uses data from the SEC - Is it needed spreadsheet, page :  Opthalmic page
 * 
 * This component is used for the eye route of the application.
 * It simply renders advice based on the Opthalamic route.
 *
 * It's unlikely this route will solely warrant an SEC however total exposure should be considered.
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
 * BackButton - Allows navigation to previous page or step with prop handling.
 *
 * Route Completion - Context handler to provide information to steroid routes page to show visual changes on which route has been completed
 */
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useRouteCompletion } from "../components/RouteCompletionContext";
import BackButton from "@/components/BackButton";

function Eye() {
  // React Router navigation hook
  const nav = useNavigate();

  // Destructure object from respective context
  const { markRouteDone } = useRouteCompletion();

  // Define main content
  let content;
  content = (
    <>
      {/* Back button to navigate back to routes page */}
      <BackButton
        onClick={() => {
          nav("/routes");
        }}
      />
      {/* Spreadsheet location - Opthalmic A1 */}
      <h1 className="text-2xl font-semibold mb-4 text-left">
        Please review the following
      </h1>
      <p className="text-gray-800 text-xl p-0.2 mb-2">
        If the patient is only on steroid eye drops, HPA axis suppression is
        unlikely.
      </p>
      <p className="text-gray-800 text-xl p-0.2">
        If a patient is taking other steroids by other routes then total
        exposure needs to be considered.
      </p>
      <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
        <Button
          className="btn-secondary"
          onClick={() => {
            // if clicked mark route as complete and navigate back to routes
            markRouteDone("Eye");
            nav("/routes");
          }}
        >
          Back to routes
        </Button>
      </div>
    </>
  );

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

export default Eye;
