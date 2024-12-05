function Button(props){
    return(
        <button className="button" onClick={props.onClick}>{props.btnText}</button>
    )
}

export default Button