/* eslint-disable */
import Cookies from 'js-cookie'
import { useState,useEffect, useContext,createContext } from "react";

import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";



export const AuthContext = createContext()

//  esto es para importar con useAuth todos los datos del signup y user
export const useAuth = () =>{
    const context = useContext(AuthContext);
    if (!context){
        throw new error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true)

    const signup = async (user) => {
          try {
             const res = await registerRequest(user)
            console.log(res.data);
            setUser(res.data)
            setLoading(true)
            setIsAuthenticated(true)
          } catch (error) {
             setErrors(error.response.data)
          }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            console.log(res)
             setIsAuthenticated(true)
             setLoading(true)
             setUser(res.data)
        } catch (error) {
            console.log("error login",error)
            if (Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
        setLoading(false)
    }

    const logout = () => {
        Cookies.remove("token", {
            path: "/", // Asegura que la cookie se elimine en todas las rutas del dominio
            domain: ".pixeltech.es", // Reemplaza "tu-dominio.com" con el dominio real de tu aplicación
            secure: true, // Asegura que la cookie solo se envíe a través de conexiones seguras HTTPS
            sameSite: 'none' // Especifica que la cookie no debe ser enviada con solicitudes de navegación de primer nivel desde otros sitios
          });
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false)
    }
    // esto limpia el error del input del formulario
    useEffect(()=>{
        if (errors.length > 0){
            const timer = setTimeout(()=>{
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    
    useEffect(()=>{
        async function checkLogin() {
            const cookies = Cookies.get();
            if (!cookies.token){
                setIsAuthenticated(false)
                setLoading(false)
                return setUser(null)
            }
                try {
                    const res = await verifyTokenRequest(cookies.token)
                    if (!res.data) {
                    setIsAuthenticated(false)
                    setLoading(false)
                    return;
                }
                    setIsAuthenticated(true);
                    setUser(res.data);
                    setLoading(false)
                } catch (error) {
                    console.log(error)
                    setIsAuthenticated(false);
                    setUser(null);
                    setLoading(false)
                }
        }
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated,signin,logout,signup,loading,user,errors}}>
            {children}
        </AuthContext.Provider>
    )
}