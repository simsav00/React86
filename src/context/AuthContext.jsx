import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children} ) => {

    const base_url = "http://localhost/Auto86/";
    const fetchBackend = (type, options = {}, additionalParams = {}) => {

        const params = new URLSearchParams({
          t: type,
          ...additionalParams,
        });

        return fetch(`${base_url}?${String(params)}`, {
            method: options.method || "POST",
            credentials: "include",
            cache: "no-store",
            ...options
        });
    }

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const fetchMe = async () => {
            try{
                const res = await fetchBackend("me");

                if(!res.ok) 
                    throw new Error(`HTTP Error while fetching user: ${res.status}`);

                const userData = await res.json();
                
                userData.data ? setUser(userData.data) : setUser(null);
            
            }
            catch(e){
                console.error(`Unable to fetch user: ${e}`);
                setUser(null);
            }
            finally{
                setLoading(false);
            }
        }

        fetchMe();
    },[]);

    const login = async (formData) => {

        setLoading(true);

        try{
            const resLogin = await fetchBackend("login", { body: formData })

            if(resLogin.status === 401) 
                throw new Error("Invalid credentials.");

            if(!resLogin.ok)
                throw new Error(`Error while logging in: ${resLogin.status}`);

            const resMe = await fetchBackend("me");
            const userData = await resMe.json();

            if(!resMe.ok)
                throw new Error(`Error while fetching userData: ${resMe.status}`);

            userData.data && setUser(userData.data);
        }
        finally{
            setLoading(false);
        }
    }

    const register = async (formData) => {
        
        setLoading(true);

        try{
            const resRegister = await fetchBackend("register", { body: formData });
            const resData = await resRegister.json();

            if(resRegister.status === 400)
                throw new Error(resData.message || "Username or password cannot be empty.");

            if(resRegister.status === 409)
                throw new Error(resData.message || "Username already exists.");

            if(resRegister.status === 201)
                return resData;
        
        } finally{

            setLoading(false);
        }
    }

    const logout = async () => {

        setLoading(true);
        
        try{
            const resLogout = await fetchBackend("logout");

            if(!resLogout.ok)
                throw new Error(`Error while logging user out: ${resLogout.status}`);

            setUser(null);

        } finally{
            setLoading(false);
        }
    }

    return(
        <AuthContext.Provider value={{ user, loading, logout, login, register, fetchBackend }}>
            {children}
        </AuthContext.Provider>
    )
}