import Header from "../components/Header";
import criteria from "../criteria.json";
import Button from "../components/Button";
import Footer from "../components/footer";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Card from "../components/Card";
import RouteContainer from "../components/RouteContainer";
import SteroidRoute from "../components/SteroidRoute";


function SteroidRoutes() {
    const questionData = criteria.Questions.find((q) => q.id === 2);
    const [currentQuestion, setCurrentQuestion] = useState(questionData.question);
    const nav = useNavigate();
    const routes = criteria.routeOptions[0].routes;
    const [showRoutes, setShowRoutes] = useState(false);
    return (
        <>
            <Header />
            <h1>{currentQuestion}</h1>
            {showRoutes ? (// check if user selected yes to question 2 and hide buttons and render routes else render yes no buttons
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