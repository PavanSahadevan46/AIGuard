import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/footer";
import criteria from "../criteria.json";
import Button from "../components/Button";
import { useRouteCompletion } from "../components/RouteCompletionContext";

function Inhaled() {
    const questionData = criteria.Questions.find((q) => q.id === 5);
    const inhaledData = criteria.
    return (
    <>
      <Header />
      <h1>Inhaled </h1>
      <Footer />
    </>
  );
}

export default Inhaled;
