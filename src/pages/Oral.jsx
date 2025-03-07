import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/footer";
import criteria from "../criteria.json";
import Button from "../components/Button";

function Oral() {
  const nav = useNavigate();
  const questionData = criteria.Questions.find((q) => q.id === 3);
  const oralData = criteria.oralRoute;
  const dexOptions = oralData.find((q) => q.id === 5);

  const [showIntermittent, setShowIntermittent] = useState(false);
  const [showContinuous, setShowContinuous] = useState(false);
  const [showDexamethasone, setShowDexamethasone] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(questionData.question);

  //react hook form
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
  const calculateIntermittent = (formdata) => {
    const intResults = Object.values(formdata.intermittent).map(Number);
    const total = intResults.reduce((acc, elem) => {
      return acc + elem;
    }, 0);
    console.log(intResults);
    return total;
  };

  const calculateContinuous = (formdata) => {
    const contResults = Object.values(formdata.continuous);
    const continuousValues = oralData.map((item) => item.continuousValue);

    const total = contResults.reduce((acc, value, i) => {
      return acc + value / continuousValues[i];
    }, 0);

    return total;
  };

  const onSubmit = (formdata) => {
    if (showContinuous) {
      const contTotal = calculateContinuous(formdata);
      if (contTotal >= 1) {
        console.log(contTotal + " over 1");
        nav("/sec");
      } else {
        console.log(contTotal + "over 1");
        nav("/routes");
      }
    } else if (showIntermittent) {
      console.log("intermittent ");
      const intTotal = calculateIntermittent(formdata);
      if (intTotal > 3) {
        console.log(intTotal + " over 3 courses");
        nav("/sec");
      } else {
        console.log("under 3 courses");
        nav("/routes");
      }
    }
  };

  return (
    <>
      <Header />
      <h1 className="text-xl font-semibold mb-4 text-center">
        {currentQuestion}
      </h1>

      {!showContinuous && !showIntermittent && !showDexamethasone ? (
        //if no route is chosen show buttons
        <div className="mt-6 flex space-x-4 justify-center">
          <Button
            btnText="Yes"
            onClick={() => {
              setShowIntermittent(true);
              setCurrentQuestion(
                "Has the patient had 3 or more courses in total of any of the following for at least seven days within the past 12 months?"
              );
              reset();
            }}
          />
          <Button
            btnText="No"
            onClick={() => {
              setShowContinuous(true);
              setCurrentQuestion(
                "Please enter the daily dosage below"
              );
              reset();
            }}
          />
        </div>
      ) : showContinuous ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto p-4 bg-white rounded-md shadow mt-4 table border-separate border-spacing-3"
        >
          {oralData.map((oral) => (
            <div key={oral.id} className="table-row py-1">
              <label className="p-1 table-cell pr-4 align-middle whitespace-nowrap">
                {oral.glucocorticoid}
              </label>
              <input
                type="number"
                step="0.01"
                placeholder={"Total daily dose: " + oral.measurementUnit}
                className="table-cell px-2 py-3 border border-gray-300 rounded align-middle"
                {...register(`continuous.${oral.id}`, {
                  valueAsNumber: true,
                  required: true,
                })}
              />
              {errors.continuous && errors.continuous[oral.id] && (
                <span className="text-red-500 text-sm">Required</span>
              )}
            </div>
          ))}
          <div className="pt-4 text-center">
            <Button type="submit" btnText="Submit" />
          </div>
        </form>
      ) : showIntermittent ? (
        <div>
          <ul className="list-disc list-inside space-y-2">
            {oralData.map((oral, index) => (
              <li key={index}>
                {oral.glucocorticoid} {oral.intermittentDosage}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex space-x-4 justify-center">
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
                setShowIntermittent(false);
                setShowDexamethasone(true);
                setCurrentQuestion(
                  "Has the patient had (or is due to have) intermittent courses of dexamethasone for  either of the following?"
                );
              }}
            />
          </div>
        </div>
      ) : showDexamethasone && dexOptions ? (
        <div>
          <ul className="list-disc list-inside space-y-2">
            {dexOptions.subOptions.map((oral, index) => (
              <li key={index}>{oral}</li>
            ))}
          </ul>
          <div className="mt-6 flex space-x-4 justify-center">
            <Button
              btnText="Yes"
              onClick={() => {
                nav("/sec");
              }}
            />
            <Button
              btnText="No"
              onClick={() => {
                setShowDexamethasone(false);
                setCurrentQuestion(
                  "Continuous: Please enter the daily dosage below"
                );
                setShowContinuous(true);
              }}
            />
          </div>
        </div>
      ) : (
        <></>
      )}

      <Footer />
    </>
  );
}

export default Oral;
