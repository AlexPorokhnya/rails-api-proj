import { useState, useEffect} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../component/Navbar";


const Posts = () => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [update, setUpdate] = useState(false);
    const [render, setRender] = useState(false);
    const [postId, setPostId] = useState(null);
    const [post, setPost] = useState({});


    const navigate = useNavigate();

    useEffect(()=> {

        axios.get("http://127.0.0.1:3000/current_user", 
        {
            withCredentials: true
        }).then(resp => {
            console.log(resp.data);
            setUser(resp.data);
            console.log("User data: ", user)
        }).catch(error =>{
            console.log(error.data)
        })

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
        console.log(id)
        axios
        .patch(`http://127.0.0.1:3000/api/v1/posts/${id}`,
            {post},
            {withCredentials: true}
            ).then(resp =>{
            console.log(resp.data);
            console.log("Successfully updated");
            setRender(!render);
        })
        .catch(error => {error.message});
        setPostId(null);
    }
    const handleDelete = (id) => {
        console.log(id)
        axios.
        delete(`http://127.0.0.1:3000/api/v1/posts/${id}`, {
                withCredentials: true
            }).then(resp => {
                console.log("Successfully deleted")
                setRender(!render);
            })
            .catch(error => {console.log(error.message)});
    }

    if(!user){
        //navigate("/login")
        return(
            <div>Lodaing...</div>
        )
    }

    return (
        <>
            <Navbar />
            {/* <div className=" mt-3 mb-2 d-flex justify-content-center" style={{fontSize: 36}}>Posts</div> */}
            {posts?.map(post => {
                return(
                <div className="mb-4" key={post.id}>
                    <div>{post.email}</div>
                    {postId === post.id ? 
                    <>
                    <div>
                        <input name="title" type="text" defaultValue={post.title} onChange={handleChange}></input>
                    </div>
                    </>: 
                    <div>{post.title}</div>
                    }
                    {postId === post.id ? 
                    <>
                    <div>
                        <input name="body" type="text" defaultValue={post.body} onChange={handleChange}></input>
                    </div>
                    </>: 
                    <div>{post.body}</div>
                    }
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