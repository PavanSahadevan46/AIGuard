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

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const nav = useNavigate();

  const onSubmit = (formdata) => {
    if (step === "usingInhalersWithOtherGC") {
      console.log("with other GC", formdata);
      
    } else if (step === "usingInhalersWithoutOtherGC") {
      console.log("without other GC", formdata);
      
    }
  };

  const formContent = (
    <>
      <div className="text-center">
        <h1 className="text-xl font-semibold mb-4 text-center">Please enter the daily dose below</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-4 bg-white rounded-md shadow mt-4 w-full"
      >
        <div className="space-y-4">
          {inhaledData.map((inh) => (
            <div
              key={inh.id}
              className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center"
            >
              <label className="font-medium text-gray-700 sm:col-span-1">
                {inh.glucocorticoid}
              </label>
              <label className="font-medium text-gray-700 sm:col-span-1">
                {inh.branded_names}
              </label>
              <div className="sm:col-span-2">
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
              onClick={() => setStep("UsingInhalersWithoutOtherGC")}
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
// <ul className="list-disc list-inside space-y-2 mb-6 ">
//   {inhaledData.map((inhaled, index) => (
//     <li key={index} className="text-gray-700">
//       {inhaled.glucocorticoid}
//     </li>
//   ))}
// </ul>
