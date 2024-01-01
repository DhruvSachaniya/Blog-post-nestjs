import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function PostMainPage() {

    const [ data, setdata ] = useState({
        title: "",
        content: ""
    })

    const navigate = useNavigate();

    function handleLogout () {
        localStorage.removeItem("jwt_token")
        navigate("/", {replace: false});
    }

    async function handlechange(event) {
        const { name, value } = event.target;

        setdata({
            ...data,
            [name]: value
        })
    }
    
    async function handlesubmit (event) {
        event.preventDefault();
        try {
            const response = await axios({
                url: "blog/post",
                method: "post",
                headers: {
                    "Authorization": "bearer " + localStorage.getItem("jwt_token"),
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({
                    title: data.title,
                    content: data.content
                })
            })
            setdata({
                title: "",
                content: ""
            })
            if(response.status === 201) {
                toast.success("post succesfully!")
            }
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        <>
        <div className="main-container">
            <div className="Post-box">
            <form onSubmit={handlesubmit}>
                <div className="input-box" style={{margin: "20px 0"}}>
                    <span class="icon">
                        <ion-icon name="Title"></ion-icon>
                    </span>
                    <input type="text" name="title" value={data.title} onChange={handlechange} required />
                    <label>Title</label>
                </div>

                <div className="input-box" style={{margin: "20px 0"}}>
                    <span class="icon">
                        <ion-icon name="content"></ion-icon>
                    </span>
                    <input type="text" name="content" value={data.content} onChange={handlechange} required />
                    <label>Content</label>
                </div>
                <button style={{width: "60%"}} type="submit">Add Post</button>
            </form>
            </div>
            <div className="direction-button">
                <button style={{width: "100px"}}><Link to="/Yourblog" style={{textDecoration: "none"}}>Your Post</Link></button>
            </div>
            <div className="direction-button-logout">
                <button style={{width: "100px"}} onClick={handleLogout}>Logout</button>
            </div>
            <div className="direction-button-2">
                <button style={{width: "100px"}}><Link to="/Allblog" style={{textDecoration: "none"}}>All Post</Link></button>
            </div>
        </div>
        </>
    );
}