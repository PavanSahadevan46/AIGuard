import Header from "../components/Header";
import Footer from "../components/Footer";
import criteria from "../criteria.json";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useRouteCompletion } from "../components/RouteCompletionContext";
import { useUserAnswers } from "@/components/UserAnswerContext";
import BackButton from "@/components/BackButton";
import { useState } from "react";

function Rectal() {
  const questionData = criteria.Questions.find((q) => q.id === 9);
  const { markRouteDone } = useRouteCompletion();
  const nav = useNavigate();
  const { setIsSECRequired } = useUserAnswers();
  const [step, setStep] = useState("initialQuestion");

  let content;
  let questionTitle = questionData.question;
  let options = questionData.options;

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
          <ul className="list-disc list-inside space-y-2 mb-6">
            {options.map((option, index) => (
              <li key={index} className="text-slate-700 p-0.5 text-xl">
                {option}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col md:flex-row float-left gap-4 max-w-md w-full mx-auto">
            <Button
              className="btn-primary"
              onClick={() => {
                setStep("yesAdvice");
              }}
            >
              Yes
            </Button>
            <Button
              className="btn-secondary"
              onClick={() => {
                nav("/routes");
                markRouteDone("Rectal");
              }}
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
          <section className="mt-4">
            <h1 className="text-2xl font-semibold mb-4 text-left">
              Please review the following:{" "}
            </h1>
            <p className="text-slate-700 p-0.5 text-lg">
              There are some reports of these rectal glucocorticoids causing
              adrenal insufficiency when used for inflammatory bowel disease.
            </p>
            <p className="text-slate-700 p-0.5 text-lg">
              Consider usage of these and any other concomitant steroid use to
              decide if a Steroid Emergency Card is needed.
            </p>
            <div className="mt-7 flex flex-col md:flex-row float-left gap-4 max-w-md w-full mx-auto">
              <Button
                className="btn-secondary"
                onClick={() => {
                  markRouteDone("Rectal");
                  nav("/routes");
                }}
              >
                Back to routes
              </Button>
            </div>
          </section>
        </>
      );
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

export default Rectal;
