function Button(props) {
    return (
        <button className="button 
        px-4
        py-2
        border
        border-blue-500
        text-black-500
        rounded
        bg-gray-300
"
            type={props.type}
            onClick={props.onClick}>
            {props.btnText}
        </button>

    )
}

export default Button