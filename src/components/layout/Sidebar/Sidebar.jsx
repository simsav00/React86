import { Link, useLocation, useParams } from "react-router-dom";
import IconButton from "../../ui/IconButton/IconButton";
import SmallText from "../../ui/SmallText"
import s from "./Sidebar.module.css";
import { useAuth } from "../../../hooks/auth";
import { useEffect, useState } from "react";

export default function Sidebar({ sidebar, setSidebar }){

    const { fetchBackend } = useAuth();
    const { category } = useParams();
    const [categories, setCategories] = useState([]);
    const [onclickClose, setOnclickClose] = useState(false);
    const { pathname } = useLocation();

    const getCategoriesList = async () => {

        const res = await fetchBackend("categories_list", {
            method: "GET"
        });

        if(!res.ok)
            throw new Error("Unable to get categories list: " + res.status);

        const json = await res.json();

        setCategories(Object.entries(json.data));
    }

    useEffect(() => {
        getCategoriesList();
    }, []);

    useEffect(() => {
        
        const handleResize = () => {
            if(window.matchMedia("(min-width:1400px)").matches && /^\/[^/]*$/.test(pathname))
            {
                console.log(pathname)
                setSidebar(true);
                setOnclickClose(false);
            }
            else{
                setSidebar(false);
                setOnclickClose(true);
            }

        }

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [pathname]);

    return(
        <>
            <aside className={`${s.sidebar} ${sidebar ? s.sidebarActive : ""}`}>

                <header className={s.sidebar__header}>
                    <h2 className={s.sidebar__title}>
                        Categories
                    </h2>
                </header>
                
                <ul className={s.sidebar__ul}>

                    {categories?.map(([key, value]) => (

                        <li className={`${s.sidebar__li} ${category === key ? s.sidebar__aActive : ""}`} key={key}>
                            <Link to={`/${key}`} 
                                  className={`${s.sidebar__a}`}
                                  onClick={() => {
                                    onclickClose && setSidebar(!sidebar);
                                  }}>
                                <IconButton text={value} 
                                            hover={false} 
                                            icon={
                                                  key.toLowerCase() === "resizelog" ? "info"
                                                : key.toLowerCase() === "all" ? "hamburgermenu" 
                                                : "car"
                                            }
                                            className={`${s.sidebar__aIcon}`}
                                />
                            </Link>
                        </li>

                    ))}

                </ul>
                
                <footer className={s.sidebar__footer}>
                    <SmallText>
                        Copyright 2026 © Auto86
                    </SmallText>
                </footer>   
            </aside>

            <div className={`${s.sidebar__overlay} ${sidebar ? s.sidebar__overlayActive : ""}`} 
                 aria-hidden="true"
                 onClick={() => setSidebar(!sidebar)}></div>
        </>
    )
}