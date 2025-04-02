import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import criteria from "../criteria.json";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRouteCompletion } from "../components/RouteCompletionContext";
import { useOralDosageVal } from "../components/OralDosageValContext";
import { useUserAnswers } from "@/components/UserAnswerContext";


import React from "react";

function Oral() {
  const nav = useNavigate();
  const questionData = criteria.Questions.find((q) => q.id === 3);
  const oralData = criteria.oralRoute;
  const dexOptions = oralData.find((q) => q.id === 5);
  const { markRouteDone } = useRouteCompletion();
  const { dailyDosageVal, setDailyDosageVal } = useOralDosageVal();
  const { setAnswers, setIsSECRequired, resetAnswers} = useUserAnswers();

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
      const contTotal = Math.trunc(calculateContinuous(formdata));
      setDailyDosageVal(contTotal);
      resetAnswers()
      setAnswers(prev => ({
        ...prev,
        continuousCheck: {
          dailyDosageVal: contTotal,
        },
      }));

      console.log(dailyDosageVal);
      if (contTotal >= 1) {
        console.log(contTotal + " over 1");
        setIsSECRequired(true);
        nav("/end");
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
      <h1 className="text-2xl font-semibold mb-4 text-left">
        Continuous: Please enter the daily dosage below
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto p-6 float-left"
      >
        {oralData.map((oral) => (
          <div
            key={oral.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center border-b pt-2 pb-2"
          >
            <label className="text-gray-800 text-xl tracking-wide">
              {oral.glucocorticoid}
            </label>
            <input
              type="number"
              step="0.01"
              placeholder={`Total daily dose: ${oral.measurementUnit}`}
              className="w-full px-5 py-3 border-2 border-gray-200 rounded-lg 
                   focus:outline-none focus:ring-3 focus:ring-blue-400 
                   focus:border-transparent transition-all duration-300 
                   hover:border-blue-300 text-gray-700 placeholder-gray-500"
              {...register(`continuous.${oral.id}`, {
                setValueAs: (value) => (value === "" ? 0 : Number(value)),
              })}
            />
          </div>
        ))}
        <div className="pt-6 text-center">
          <Button
            className="btn-cta px-8 py-3 text-xl transition-all rounded-none duration-300 mt-4"
            type="submit"
          >
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
          <h1 className="text-2xl font-semibold mb-4 text-left">
            {questionTitle}
          </h1>
          <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
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
          <h1 className="text-2xl font-semibold mb-4 text-left">
            {questionTitle}
          </h1>
          <div className="mx-auto p-4 bg-white w-full">
            <ul className="list-disc list-inside space-y-2 mb-6">
              {oralData.map((oral, index) => (
                <li key={index} className="text-gray-800 p-0.5 text-xl">
                  {oral.glucocorticoid} {oral.intermittentDosage}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
            <Button
              className="btn-primary"
              onClick={() => {
                console.log("needs sec from intermittent");
                resetAnswers();
                setAnswers(prev => ({
                  ...prev,
                  intermittentCheck: {
                    question: questionTitle,
                    answer: 'Yes',
                  },
                }));
                setIsSECRequired(true);
                nav("/end");

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
          <h1 className="text-2xl font-semibold mb-4 text-left">
            {questionTitle}
          </h1>
          <div className="mx-auto p-4 bg-white w-full">
            <ul className="list-disc list-inside space-y-2 mb-6">
              {dexOptions.subOptions.map((oral, index) => (
                <li key={index} className="text-gray-800 p-0.5 text-xl">
                  {oral}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
            <Button
              className="btn-primary"
              onClick={() => {
                resetAnswers();
                setAnswers(prev => ({
                  ...prev,
                  intermittentCheck: {
                    question: questionTitle,
                    answer: 'Yes',
                  },
                }));
                setIsSECRequired(true);
                nav("/end");
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
          <h1 className="text-2xl font-semibold mb-4 text-left">
            {questionTitle}
          </h1>
          <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
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
