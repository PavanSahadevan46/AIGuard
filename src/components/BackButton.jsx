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