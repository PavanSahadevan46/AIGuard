import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronLeft, Ghost } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import criteria from "../criteria.json";
import { Button } from "@/components/ui/button";
import { useRouteCompletion } from "../components/RouteCompletionContext";
import { useOralDosageVal } from "../components/OralDosageValContext";
import { useUserAnswers } from "@/components/UserAnswerContext";
import BackButton from "@/components/BackButton";

function Inhaled() {
  const inhaledData = criteria.inhaledRoute;
  const [step, setStep] = useState("otherGCCheck");
  const { markRouteDone } = useRouteCompletion();
  const { setIsSECRequired } = useUserAnswers();

  const { register, handleSubmit, reset } = useForm();

  const nav = useNavigate();

  const { dailyDosageVal } = useOralDosageVal();

  const calculateWithOtherTreatment = (formdata) => {
    const results = Object.values(formdata.inhaled);
    const withOtherTreatmentVal = inhaledData.map(
      (item) => item.withOtherTreatmentVal
    );

    const withTotal = results.reduce((acc, value, i) => {
      return acc + value / withOtherTreatmentVal[i] + dailyDosageVal;
    }, 0);

    // console.log(withTotal);
    console.log("value from context: " + dailyDosageVal);

    return Math.trunc(withTotal);
  };

  const calculateWithOutOtherTreatment = (formdata) => {
    const results = Object.values(formdata.inhaled);
    const withOutOtherTreatmentVal = inhaledData.map(
      (item) => item.withoutOtherTreatmentVal
    );

    const withoutTotal = results.reduce((acc, value, i) => {
      return acc + value / withOutOtherTreatmentVal[i] + dailyDosageVal;
    }, 0);
    // console.log(withoutTotal);
    return Math.trunc(withoutTotal);
  };

  const onSubmit = (formdata) => {
    // console.log(formdata);
    let total;

    if (
      step === "usingInhalersWithOtherGC" ||
      step === "usingInhalersWithoutOtherGC"
    ) {
      const hasOtherGC = step === "usingInhalersWithOtherGC";
      total = hasOtherGC
        ? calculateWithOtherTreatment(formdata)
        : calculateWithOutOtherTreatment(formdata);

      console.log(hasOtherGC ? "with other GC" : "without other GC");
      console.log(
        `${total >= 1 ? "Over" : "Below"} 1 ,` + "total dosage:" + total
      );

      if (total >= 1) {
        setIsSECRequired(true);
        nav("/end");
      } else {
        nav("/routes");
        markRouteDone("Inhaled");
      }
    }
  };

  let content;
  let questionTitle;

  const formContent = (
    <>
      <BackButton
        onClick={() => {
          setStep("otherGCCheck");
        }}
      />

      <div className="mx-auto max-w-4xl mt-3 px-4 ">
        <h1 className="text-2xl font-semibold text-left">
          Please enter the daily dose below
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto p-4 bg-white rounded-md float-left mt-5 w-full px-0.5"
        >
          <div className="space-y-4">
            {inhaledData.map((inh) => (
              <div key={inh.id} className="grid grid-cols-1 gap-3 ">
                <fieldset className="mb-2">
                  <label className="font-medium text-left rounded text-gray-800 text-xl border-gray-600 border-b-1">
                    {inh.glucocorticoid}
                  </label>
                </fieldset>
                {inh.branded_names && inh.branded_names.length > 0 ? (
                  <div className="text-base text-gray-600 font-bold">
                    <span>Common brand names: </span>
                    <span>{inh.branded_names.slice(0, 3).join(", ")}</span>
                    {inh.branded_names.length > 3 && (
                      <DropdownMenu>
                        <br></br>
                        <DropdownMenuTrigger className="ml-1 inline-flex items-center space-x-1 text-blue-600 underline cursor-pointer">
                          <span>More</span>
                          <ChevronDown className="w-4 h-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-1">
                          <DropdownMenuLabel>
                            Additional Brand Names
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {inh.branded_names.slice(3).map((brand, idx) => (
                            <DropdownMenuItem key={idx}>
                              {brand}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                ) : (
                  <span className="text-sm text-gray-600">No brand names</span>
                )}

                <div>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue=""
                    placeholder={"Total daily dose: " + inh.measurementUnit}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    {...register(`inhaled.${inh.id}`, {
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
      </div>
    </>
  );

  switch (step) {
    case "otherGCCheck":
      questionTitle =
        "Are the inhalers being used with any other form of glucocorticoid treatment?";
      content = (
        <>
          <BackButton
            onClick={() => {
              nav("/routes");
            }}
          />
          <h3 className="text-lg font-semibold border-l-sapphire border-6 border-transparent pl-2 mb-4  text-left">
            Please note the following question relates to the patient currently
            having glucocorticoids or has done so in the past 12 months
          </h3>
          <h1 className="text-xl font-semibold mb-6 text-left">
            {questionTitle}
          </h1>

          <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
            <Button
              className="btn-primary"
              onClick={() => {
                reset();
                setStep("usingInhalersWithOtherGC");
              }}
            >
              Yes
            </Button>
            <Button
              className="btn-secondary"
              onClick={() => {
                reset();
                setStep("usingInhalersWithoutOtherGC");
              }}
            >
              No
            </Button>
          </div>
        </>
      );
      break;
    case "usingInhalersWithOtherGC":
    case "usingInhalersWithoutOtherGC":
      content = formContent;
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

export default Inhaled;
