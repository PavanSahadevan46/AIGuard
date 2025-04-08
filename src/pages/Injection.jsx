/**
 * Injection Route component
 *
 * This component is used for the injection route of the application.
 * It prompts user with series of questions retrived from the criteria JSON file.
 * This component renders a list of glucocorticoids and their respective questions and takes user input via checkboxes.
 *
 *
 * If the user answers "yes" to any question ,they are dememed to require
 * an SEC (Steroid Emergency Card) they are redirected to the end.
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
 * React Hook Form - An external form library that provides out of the box state handling for inputs and sanitization & more.
 *
 * Route Completion - Context handler to provide information to steroid routes page to show visual changes on which route has been completed
 */

import Header from "../components/Header";
import Footer from "../components/Footer";
import criteria from "../criteria.json";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRouteCompletion } from "../components/RouteCompletionContext";
import { useUserAnswers } from "@/components/UserAnswerContext";
import BackButton from "@/components/BackButton";

function Injection() {
  // Retrieve question data from injection route
  const injData = criteria.injectionRoute;

  // React router navigation hook
  const nav = useNavigate();

  // Destructure objects from respective context functions
  const { markRouteDone } = useRouteCompletion();
  const { setIsSECRequired } = useUserAnswers();

  // Initialize React hook form for form management
  const { register, handleSubmit } = useForm();

  /**
   * Form submission handler.
   * Iterates over each answer and counts "yes" responses (determined by active tick in checkbox)
   * If one or more questions are answered "yes" it sets the SEC requirement and redirects user
   * to end page, otherwise marks route as done and returns user to main routes page.
   * @param {Object} formdata - Data outputted by form
   */
  function onSubmit(formdata) {
    // Initialize variables
    let yesCount = 0;

    // Loop through each injection entry from criteria
    injData.forEach((inj) => {
      // Retrieve answers for each question
      const q1Answer = formdata[`inj_${inj.id}_question1`];
      const q2Answer = formdata[`inj_${inj.id}_question2`];

      // If either question is checked, increment yes Count
      if (q1Answer || q2Answer) {
        yesCount++;
      }
    });

    // If yesCount exceeds 1 set the SEC requirement and redirect user to end page
    // otherwise mark route as done and redirect to main routes page.
    if (yesCount >= 1) {
      setIsSECRequired(true);
      nav("/end");
    } else {
      nav("/routes");
      markRouteDone("Injection");
    }
  }

  // Define main content
  let content = (
    <>
      {/* Back button to go back to routes page*/}
      <BackButton
        onClick={() => {
          nav("/routes");
        }}
      />
      <h1 className="text-2xl font-semibold mb-4 text-left">
        Please select all that apply
      </h1>
      <div className="bg-blue-50 border-l-4 border-sapphire p-4 mb-8 mt-5">
        <h3 className="text-lg font-semibold mb-4 text-left">
          Please note the following questions relate to the patient currently
          having glucocorticoids or having done so in the past 12 months.
        </h3>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto p-4 bg-white rounded-md  mt-4"
      >
        <div className="space-y-6">
          {/* Map over injection glucocorticoids and create input fields */}
          {injData.map((inj) => (
            <div key={inj.id} className="pb-4 border-b border-gray-200">
              <div className="mb-3">
                <h3 className="font-medium text-left rounded text-slate-900 text-xl">
                  {inj.glucocorticoid ||
                    (inj.glucocorticoids && inj.glucocorticoids.join(", "))}
                </h3>
              </div>
              <div className="space-y-5 ">
                <div className="flex items-center gap-x-8 space-y-2">
                  <input
                    id={`inj_${inj.id}_question1`}
                    type="checkbox"
                    className="w-[24px] h-[24px] flex-shrink-0"
                    // ...register is a react-hook-form function,
                    // provides inbuilt sanitzation
                    {...register(`inj_${inj.id}_question1`)}
                  />
                  <label
                    htmlFor={`inj_${inj.id}_question1`}
                    className="font-medium p-0.5 text-base leading-loose text-slate-700"
                  >
                    {inj.question1}
                  </label>
                </div>
                <div className="flex items-center gap-x-8 space-y-1">
                  <input
                    id={`inj_${inj.id}_question2`}
                    type="checkbox"
                    className="w-[24px] h-[24px] flex-shrink-0"
                    {...register(`inj_${inj.id}_question2`)}
                  />
                  <label
                    htmlFor={`inj_${inj.id}_question2`}
                    className="font-medium p-0.5 text-base leading-loose text-slate-700"
                  >
                    {inj.question2}
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Submit button */}
        <div className="pt-6 text-center">
          <Button className="btn-cta" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </>
  );

  // Render the component with a standard layout including header and footer

  return (
    <div className="grid grid-cols-1 bg-white">
      <Header />
      <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-6">{content}</div>
      <Footer />
    </div>
  );
}

export default Injection;
