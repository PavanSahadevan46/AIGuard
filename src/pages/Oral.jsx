import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/footer";
import criteria from "../criteria.json";
import Button from "../components/Button";

function Oral() {
  const nav = useNavigate();
  const questionData = criteria.Questions.find((q) => q.id === 3);
  const oralData = criteria.oralRoute;

  const [showIntermittent, setShowIntermittent] = useState(false);
  const [showContinuous, setShowContinuous] = useState(false);
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
    const intResults =  Object.values(formdata.intermittent).map(Number);
    const total = intResults.reduce((acc,elem) =>{
      return acc + elem;
    },0)
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
    }else if(showIntermittent){
      console.log("intermittent ")
      const intTotal = calculateIntermittent(formdata);
      if(intTotal > 3 ){
        console.log(intTotal + " over 3 courses");
        nav("/sec");
      }else{
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

      {!showContinuous && !showIntermittent ? ( //if no route is chosen show buttons
        <div className="mt-6 flex space-x-4 justify-center">
          <Button
            btnText="Yes"
            onClick={() => {
              setShowIntermittent(true);
              setCurrentQuestion("Please enter the duration of courses below");
              reset();
            }}
          />
          <Button
            btnText="No"
            onClick={() => {
              setShowContinuous(true);
              setCurrentQuestion("Please enter the daily dosage below");
              reset();
            }}
          />
        </div>
      ) : (
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto p-4 bg-white rounded-md shadow mt-4 table border-separate border-spacing-3"
          >
            {oralData.map((oral) => {
              if (showContinuous) {
                return (
                  <div key={oral.id} className="table-row py-1">
                    <label className="p-1 table-cell pr-4 align-middle whitespace-nowrap">
                      {oral.glucocorticoid}
                    </label>

                    <input
                      type="number"
                      step="0.01"
                      placeholder={"Total daily dose: " + oral.measurementUnit}
                      className="table-cell px-2 py-3 border  border-gray-300 rounded align-middle"
                      {...register(`continuous.${oral.id}`, {
                        valueAsNumber: true,
                        required: true,
                      })}
                    />
                    {errors.continuous && errors.continuous[oral.id] && (
                      <span className="text-red-500 text-sm">Required</span>
                    )}
                  </div>
                );
              } else if (showIntermittent) {
                return (
                  <div
                    key={oral.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-2"
                  >
                    <label className="p-1 table-cell pr-4 align-middle whitespace-nowrap">
                      {oral.glucocorticoid}
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue=""
                      {...register(`intermittent.${oral.id}`, {
                        required: true,
                      })}
                    >
                      <option value="" disabled>
                        Select a course duration
                      </option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                    {errors.intermittent && errors.intermittent[oral.id] && (
                      <span className="text-red-500 text-sm">Required</span>
                    )}
                  </div>
                );
              } else {
                <></>;
              }
            })}
            <div className="pt-4 text-center">
              <Button type="submit" btnText="Submit" />
            </div>
          </form>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Oral;
