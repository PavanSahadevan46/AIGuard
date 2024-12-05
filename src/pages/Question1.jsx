import Header from "../components/Header";
import Footer from "../components/footer";
import questions from "../questions.json"
function Question1() {
    var questionData = questions.find((q) => q.id === 1);
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
            </div>
            <Footer />
        </>
    )
}

export default Question1