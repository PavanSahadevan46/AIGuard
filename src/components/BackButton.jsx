/**
 * BackButton component
 * 
 * A reusable component that is a custom wrapper of a shadcn ui component,
 * that renders a go  back button where used with a left chevron from lucide react icon.
 * This component uses preset custom styles via props and provides an onClick handler as a prop.
 * 
 * @author Pavan Sahadevan
 * @version 1.0
 * Developed as a proof of concept for NHS England and as a final year project for CI601 from the University of Brighton.
 */

/**
 * Button - Shadcn UI component
 * Lucide - Icon library 
 */
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const BackButton = ({
  onClick,
  containerStyle = "flex",
  buttonStyle = "text-sapphire hover:text-pink-900",
  chevronStyle = "w-5 h-4",
  text = "Go Back",
}) => {
  return (
    <div className={containerStyle}>
      <Button variant="link" className={buttonStyle} onClick={onClick}>
        <ChevronLeft className={chevronStyle} />
        {text}
      </Button>
    </div>
  );
};

export default BackButton;