import axios from "axios";
import { useEffect, useState } from "react";
import DeletePost from "./Deletepost";
import { Link } from "react-router-dom";

export default function YourPostPage() {

    const [Data, setData] = useState(null);

    useEffect(() => {
        async function fetchuserpost() {
            try {
                const response = await axios({
                    url: "blog/yourpost",
                    method: "get",
                    headers: {
                        "Authorization": "bearer " + localStorage.getItem("jwt_token")
                    }
                })
                if (response && response.data) {
                    setData(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchuserpost();
    }, [])

    return (
        <>
            {Data && !Data == null ? (
                <div className="post-container">
                    <div className="direction-button-3">
                        <button style={{ width: "100px" }}><Link to="/Allblog" style={{ textDecoration: "none" }}>All Post</Link></button>
                    </div>
                    <div className="direction-button-4">
                        <button style={{ width: "100px" }}><Link to="/blog" style={{ textDecoration: "none" }}>Add Post</Link></button>
                    </div>
                    {Data.map((obj) => (
                        <div className="Post-box" key={obj.id}>
                            <div className="title-box">
                                <h1 style={{ fontSize: "1rem", color: "#fff" }}>title: {obj.title}</h1>
                            </div>
                            <div className="content-box">
                                <p style={{ color: "#fff" }}>content: {obj.content}</p>
                            </div>
                            <DeletePost id={obj.id} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="post-container" style={{ height: "100vh" }}>
                    <div className="direction-button-3">
                        <button style={{ width: "100px" }}><Link to="/Allblog" style={{ textDecoration: "none" }}>All Post</Link></button>
                    </div>
                    <div className="direction-button-4">
                        <button style={{ width: "100px" }}><Link to="/blog" style={{ textDecoration: "none" }}>Add Post</Link></button>
                    </div>
                    <div className="Post-box">
                        <h1>you have no post!</h1>
                    </div>
                </div>
            )}
        </>
    );
}