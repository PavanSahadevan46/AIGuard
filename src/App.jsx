import Header from "./components/Header.jsx"
import Card from "./components/Card.jsx"
import logo from "./assets/temp.png";
import questions from "./questions.json"
import CardList from "./components/CardList.jsx";
function App() {

  var questionsArr = questions;
  return (
    <>
      <Header />
      <Card/>
      <CardList cardContent={questionsArr.filter((q => q.questionId === 3))} />
    </>
  )
}

export default App
