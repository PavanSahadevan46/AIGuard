/**
 * Sick Day rules component
 *
 * This component is the sick day rules page of the application.
 * It renders sick day rules advice and provides links to NHS England sick day rules.
 *
 * This component displays critical information regarding sick day rules,
 * provides links to external information provided by the NHS England.
 *
 *
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
 * React Router Dom(Link) - A <a href=> wrapper that additionally has accomodation for client side routing

 */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import criteria from "../criteria.json";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";

function SickDayRules() {
  // Retrieve sick day advice from criteria file
  const sickDayAdvice = criteria.SickDayAdvice.find((q) => q.id === 1);
  const SickDayGlucocorticoids = criteria.SickDayGlucocorticoids;

  // React router navigation hook
  const nav = useNavigate();

  // Define main content and retrieve the options from question 1
  let content;
  let questionData = criteria.Questions.find((q) => q.id === 1);

  content = (
    <>
      <main>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 border-b pb-3">
          {sickDayAdvice.title}
        </h1>
        <div className="space-y-8">
          <section>
            <div className="bg-blue-50 border-l-4 border-sapphire p-4 mb-8">
              <h3 className="text-xl mb-8 mt-4 text-left pl-2">
                Sick day rules are available{" "}
                <Link
                  className="text-blue-700 underline"
                  to="https://www.endocrinology.org/media/4169/ai-and-exogenous-steroids_patient-information-sheet.pdf"
                >
                  here.
                </Link>
              </h3>
            </div>
            <ul className="list-disc space-y-3 pl-5">
              {/* Iterate through and render oral glucocorticoids */}
              {sickDayAdvice.options.map((option, index) => (
                <li key={index} className="text-gray-800 text-lg">
                  {option}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-7">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Other oral glucocorticoids
            <span className="text-red-500 ml-1">*</span>
          </h2>
          <ul className="space-y-2 list-disc list-inside">
            {/* Iterate through CYP3A4 inhibitors and render them  */}
            {SickDayGlucocorticoids.map((option) => (
              <li key={option.id} className="text-gray-800 p-0.5 text-lg">
                {option.glucocorticoid} {option.measurement}
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-4">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            CYP3A4 inhibitors
            <span className="text-red-500 ml-1">*</span>
          </h2>
          <span className="text-xl mt-8 font-semibold">
            Potent Protease inhibitors:{" "}
          </span>{" "}
          <ul className="list-disc list-inside space-y-2 mb-6">
            {questionData.potentProteaseInhibitors.map((option, index) => (
              <li key={index} className="text-gray-800 p-0.5 text-lg">
                {option}
              </li>
            ))}
          </ul>
          <span className="text-xl font-semibold">Antifungals:</span>{" "}
          <ul className="list-disc list-inside space-y-2 mb-6">
            {questionData.antiFungals.map((option, index) => (
              <li key={index} className="text-gray-800 p-0.5 text-lg">
                {option}
              </li>
            ))}
          </ul>
          <p className="text-gray-800 p-0.5 text-lg">
            <span className="text-xl font-semibold">Antibiotics:</span> <br />
            {questionData.antiBiotics}
          </p>
        </section>

        <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
          {/* Navigate to previous BROWSER page */}
          <Button className="btn-primary" onClick={() => nav(-1)}>
            Go back
          </Button>
        </div>
      </main>
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

export default SickDayRules;
