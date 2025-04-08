/**
 * Error page if an unknown page is accessed either through url or incorrect routing
 */

/**
 * Dependencies and components:
 * 
 * Header & Footer - reusable header and footer component
 * React-router-dom - client side routing
 * Button - shadcn ui component
 */
import Header from "../components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function NoPage(){
    // react router navigation hook
    const nav = useNavigate();
    // define main content
    let content;
    content = (
        <>
          <div>
            <h1 className="text-2xl font-semibold mb-4 text-left ">
              Sorry an error occured
            </h1>
            <h2 className="text-xl font-semibold mb-4 text-left ">
              You may need to start from the beginning.
            </h2>
          </div>
          <div className="mt-6 flex flex-col md:flex-row float-left gap-7 max-w-md w-full mx-auto">
            <Button
              className="btn-primary"
              onClick={() => {
                nav("/start"); // navigate to start
              }}
            >
              Start again
            </Button>
          </div>
        </>
    );
    return (
        <div className="grid grid-cols-1 bg-white">
          <Header />
          <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-6">
            <>
              <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-6">
                {content}
              </div>
            </>
          </div>
          <Footer />
        </div>
      );
}

export default NoPage