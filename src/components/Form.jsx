import Button from "./Button"

function Form(fields) {
    fields = [];
    return (
        <form>
            <fieldset>
                {fields.map((field)=>(
                    <div key={field.id}>
                        <label>{field.label}</label>
                        <input type="" placeholder=""/>
                    </div>
                )
            )}
            <Button type= "submit" btnText ="Submit"/>
            </fieldset>
        </form>

    )
}
export default Form


//     < div >
//     <form>
//         <fieldset>
//             {oralData.map((oral) =>
//                 <div key={oral.id}>
//                     <label>{oral.glucocorticoid}</label>
//                     <input type="number" placeholder="Enter daily dose" />
//                 </div>
//             )}
//             <Button type="submit" btnText="Submit" />
//         </fieldset>
//     </form>
// </div >