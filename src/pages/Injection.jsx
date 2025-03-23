import Header from "../components/Header";
import Footer from "../components/footer";
import criteria from "../criteria.json";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRouteCompletion } from "../components/RouteCompletionContext";

function Injection() {
  const injData = criteria.injectionRoute;
  const questionData = criteria.Questions.find((q) => q.id === 4);
  const nav = useNavigate();
  const { markRouteDone } = useRouteCompletion();
  const [step, setStep] = useState("routeCheck");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function onSubmit(formdata) {
    console.log(formdata);
    let needSec = false;
    injData.forEach((inj) => {
      const q1Answer = formdata[`inj_${inj.id}_question1`];
      const q2Answer = formdata[`inj_${inj.id}_question2`];

      if (q1Answer === "Yes") {
        console.log("q1 yes");
        needSec = true;
      } else if (q1Answer === "No") {
        console.log("q1 no");
      }

      if (q2Answer === "Yes") {
        console.log("q2 yes");
        needSec = true;
      } else if (q2Answer === "No") {
        console.log("q2 no");
      }
    });

    if (needSec) {
      console.log("need sec");
      nav("/sec");
    } else {
      console.log("no sec needed");
      nav("/routes");
      markRouteDone("Injection");
    }
  }

  const injectionFormContent = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto p-4 bg-white rounded-md shadow mt-4"
    >
      <div className="space-y-6">
        {injData.map((inj) => (
          <div key={inj.id} className="pb-4 border-b border-gray-200">
            <div className="mb-3">
              <h3 className="font-medium text-center rounded text-gray-800 text-lg">
                {inj.glucocorticoid}
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="font-medium text-gray-700 block mb-2">
                  {inj.question1}
                </label>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register(`inj_${inj.id}_question1`)}
                      value="Yes"
                      className="mr-2"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register(`inj_${inj.id}_question1`)}
                      value="No"
                      className="mr-2"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="font-medium text-gray-700 block mb-2">
                  {inj.question2}
                </label>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register(`inj_${inj.id}_question2`)}
                      value="Yes"
                      className="mr-2"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register(`inj_${inj.id}_question2`)}
                      value="No"
                      className="mr-2"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
            </div>
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
    case "routeCheck":
      questionTitle = questionData.question;
      content = (
        <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-4 max-w-md w-full mx-auto">
          <Button
            btnText="Yes"
            onClick={() => {
              setStep("injectionQuestions");
            }}
          />
          <Button
            btnText="No"
            onClick={() => {
              nav("/routes");
            }}
          />
        </div>
      );
      break;

    case "injectionQuestions":
      questionTitle = "Please select the glucocorticoid and answer the questions accordingly";
      content = injectionFormContent;
      break;

    default:
      content = <></>;
      questionTitle = "";
  }

  return (
    <div className="flex flex-col bg-white">
      <Header />
      <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-xl font-semibold mb-4 text-center">
          {questionTitle}
        </h1>
        {content}
      </div>
      <Footer />
    </div>
  );
}

export default Injection;