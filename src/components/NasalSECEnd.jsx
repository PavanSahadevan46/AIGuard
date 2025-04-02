import { useUserAnswers } from "@/components/UserAnswerContext";

function NasalSECEnd() {
  const { answers } = useUserAnswers();

  return (
    <>
      {answers.nasalCheck && (
        <div>
          <p className="text-lg p-0.2 font-semibold ">
            For the nasal route question:
            <span className="italic font-medium">
              {answers.nasalCheck.question}
            </span>{" "}
          </p>
          <p className="text-lg p-0.2 font-semibold ">
            You answered:{" "}
            <span className="italic font-medium">
              {answers.nasalCheck.answer}
            </span>
          </p>
        </div>
      )}
    </>
  );
}

export default NasalSECEnd;
