
import s from "./FormCard.module.css";

export default function FormCard({ children, errorMessage="", onSubmit, widthSize=15, ...props }){
    
    const activeError = !!errorMessage;

    return(
        <form onSubmit={onSubmit} 
              className={s.form} {...props}
              style={{ width: widthSize === "full" ? "100%" : `min(${widthSize}rem, 100%)` }}>
            <div className={`${s.form__error} ${activeError && s.errorActive}`}>
                <span>
                    {errorMessage}
                </span>
            </div>
        
            {children}
        </form>
    )
}