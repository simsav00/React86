import IconButton from "../../ui/IconButton/IconButton";

export default function Sidebar({ active }){

    return(
        <aside className={`${s.sidebar} ${active && s.nav__sidebarActive}`}>
            
            <ul className={s.sidebar__ul}>
                {categories?.map(([key, value]) => (
                    <li className={s.sidebar__li} key={key}>
                        <Link to={`/${key}`} className={s.sidebar__a}>
                            <IconButton text={value} hover={false} icon="car"/>
                        </Link>
                    </li>
                ))}
            </ul>
            

        </aside>
    )
}