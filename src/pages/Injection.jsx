import Header from "../components/Header";
import Footer from "../components/footer";
import criteria from "../criteria.json";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronLeft, Ghost } from "lucide-react";
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
    let yesCount = 0;
    injData.forEach((inj) => {
      const q1Answer = formdata[`inj_${inj.id}_question1`];
      const q2Answer = formdata[`inj_${inj.id}_question2`];

      if (q1Answer || q2Answer === true) {
        yesCount++;
      }
    });

    if (yesCount >= 1) {
      console.log("1 or more answers have been yes and patient needs sec");
      nav("/sec");
    } else {
      console.log("No answers answered yes so patient does not need sec");
      nav("/routes");
      markRouteDone("Injection");
    }
  }

  let content;
  let questionTitle;

  const injectionFormContent = (
    <>
      <div className="flex flex-auto items-center">
        <Button
          variant="Ghost"
          onClick={() => {
            setStep("routeCheck");
          }}
        >
          <ChevronLeft className="" />
          Go Back
        </Button>
      </div>
      <h1 className="text-xl font-semibold mb-4 text-center">
        Please select all that apply
      </h1>
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
              <div className="space-y-5">
                <div className="flex items-center gap-x-8 space-y-1">
                  <input
                    type="checkbox"
                    {...register(`inj_${inj.id}_question1`)}
                  />
                  <label className="font-medium text-gray-700">
                    {inj.question1}
                  </label>
                </div>
                <div className="flex items-center gap-x-8 space-y-1">
                  <input
                    type="checkbox"
                    {...register(`inj_${inj.id}_question2`)}
                  />
                  <label className="font-medium text-gray-700">
                    {inj.question2}
                  </label>
                </div>
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
    case "routeCheck":
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
              <ChevronLeft className="" />
              Go Back
            </Button>
          </div>
          <h1 className="text-xl font-semibold mb-4 text-center">
            {questionTitle}
          </h1>
          <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-4 max-w-md w-full mx-auto">
            <Button
              className="btn-primary"
              onClick={() => {
                setStep("injectionQuestions");
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

    case "injectionQuestions":
      content = injectionFormContent;
      break;

    default:
      content = <></>;
      questionTitle = "";
  }

  return (
    <div className="grid grid-cols-1 bg-white">
      <Header />
      <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-6">{content}</div>
      <Footer />
    </div>
  );
}

export default Injection;
