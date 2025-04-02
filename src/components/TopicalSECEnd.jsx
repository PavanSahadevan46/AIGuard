import { useUserAnswers } from "@/components/UserAnswerContext";

function TopicalSECEnd() {
  const { answers } = useUserAnswers();

  return (
    <>
      {answers.topicalCheck && (
        <div>
          <p className="text-lg p-0.2 font-semibold ">
            For the topical route question:{" "}
            <span className="italic font-medium">
              {answers.topicalCheck.question}
            </span>
          </p>
          <p className="text-lg p-0.2 font-semibold ">
            You answered:{" "}
            <span className="italic font-medium">
              {answers.topicalCheck.answer}
            </span>
          </p>
        </div>
      )}
    </>
  );
}

export default TopicalSECEnd;
