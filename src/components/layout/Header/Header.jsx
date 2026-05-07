import { useAuth } from "../../../hooks/auth";
import { Link } from "react-router-dom";
import s from "./Header.module.css";
import logo96 from "../../../assets/img/logo-96.webp";
import { useEffect, useState } from "react";

export default function Header({ brand }){

    const { fetchBackend, user, logout } = useAuth();
    
    const [categories, setCategories] = useState([]);
    const [sidebar, setSidebar] = useState([]);

    const fetchCategories = async () => {
        
        const res = await fetchBackend("categories_list");
        if(!res.ok) 
            throw new Error(`Unable to get available categories: ${res.status}`);

        const json = await res.json();
        setCategories(Object.entries(json.data));

    }

    useEffect(() => {
        fetchCategories();
    })

    return(
        <header className={s.header}>
            <nav className={s.nav}>

                <ul className={s.nav__sidebar, sidebar && s.nav__sidebarActive}>

                    {categories?.map(([key, value]) => (
                        <li className={s.nav__sidebarEntry}>
                            <Link to={`/${key}`}>
                                {value}
                            </Link>
                        </li>
                    ))}

                </ul>

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