import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useUserAnswers } from "@/components/UserAnswerContext";
import secFront from "../assets/SEC_Front.png";
import secBack from "../assets/SEC_Back.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import OralSECEnd from "@/components/OralSECEnd";
import InjectionSECEnd from "@/components/InjectionSECEnd";
import InhaledSECEnd from "@/components/InhaledSECEnd";
import NasalSECEnd from "@/components/NasalSECEnd";
import TopicalSECEnd from "@/components/TopicalSECEnd";
import RectalSECEnd from "@/components/RectalSECEnd";

function EndPage() {
  const { answers, isSECRequired } = useUserAnswers();

  const nav = useNavigate();
  let content;
  switch (isSECRequired) {
    case true:
      content = (
        <>
          <div>
            <h1 className="text-2xl font-semibold mb-4 text-left">
              The patient's results
            </h1>
            <h2 className="text-xl mb-4 text-left">
              This patient has been identified as being at
              <span className="font-bold"> risk</span> of adrenal insufficiency.
            </h2>
            <h2 className="text-xl mb-4 text-left">
              A Steroid Emergency Card is
              <span className="font-bold"> highly</span> recommended for this
              patient.
            </h2>
            <h3 className="text-xl mb-4 text-left">
              Why this patient is at risk:
            </h3>
            <div>
              {answers.question1Check && (
                <div>
                  <p className="text-lg p-0.2 font-semibold ">
                    For the question:{" "}
                    <span className="italic font-medium">
                      {answers.question1Check.question}
                    </span>
                  </p>
                  <p className="text-lg p-0.2 font-semibold">
                    You answered:{" "}
                    <span className="italic font-medium">
                      {answers.question1Check.answer}
                    </span>
                  </p>
                </div>
              )}
              <OralSECEnd />
              <InjectionSECEnd />
              <InhaledSECEnd />
              <NasalSECEnd />
              <TopicalSECEnd />
              <RectalSECEnd />

              <h3 className="text-xl mb-4 mt-4 text-left">
                Please also check if{" "}
                <Link className="text-blue-700 underline" to="/sickdayrules">
                  sick day rules
                </Link>{" "}
                apply
              </h3>
              <h3 className="text-xl mb-2 mt-4 text-left">Next steps: </h3>
              <h3 className="text-xl mb-4 text-left">
                Please provide the patient with a Steroid Emergency Card.
              </h3>
              <div className="flex flex-col items-left space-y-4 w-full">
                <div className="w-full max-w-md">
                  <img
                    src={secFront}
                    alt="Steroid Emergency Card Front"
                    className="w-full h-auto object-contain "
                  />
                </div>
                <div className="w-full max-w-md border-gray-200 pt-4">
                  <img
                    src={secBack}
                    alt="Steroid Emergency Card Back"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
              <Button
                className="btn-primary"
                onClick={() => {
                  nav("/start");
                }}
              >
                Start again
              </Button>
            </div>
          </div>
        </>
      );
      break;
    case false:
      content = (
        <>
          <div>
            <h1 className="text-2xl font-semibold mb-4 text-left">
              The patient's results
            </h1>
            <h2 className="text-xl mb-4 text-left">
              This patient is
              <span className="font-bold"> unlikely</span> at risk of adrenal
              insufficiency.
            </h2>
            <h2 className="text-xl  mb-4 text-left">
              A Steroid Emergency Card may not be necessary for this patient.
            </h2>
            <h2>
              <span className="font-bold"> However</span> this tool is only a
              guide, please make sure to consult an appropriate healthcare
              professional before making any decisions.
            </h2>
            <h3 className="text-lg mb-4 font-bold">
              Please note again that this tool is not to be used in real world
              applications by any means and should not be used to identify real
              patients at risk of adrenal insufficiency.
            </h3>
          </div>
          <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
            <Button
              className="btn-primary"
              onClick={() => {
                nav("/start");
              }}
            >
              Start again
            </Button>
          </div>
        </>
      );
      break;
    case null:
      content = (
        <>
          <div>
            <h1 className="text-2xl font-semibold mb-4 text-left ">
              Sorry an error occured
            </h1>
            <h2 className="text-xl font-semibold mb-4 text-left ">
              You may need to start from the beginning.
            </h2>
          </div>
          <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
            <Button
              className="btn-primary"
              onClick={() => {
                nav("/start");
              }}
            >
              Start again
            </Button>
          </div>
        </>
      );
      break;
    default:
      content = <h1>Unexpected content</h1>;
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
