function Button(props) {
  return (
    <button
      className="button 
        px-6
        py-3
        text-black-500
        rounded
        bg-gray-300
        w-full
        text-lg
"
      type={props.type}
      onClick={props.onClick}
    >
      {props.btnText}
    </button>
  );
}

export default Button;
