import Header from "../components/Header";
import criteria from "../criteria.json";
import Button from "../components/Button";
import Footer from "../components/footer";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import RouteContainer from "../components/RouteContainer";

function SteroidRoutes() {
    const questionData = criteria.Questions.find((q) => q.id === 2);
    const [currentQuestion, setCurrentQuestion] = useState(questionData.question);
    const nav = useNavigate();
    const [showRoutes, setShowRoutes] = useState(false);
    return (
        <>
            <Header />
            <h1>{currentQuestion}</h1>
            {showRoutes ? (// if user selected yes to question 2, hide buttons and render routes else render buttons
                <RouteContainer />  
            ) : (
                <>
                    <Button
                        btnText="Yes"
                        onClick={() => {
                            setCurrentQuestion("Please enter the glucocorticoids taken in order of the routes in the order shown");
                            setShowRoutes(true);
                        }}
                    />
                    <Button btnText="No" onClick={() => nav("/nosec")} />
                </>

            )}
            <Footer />
        </>
    )
}

export default SteroidRoutes