import Header from "../components/Header";
import Footer from "../components/footer";
import criteria from "../criteria.json";
import Button from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Oral() {
    const questionData = criteria.Questions.find((q) => q.id === 3);
    const [currentQuestion, setCurrentQuestion] = useState(questionData.question);
    const [showContinious, setShowContinious] = useState(false);
    const [showIntermittent, setShowIntermittent] = useState(false);

    const [dosageValue, setDosageValue] = useState({});
    const [durationValue, setDurationValue] = useState({});

    const oralData = criteria.oralRoute;
    const continuousValues = Object.values(oralData.map(item => item.continuousValue));

    const nav = useNavigate()

    // console.log("compoenent rendered here")

    const submitHandler = (e) => {
        e.preventDefault();
        let contresults = (Object.values((dosageValue)));
        let intresults = (Object.values(durationValue));
        const mathCalc = () => {
            var c = [];
            for (var i = 0; i < results.length; i++) {
                c.push(contresults[i] / continuousValues[i])
            }
            // console.log(c);

            const total = c.reduce((accumulator, element) => accumulator + element);
            console.log(total)
            // if (total > 1) {
            //     console.log("greater than 1")
            //     nav("/sec")
            // } else {
            //     console.log("less than 1")
            //     nav("/routes")
            // }
        }
        mathCalc();
        console.log(intresults);
    }
    // console.log(continuousValues)
    // const temp = dosageValue[1] / continuousValues[0];
    // console.log(temp)   
    return (
        <>
            <Header />
            <h1 className="text-xl font-semibold mb-4 text-center">{currentQuestion}</h1>
            {showContinious ? (
                <div>
                    <form className="max-w-md mx-auto p-4 bg-white rounded-md shadow"
                        onSubmit={submitHandler}>
                        <fieldset>
                            {oralData.map((oral) =>
                                <div
                                    key={oral.id}
                                    className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                                    <label
                                        className="mb-1 sm:mb-0 font-semibold text-black-700 w-full sm:w-1/3"
                                    >{oral.glucocorticoid}</label>
                                    {/* <label>{oral.continuousValue}</label> */}
                                    <input type="number"
                                        name={oral.id}
                                        value={dosageValue[oral.id] ?? ''}
                                        onChange={(e) =>
                                            setDosageValue((prevState => ({
                                                ...prevState,
                                                [e.target.name]: e.target.value,

                                            })))
                                        }
                                        placeholder="Enter daily dose"
                                        className="
                                        w-full sm:w-2/3
                                        p-2
                                        border border-gray-300 
                                        rounded 
                                        focus:outline-none 
                                        focus:ring-2 
                                        focus:ring-blue-500"/>
                                </div>
                            )}
                            <div className="pt-4"><Button type="submit" btnText="Submit" /></div>

                        </fieldset>
                    </form>
                </div>
            ) :
                showIntermittent ? (
                    <div>
                        <form>
                            <fieldset>
                                {oralData.map((oral) =>
                                    <div
                                        key={oral.id}
                                        className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                                        <label
                                            className="mb-1 sm:mb-0 font-semibold text-black-700 w-full sm:w-1/3"
                                        >{oral.glucocorticoid}</label>
                                        <label>{oral.intermittentDuration}</label>
                                        <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            defaultValue = ""
                                            onChange={(e) =>
                                                setDurationValue((prevState => ({
                                                    ...prevState,
                                                    [e.target.name]: e.target.value,

                                                })))
                                            }
                                            
                                        >
                                            <option value = "" disabled>Select a course duration</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>    



                                    </div>
                                )}
                                <div className="pt-4"><Button type="submit" btnText="Submit" /></div>

                            </fieldset>
                        </form>
                    </div>
                ) : (
                    <div className="mt-6 flex space-x-4 justify-center">
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
                    </div>
                )}
            <Footer />
        </>
    )
}

export default Oral