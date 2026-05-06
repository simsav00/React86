import { useAuth } from "../../../hooks/auth";
import { Link } from "react-router-dom";
import s from "./Header.module.css";
import logo96 from "../../../assets/img/logo-96.webp";

export default function Header({ brand }){

    const { user, logout } = useAuth();

    return(
        <header className={s.header}>
            <nav className={s.nav}>

                {/* {brand && (
                    <div className={s.nav__brand}>
                        <img className={s.nav__img} src={brand?.logo} alt={`${brand?.firstName}${brand?.lastName} logo.`} />

                        <a className={s.nav__title} href={brand.href || "/"}>
                            <span className={s.nav__firstName}>{brand?.firstName}</span>
                            <span className={s.nav__lastName}>{brand?.lastName}</span>
                        </a>
                    </div>
                )} */}

                <div className={s.nav__brand}>
                    <img className={s.nav__img} src={logo96} alt={`AUTO86 logo.`} />

                    <a className={s.nav__title} href="/">
                        <span className={s.nav__firstName}>AUTO</span>
                        <span className={s.nav__lastName} >86</span>
                    </a>
                </div>

                {user && (
                    <ul className={s.nav__ul}>
                        <li>{user.username}</li>
                        <li>
                            <Link onClick={logout}>
                                logout
                            </Link>
                        </li>
                    </ul>
                )}
                  
            </nav>
        </header>
    )
}