import s from "./IconButton.module.css";

export default function IconButton({ children, text=null, ...props }){

    return(
        <button className={s.iconButton} {...props}>
            {children}

            {text && (
                <span className={s.iconButton__text}>
                    {text}
                </span>
            )}
        </button>
    )
}