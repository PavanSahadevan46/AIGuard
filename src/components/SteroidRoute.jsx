import { useNavigate } from "react-router-dom";

function SteroidRoute({title}){
    const nav = useNavigate();
    return(
        <div onClick={() => 
            nav(`${title}`)
        }>
            {title}
        </div>
    )
}   

export default SteroidRoute