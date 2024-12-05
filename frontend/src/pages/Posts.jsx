import { useState, useEffect, useReducer } from "react";
import axios from "axios";


const Posts = () => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [update, setUpdate] = useState(false);
    const [render, setRender] = useState(false);
    const [postId, setPostId] = useState(null);
    const [post, setPost] = useState({});

    const token = localStorage.getItem("authTocken")

    useEffect(()=> {
        const fetchUser = async () => {

            if(!token){
                console.error("Unauthorised");
                return;
            }

            try{
                const resp = await axios.get("http://localhost:3000/api/v1/current_user", {
                    headers: {
                        Authorization: token
                    }
                });

                console.log(resp.data);
                setUser(resp.data);
            }catch(error){
                console.log(error.data)
            }
        }
        fetchUser();

        axios
            .get("http://127.0.0.1:3000/api/v1/posts")
            .then(resp => {
                setPosts(resp.data);
                console.log("Posts data: ", posts)
                console.log("Resp data",resp.data)
            })

    }, [posts.length, render]);

    const handleUpdate = (id) => {
        setUpdate(true);
        setPostId(id);
    }

    const handleChange= (e) => {
        e.preventDefault();

        setPost((prevPost => ({
            ...prevPost,
            [e.target.name]: e.target.value,
        })))

        console.log("Post: ", post);
    }

    const handleSave =(id) => {
        axios
        .patch(`http://127.0.0.1:3000/api/v1/posts/${id}`,
            {
                post
            },
            {
            headers: {
                Authorization: token
            }
        }).then(resp =>{
            console.log("Succesfulli updated");
            setRender(!render);
        })
        .catch(error => {error.message});
        setPostId(null);
    }
    const handleDelete = (id) => {
        
        axios.
        delete(`http://127.0.0.1:3000/api/v1/posts/${id}`, {
                headers: {
                    Authorization: token
                }
            }).then(resp => {
                console.log("Successfully deleted")
                setRender(!render);
            })
            .catch(error => {error.message});
    }

    if(!user){
        return (
            <div>Loading...</div>
        )
    }
    return (
        <>
            <div>Posts</div>
            {posts?.map(post => {
                return(
                <div className="mb-4" key={post.id}>
                    <div>{post.id}</div>
                    <div>{post.email}</div>
                    {postId === post.id ? 
                    <>
                        <input name="title" type="text" defaultValue={post.title} onChange={handleChange}></input>
                    </>: 
                    <div>{post.title}</div>
                    }
                    <div>{post.body}</div>
                    {
                        user.email === post.email && 
                        <>
                            {
                            !(post.id === postId) ? 
                            <button onClick={() => handleUpdate(post.id)}>Update</button>
                             : 
                             <button onClick={() => handleSave(post.id)}>Save</button>}
                            <button onClick={() => handleDelete(post.id)}>Delete</button>
                        </>
                    }
                </div>
                )
            })}
        </>
    )
}

export default Posts;