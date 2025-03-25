import Header from "../components/Header";
import Footer from "../components/footer";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import criteria from "../criteria.json";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRouteCompletion } from "../components/RouteCompletionContext";
import { useOralDosageVal } from "../components/OralDosageValContext";

function Oral() {
  const nav = useNavigate();
  const questionData = criteria.Questions.find((q) => q.id === 3);
  const oralData = criteria.oralRoute;
  const dexOptions = oralData.find((q) => q.id === 5);
  const { markRouteDone } = useRouteCompletion();
  const { dailyDosageVal, setDailyDosageVal } = useOralDosageVal();

  const [step, setStep] = useState("initialQuestion");

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      continuous: {},
    },
  });

  const calculateContinuous = (formdata) => {
    const contResults = Object.values(formdata.continuous);
    const continuousValues = oralData.map((item) => item.continuousValue);

    const total = contResults.reduce((acc, value, i) => {
      return acc + value / continuousValues[i];
    }, 0);

    return total;
  };

  const onSubmit = (formdata) => {
    if (step === "continuousDosage") {
      const contTotal = calculateContinuous(formdata);
      setDailyDosageVal(contTotal);
      console.log(dailyDosageVal);
      if (contTotal >= 1) {
        console.log(contTotal + " over 1");
        nav("/sec");
      } else {
        console.log(contTotal + " under 1");
        nav("/routes");
        markRouteDone("Oral");
      }
    }
  };

  let content;
  let questionTitle;

  const continuousFormContent = (
    <>
      <div className="flex flex-auto items-center">
        <Button
          variant="Ghost"
          onClick={() => {
            setStep("continuousCheck");
          }}
        >
          <ChevronLeft className="" />
          Go Back
        </Button>
      </div>
      <h1 className="text-xl font-semibold mb-4 text-center">
        Continuous: Please enter the daily dosage below
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-4 bg-white rounded-md shadow mt-4 w-full"
      >
        <div className="space-y-4">
          {oralData.map((oral) => (
            <div
              key={oral.id}
              className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center"
            >
              <label className="font-medium text-gray-700 sm:col-span-1">
                {oral.glucocorticoid}
              </label>
              <div className="sm:col-span-2">
                <input
                  type="number"
                  step="0.01"
                  placeholder={"Total daily dose: " + oral.measurementUnit}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  {...register(`continuous.${oral.id}`, {
                    setValueAs: (value) => {
                      return value === "" ? 0 : Number(value);
                    },
                  })}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 text-center">
          <Button className="btn-cta" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </>
  );

  switch (step) {
    case "initialQuestion":
      questionTitle = questionData.question;
      content = (
        <>
          <div className="flex flex-auto items-center">
            <Button
              variant="Ghost"
              onClick={() => {
                nav("/routes");
              }}
            >
              <ChevronLeft />
              Go Back
            </Button>
          </div>
          <h1 className="text-xl font-semibold mb-4 text-center">
            {questionTitle}
          </h1>
          <div className="max-w-md mx-auto p-4 bg-white rounded-md mt-4 w-full">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="btn-primary"
                onClick={() => {
                  setStep("intermittentCheck");
                }}
              >
                Yes
              </Button>
              <Button
                className="btn-secondary"
                onClick={() => {
                  reset();
                  setStep("continuousDosage");
                }}
              >
                No
              </Button>
            </div>
          </div>
        </>
      );
      break;

    case "intermittentCheck":
      questionTitle =
        "Has the patient had 3 or more courses in total of any of the following for at least seven days within the past 12 months?";
      content = (
        <>
          <div className="flex flex-auto items-center">
            <Button
              variant="Ghost"
              onClick={() => {
                setStep("initialQuestion");
              }}
            >
              <ChevronLeft className="" />
              Go Back
            </Button>
          </div>
          <h1 className="text-xl font-semibold mb-4 text-center">
            {questionTitle}
          </h1>
          <div className="max-w-md mx-auto p-4 bg-white rounded-md border mt-4 w-full">
            <ul className="list-disc pl-6 space-y-2 mb-6">
              {oralData.map((oral, index) => (
                <li key={index} className="text-gray-700">
                  {oral.glucocorticoid} {oral.intermittentDosage}
                </li>
              ))}
            </ul>
          </div>
          <div className="max-w-md mx-auto p-4 bg-white rounded-md mt-4 w-full">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="btn-primary"
                onClick={() => {
                  console.log("needs sec from intermittent");
                  nav("/sec");
                }}
              >
                Yes
              </Button>
              <Button
                className="btn-secondary"
                onClick={() => {
                  setStep("dexamethasoneCheck");
                }}
              >
                No
              </Button>
            </div>
          </div>
        </>
      );
      break;

    case "dexamethasoneCheck":
      questionTitle =
        "Has the patient had (or is due to have) intermittent courses of dexamethasone for either of the following?";
      content = (
        <>
          <div className="flex flex-auto items-center">
            <Button
              variant="Ghost"
              onClick={() => {
                setStep("intermittentCheck");
              }}
            >
              <ChevronLeft className="" />
              Go Back
            </Button>
          </div>
          <h1 className="text-xl font-semibold mb-4 text-center">
            {questionTitle}
          </h1>
          <div className="max-w-md mx-auto p-4 bg-white rounded-md border mt-4 w-full">
            <ul className="list-disc pl-6 space-y-2 mb-6">
              {dexOptions.subOptions.map((oral, index) => (
                <li key={index} className="text-gray-800">
                  {oral}
                </li>
              ))}
            </ul>
          </div>
          <div className="max-w-md mx-auto p-4 bg-white rounded-md mt-4 w-full">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="btn-primary"
                onClick={() => {
                  nav("/sec");
                }}
              >
                Yes
              </Button>
              <Button
                className="btn-secondary"
                onClick={() => {
                  setStep("continuousCheck");
                  console.log(dailyDosageVal);
                }}
              >
                No
              </Button>
            </div>
          </div>
        </>
      );
      break;

    case "continuousCheck":
      questionTitle =
        "Has the patient had at least one continuous course (at least 4 weeks) of oral steroids in the past year?";
      content = (
        <>
          <div className="flex flex-auto items-center">
            <Button
              variant="Ghost"
              onClick={() => {
                setStep("dexamethasoneCheck");
              }}
            >
              <ChevronLeft className="" />
              Go Back
            </Button>
          </div>
          <h1 className="text-xl font-semibold mb-4 p-4 text-wrap">
            {questionTitle}
          </h1>
          <div className="max-w-md mx-auto p-4 bg-white rounded-md mt-4 w-full">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="btn-primary"
                onClick={() => {
                  reset();
                  setStep("continuousDosage");
                }}
              >
                Yes
              </Button>
              <Button
                className="btn-secondary"
                onClick={() => {
                  nav("/routes");
                }}
              >
                No
              </Button>
            </div>
          </div>
        </>
      );
      break;

    case "continuousDosage":
      content = continuousFormContent;
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

export default Oral;
