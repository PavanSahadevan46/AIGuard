import { ChevronLeft } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/footer";
import criteria from "../criteria.json";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useRouteCompletion } from "../components/RouteCompletionContext";

function Rectal() {
  const questionData = criteria.Questions.find((q) => q.id === 9);
  const { markRouteDone } = useRouteCompletion();
  const nav = useNavigate();
  let content;
  let questionTitle = questionData.question;
  let options = questionData.options;
  content = (
    <>
      <div className="flex flex-auto items-center">
        <Button
          variant="Ghost"
          onClick={() => {
            nav("/routes");
          }}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Go Back
        </Button>
      </div>
      <h1 className="text-2xl font-semibold mb-4 text-left">{questionTitle}</h1>
      <p>
        <ul className="list-disc list-inside space-y-2 mb-6">
          {options.map((option, index) => (
            <li key={index} className="text-gray-800 p-0.5 text-xl">
              {option}
            </li>
          ))}
        </ul>
      </p>
      <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-4 max-w-md w-full mx-auto">
        <Button className="btn-primary" onClick={() => nav("/sec")}>
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
