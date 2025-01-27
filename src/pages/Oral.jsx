import Header from "../components/Header";
import Footer from "../components/footer";
import criteria from "../criteria.json";
import Button from "../components/Button";
import { useState } from "react";
function Oral() {
    const questionData = criteria.Questions.find((q) => q.id === 3);
    const [currentQuestion, setCurrentQuestion] = useState(questionData.question);
    const [showContinious, setShowContinious] = useState(false);
    const [showIntermittent, setShowIntermittent] = useState(false);
    return (
        <>
            <Header />
            <h1>{currentQuestion}</h1>
            {showContinious ? (
                <h1>Continious</h1>) :
                showIntermittent ? (
                    <h1>Intermittent</h1>) : (
                    <>
                        <Button
                            btnText="Yes"
                            onClick={() => {
                                setShowIntermittent(true);
                            }}
                        />
                        <Button btnText="No" onClick={() => {
                            setShowContinious(true);
                        }}
                        />
                    </>
                )}
            <Footer />
        </>
    )
}

export default Oral