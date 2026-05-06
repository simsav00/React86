
export default function FluentCard({ children, style, brighter=false, elementType="div", ...props }){

    const Component = elementType;

    return(
        <Component style={{ background: brighter ? "var(--elevated-component)" : "var(--elevated)", 
                            border: ".15rem solid var(--elevated-component)", 
                            borderRadius: ".5rem", 
                            ...style  }} 
                            {...props}
                            >
            {children}
        </Component>
    )
}