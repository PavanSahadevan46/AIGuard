/**
 * Inhaled Route component
 *
 * This component is used for the inhaled route of the application.
 * It prompts user with an initial question to check if they are using another glucocorticoid treatment in conjunction with this route.
 * If yes is answered then a set of calculating values are used to calculate the overall total otherwise if no is answered,
 * a different set of values are used to calculate the overall total.
 *
 *  If the user's inputted total exceeds 1 then they are redirected to the end with an SEC required,
 *  otherwise they are redirected to the routes page.
 *
 * * Note: This component assumes that the appropriate question is in the criteria JSON file.
 * This component also assumes that the appropriate values are stored in the JSON files to divide by,
 * otherwise it may not provide SEC requirement as expected.
 *
 *
 * @author Pavan Sahadevan
 * @version 1.0
 * Developed as a proof of concept for NHS England and as a final year project for CI601 from the University of Brighton.
 */

/**
 * Dependencies & Components :
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
 * Route Completion - Context handler to provide information to steroid routes page to show visual changes on which route has been completed.
 *
 * Dropdown - A Shadcn UI component .
 *
 * Chevron - lucide-react icon.
 *
 * OralDosageValContext - Context handler that uses values submitted from Oral continuous route to add in conjunction to total calculation.
 *
 **/

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import criteria from "../criteria.json";
import { Button } from "@/components/ui/button";
import { useRouteCompletion } from "../components/RouteCompletionContext";
import { useOralDosageVal } from "../components/OralDosageValContext";
import { useUserAnswers } from "@/components/UserAnswerContext";
import BackButton from "@/components/BackButton";

