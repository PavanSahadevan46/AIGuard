/**
 * Start page component
 *
 * This component is the main component users see when first launching the application.
 * It displays critical information regarding the application and provides context for it's usage.
 *
 * @author Pavan Sahadevan
 * @version 1.0
 * Developed as a proof of concept for NHS England and as a final year project for CI601 from the University of Brighton.
 */

/**
 * Dependencies & Components :
 * Button - Shadcn UI component where used, has custom styling
 *  btn-primary,btn-secondary & btn-cta. These can be found in the index.css file
 *
 * Header & Footer - Common components for the application
 *
 * React Router Dom (useNavigate) - Client-side routing via React-router-dom
 *
 * React Router Dom (Link) - A <a href> wrapper that additionally provides navigation via client-side routing
 */
import { Button } from "@/components/ui/button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Start() {
  // React router navigation hook
  const nav = useNavigate();

  // Define main content of page
  let content = (
    <>
      <main>
        {/* Main Title */}

        <h1 className=" text-3xl font-bold text-left mb-8">
          Identifying patients at risk of adrenal insufficiency{" "}
        </h1>

        {/* Warning message, do not remove as of version 1.0 */}

        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <h2 className="text-lg font-bold ">
            This tool is currently in development and should not be used to
            decide other than for testing purposes.
          </h2>
        </div>

        {/* Informational Section */}

        <section className="space-y-8 mb-8">
          <p className="text-lg text-slate-700 text-left">
            This tool is designed to support with the decision as to whether
            patients are at risk of <strong>tertiary</strong>{" "}
            adrenal insufficiency (ie significant HPA axis suppression from
            taking exogenous steroids), and if so gives guidance on what actions
            should be taken, including carrying a{" "}
            <Link
              className="text-blue-600 hover:text-blue-800 underline font-medium"
              to="https://www.england.nhs.uk/publication/national-patient-safety-alert-steroid-emergency-card-to-support-early-recognition-and-treatment-of-adrenal-crisis-in-adults/"
            >
              Steroid Emergency Card
            </Link>{" "}
            and whether there is a need to follow{" "}
            <Link
              className="text-blue-600 hover:text-blue-800 underline font-medium"
              to="https://www.endocrinology.org/media/4169/ai-and-exogenous-steroids_patient-information-sheet.pdf"
            >
              Sick Day Rules.
            </Link>{" "}
          </p>

          {/* Reference to the supporting research paper */}

          <p className="text-lg text-slate-700 text-left">
            The tool is based on the paper{" "}
            <Link
              className="text-blue-600 hover:text-blue-800 underline font-medium"
              to="https://www.endocrinology.org/media/4091/spssfe_supporting_sec_-final_10032021-1.pdf"
            >
              Exogenous steroids treatment in adults. Adrenal insufficiency and
              adrenal crisis-who is at risk and how should they be managed
              safely.
            </Link>
          </p>

          {/* Explanation regarding primary and secondary insufficiency */}

          <p className="text-lg text-slate-700 text-left">
            It is not necessary to use this tool for{" "}
            <strong>primary</strong> or{" "}
            <strong>secondary</strong> insufficiency, as all
            of these patients will need a Steroid Emergency Card and to follow
            Sick Day Rules.
          </p>

          {/* Additional guidance in an informational message box */}

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <p className="text-lg text-slate-700 text-left">
              Please note that this a support tool, and any patients taking
              glucocorticoids presenting with acute illness, trauma or for
              surgery should be{" "}
              <span className="italic">considered clinically</span> as to
              whether they may be at risk of having, or developing, adrenal
              crisis and appropriate actions taken.
            </p>
          </div>

          {/* Note regarding the tool's question flow */}

          <p className="text-lg text-slate-700 text-left">
            For quickness of use the tool will not ask any further questions
            once a threshold is reached where a steroid emergency card is
            recommended. It should be kept in mind that if a patient is taking
            glucocorticoids that have not yet been entered, their risks will be
            increased.
          </p>
        </section>

        {/* Button to start tool  */}
        <Button className="btn-cta" onClick={() => nav("/q1")}>
          Start
        </Button>
      </main>
    </>
  );

  // Render the page with a standard layout that includes a header and footer

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

export default Start;
