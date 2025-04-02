import { useUserAnswers } from "@/components/UserAnswerContext";

function InhaledSECEnd() {
  const { answers } = useUserAnswers();

  return (
    <>
      {answers.inhaledCheck && (
        <div>
          <p className="text-lg p-0.2 font-semibold ">
            The patient's total daily dosage of:{" "}
            <span className="italic font-medium">
              {answers.inhaledCheck.totalDosageVal} mg
            </span>{" "}
            puts the patient at risk of adrenal insufficiency.
          </p>
        </div>
      )}
    </>
  );
}

export default InhaledSECEnd;
