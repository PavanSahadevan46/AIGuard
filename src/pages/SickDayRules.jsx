import Header from "@/components/Header";
import Footer from "@/components/Footer";
import criteria from "../criteria.json";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";

function SickDayRules() {
  const sickDayAdvice = criteria.SickDayAdvice.find((q) => q.id === 1);
  const SickDayGlucocorticoids = criteria.SickDayGlucocorticoids;

  const nav = useNavigate();
  let content;
  let questionData = criteria.Questions.find((q) => q.id === 1);

  content = (
    <>
      <main>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 border-b pb-3">
          {sickDayAdvice.title}
        </h1>
        <div className="space-y-8">
          <section>
            <div className="bg-blue-50 border-l-4 border-sapphire p-4 mb-8">
              <h3 className="text-xl mb-8 mt-4 text-left pl-2">
                Sick day rules are available{" "}
                <Link
                  className="text-blue-700 underline"
                  to="https://www.endocrinology.org/media/4169/ai-and-exogenous-steroids_patient-information-sheet.pdf"
                >
                  here.
                </Link>
              </h3>
            </div>
            <ul className="list-disc space-y-3 pl-5">
              {sickDayAdvice.options.map((option, index) => (
                <li key={index} className="text-gray-800 text-lg">
                  {option}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-7">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Other oral glucocorticoids
            <span className="text-red-500 ml-1">*</span>
          </h2>
          <ul className="space-y-2 list-disc list-inside">
            {SickDayGlucocorticoids.map((option) => (
              <li key={option.id} className="text-gray-800 p-0.5 text-lg">
                {option.glucocorticoid} {option.measurement}
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-4">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            CYP3A4 inhibitors
            <span className="text-red-500 ml-1">*</span>
          </h2>
          <span className="text-xl mt-8 font-semibold">
            Potent Protease inhibitors:{" "}
          </span>{" "}
          <ul className="list-disc list-inside space-y-2 mb-6">
            {questionData.potentProteaseInhibitors.map((option, index) => (
              <li key={index} className="text-gray-800 p-0.5 text-lg">
                {option}
              </li>
            ))}
          </ul>
          <span className="text-xl font-semibold">Antifungals:</span>{" "}
          <ul className="list-disc list-inside space-y-2 mb-6">
            {questionData.antiFungals.map((option, index) => (
              <li key={index} className="text-gray-800 p-0.5 text-lg">
                {option}
              </li>
            ))}
          </ul>
          <p className="text-gray-800 p-0.5 text-lg">
            <span className="text-xl font-semibold">Antibiotics:</span> <br />
            {questionData.antiBiotics}
          </p>
        </section>

        <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
          <Button className="btn-primary" onClick={() => nav(-1)}>
            Go back
          </Button>
        </div>
      </main>
    </>
  );

  return (
    <div className="grid grid-cols-1 bg-white">
      <Header />
      <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-6">{content}</div>
      <Footer />
    </div>
  );
}

export default SickDayRules;
