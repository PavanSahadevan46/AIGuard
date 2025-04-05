import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RouteContainer from "../components/RouteContainer";
import { Button } from "@/components/ui/button";
import { useRouteCompletion } from "../components/RouteCompletionContext";
import criteria from "../criteria.json";
import { useUserAnswers } from "@/components/UserAnswerContext";
import BackButton from "@/components/BackButton";

function SteroidRoutes() {
  const questionData = criteria.Questions.find((q) => q.id === 2);
  const {
    hasVisitedRoutePage,
    setHasVisitedRoutePage,
    completedRoutes,
    resetRoutes,
  } = useRouteCompletion();
  const nav = useNavigate();
  const { setIsSECRequired } = useUserAnswers();

  const [step, setStep] = useState("initialQuestion");

  useEffect(() => {
    if (hasVisitedRoutePage > 0) {
      setStep("enterRoutes");
    }
  }, [hasVisitedRoutePage]);

  let content;
  let questionTitle;

  switch (step) {
    case "initialQuestion":
      questionTitle = questionData.question;
      content = (
        <>
          <BackButton
            onClick={() => {
              nav("/q1");
            }}
          />
          <h1 className="text-2xl font-semibold mb-4 text-left">
            {questionTitle}
          </h1>
          <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
            <Button
              className="btn-primary"
              onClick={() => {
                setStep("enterRoutes");
                setHasVisitedRoutePage(true);
              }}
            >
              Yes
            </Button>
            <Button
              className="btn-primary"
              onClick={() => {
                setIsSECRequired(false);
                nav("/end");
              }}
            >
              No
            </Button>
          </div>
        </>
      );
      break;

    case "enterRoutes":
      questionTitle =
        "Please enter the glucocorticoids taken in the order of the routes shown";
      content = (
        <>
          <BackButton
            onClick={() => {
              setStep("initialQuestion");
            }}
          />
          <h1 className="text-2xl font-semibold mb-4 text-left">
            {questionTitle}
          </h1>
          {completedRoutes.length > 0 && (
            <div className="mt-4">
              <Button className="btn-secondary !w-40 " onClick={resetRoutes}>
                Refresh routes
              </Button>
            </div>
          )}
          <RouteContainer />
          {completedRoutes.length > 0 && (
            <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
              <Button
                className="btn-cta"
                onClick={() => {
                  setIsSECRequired(false);
                  nav("/end");
                }}
              >
                No more routes
              </Button>
            </div>
          )}
        </>
      );
      break;

    default:
      questionTitle = "";
      content = <></>;
      break;
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

export default SteroidRoutes;
