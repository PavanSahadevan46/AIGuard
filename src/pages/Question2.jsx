import Header from "../components/Header";
import criteria from "../criteria.json";
import Button from "../components/Button";
import Footer from "../components/footer";

function Question2(){
    const questionData = criteria.Questions.find((q) => q.id === 2);
    return(
        <>
        <Header/>
        <h1>{questionData.question}</h1>
        <Button btnText="Yes"/>
        <Button btnText="No"/>
        <Footer />
        </>
    )
}

export default Question2