function Inhaled() {
  // Retrieve inhaled route data from criteria
  const inhaledData = criteria.inhaledRoute;

  // Destructure context functions and use State to switch between steps setting initial step to OtherGCCheck
  const [step, setStep] = useState("otherGCCheck");
  const { markRouteDone } = useRouteCompletion();
  const { setIsSECRequired } = useUserAnswers();

  // Initialize React hook form for form management
  const { register, handleSubmit, reset } = useForm();

  // React navigation ohook
  const nav = useNavigate();

  // Retrieve daily dosage value from oral dosage context
  const { dailyDosageVal } = useOralDosageVal();

  /**
   * Calculation function for taking inhalers WITH other glucocorticoid treatments.
   * This function sums user inputted values and additionally use value from oral route to sum
   * @param {Object} formdata - Data outputted by form
   * @returns {Number} - Total dosage (truncated to avoid javascript floating errors)
   **/
  const calculateWithOtherTreatment = (formdata) => {
    // Convert results into an array (formdata is an object)
    const results = Object.values(formdata.inhaled);
    // Map criteria to their respective values in JSON, (WITH OTHER GC TREATMENT VALUES)
    const withOtherTreatmentVal = inhaledData.map(
      (item) => item.withOtherTreatmentVal
    );
    // Sum each inputted value divided by its value from JSON
    const withTotal = results.reduce((acc, value, i) => {
      return acc + value / withOtherTreatmentVal[i];
    }, 0);

    // Add final total with dosage value from oral route
    const finalTotal = withTotal + dailyDosageVal;
    return finalTotal;
  };

  /**
   * Calculation function for taking inhalers WITHOUT other glucocorticoid treatments.
   * This function similar to the function above takes user inputs and divides it by their respective values in JSON
   *  and adds it all together.
   * @param {Object} formdata - Data outputted by form
   * @returns {Number} - Total dosage
   */
  const calculateWithOutOtherTreatment = (formdata) => {
    // Convert results into an array
    const results = Object.values(formdata.inhaled);
    // Map criteria to their respective values in JSON, (WITHOUT OTHER GC TREATMENT VALUES)
    const withOutOtherTreatmentVal = inhaledData.map(
      (item) => item.withoutOtherTreatmentVal
    );
    // Sum each inputted value divided by its value from JSON
    const withoutTotal = results.reduce((acc, value, i) => {
      return acc + value / withOutOtherTreatmentVal[i];
    }, 0);

    // Add final total with dosage value from oral route
    const finalTotal = withoutTotal + dailyDosageVal;
    return finalTotal;
  };

  const onSubmit = (formdata) => {
    let total;

    // Determine which calculation function to use depending on the step
    if (
      step === "usingInhalersWithOtherGC" ||
      step === "usingInhalersWithoutOtherGC"
    ) {
      const hasOtherGC = step === "usingInhalersWithOtherGC";

      if (hasOtherGC) {
        total = calculateWithOtherTreatment(formdata);
      } else {
        total = calculateWithOutOtherTreatment(formdata);
      }

      // If total exceeds 1, set SEC required and navigate user to end page
      // otherwise mark route as done and navigate back to main routes page
      if (total >= 1) {
        setIsSECRequired(true);
        nav("/end");
      } else {
        markRouteDone("Inhaled");
        nav("/routes");
      }
    }
  };

  // Define main content and question title
  let content;
  let questionTitle;

  // Form content for BOTH with & without Other GC treatement
  const formContent = (
    <>
      {/* Back Button to go back to inital step */}
      <BackButton
        onClick={() => {
          setStep("otherGCCheck");
        }}
      />
      <div className="mx-auto max-w-4xl mt-3 px-4 ">
        <h1 className="text-2xl font-semibold text-left">
          Please enter the daily dose below
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto p-4 bg-white rounded-md float-left mt-5 w-full px-0.5"
        >
          <div className="space-y-4">
            {/* Map each glucocorticoid and create labels and input fields */}
            {inhaledData.map((inh) => (
              <div key={inh.id} className="grid grid-cols-1 gap-3 ">
                <fieldset className="mb-2">
                  <label className="font-medium text-left rounded text-gray-800 text-xl border-gray-600 border-b-1">
                    {inh.glucocorticoid}
                  </label>
                </fieldset>
                {/* Render brand / trade names and if more than 3 names are present, put in dropdown */}
                {inh.branded_names && inh.branded_names.length > 0 ? (
                  <div className="text-base text-gray-600 font-bold">
                    <span>Common brand names: </span>
                    <span>{inh.branded_names.slice(0, 3).join(", ")}</span>
                    {inh.branded_names.length > 3 && (
                      <DropdownMenu>
                        <br></br>
                        <DropdownMenuTrigger className="ml-1 inline-flex items-center space-x-1 text-blue-600 underline cursor-pointer">
                          <span>More</span>
                          <ChevronDown className="w-4 h-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-1">
                          <DropdownMenuLabel>
                            c Additional Brand Names
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {inh.branded_names.slice(3).map((brand, idx) => (
                            <DropdownMenuItem key={idx}>
                              {brand}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                ) : (
                  <span className="text-sm text-gray-600">No brand names</span>
                )}

                <div>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue=""
                    placeholder={"Total daily dose: " + inh.measurementUnit}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    // ...register is a react-hook-form function,
                    // provides inbuilt sanitzation
                    {...register(`inhaled.${inh.id}`, {
                      setValueAs: (value) => {
                        return value === "" ? 0 : Number(value);
                      },
                    })}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 text-center">
            <Button className="btn-cta" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );

  // Render content based on the current step
  switch (step) {
    case "otherGCCheck":
      questionTitle = "Is the patient also using nasal glucocorticoids?";
      content = (
        <>
          <BackButton
            onClick={() => {
              nav("/routes");
            }}
          />
          <div className="bg-blue-50 border-l-4 border-sapphire p-4 mb-2 mt-5">
            <h3 className="text-lg font-semibold mb-4 text-left">
              Please note the following question relates to the patient
              currently having glucocorticoids or has done so in the past 12
              months
            </h3>
          </div>
          <h1 className="text-xl font-semibold mb-6 text-left">
            {questionTitle}
          </h1>

          <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
            <Button
              className="btn-primary"
              onClick={() => {
                reset();
                setStep("usingInhalersWithOtherGC");
              }}
            >
              Yes
            </Button>
            <Button
              className="btn-secondary"
              onClick={() => {
                reset();
                setStep("usingInhalersWithoutOtherGC");
              }}
            >
              No
            </Button>
          </div>
        </>
      );
      break;
    // Both steps use same form content
    case "usingInhalersWithOtherGC":
    case "usingInhalersWithoutOtherGC":
      content = formContent;
      break;
    default:
      content = <></>;
      questionTitle = "";
  }
  // Render the component with a standard layout including header and footer
  return (
    <div className="grid grid-cols-1 bg-white">
      <Header />
      <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-6">{content}</div>
      <Footer />
    </div>
  );
}

export default Inhaled;
