import Header from "../components/Header";
import criteria from "../criteria.json";
import Button from "../components/Button";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import RouteContainer from "../components/RouteContainer";
import { useRouteCompletion } from "../components/RouteCompletionContext";

function SteroidRoutes() {
  const questionData = criteria.Questions.find((q) => q.id === 2);
  const [currentQuestion, setCurrentQuestion] = useState(questionData.question);
  const nav = useNavigate();
  const [showRoutes, setShowRoutes] = useState(false);
  const { hasVisitedRoutePage, setHasVisitedRoutePage } = useRouteCompletion();

  useEffect(() => {
    if (hasVisitedRoutePage) {
      setCurrentQuestion(
        "Please enter the glucocorticoids taken in order of the routes in the order shown"
      );
      setShowRoutes(true);
    }
  }, [hasVisitedRoutePage]);

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-auto bg-white">
        <h1 className="text-xl font-semibold mb-4 text-center">
          {currentQuestion}
        </h1>
        {showRoutes ? ( // if user selected yes to question 2, hide buttons and render routes else render buttons
          <RouteContainer />
        ) : (
          <div className="mt-4 flex flex-col sm:flex-row justify-center gap-8 w-2xl p-6 mx-auto">
            <Button
              btnText="Yes"
              onClick={() => {
                setCurrentQuestion(
                  "Please enter the glucocorticoids taken in order of the routes in the order shown"
                );
                setShowRoutes(true);
                setHasVisitedRoutePage(true);
              }}
            />
            <Button btnText="No" onClick={() => nav("/nosec")} />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default SteroidRoutes;
