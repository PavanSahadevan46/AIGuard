import { useUserAnswers } from "@/components/UserAnswerContext";

function InjectionSECEnd() {
  const { answers } = useUserAnswers();
  const injectionData = answers.injectionCheck;

  return (
    <>
      {injectionData && (
        <div>
          <p className="text-lg p-0.2 font-semibold ">For the Injection route</p>
          <p className="text-lg p-0.2 font-semibold ">You checked true to the following: </p>
          <ul className="list-disc space-y-3 pl-5">
            {injectionData.yesAnswers.map((item, index) => (
              <li key={index} className="text-gray-800 text-lg">
                <strong>Glucocorticoid:</strong> {item.injection} <br />
                <strong>Question:</strong> {item.question}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default InjectionSECEnd;
