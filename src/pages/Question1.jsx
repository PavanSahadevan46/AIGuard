import Header from "../components/Header";
import Footer from "../components/footer";
import criteria from "../criteria.json"
import Button from "../components/Button";
import { BrowserRouter, Routes, Route ,useNavigate} from "react-router-dom";
function Question1() {
    const nav = useNavigate();
    var questionData = criteria.Questions.find((q) => q.id === 1);
    return (
        <>
            <Header />
            <div className="container">
                <h2>{questionData.question}</h2>
                <ul>
                    {questionData.options.map((option, index) => (
                        <li key={index}>{option}</li>
                    ))}
                </ul>
                <Button btnText="Yes" onClick={ ()=> nav("/sec")} /> 
                <Button btnText="No" onClick={ ()=> nav("/routes")}/>
            </div>
            <Footer />
        </>
    )
}

export default Question1