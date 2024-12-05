import Header from "./components/Header.jsx"
import Card from "./components/Card.jsx"
import tempImg from "./assets/temp1.png";
import questions from "./questions.json"
import CardList from "./components/CardList.jsx";
function App() {

  var questionsArr = questions;
  return (
    <>
      <Header />
      <Card className ="startingCard"
        img={tempImg}
        title={"AIGuard"}
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. "}
      />
      {/* <CardList cardContent={questionsArr.filter((q => q.questionId === 3))} /> */}
    </>
  )
}

export default App
