import Header from "../components/Header";
import Footer from "../components/Footer";
import criteria from "../criteria.json";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRouteCompletion } from "../components/RouteCompletionContext";

import { useUserAnswers } from "@/components/UserAnswerContext";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BackButton from "@/components/BackButton";

function Topical() {
  const firstQuestion = criteria.Questions.find((q) => q.id === 7).question;
  const secondQuestion = criteria.Questions.find((q) => q.id === 8).question;
  const topicalData = criteria.topicalRoute;
  const topicalRate = criteria.topicalRatesOfAbsorption;
  const topicalAdditional = criteria.absorptionAdditionalInfo;
  const nav = useNavigate();
  const { markRouteDone } = useRouteCompletion();
  const [step, setStep] = useState("initialQuestion");

  const { setIsSECRequired } = useUserAnswers();

  let content;
  let questionTitle = firstQuestion;

  const potencyInfo = (
    <>
      <div className="text-sm text-gray-600 font-bold">
        <span>Example of potent glucocorticoids: </span>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-normal font-bold">
                Generic Name
              </TableHead>
              <TableHead className="whitespace-normal font-bold">
                Examples of trade names including steroids in combination with
                other medicines
              </TableHead>
              <TableHead className="whitespace-normal font-bold">
                Potency
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topicalData.map((route) => (
              <TableRow key={route.id}>
                <TableCell className="whitespace-normal">
                  {route.name}
                </TableCell>
                <TableCell className="whitespace-normal">
                  {route.tradeNames ? route.tradeNames.join(", ") : "N/A"}
                </TableCell>
                <TableCell className="whitespace-normal">
                  {route.potency}
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
          <BackButton
            onClick={() => {
              nav("/routes");
            }}
          />
          <h1 className="text-2xl font-semibold mb-4 text-left">
            {questionTitle}
          </h1>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li className="text-slate-700 p-0.5 text-xl">
              More than 30g a <span className="underline">month</span> to rectal
              or vaginal areas, or
            </li>
            <li className="text-slate-700 p-0.5 text-xl">
              More than 200g a <span className="underline">week</span> to any
              other area
            </li>
          </ul>
          {potencyInfo}
          <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
            <Button
              className="btn-primary"
              onClick={() => {
                setIsSECRequired(true);
                nav("/end");
              }}
            >
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
          <BackButton
            onClick={() => {
              setStep("initialQuestion");
            }}
          />
          <h1 className="text-2xl font-semibold mb-4 text-left">
            {questionTitle}
          </h1>
          <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
            <Button
              className="btn-primary"
              onClick={() => {
                setIsSECRequired(true);
                nav("/end");
              }}
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
    case "noAdvice":
      content = (
        <>
          <BackButton
            onClick={() => {
              setStep("otherCheck");
            }}
          />
          <section>
            <p className="text-gray-800 p-0.5 text-xl">
              It is <strong> unlikely</strong> that the patient
              needs an steroid emergency card.
            </p>

            <p className="text-gray-800 p-0.5 text-xl">
            <strong>However</strong> do consider that
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
            <strong>Additionally:</strong>
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
