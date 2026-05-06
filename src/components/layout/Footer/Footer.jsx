import s from "./Footer.module.css";

export default function Footer(){

    return(
        <footer className={s.footer} dangerouslySetInnerHTML={{ __html: "Copyright 2026 Auto86" }}>

        </footer>
    )
}