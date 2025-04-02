import { useUserAnswers } from "@/components/UserAnswerContext";

function OralSECEnd() {
  const { answers } = useUserAnswers();

  return (
    <>
      {answers.continuousCheck && (
        <div>
          <p className="text-lg p-0.2 font-semibold ">
            The patient's total daily dosage of:{" "}
            <span className="italic font-medium">
              {answers.continuousCheck.dailyDosageVal} mg
            </span>{" "}
            puts the patient at risk of adrenal insufficiency.
          </p>
        </div>
      )}

      {answers.intermittentCheck && (
        <div>
          <p className="text-lg p-0.2 font-semibold ">
            For the question:{" "}
            <span className="italic font-medium">
              {answers.intermittentCheck.question}
            </span>
          </p>
          <p className="text-lg p-0.2 font-semibold ">
            You answered:{" "}
            <span span className="italic font-medium">
              {answers.intermittentCheck.answer}
            </span>
          </p>
        </div>
      )}
    </>
  );
}

export default OralSECEnd;
