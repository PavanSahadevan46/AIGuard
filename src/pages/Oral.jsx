import Header from "../components/Header";
import Footer from "../components/footer";
import Button from "../components/Button";
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      continuous: {},
      intermittent: {},
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

  const continuousFormContent = (
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
                  valueAsNumber: true,
                  required: true,
                })}
              />
            </div>
            {errors.continuous && errors.continuous[oral.id] && (
              <span className="text-red-500 text-sm">Required</span>
            )}
          </div>
        ))}
      </div>

      <div className="pt-6 text-center">
        <Button type="submit" btnText="Submit" />
      </div>
    </form>
  );

  let content;
  let questionTitle;

  switch (step) {
    case "initialQuestion":
      questionTitle = questionData.question;
      content = (
        <div className="mt-4 flex flex-col sm:flex-row justify-center gap-8 w-2xl p-6 mx-auto">
          <Button
            btnText="Yes"
            onClick={() => {
              setStep("intermittentCheck");
              reset();
            }}
          />
          <Button
            btnText="No"
            onClick={() => {
              setStep("continuousDosage");
              reset();
            }}
          />
        </div>
      );
      break;

    case "intermittentCheck":
      questionTitle = "Has the patient had 3 or more courses in total of any of the following for at least seven days within the past 12 months?";
      content = (
        <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow mt-4 w-full">
          <ul className="list-disc pl-6 space-y-2 mb-6">
            {oralData.map((oral, index) => (
              <li key={index} className="text-gray-700">
                {oral.glucocorticoid} {oral.intermittentDosage}
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              btnText="Yes"
              onClick={() => {
                console.log("needs sec from intermittent");
                nav("/sec");
              }}
            />
            <Button
              btnText="No"
              onClick={() => {
                setStep("dexamethasoneCheck");
              }}
            />
          </div>
        </div>
      );
      break;

    case "dexamethasoneCheck":
      questionTitle = "Has the patient had (or is due to have) intermittent courses of dexamethasone for either of the following?";
      content = (
        <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow mt-4 w-full">
          <ul className="list-disc pl-6 space-y-2 mb-6">
            {dexOptions.subOptions.map((oral, index) => (
              <li key={index} className="text-gray-700">
                {oral}
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              btnText="Yes"
              onClick={() => {
                nav("/sec");
              }}
            />
            <Button
              btnText="No"
              onClick={() => {
                setStep("continuousCheck");
                console.log(dailyDosageVal);
              }}
            />
          </div>
        </div>
      );
      break;

    case "continuousCheck":
      questionTitle = "Has the patient had at least one continuous course (at least 4 weeks) of oral steroids in the past year?";
      content = (
        <div className="max-w-md mx-auto p-4 bg-white rounded-md mt-4 w-full">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              btnText="Yes"
              onClick={() => {
                setStep("continuousDosage");
              }}
            />
            <Button
              btnText="No"
              onClick={() => {
                nav("/routes");
              }}
            />
          </div>
        </div>
      );
      break;

    case "continuousDosage":
      questionTitle = "Please enter the daily dosage below";
      content = continuousFormContent;
      break;

    default:
      content = <></>;
      questionTitle = "";
  }

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-auto bg-white">
        <h1 className="text-xl font-semibold mb-4 text-center">
          {questionTitle}
        </h1>
        {content}
        <Footer />
      </div>
    </>
  );
}

export default Oral;
