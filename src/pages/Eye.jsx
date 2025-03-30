import Header from "../components/Header";
import Footer from "../components/Footer";
import criteria from "../criteria.json";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useRouteCompletion } from "../components/RouteCompletionContext";


function Eye() {
  const nav = useNavigate();
  const { markRouteDone } = useRouteCompletion();


  let content;
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

      <h1 className="text-2xl font-semibold mb-4 text-left">
        Please review the following
      </h1>
      <p className="text-gray-800 text-xl p-0.2">
        If the patient is only on steroid eye drops, HPA axis suppression is
        unlikely.
      </p>
      <p className="text-gray-800 text-xl p-0.2">
        If a patient is taking other steroids by other routes then total
        exposure needs to be considered.
      </p>
      <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
        <Button
          className="btn-secondary"
          onClick={() => {
            nav("/routes");
            markRouteDone("Eye");
          }}
        >
          Back to routes
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

export default Eye;
