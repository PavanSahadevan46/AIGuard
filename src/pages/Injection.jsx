import Header from "../components/Header";
import Footer from "../components/footer";
import criteria from "../criteria.json";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
function Injection() {
  const injData = criteria.injectionRoute;
  const questionData = criteria.Questions.find((q) => q.id === 4);
  const nav = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(questionData.question);
  const [isUsingInjection, setShowIsUsingInjection] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function onSubmit(formdata) {
    console.log(formdata);
  }
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <h1 className="text-xl font-semibold mb-4 text-center">
        {currentQuestion}
      </h1>

      {!isUsingInjection ? (
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            btnText="Yes"
            onClick={() => {
              setCurrentQuestion(
                "Please select the glucocorticoid and answer the questions accordingly"
              );
              setShowIsUsingInjection(true);
            }}
          />
          <Button
            btnText="No"
            onClick={() => {
              nav("/routes");
            }}
          />
        </div>
      ) : isUsingInjection ? (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              {injData.map((inj) => (
                <div
                  key={inj.id}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center"
                >
                  <label className="font-medium text-gray-700 sm:col-span-1">
                    {inj.glucocorticoid}
                  </label>
                  <label className="font-medium text-gray-700 sm:col-span-1 p-5">
                    {inj.question1}
                  </label>
                  <input
                    type="radio"
                    {...register(`inj_${inj.id}`)}
                    value="Yes"
                  ></input>
                </div>
              ))}
            </div>
            <div className="pt-6 text-center">
              <Button type="submit" btnText="Submit" />
            </div>
          </form>
        </div>
      ) : (
        <></>
      )}

      <Footer />
    </div>
  );
}

export default Injection;
