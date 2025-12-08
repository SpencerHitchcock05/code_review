import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext.jsx";
import { useAuthHook } from "../hooks/useAuthHook.js";
import { useNavigate, useLocation } from "react-router-dom";

function Nav() {
    const { user } = useContext(UserContext);
    const { logout } = useAuthHook();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await logout()
        if (location.pathname == '/') {
            navigate(0)
        } else {
            navigate('/')
        }
    }

    return (
        <>
            <nav id="nav-bar" className="flex justify-between">
                <div className="nav-logo-container overflow-hidden m-5">
                    <div id="nav-logo"><Link to='/'>foundation</Link></div>
                </div>
                <div className="nav-content flex justify-between m-12 gap-8">
                    <div>{user ? `Welcome, ${user.username}` : 'Try logging in!'}</div>
                    {user ? <button onClick={handleLogout}>Logout</button> : <Link to="/login" className="w-1/3 bg-light-color rounded-sm flex justify-center">login</Link>}
                    
                </div>
            </nav>
        </>
    )
}



export default Nav