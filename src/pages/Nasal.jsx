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
  const questionData = criteria.Questions.find((q) => q.id === 6);
  const nav = useNavigate();
  const { markRouteDone } = useRouteCompletion();
  const [step, setStep] = useState("initialQuestion");
  const { setIsSECRequired } = useUserAnswers();

  let content;
  let questionTitle = questionData.question;

  switch (step) {
    case "initialQuestion":
      content = (
        <>
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
                A steroid emergency card may be appropriate
                and for 12 months after stopping
              </strong>
              , particularly if in combination with other glucocorticoids. 
            </p>

            <p className="text-gray-800 p-0.5 mt-3 text-xl">
            <strong>Consider</strong> whether patient needs
              cover with hydrocortisone if admitted to hospital unwell or
              invasive procedure.
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
              It is <strong>unlikely</strong> that a steroid
              emergency card is needed.
            </p>
            <p className="text-gray-800 p-0.5 mt-3 text-xl">
            <strong>However</strong> do consider the risk if
              in combination with other glucocorticoids.
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
