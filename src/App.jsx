import Header from "./components/layout/Header/Header";
// import Footer from "./components/layout/Footer/Footer"
import { Outlet, useLocation } from "react-router-dom";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";

export default function App(){


    return(
        <>
            <Header/>

            <main className="appMain">

                <Outlet/>

            </main>

        </>
    )
}