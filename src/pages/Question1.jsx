import Header from "../components/Header";
import Footer from "../components/footer";
import criteria from "../criteria.json";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
function Question1() {
  const nav = useNavigate();
  var questionData = criteria.Questions.find((q) => q.id === 1);
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-auto bg-white p-4 rounded-md shadow-sm items-center">
        <h2 className="text-xl font-semibold text-center mb-4">{questionData.question}</h2>
        <ul className="list-disc list-inside space-y-2 mb-6 ">
          {questionData.options.map((option, index) => (
            <li key={index} className="text-gray-700">
              {option}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <Button btnText="Yes" onClick={() => nav("/sec")} />
          <Button btnText="No" onClick={() => nav("/routes")} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Question1;
