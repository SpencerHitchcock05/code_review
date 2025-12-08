import paths from "../paths";
import axios from "axios"
import { useContext } from "react"
import { UserContext } from "../context/userContext.jsx"



const apiUrl = import.meta.env.VITE_API_URL;

export const useAuthHook = () => {
    const { setUser } = useContext(UserContext);
    
    const login = async (data) => {
        try {
            const response = await axios.post(`${apiUrl}${paths.Users.Base}${paths.Users.Login}`, data, { withCredentials: true });
            if (response.status == 200) {
                setUser(response.data.user)
            }
            return response.status
        } catch (error) {
            return error.status;
        }
    }

     const register = async (data) => {
        try {
            const response = await axios.post(`${apiUrl}${paths.Users.Base}${paths.Users.Register}`, data, { withCredentials: true })
            if (response.status == 200 || response.status == 201) {
                setUser(response.data.user)
            }
            return response.status
        } catch (error) {
            return error.status;
        }
    }

    const checkAuth = async () => {
        try {
            const response = await axios.get(`${apiUrl}${paths.Users.Base}${paths.Users.CheckAuth}`, { withCredentials: true });
            if (response.status == 200) {
                setUser(response.data.user)
            }
            return response.data.user;
        } catch (error) {
            return undefined
        }
    }

    const logout = async () => {
        try {
            const response = await axios.post(`${apiUrl}${paths.Users.Base}${paths.Users.Logout}`, null, { withCredentials: true });
            if (response.status == 200) {
                setUser(null)
                console.log("YAYA")
            }
        } catch (error) {
            console.error("Error logging out", error)
        }
    }

    return {
        login,
        register,
        checkAuth,
        logout,
    }
}