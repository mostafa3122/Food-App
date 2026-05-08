import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react'
export let AuthContext = createContext(null);
export default function AuthContextProvider(props) {
    const [loginData, setLoginData] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const saveLoginData = () => {
        let encodedToken = localStorage.getItem("token");
        let decodedtoken = jwtDecode(encodedToken);
        setLoginData(decodedtoken);

    }
    useEffect(() => {

        if (localStorage.getItem("token")) {
            saveLoginData()
        }
        setIsLoading(false)
    }, []);

    return (
        <AuthContext.Provider value={{ loginData, setLoginData, saveLoginData,isLoading }}>
            {props.children}
        </AuthContext.Provider>
    )
}
