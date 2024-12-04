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
            })
            .then(res => {
                const token = res.headers["authorization"];
                console.log("Token:", token);

                localStorage.setItem("authTocken", token);

                console.log("Login successful", res.data);
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
            })
            .then(res => {
                const token = res.headers["authorization"];
                console.log("Token:", token);

                localStorage.setItem("authTocken", token);

                console.log("Registration successful", res.data);
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
            <div>
                {pageType === PageType.LOGIN ? 
                <div>LOGIN</div>
                : 
                <div>REGISTER</div>
                }

                {
                    pageType === PageType.LOGIN ? 
                    <div>Still don't have an account? <Link to="/register">Sign up</Link></div>
                    : 
                    <div>Already have an account? <Link to="/login">Log in</Link></div>
                }
            

                <form onSubmit={handleSubmit}>
                    <div>
                        <input 
                        type="email" 
                        name="email" 
                        placeholder="Enter email"
                        onChange={handleEmailChange}
                        />
                        {errors.email && <p style={{color: "red"}}>{errors.email}</p>}
                    </div>
                    <div>
                        <input 
                        type="password" 
                        name="password" 
                        placeholder="Enter password"
                        onChange={handlePasswordChange} 
                        />
                        {errors.password && <p style={{color: "red"}}>{errors.password}</p>}
                    </div>
                    <button type="submit">
                        {(pageType === PageType.LOGIN) ? 'LOGIN' : "REGISTER"}
                    </button>
                </form>
            </div>
        </>
    )
}

export const PageType = Object.freeze({
    LOGIN : 0,
    REGISTER : 1,
})

export default Authentication;