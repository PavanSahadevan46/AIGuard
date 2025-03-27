import { ChevronLeft } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import criteria from "../criteria.json";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRouteCompletion } from "../components/RouteCompletionContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function Topical() {
  const firstQuestion = criteria.Questions.find((q) => q.id === 7).question;
  const secondQuestion = criteria.Questions.find((q) => q.id === 8).question;
  const topicalData = criteria.topicalRoute;
  const topicalRate = criteria.topicalRatesOfAbsorption;
  const topicalAdditional = criteria.absorptionAdditionalInfo;
  const nav = useNavigate();
  const { markRouteDone } = useRouteCompletion();
  const [step, setStep] = useState("initialQuestion");

  let content;
  let questionTitle = firstQuestion;

  const potencyInfo = (
    <>
      <div className="text-sm text-gray-600 font-bold">
        <span>Example of potent glucocorticoids: </span>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Concentration</TableHead>
              <TableHead>Potency</TableHead>
              <TableHead>Names</TableHead>
              <TableHead>Including</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topicalData.map((route) => (
              <TableRow key={route.id}>
                <TableCell>{route.name}</TableCell>
                <TableCell>{route.concentration}</TableCell>
                <TableCell>{route.potency}</TableCell>
                <TableCell>
                  {route.names ? route.names.join(", ") : "N/A"}
                </TableCell>
                <TableCell>
                  {route.including ? route.including.join(", ") : "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );

  switch (step) {
    case "initialQuestion":
      content = (
        <>
          <div className="flex flex-auto">
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
          {potencyInfo}  {/* need to see if needed at all */}
          <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
            <Button className="btn-primary" onClick={() => nav("/sec")}>
              Yes
            </Button>
            <Button
              className="btn-secondary"
              onClick={() => setStep("otherCheck")}
            >
              No
            </Button>
          </div>
        </>
      );
      break;

    case "otherCheck":
      questionTitle = secondQuestion;
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
            <Button className="btn-primary" onClick={() => nav("/sec")}>
              Yes
            </Button>
            <Button
              className="btn-secondary"
              onClick={() => setStep("otherCheck")}
            >
              No
            </Button>
          </div>
        </>
      );
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
          <section>
            <h1 className="text-2xl font-semibold mb-4 text-left">
              Please review the following:
            </h1>

            <p className="text-gray-800 p-0.5 text-xl">
              It is<span className="font-bold"> unlikely</span> that the patient
              needs an steroid emergency card.
            </p>

            <p className="text-gray-800 p-0.5 text-xl">
              <span className="font-bold">However</span> do consider that
              systemic absorption varies depending on the area of application.
            </p>
            <div className="grid grid-cols-2 gap-2 mt-5">
              {topicalRate.map((rate) => (
                <div
                  key={rate.location}
                  className=" border-b border-gray-200 flex flex-col"
                >
                  <p className="text-xl">
                    <strong>{rate.location}: </strong>
                    {rate.absorptionRate} absorption rate
                  </p>
                </div>
              ))}
            </div>
            <p className="text-gray-800 p-0.5 mt-3 text-base">
              <span className="font-bold">Additionally: </span>
              {topicalAdditional}
            </p>
          </section>
          <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-4 max-w-md w-full mx-auto">
            <Button
              className="btn-primary"
              onClick={() => {
                nav("/routes");
                markRouteDone("Topical");
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

export default Topical;
