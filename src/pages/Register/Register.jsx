import s from "./Register.module.css";
import AuthCard from "../../components/ui/AuthCard/AuthCard";
import InputField from "../../components/ui/InputField/InputField";
import logo192 from "../../assets/img/logo-192.webp";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth";
import { replace, useNavigate } from "react-router-dom";
import nProgress from "nprogress";

nProgress.configure({
    showSpinner: false,
    trickleSpeed: 100,
    minimum: 0.08
});


export default function Register(){
    
    const { register } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    
    const [error, setError] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();
        nProgress.start();

        if(!password || !username){
            nProgress.done();
            return setError("Username and password cannot be empty.")
        }

        if(username.length < 3 || username.length > 20){
            nProgress.done();
            return setError("Username must be 3-20 characters.");
        }

        if(password.length < 6 || password.length > 32){
            nProgress.done();
            return setError("Password must be 6-32 characters.");
        }

        if(password !== repeatPassword){
            nProgress.done();
            return setError("Password and repeat password does not match.");
        }

        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        try{
            await register(formData);

            navigate("/login", {replace: true});
        }
        catch(err){
            setError(err.message);
        }
        finally{
            nProgress.done();
        }
    }

    return(
        <section className={s.register}>
            <AuthCard 
                logo={logo192}
                title="Register"
                authText={{
                    text: "Already have an account?",
                    link: "/login",
                    textLink: "Login"
                }}
                formProps={{
                    errorMessage: error,
                    onSubmit: handleRegister
                }}
                >

                <InputField 
                    id="Username"
                    placeholder="Username"
                    icon="user"
                    type="text"
                    onClick={() => setError("")}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <InputField 
                    id="Password"
                    placeholder="Password"
                    icon="password"
                    type="password"
                    onClick={() => setError("")}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <InputField 
                    id="repeatPassword"
                    placeholder="Repeat Password"
                    icon="password"
                    type="password"
                    onClick={() => setError("")}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                />

                <InputField 
                    id="submitBtn"
                    type="submit"
                    value="Register"
                />
                
            </AuthCard>
        </section>
    )
}