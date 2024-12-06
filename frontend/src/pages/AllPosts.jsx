import axios, { all } from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AllPosts = () => {
    const [post, setPost] = useState({});
    const [error, setError] = useState(null);
    const [user, setUser]=  useState(null);

    const navigate = useNavigate();

    useEffect(()=> {

        axios.get("http://127.0.0.1:3000/current_user", 
        {
            withCredentials: true
        }).then(resp => {
            console.log("User", resp.data);
            setUser(resp.data);
            console.log("User data: ", user)
        }).catch(error =>{
            console.log(error.data)
        })
    }, []);

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post("http://127.0.0.1:3000/api/v1/posts", {
                post
            },
            {
                withCredentials: true
            }    
        ).then((res) => {
            navigate("/");
        })
        .catch((err) => {
            setError(err.response?.data || "An unexpected error occurred");
            console.log("Error creating post: ", err.data)
        })
    }

    const handleChange= (e) => {
        e.preventDefault();

        setPost((prevPost => ({
            ...prevPost,
            [e.target.name]: e.target.value,
        })))

        console.log("Post: ", post);
    }
    return (
        <>
            <h1>New Post</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} type="text" placeholder = "Enter title" name="title"/>
                <input onChange={handleChange} type="text" placeholder = "Enter body" name="body"/>
                <button type="submit">OK</button>
            </form>
        </>
    )
}

export default AllPosts;