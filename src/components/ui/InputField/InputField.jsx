import s from "./InputField.module.css";
import icons from "../icons/iconMap";

export default function InputField({ type="text", id=null, icon=null, ...props }){

    const Icon = icon ? icons[icon] : null;

    if(!id)
        throw new Error(`Attribute "id" is mandatory.`);
    

    return(
        <div className={s.field}>
            {Icon && (
                <label htmlFor={id} aria-hidden="true">
                    <Icon/>
                </label>
            )}
            
            {type === "textarea" ? (
                <textarea id={id} {...props}></textarea>
            ) : (
                <input type={type} id={id} {...props} />
            )}
        </div>
    )
}