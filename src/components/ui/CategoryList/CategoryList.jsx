import s from "./CategoryList.module.css";
import FluentCard from "../FluentCard";
import { useState } from "react";

export default function CategoryList({ title, list }){

    const [collapse, setCollapse] = useState(false);
    
    return(
        <FluentCard className={s.categoryList}>
            <div className={s.categoryList__header}>
                <h2 className={s.categoryList__title}>
                    {title}
                </h2>

                <IconButton className={s.categoryList__toggleButton} onClick={setCollapse(!collapse)}>
                    {collapse ? "☰" : "✕"}
                </IconButton>
            </div>

            {list && (
                <ul className={s.categoryList__content}>

                    {list?.map(({ name, link }) => (

                        <li key={name}>
                            
                        </li>

                    ))}
                    
                </ul>
            )}
                
        </FluentCard>
    )
}