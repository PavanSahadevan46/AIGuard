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
            <div className="container mx-auto px-4 py-8">
                <h2 className ="text-xl font-semibold mb-4">{questionData.question}</h2>
                <ul className = "list-disc list-inside space-y-2">
                    {questionData.options.map((option, index) => (
                        <li key={index}>{option}</li>
                    ))}
                </ul>
                <div className= "mt-6 flex space-x-4">
                    <Button btnText="Yes" onClick={ ()=> nav("/sec")} /> 
                    <Button btnText="No" onClick={ ()=> nav("/routes")}/>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Question1