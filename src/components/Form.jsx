function Form(question,placeholder) {
    return (
        <>
            <div>
                <label>{question}</label>
                <input 
                placeholder={placeholder}
                />
            </div>
        </>

    )
}
export default Form