import axios, { all } from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AllPosts = () => {
    const [post, setPost] = useState({});
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(localStorage.getItem("authTocken"))
        axios({
            url: "http://localhost:3000/api/v1/posts",
            method: "POST",
            headers: {
                Authorization: localStorage.getItem("authTocken")
            },
            data: {
                post:{
                    ...post,
                },
            },

        }).then((res) => {
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