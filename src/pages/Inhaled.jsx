import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/footer";
import criteria from "../criteria.json";
import Button from "../components/Button";
import { useRouteCompletion } from "../components/RouteCompletionContext";

function Inhaled() {
  const questionData = criteria.Questions.find((q) => q.id === 5);
  const routeCheck = questionData.routeCheck;
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
        console.log("Over 1 " + "total: " +  total);
        nav("/sec");
      } else {
        console.log("Below 1 " + "total: "+ total);
        nav("/routes");
        markRouteDone("Inhaled");
      }
    } else if (step === "usingInhalersWithoutOtherGC") {
      console.log("without other GC");
      total = calculateWithOutOtherTreatment(formdata);
      if (total >= 1) {
        console.log("Over 1 "+ "total: "+ + total);
        nav("/sec");
      } else {
        console.log("Below 1 " + "total: "+ total);
        nav("/routes");
        markRouteDone("Inhaled");
      }
    }
  };

  const formContent = (
    <>
      <div className="text-center">
        <h1 className="text-xl font-semibold mb-4 text-center">
          Please enter the daily dose below
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-4 bg-white rounded-md shadow mt-4 w-full"
      >
        <div className="space-y-4">
          {inhaledData.map((inh) => (
            <div key={inh.id} className="grid grid-cols-1 gap-2">
              <div className="mb-2">
                <label className="font-medium text-gray-700 block">
                  {inh.glucocorticoid}
                </label>
                {inh.branded_names &&
                  inh.branded_names.toString().trim() !== "" && (
                    <span className="text-sm text-gray-600 block font-bold">
                      Common brand names: {inh.branded_names.join(", ")}
                    </span>
                  )}
              </div>
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
    </>
  );

  let content;
  switch (step) {
    case "routeCheck":
      content = (
        <div className="text-center">
          <h1 className="text-xl font-semibold mb-4 text-center">
            {routeCheck}
          </h1>
          <div className="mt-4 flex flex-col sm:flex-row justify-center gap-8 w-2xl p-6 mx-auto">
            <Button btnText="Yes" onClick={() => setStep("otherGCCheck")} />
            <Button btnText="No" onClick={() => nav("/routes")} />
          </div>
        </div>
      );
      break;
    case "otherGCCheck":
      content = (
        <div className="text-center">
          <h1 className="text-xl font-semibold mb-4">
            Are the inhalers being used with any other form of glucocortocid
            treatment?
          </h1>
          <div className="mt-4 flex flex-col sm:flex-row justify-center gap-8 w-2xl p-6 mx-auto">
            <Button
              btnText="Yes"
              onClick={() => setStep("usingInhalersWithOtherGC")}
            />
            <Button
              btnText="No"
              onClick={() => setStep("usingInhalersWithoutOtherGC")}
            />
          </div>
        </div>
      );
      break;
    case "usingInhalersWithOtherGC":
    case "usingInhalersWithoutOtherGC":
      content = formContent;
      break;
    default:
      content = <></>;
  }

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-auto bg-white">{content}</div>
      <Footer />
    </>
  );
}

export default Inhaled;
