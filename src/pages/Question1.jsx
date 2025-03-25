import Header from "../components/Header";
import Footer from "../components/footer";
import criteria from "../criteria.json";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
function Question1() {
  const nav = useNavigate();
  var questionData = criteria.Questions.find((q) => q.id === 1);
  let content;
  {
    content = (
      <>
        <div className="flex flex-auto items-center">
          <Button
            variant="Ghost"
            onClick={() => {
              nav("/");
            }}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>
        <div className="flex flex-col min-h-auto bg-white p-4 rounded-md  items-center">
          <h2 className="text-xl font-semibold text-center mb-4">
            {questionData.question}
          </h2>
          <ul className="list-disc list-inside space-y-2 mb-6 ">
            {questionData.options.map((option, index) => (
              <li key={index} className="text-gray-700">
                {option}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <Button className="btn-primary" onClick={() => nav("/sec")}>
              Yes
            </Button>
            <Button className="btn-secondary" onClick={() => nav("/routes")}>
              No
            </Button>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 bg-white">
        <Header />
        <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-6">
          {content}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Question1;
