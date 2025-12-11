import paths from "../paths";
import axios from "axios"
import { useContext } from "react"
import { UserContext } from "../context/userContext.jsx"


const apiUrl = import.meta.env.VITE_API_URL;

export const useGitHook = () => {

    // data : {url: string}
    const cloneRepo = async (data) => {
        try {
            const response = await axios.get(`${apiUrl}${paths.Repo.Base}${paths.Repo.CloneRepo}`, data, { withCredentials: true });
            return response.data;
        } catch (error) {
            return {error: error.status};
        }
    }

    return {
        cloneRepo,
    }
}