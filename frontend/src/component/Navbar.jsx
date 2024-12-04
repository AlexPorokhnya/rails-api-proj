import { useNavigate, Link } from "react-router-dom"


const Navbar = () => {

    const navigate = useNavigate();
    return (
        <>
            <div className="navbar navbar-expand-lg d-flex justify-content-between" style={{backgroundColor: "gray"}}>
                <div className="container-fluid">
                    <a className="navbar-brand ms-3" style={{fontSize: 30}}>Posts</a>
                </div>
                <div className="navbar-collapse">
                    <div className="navbar-nav me-4">
                        <Link className="nav-link active" style = {{fontSize: 20, whiteSpace: "nowrap"}} to="/">Home</Link>
                        <Link className="nav-link active" style = {{fontSize: 20, whiteSpace: "nowrap"}} to="/">All posts</Link>
                        <button className="nav-link active" style = {{fontSize: 20, whiteSpace: "nowrap"}} onClick={() => navigate("/newPost")}>Create post</button>
                        <button className="btn btn-primary" style = {{fontSize: 20, whiteSpace: "nowrap"}} onClick={() => navigate("/login")}>Log In</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar