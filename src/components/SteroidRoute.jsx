import { useNavigate } from "react-router-dom";

function SteroidRoute({title}){
    const nav = useNavigate();
    return(
        <div className="container mx-auto px-2 py-3 font-bold text-center mb-3 align-middle border-1 rounded" 
        
        onClick={() => 
            nav(`${title.toLowerCase()}`)
        }>
            {title}
        </div>
    )
}   

export default SteroidRoute