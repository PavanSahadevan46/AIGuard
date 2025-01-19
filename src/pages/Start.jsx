import Button from "../components/Button.jsx";
import Header from "../components/Header.jsx"
import Footer from "../components/footer";
import Card from "../components/Card.jsx"
import tempImg from "../assets/temp1.png";
import { BrowserRouter, Routes, Route ,useNavigate} from "react-router-dom";


// TODO: Refactor this so user is met with 1 button and a modal pops up asking user to accept warning terms
function Start() {

    const navigate = useNavigate()
    return (
        <>
            <Header />
            <Card className="startingCard"
                img={tempImg}
                title={"AIGuard"}
                description={
                    <>
                    Please do not use this application in real world applications.<br />
                    Press Yes if you agree to these terms or No if you do not.
                    </>
                    }
            >
                <Button btnText="Yes" onClick={() => navigate("/q1")} />
                <Button btnText="No" onClick={() => alert("Please cease use of this application!")}/>
            </Card>
            <Footer />
        </>
    )

}

export default Start