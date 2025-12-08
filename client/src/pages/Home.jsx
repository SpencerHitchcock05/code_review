import { Link } from "react-router-dom";
import Nav from "../components/Nav";




function Home() {


    return (
        <>
            <Nav/>
            <div className="home-container flex flex-col justify-around items-center gap-12 mt-24">
                HOME
            </div>
        </>
    )
}

export default Home