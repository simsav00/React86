import s from "./AuthCard.module.css";
import FormCard from "../FormCard/FormCard";
import { useNavigate, Link } from "react-router-dom";
import SmallText from "../SmallText";
import FluentCard from "../FluentCard";

export default function AuthCard({ children, logo, title, authText, formProps }){

    return(
        <FluentCard elementType="section" className={s.authCard}>
            <img src={logo} className={s.authCard__img} alt="Logo" />
            <h2 className={s.authCard__title}>
                {title}
            </h2>

            <FormCard {...formProps}>
                {children}
            </FormCard>

            <SmallText className={s.authCard__smallText}>
                {authText?.text + " "}
                <Link to={authText?.link}>
                    {authText?.textLink}
                </Link>
            </SmallText>
        </FluentCard>
    )
}