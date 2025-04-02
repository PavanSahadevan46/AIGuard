import { useUserAnswers } from "@/components/UserAnswerContext";

function RectalSECEnd() {
  const { answers } = useUserAnswers();
  return (
    <>
      {answers.rectalCheck && (
        <div>
          <p className="text-lg p-0.2 font-semibold ">
            For the rectal route question:{" "}
            <span className="italic font-medium">
              {answers.rectalCheck.question}
            </span>{" "}
          </p>
          <p className="text-lg p-0.2 font-semibold ">
            You answered:{" "}
            <span className="italic font-medium">
              {answers.rectalCheck.answer}
            </span>
          </p>
        </div>
      )}
    </>
  );
}

export default RectalSECEnd;
