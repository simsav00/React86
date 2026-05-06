import s from "./Login.module.css";
import AuthCard from "../../components/ui/AuthCard/AuthCard";
import InputField from "../../components/ui/InputField/InputField";
import logo192 from "../../assets/img/logo-192.webp";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth";
import { replace, useNavigate } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";


export default function Login(){
    
    const navigate = useNavigate();
    const { login, user } = useAuth();

    if(user) navigate("/");
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const handleLogin = async (e) => {

        e.preventDefault();
        setError("");

        NProgress.start();

        let trimmedUsername = username.trim();
        let trimmedPassword = password.trim();

        if (!trimmedUsername || !trimmedPassword){
            NProgress.done();
            return setError("Username and password cannot be empty.");
        }

        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        try{
            await login(formData);
            navigate("/", replace);
        }
        catch(err) {
            setError(err.message);
        }     
        finally{
            NProgress.done();
            return;
        }       
    }
    
    return(
        <section className={s.login}>
            <AuthCard
               logo={logo192} 
               title={"Login"}
               authText={{
                text: "New here?",
                link: "/register",
                textLink: "Create an account"
               }}
               formProps={{
                errorMessage: error,
                onSubmit: handleLogin
               }}>
                
               <InputField 
                    id="username"
                    type="text"
                    icon="user"
                    placeholder="Username"
                    onClick={() => setError("")}
                    onChange={(e) => setUsername(e.target.value)} 
                />

                <InputField 
                    id="password"
                    type="password"
                    icon="password"
                    placeholder="Password"
                    onClick={() => setError("")}
                    onChange={(e) => setPassword(e.target.value)} 
                />

                <InputField 
                    id="submitForm"
                    type="submit"
                    value="Log in"
                    onClick={() => setError("")}
                />
            </AuthCard>
        </section>
    );
}