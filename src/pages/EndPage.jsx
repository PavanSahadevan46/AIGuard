import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useUserAnswers } from "@/components/UserAnswerContext";
import { useState } from "react";

function EndPage() {
  const { answers } = useUserAnswers();
  const [step, setStep] = useState("SECRequired");

  const injectionData = answers.injectionCheck;

  let content;
  switch (step) {
    case "SECRequired":
      content = (
        <>
          <div>
            <h1>The patient's results</h1>
            <h2>
              This patient has been identified as being at
              <span className="font-bold"> risk</span> of adrenal insufficiency.
            </h2>
            <h2>
              A Steroid Emergency Card is
              <span className="font-bold"> highly</span> recommended for this
              patient.
            </h2>
            <h3>Why this patient is at risk:</h3>
            <div>
              {answers.continuousCheck && (
                <div>
                  <p>
                    The patient's total daily dosage:
                    {answers.continuousCheck.dailyDosageVal}  puts the patient at
                    risk of adrenal insufficiency.
                  </p>
                </div>
              )}

              {answers.intermittentCheck && (
                <div>
                  <p>
                    Oral route question: {answers.intermittentCheck.question}
                  </p>
                  <p>You answered: {answers.intermittentCheck.answer}</p>
                </div>
              )}

              {injectionData && (
                <div>
                  <p>You checked true to the following: </p>
                  <ul>
                    {injectionData.yesAnswers.map((item, index) => (
                      <li key={index}>
                        <strong>Glucocorticoid:</strong> {item.injection} <br />
                        <strong>Question:</strong> {item.question}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {answers.inhaledCheck && (
                <div>
                  <p>
                    The patient's total daily dosage:
                    {answers.inhaledCheck.totalDosageVal} puts the patient at
                    risk of adrenal insufficiency.
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      );
      break;
    default:
      content = <h1>default content</h1>;
  }

  return (
    <div className="grid grid-cols-1 bg-white">
      <Header />
      <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-6">
        <>
          <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-6">
            {content}
          </div>
        </>
      </div>
      <Footer />
    </div>
  );
}

export default EndPage;
