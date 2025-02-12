import Header from "../components/Header";
import Footer from "../components/footer";
import criteria from "../criteria.json";
import Button from "../components/Button";
import { useState } from "react";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";


function Oral() {
    const questionData = criteria.Questions.find((q) => q.id === 3);
    const [currentQuestion, setCurrentQuestion] = useState(questionData.question);
    const [showContinious, setShowContinious] = useState(false);
    const [showIntermittent, setShowIntermittent] = useState(false);

    const [dosageValue, setDosageValue] = useState({}); 

    const oralData = criteria.oralRoute;
    const continuousValues = Object.values(oralData.map(item => item.continuousValue));

    const nav = useNavigate()


    const submitHandler = (e) => {
        e.preventDefault();
        let results = (Object.values((dosageValue)));
        const mathCalc = () =>{
            var c = [];
            for( var i = 0; i < results.length; i++ ){
                c.push(results[i]/ continuousValues[i])
            }
            // console.log(c);

            const total = c.reduce((accumulator, element) => accumulator + element );
            console.log(total)
            if (total > 1){
                console.log("greater than 1")
                nav("/sec")
            }else{
                console.log("less than 1")
                nav("/routes")
            }
        }
        mathCalc();
    }   
       // console.log(continuousValues)
        // const temp = dosageValue[1] / continuousValues[0];
        // console.log(temp)   
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
                                    {/* <label>{oral.continuousValue}</label> */}
                                    <input type="number"
                                        name = {oral.id}
                                        value={dosageValue[oral.id] ?? ''}
                                        onChange={(e) =>
                                            setDosageValue((prevState =>({
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