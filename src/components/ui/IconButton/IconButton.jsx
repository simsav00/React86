import s from "./IconButton.module.css";

export default function IconButton({ children, text=null, button=false, ariaLabel, ...props }){

    if(button && !ariaLabel)
        throw new Error("Aria label is required.");

    return(
        <>

        {button ? (

            <button className={s.iconButton} {...props} aria-label={ariaLabel}>
                {children}

                {text && (
                    <span className={s.iconButton__text}>
                        {text}
                    </span>
                )}
            </button>

        ) : (
            <div className={s.iconButton} {...props}>
                {children}

                {text && (
                    <span className={s.iconButton__text}>
                        {text}
                    </span>
                )}
            </div>
        )}

        </>
    )
}