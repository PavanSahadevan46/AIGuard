import Header from "../components/Header";
import criteria from "../criteria.json";
import Button from "../components/Button";
import Footer from "../components/footer";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";


function SteroidRoutes() {
    const questionData = criteria.Questions.find((q) => q.id === 2);
    const [currentQuestion, setCurrentQuestion] = useState(questionData.question);
    const nav = useNavigate();
    return (
        <>
            <Header />
            <h1>{currentQuestion}</h1>
            <Button btnText="Yes"
                onClick={() => setCurrentQuestion(
                    "Please enter the glucocorticoids taken in order of the routes in the order shown")
                } />

            <Button btnText="No" onClick={() => nav("/nosec")} />
            <Footer />
        </>
    )
}

export default SteroidRoutes