import { useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { auto } from "@popperjs/core";


const Navbar = () => {

    const [user, setUser] = useState(null);
    const [render, setRender] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get("http://127.0.0.1:3000/current_user", {
            withCredentials: true
        }).then(resp => {
            console.log("User: ", resp.data)
            setUser(resp.data)
        }).catch(error => {"Errors", error.message})
    }, [render])

    const logOut = () => {
        setRender(!render)
    }
    
    return (
        <>
            <div className=" d-flex flex-column" style={{backgroundColor: "gray", maxHeight: auto, maxWidth: 400, minWidth: 250}}>
                <div className="container-fluid">
                    <a style={{fontSize: 30, color: "black", textDecoration: "none"}}>Posts</a>
                </div>
                <div className="ms-3">
                    <div className="navbar-nav ms-auto d-flex flex-column">
                        <Link className="nav-link active" style = {{fontSize: 20, whiteSpace: "nowrap"}} to="/">Home</Link>
                        <Link className="nav-link active" style = {{fontSize: 20, whiteSpace: "nowrap"}} to="/posts">All posts</Link>
                        <button className="nav-link active mb-3" style = {{fontSize: 20, whiteSpace: "nowrap", alignSelf: "start"}} onClick={() => navigate("/newPost")}>Create post</button>
                        {!user ?
                        <button className="btn btn-success mt-auto" style = {{fontSize: 20, whiteSpace: "nowrap", maxWidth: 150}} onClick={() => navigate("/login")}>Log In</button>
                        : 
                        <button className="btn btn-success mt-auto" style = {{fontSize: 20, whiteSpace: "nowrap", maxWidth: 150}} onClick={logOut}>Log Out</button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar