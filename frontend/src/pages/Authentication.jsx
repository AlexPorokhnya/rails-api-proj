import { useState } from "react"
import { Navigate, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const initialErrorsState = {
    email: "",
    password: "",
    api: "",
}

const Authentication = ({pageType = PageType.LOGIN}) => {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const [errors, setErrors] = useState(initialErrorsState);

    const navigate= useNavigate();


    const handleEmailChange =(e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange =(e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(pageType === PageType.LOGIN){
            axios.post("http://127.0.0.1:3000/users/sign_in", {
                user: {
                    email, 
                    password
                }
            }, 
            {
                withCredentials: true
            })
            .then(res => {
                console.log(res.data)
                console.log("Login successful", res.data.user);

                navigate("/");

            })
            .catch(err => {
                setErrors((prev) => ({
                    ...prev,
                    api: err.response?.data?.message || "An unexpected error occurred",
                }));
                console.error("Error logging in:", err.response?.data);
            })
            console.log("Email: ", email + "Password: ", password);
        }else{
            axios.post("http://127.0.0.1:3000/users", {
                user: {
                    email, 
                    password
                }
            },{
                withCredentials: true
            })
            .then(res => {
                console.log("Registration successful", res.data);

                navigate("/");
            })
            .catch(err => {
                setErrors((prev) => ({
                    ...prev,
                    api: err.response?.data?.message || "An unexpected error occurred",
                }));
                console.error("Error registration in:", err.response?.data);
            })
            console.log("Email: ", email + " Password: ", password);
        }

    }

    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100" style={{backgroundColor: "gray"}}>
                <div className="card d-flex justify-content-center align-items-center vh-100" style={{minWidth: 300, minHeight: 500, maxHeight: 600}}>
                    <div className="d-flex justify-content-center mt-4">
                        {pageType === PageType.LOGIN ? 
                        <div className=" card-title"style={{fontSize: 30}}>Login</div>
                        : 
                        <div className=" card-title"style={{fontSize: 30}}>REGISTER</div>
                        }
                    </div>
                

                    <form className="" onSubmit={handleSubmit}>
                        <div className="mb-3 ms-3 me-3 mt-5">
                            <input className=" form-control "
                            type="email" 
                            name="email" 
                            placeholder="Enter email"
                            onChange={handleEmailChange}
                            />
                            {errors.email && <p style={{color: "red"}}>{errors.email}</p>}
                        </div>
                        <div className="mb-3 ms-3 me-3">
                            <input className="form-control"
                            style={{maxWidth: 500, minWidth: 400}}
                            type="password" 
                            name="password" 
                            placeholder="Enter password"
                            onChange={handlePasswordChange} 
                            />
                            {errors.password && <p style={{color: "red"}}>{errors.password}</p>}
                        </div>
                        <button className="btn btn-primary ms-3 me-3" style={{maxWidth: 500, minWidth: 400, color: "white"}} type="submit">
                            {(pageType === PageType.LOGIN) ? 'LOGIN' : "REGISTER"}
                        </button>
                    </form>
                    <div className="mt-4">
                    {
                        pageType === PageType.LOGIN ? 
                        <div style={{fontSize: 20}}><span>Still don't have an account? </span><Link style={{textDecoration: "none"}} to="/register">Sign up</Link></div>
                        : 
                        <div style={{fontSize: 20}}><span>Already have an account? </span><Link style={{textDecoration: "none"}} to="/login">Log in</Link></div>
                    }
                    </div>
                </div>
            </div>
        </>
    )
}

export const PageType = Object.freeze({
    LOGIN : 0,
    REGISTER : 1,
})

export default Authentication;