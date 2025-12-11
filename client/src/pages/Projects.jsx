import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import { useGitHook } from "../hooks/useGitHook";




function Projects() {

    const { cloneRepo } = useGitHook();

    return (
        <>
            <Nav/>
            <div className="home-container flex flex-col justify-around items-center gap-12 mt-24">
                Projects
                <button className="text-white" onClick={async () => {let val = await cloneRepo(); console.log(val)}}>cloneRepo</button>
            </div>
        </>
    )
}

export default Projects