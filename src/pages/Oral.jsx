import Header from "../components/Header";
import Footer from "../components/footer";
import criteria from "../criteria.json";
import Button from "../components/Button";
import { useState } from "react";
import Form from "../components/Form";


function Oral() {
    const questionData = criteria.Questions.find((q) => q.id === 3);
    const [currentQuestion, setCurrentQuestion] = useState(questionData.question);
    const [showContinious, setShowContinious] = useState(false);
    const [showIntermittent, setShowIntermittent] = useState(false);

    const [dosageValue, setShowDosageValue] = useState({});

    const oralData = criteria.oralRoute;

    const submitHandler = (e) => {
        e.preventDefault();

    }

    return (
        <>
            <Header />
            <h1>{currentQuestion}</h1>
            {showContinious ? (
                <div>
                    <form onSubmit={submitHandler}>
                        <fieldset>
                            {oralData.map((oral) =>
                                <div key={oral.id}>
                                    <label>{oral.glucocorticoid}</label>
                                    <input type="float"
                                        name = {oral.id}
                                        value={dosageValue[oral.id] ?? ''}
                                        onChange={(e) =>
                                            setShowDosageValue((prevState =>({
                                                ...prevState,
                                                [e.target.name]: e.target.value,
                                            })))
                                        }
                                        placeholder="Enter daily dose" />
                                </div>
                            )}
                            <Button type="submit" btnText="Submit" />
                        </fieldset>
                    </form>
                </div>
            ) :
                showIntermittent ? (
                    <h1>Intermittent</h1>
                ) : (
                    <>
                        <Button
                            btnText="Yes"
                            onClick={() => {
                                setShowIntermittent(true);
                            }}
                        />
                        <Button btnText="No" onClick={() => {
                            setShowContinious(true);
                            setCurrentQuestion("Please enter the dosage below");
                        }}
                        />
                    </>
                )}
            <Footer />
        </>
    )
}

export default Oral