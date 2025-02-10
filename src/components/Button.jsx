function Button(props){
    return(
        <button className="button" type = {props.type} onClick={props.onClick}>{props.btnText}</button>
        
    )
}

export default Button