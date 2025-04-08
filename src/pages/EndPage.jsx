import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useUserAnswers } from "@/components/UserAnswerContext";
import secFront from "../assets/SEC_Front.png";
import secBack from "../assets/SEC_Back.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import BackButton from "@/components/BackButton";

function EndPage() {
  const { isSECRequired } = useUserAnswers();

  const nav = useNavigate();
  let content;
  switch (isSECRequired) {
    case true:
      content = (
        <>
          <BackButton
            onClick={() => {
              nav(-1);
            }}
          />
          <div className="mt-4">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
              <p className="text-xl mb-4 text-left gap-3 leading-loose">
                The patient has been identified as being at
                <strong> risk</strong> of HPA axis suppression.
                <br />A Steroid Emergency Card is recommended for this patient{" "}
                and
                <strong> for 12 months after stopping.</strong>
              </p>
            </div>
            <div>
              <h3 className="text-xl mb-4 mt-4 text-left ">
                Please also check if{" "}
                <Link className="text-blue-700 underline" to="/sickdayrules">
                  sick day rules
                </Link>{" "}
                apply.
              </h3>
              <h3 className="text-xl mb-4 mt-4 text-left ">
                This patient may need steroid cover if admitted to hospital,
                unwell or invasive procedure.
              </h3>
              <h3 className="text-xl mb-2 mt-8 font-semibold text-left ">
                Next steps:{" "}
              </h3>
              <h3 className="text-xl mb-4 text-left">
                Please provide the patient with a Steroid Emergency Card.
              </h3>
              <div className="mb-2">
                <h3 className="text-xl mb-4 mt-4 text-left">
                  The card can be obtained from any pharmacy, and is also
                  available in a{" "}
                  <Link
                    className="text-blue-700 underline"
                    to="https://www.endocrinology.org/media/3873/steroid-card.pdf"
                  >
                    PDF format.
                  </Link>
                </h3>
              </div>

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
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 mt-5">
                <h3 className="text-lg mb-4 font-bold mt-">
                  Please note again that this tool is not to be used in real
                  world applications by any means and should not be used to
                  identify real patients at risk of adrenal insufficiency.
                </h3>
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
          <BackButton
            onClick={() => {
              nav(-1);
            }}
          />
          <div>
            <h2 className="text-xl mb-4 text-left">
              The patient is
              <strong>unlikely</strong> at risk of HPA axis suppression.
            </h2>
            <p className="text-xl  mb-4 text-left">
              It does <strong>not</strong> appear that a Steroid Emergency Card
              is needed for this patient.
              <strong> However</strong> this tool is only a guide and the
              patient should always be considered clinically for any other
              reasons why a card may be needed.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
              <h3 className="text-lg mb-4 font-bold pl-2">
                Please note again that this tool is not to be used in real world
                applications by any means and should not be used to identify
                real patients at risk of adrenal insufficiency.
              </h3>
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
