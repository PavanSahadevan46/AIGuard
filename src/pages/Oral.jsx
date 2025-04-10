/**
 * Oral Route component
 *
 * This component uses data from the SEC - Is it needed spreadsheet, page :  Oral(2) page
 * 
 * This component is used for the oral route of the application.
 * It prompts user with series of questions retrived from the criteria JSON file.
 * There are two sub routes the user can enter; Intermittent & Continuous.
 * The Intermittent route renders two questions related to the intermittent route
 * and another question as a check to see if user needs to enter the continuous route at all.
 * The Continuous route renders a form that renders glucorticoids and input fields dynamically.
 *
 * If the user is deemed to require an SEC (Steroid Emergency Card) they are redirected to the end.
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
 * OralDosageValContext - Context handler that captures the continuous route's end total
 * to be used in conjunction with the inhaled route.
 *
 * Route Completion - Context handler to provide information to steroid routes page to show visual changes on which route has been completed
 */

import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";
import criteria from "../criteria.json";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRouteCompletion } from "../components/RouteCompletionContext";
import { useOralDosageVal } from "../components/OralDosageValContext";
import { useUserAnswers } from "@/components/UserAnswerContext";
import React from "react";

function Oral() {
  // React router navigation hook
  const nav = useNavigate();

  // Retrive dosage data and dexamethasone options from criteria JSON file
  const oralData = criteria.oralRoute;
  const dexOptions = oralData.find((q) => q.id === 5);

  // Destructure objects from respective context functions
  const { markRouteDone } = useRouteCompletion();
  const { setDailyDosageVal } = useOralDosageVal();
  const { setIsSECRequired } = useUserAnswers();

  // State to track the current step
  const [step, setStep] = useState("initialQuestion");

  // Initialize React hook form for form management with default values
  // to avoid pre-populating form with 0 incase of refresh or navigation
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      continuous: {},
    },
  });

  /**
   * Calculates the TOTAL continuous dosage
   * It divides each inputted value by it's continuous value in JSON
   * and adds it all up.
   *
   * @param {Object} formdata - Data outputted by form
   * @returns {Number} - the total after calculations
   */

  const calculateContinuous = (formdata) => {
    const contResults = Object.values(formdata.continuous);
    const continuousValues = oralData.map((item) => item.continuousValue);

    const total = contResults.reduce((acc, value, i) => {
      return acc + value / continuousValues[i];
    }, 0);

    return total;
  };

  /**
   * Form submission handler
   * Initially checks if the step is on continuous route and then calculates
   * total additonally updating OralValueDosageContext for use in the inhaled route.
   * If total exceeds 1 it redirects user to end page and marks sec required,
   * otherwise returns user to main routes page and marks the route as done.
   *
   * @param {Object} formdata - data submitted from the form
   *
   */
  const onSubmit = (formdata) => {
    if (step === "continuousDosage") {     
      const contTotal = calculateContinuous(formdata);
      // If total exceeds 1 it means patient is at risk and needs an SEC,
      //set sec requirement and navigate them to the end
      if (contTotal >= 1) {
        setIsSECRequired(true);
        nav("/end");
        // otherwise store the dosage value in context to use in inhaled route,
        // mark route as done and navigate user back to routes page
      } else if (contTotal < 1) {
        setDailyDosageVal(contTotal);
        markRouteDone("Oral");
        nav("/routes");
      }
    }
  };

  // Define main content and question title
  let content;
  let questionTitle;

  // Conttent for continuous form
  {/* Spreadsheet location - Oral (2) A19 - A28 */}

  const continuousFormContent = (
    <>
      {/* Back button to go back to previous step*/}
      <BackButton
        onClick={() => {
          setStep("continuousCheck");
        }}
      />
      <h1 className="text-2xl font-semibold mb-4 text-left">
        Continuous: Please enter the daily dosage below <br />
        (If the patient has taken a variable dose, enter the highest dose
        taken.)
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto p-6 float-left"
      >
        {/* Map over oralData and create form fields for each glucocorticoid */}
        {oralData.map((oral) => (
          <div
            key={oral.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center border-b pt-2 pb-2"
          >
            <label
              htmlFor={`oral-${oral.id}`}
              className="text-slate-700 text-xl tracking-wide"
            >
              {oral.glucocorticoid}
            </label>
            <input
              id={`oral-${oral.id}`}
              type="number"
              step="0.01"
              placeholder={`Total daily dose: ${oral.measurementUnit}`}
              className="w-full px-5 py-3 border-2 border-gray-200 rounded-lg 
                   focus:outline-none focus:ring-3 focus:ring-blue-400 
                   focus:border-transparent transition-all duration-300 
                   hover:border-blue-300 text-gray-700 placeholder-gray-500 placeholder-"
              
              // ...register is a react-hook-form function,
              // provides inbuilt sanitzation 
              {...register(`continuous.${oral.id}`, {
                setValueAs: (value) => (value === "" ? 0 : Number(value)), // Fallback to 0 if no input is entered
              })}
            />
          </div>
        ))}
        <div className="pt-6 text-center">
          <Button
            className="btn-cta px-8 py-3 text-xl transition-all rounded-none duration-300 mt-4"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </>
  );

  // Render content based on the current step
  switch (step) {
    case "initialQuestion":
      content = (
        <>
        {/* Navigate button to go back to route page */}
          <BackButton
            onClick={() => {
              nav("/routes");
            }}
          />
          {/* Spreadsheet location - Oral(2) A1 */}
          <h1 className="text-2xl font-semibold mb-4 text-left">
            Is the patient taking oral steroids{" "}
            <span className="underline">intermittently</span> or has done so in
            the last year?
          </h1>
          <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
            <Button
              className="btn-primary"
              onClick={() => {
                // if clicked proceed to intermittent sub route
                {/* Spreadsheet location - Oral(2) E1 */}
                setStep("intermittentCheck");
              }}
            >
              Yes
            </Button>
            <Button
              className="btn-secondary"
              onClick={() => {
                {/* Spreadsheet location - Oral(2) E2 */}
                reset(); // Reset form to avoid pre-populating form with erroneous data
                setStep("continuousDosage");   // if clicked proceed straight to continuous route
              }}
            >
              No
            </Button>
          </div>
        </>
      );
      break;

    case "intermittentCheck":
      {/* Spreadsheet location - Oral(2) A3 - A11 */}

      questionTitle =
        "Has the patient had 3 or more courses in total of any of the following for at least seven days within the past 12 months?";
      content = (
        <>
        {/* Navigate button to go back to previous step */}
          <BackButton
            onClick={() => {
              setStep("initialQuestion");
            }}
          />
          <h1 className="text-2xl font-semibold mb-4 text-left">
            {questionTitle}
          </h1>
          <div className="mx-auto p-4 bg-white w-full">
            {/* List out intermittent dosage details for each glucocorticoid */}
            {/* Spreadsheet location - Oral(2) A4 - A11 , B4 - B11 */}
            <ul className="list-disc list-inside space-y-2 mb-6">
              {oralData.map((oral, index) => (
                <li key={index} className="text-slate-700 p-0.5 text-xl">
                  {oral.glucocorticoid} {oral.intermittentDosage}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
            <Button
              className="btn-primary"
              onClick={() => {
                // If yes is clicked it means the patient is at risk and needs an SEC, 
                // set state of sec requirement and redirect them to end
                {/* Spreadsheet location - Oral(2) G3 */}
                setIsSECRequired(true);
                nav("/end");
              }}
            >
              Yes
            </Button>
            <Button
              className="btn-secondary"
              onClick={() => {
                // if clicked proceed to dexamethasone check 
                {/* Spreadsheet location - Oral(2) F1 */}
                setStep("dexamethasoneCheck");
              }}
            >
              No
            </Button>
          </div>
        </>
      );
      break;

    case "dexamethasoneCheck":
      {/* Spreadsheet location - Oral A19 - A30 */}
      questionTitle =
        "Has the patient had (or is due to have) intermittent courses of dexamethasone for either of the following?";
      content = (
        <>
        {/* Back button to previous step */}
          <BackButton
            onClick={() => {
              setStep("intermittentCheck");
            }}
          />
          <h1 className="text-2xl font-semibold mb-4 text-left">
            {questionTitle}
          </h1>
          <div className="mx-auto p-4 bg-white w-full">
            {/* More indepth dexamethasone details */}
            <ul className="list-disc list-inside space-y-2 mb-6">
              {dexOptions.subOptions.map((oral, index) => (
                <li key={index} className="text-slate-700 p-0.5 text-xl">
                  {oral}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
            <Button
              className="btn-primary"
              onClick={() => {
                // If clicked means that the patient is at risk and needs an SEC,
                // set sec requirement and redirect to end
                {/* Spreadsheet location - Oral(2) G14 - G15 */}
                setIsSECRequired(true);
                nav("/end");
              }}
            >
              Yes
            </Button>
            <Button
              className="btn-secondary"
              onClick={() => {
                // if clicked proceed to continuous check
                {/* Spreadsheet location - Oral(2) F14 - F15 */}
                setStep("continuousCheck");
              }}
            >
              No
            </Button>
          </div>
        </>
      );
      break;

    // This step is to check if the patient even needs to enter the continuous route
    case "continuousCheck":
      {/* Spreadsheet location - Oral (2) A18*/}
      questionTitle =
        "Has the patient had at least one continuous course (at least 4 weeks) of oral steroids in the past year?";
      content = (
        <>
        {/* Back button to previous step */}
          <BackButton
            onClick={() => {
              setStep("dexamethasoneCheck");
            }}
          />
          <h1 className="text-2xl font-semibold mb-4 text-left">
            {questionTitle}
          </h1>
          <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
            <Button
              className="btn-primary"
              onClick={() => {
                reset(); // Reset form to avoid pre-populating form with erroneous data
                {/* Spreadsheet location - Oral(2) F18 */}
                setStep("continuousDosage"); // proceed to continuous step where user enters daily dosage in form
              }}
            >
              Yes
            </Button>
            <Button
              className="btn-secondary"
              onClick={() => {
                // if clicked user does not need continuous route,
                // mark route as complete and redirect user to main routes page
                {/* Spreadsheet location - Oral(2) G18 */}
                markRouteDone("Oral");
                nav("/routes");
              }}
            >
              No
            </Button>
          </div>
        </>
      );
      break;
    
    case "continuousDosage":
    {/* Spreadsheet location - Oral (2) A19 - A28 */}
    content = continuousFormContent;
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

export default Oral;
