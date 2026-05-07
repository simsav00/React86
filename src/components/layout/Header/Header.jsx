import { useAuth } from "../../../hooks/auth";
import { Link } from "react-router-dom";
import s from "./Header.module.css";
import logo96 from "../../../assets/img/logo-96.webp";
import { useEffect, useState } from "react";
import IconButton from "../../ui/IconButton/IconButton";

export default function Header({ brand }){

    const { fetchBackend, user, logout } = useAuth();
    
    const [categories, setCategories] = useState([]);
    const [sidebar, setSidebar] = useState([]);

    return(
        <header className={s.header}>
            <nav className={s.nav}>
                

                <div className={s.nav__brand}>
                    <img className={s.nav__img} src={logo96} alt={`AUTO86 logo.`} />

                    <a className={s.nav__title} href="/">
                        <span className={s.nav__firstName}>AUTO</span>
                        <span className={s.nav__lastName} >86</span>
                    </a>
                </div>

                {user && (
                    <div>
                        {user.username}
                    </div>
                )}
                  
            </nav>
        </header>
    )
}