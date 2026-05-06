
export default function SmallText({ children, muted=true, style, ...props }){

    return(
        <small style={{ ...style, ...(muted && {opacity: .7}) }} {...props}>
            {children}
        </small>
    )
}