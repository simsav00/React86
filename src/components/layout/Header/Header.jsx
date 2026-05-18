import { useAuth } from "../../../hooks/auth";
import { Link } from "react-router-dom";
import s from "./Header.module.css";
import logo96 from "../../../assets/img/logo-96.webp";
import { useEffect, useState } from "react";
import IconButton from "../../ui/IconButton/IconButton";
import Sidebar from "../Sidebar/Sidebar";

export default function Header({ brand }){

    const { fetchBackend, user, logout } = useAuth();
    
    const [sidebar, setSidebar] = useState(false);

    return(
        <div className={s.wrapper}>
            <header className={s.header}>
                <nav className={s.nav}>
                    <IconButton icon="hamburgermenu" 
                                elementType="button" 
                                className={s.nav__sidebarBtn}
                                title="Open car categories sidebar." 
                                aria-label="Open car categories sidebar."
                                onClick={() => setSidebar(!sidebar)}
                                >
                    </IconButton>

                    <div className={s.nav__brand}>
                        <img className={s.nav__img} src={logo96} alt={`AUTO86 logo.`} />

                        <a className={s.nav__title} href="/">
                            <span className={s.nav__firstName}>AUTO</span>
                            <span className={s.nav__lastName} >86</span>
                        </a>
                    </div>

                    {user && (
                        <div className={s.nav__user}>
                            <img className={s.nav__pfp} src={user.avatar} alt={`${user.username}'s profile picture.`} />
                            <span className={s.nav__username}>
                                {user.username}
                            </span>
                        </div>
                    )}
                    
                </nav>
            </header>

            <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        </div>
    )
}