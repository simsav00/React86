import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import IconButton from "./IconButton/IconButton";

export default function BackButton({ ...props }){

    const navigate = useNavigate();

    const handleBack = () => window.history.length <= 1 ? navigate("/") : navigate(-1);

    return(
        <IconButton button={true} 
                    icon="back"
                    ariaLabel="Go back to previous page."
                    onClick={handleBack}
                    text="Go back"
                    style={{ padding: ".35rem", border: ".15rem solid var(--elevated-component)", borderRadius: ".5rem" }}
                    {...props}>


        </IconButton>
    )
}