import s from "./IconButton.module.css";
import icons from "../icons/iconMap";

export default function IconButton({ text=null, elementType="div", icon=null, iconWidth=1.5, hover=true, ...props }){

    const Icon = icons ? icons[icon] : null;

    const Component = elementType;

    return(

        <Component className={`${s.iconButton} ${hover && s.iconButtonHover}`} {...props}>
            {Icon && <Icon />}

            {text && (
                <span className={s.iconButton__text}>
                    {text}
                </span>
            )}
        </Component>

    )
}