/**
 * First question component
 * 
 * This component uses data from the SEC - Is it needed spreadsheet, page :  Start page
 *
 * This component is the first question users see after starting the application.
 * It retrives question data from the criteria JSON file, displaying the question with the options,
 * additionally providing "Yes" and "No" buttons that the users can press.
 * Depending on the user's answer they are redirected to the respective route.
 *
 * Note: This component assumes that the appropriate question is with id 1 in the criteria JSON file.
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
 * criteria - JSON file that contains question data and or other data regarding route information
 *
 * Button - Shadcn UI component
 *
 * React Router Dom -  Client-side routing via React-router-dom
 *
 * UserAnswerContext - Context handler to keep state for end page active incase of browser or go back button
 *
 * BackButton - Allows navigation to previous page or step with prop handling
 */
import Header from "../components/Header";
import Footer from "../components/Footer";
import criteria from "../criteria.json";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useUserAnswers } from "@/components/UserAnswerContext";
import BackButton from "@/components/BackButton";

function Question1() {
  // React router navigation hook
  const nav = useNavigate();

  // Retrieve question data for question with id 1 from the criteria JSON
  // Spreadsheet location - Start B2
  var questionData = criteria.Questions.find((q) => q.id === 1);

  // Destructure function from UserAnswerContext to manage state for end page
  const { setIsSECRequired } = useUserAnswers();

  // Define main content and store question title from retrived question data
  let questionTitle = questionData.question;

  let content = (
    <>
      {/* Back button that navigates to previous page, in this case the start */}
      <div className="flex flex-auto items-center">
        <BackButton
          onClick={() => {
            nav("/");
          }}
        />
      </div>

      {/* Main content displaying question and options */}
      <main className="flex flex-col min-h-auto bg-white p-4 rounded-md">
        <h1 className="text-2xl font-semibold mb-4 text-left">
          {questionTitle}
        </h1>
        <section>
          {/* List of options provided from JSON */}
          {/* Spreadsheet location - Start C2 */}
          <span className="text-xl font-semibold">
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
      </main>

      {/* Main buttons for user's answer */}
      <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
        {/* Yes answer marks SEC required and navigates to end page */}
        <Button
          className="btn-primary"
          onClick={() => {
          {/* Spreadsheet location - Start F2 */}
          setIsSECRequired(true);
          nav("/end");
          }}
        >
          Yes
        </Button>
        {/* No answer redirects to main routes page */}
        {/* Spreadsheet location - Start B3 */}
        <Button className="btn-secondary" onClick={() => nav("/routes")}>
          No
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

export default Question1;
