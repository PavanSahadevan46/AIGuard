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
import { ChevronDown } from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/footer";
import criteria from "../criteria.json";
import Button from "../components/Button";
import { useRouteCompletion } from "../components/RouteCompletionContext";
import { useOralDosageVal } from "../components/OralDosageValContext";

function Inhaled() {
  const questionData = criteria.Questions.find((q) => q.id === 5);
  const inhaledData = criteria.inhaledRoute;
  const [step, setStep] = useState("routeCheck");
  const { markRouteDone } = useRouteCompletion();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const nav = useNavigate();

  const calculateWithOtherTreatment = (formdata) => {
    const results = Object.values(formdata.inhaled);
    const withOtherTreatmentVal = inhaledData.map(
      (item) => item.withOtherTreatmentVal
    );

    const withTotal = results.reduce((acc, value, i) => {
      return acc + value / withOtherTreatmentVal[i];
    }, 0);

    console.log(withTotal);

    return withTotal;
  };

  const calculateWithOutOtherTreatment = (formdata) => {
    const results = Object.values(formdata.inhaled);
    const withOutOtherTreatmentVal = inhaledData.map(
      (item) => item.withoutOtherTreatmentVal
    );

    const withoutTotal = results.reduce((acc, value, i) => {
      return acc + value / withOutOtherTreatmentVal[i];
    }, 0);
    console.log(withoutTotal);
    return withoutTotal;
  };

  const onSubmit = (formdata) => {
    console.log(formdata);
    let total;
    if (step === "usingInhalersWithOtherGC") {
      console.log("with other GC");
      total = calculateWithOtherTreatment(formdata);
      if (total >= 1) {
        console.log("Over 1 " + "total: " + total);
        nav("/sec");
      } else {
        console.log("Below 1 " + "total: " + total);
        nav("/routes");
        markRouteDone("Inhaled");
      }
    } else if (step === "usingInhalersWithoutOtherGC") {
      console.log("without other GC");
      total = calculateWithOutOtherTreatment(formdata);
      if (total >= 1) {
        console.log("Over 1 " + "total: " + +total);
        nav("/sec");
      } else {
        console.log("Below 1 " + "total: " + total);
        nav("/routes");
        markRouteDone("Inhaled");
      }
    }
  };

  const formContent = (
    <>
      {/* TODO add button functionality look at bookmarks for medium site if need be
      Additionally consider implementing breadcrumb trail that is an UL and 
      uses the step state to add to the list
    */}
      <div className="w-5 h-5">
        <Button btnText="Go Back"
          onClick= {()=>
            nav(-1)
          }
        />
      </div>
      <div className="mx-auto max-w-4xl px-4 float-left">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto p-4 bg-white rounded-md shadow mt-5 w-full"
        >
          <div className="space-y-4">
            {inhaledData.map((inh) => (
              <div key={inh.id} className="grid grid-cols-1 gap-3">
                <fieldset className="mb-2">
                  <label className="font-medium text-gray-700 block">
                    {inh.glucocorticoid}
                  </label>
                </fieldset>
                {inh.branded_names && inh.branded_names.length > 0 ? (
                  <div className="text-sm text-gray-600 font-bold">
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
                    placeholder={"Total daily dose: " + inh.measurementUnit}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    {...register(`inhaled.${inh.id}`, {
                      valueAsNumber: true,
                      required: true,
                    })}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 text-center">
            <Button type="submit" btnText="Submit" />
          </div>
        </form>
      </div>
    </>
  );

  let content;
  let questionTitle;

  switch (step) {
    case "routeCheck":
      questionTitle = questionData.routeCheck;
      content = (
        <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-4 max-w-md w-full mx-auto">
          <Button btnText="Yes" onClick={() => setStep("otherGCCheck")} />
          <Button btnText="No" onClick={() => nav("/routes")} />
        </div>
      );
      break;
    case "otherGCCheck":
      questionTitle =
        "Are the inhalers being used with any other form of glucocortocid treatment?";
      content = (
        <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-4 max-w-md w-full mx-auto">
          <Button
            btnText="Yes"
            onClick={() => setStep("usingInhalersWithOtherGC")}
          />
          <Button
            btnText="No"
            onClick={() => setStep("usingInhalersWithoutOtherGC")}
          />
        </div>
      );
      break;
    case "usingInhalersWithOtherGC":
    case "usingInhalersWithoutOtherGC":
      questionTitle = "Please enter the daily dose below";
      content = formContent;
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

export default Inhaled;
