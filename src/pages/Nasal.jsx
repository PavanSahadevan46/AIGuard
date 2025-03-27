import { ChevronLeft } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import criteria from "../criteria.json";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRouteCompletion } from "../components/RouteCompletionContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function Nasal() {
  const questionData = criteria.Questions.find((q) => q.id === 6);
  const nasalData = criteria.nasalRoute;
  const nav = useNavigate();
  const { markRouteDone } = useRouteCompletion();
  const [step, setStep] = useState("initialQuestion");

  let content;
  let questionTitle = questionData.question;

  switch (step) {
    case "initialQuestion":
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
          <div className="flex flex-auto items-center">
            <Button
              variant="Ghost"
              onClick={() => {
                setStep("initialQuestion");
              }}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </div>
          <section>
            <h1 className="text-2xl font-semibold mb-4 text-left">
              Please review the following :
            </h1>

            <p className="text-gray-800 p-0.5 mt-3 text-xl">
              <span className="font-bold">
                A steroid emergency card may be appropriate
              </span>
              , particularly if in combination with other glucocorticoids.
            </p>

            <p className="text-gray-800 p-0.5 mt-3 text-xl">
              <span className="font-bold">Consider</span> whether patient needs
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
                nav("/sec");
                markRouteDone("Nasal");
              }}
            >
              SEC card
            </Button>
          </div>
        </>
      );
      break;
    case "noAdvice":
      content = (
        <>
          <div className="flex flex-auto items-center">
            <Button
              variant="Ghost"
              onClick={() => {
                setStep("initialQuestion");
              }}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </div>
          <h1 className="text-2xl font-semibold mb-4 text-left">
            Please review the following :
          </h1>
          <section>
            <p className="text-gray-800 p-0.5 mt-3 text-xl">
              It is <span className="font-bold">unlikely</span> that a steroid
              emergency card is needed.
            </p>
            <p className="text-gray-800 p-0.5 mt-3 text-xl">
              <span className="font-bold">However</span> do consider the risk if
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

{
  /* <Dialog>
<DialogTrigger asChild>
  <Button className="btn-primary">Yes</Button>
</DialogTrigger>
<DialogContent>
  <DialogHeader>
    <DialogTitle>Nasal glucocorticoids</DialogTitle>
    <DialogDescription>{yesAdvice}</DialogDescription>
  </DialogHeader>
  <DialogFooter>
    <Button className="btn-primary">O</Button>
  </DialogFooter>
</DialogContent>
</Dialog> */
}
