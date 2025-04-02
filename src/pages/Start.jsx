import { Button } from "@/components/ui/button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card.jsx";
import tempImg from "../assets/temp1.png";
import { useNavigate } from "react-router-dom";

// TODO: Refactor this so user is met with 1 button and a modal pops up asking user to accept warning terms
function Start() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-auto bg-white">
        <Card
          className="startingCard"
          img={tempImg}
          title={"AIGuard"}
          description={
            <>
              Please do not use this application in real world applications.
              <br />
              Press Yes if you agree to these terms or No if you do not.
            </>
          }
        >
          <div className="mt-6 flex space-x-4 justify-center" >
            <Button  onClick={() => navigate("/q1")} >Yes</Button>
            <Button
              onClick={() => alert("Please cease use of this application!")}
            >No</Button>
          </div>
        </Card>
      </div>
      <Footer />
    </>
  );
}

export default Start;
