import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AllPostPage() {
    const [Data, setData] = useState(null);

    useEffect(() => {
        async function fetchuserpost() {
            try {
                const response = await axios({
                    url: "blog/all",
                    method: "get",
                    headers: {
                        "Authorization": "bearer " + localStorage.getItem("jwt_token")
                    }
                })
                if (response) {
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
            <div className="post-container">
                <div className="direction-button-3">
                    <button style={{ width: "100px" }}><Link to="/Yourblog" style={{ textDecoration: "none" }}>Your Post</Link></button>
                </div>
                <div className="direction-button-4">
                    <button style={{ width: "100px" }}><Link to="/blog" style={{ textDecoration: "none" }}>Add Post</Link></button>
                </div>
                {Data ? (
                    Data.map((obj) => (
                        <div className="Post-box" key={obj.id}>
                            <div className="title-box">
                                <h1 style={{ fontSize: "1rem", color: "#fff" }}>title: {obj.title}</h1>
                            </div>
                            <div className="content-box">
                                <p style={{ color: "#fff" }}>content: {obj.content}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="post-box">
                        <h1>there is no post!</h1>
                    </div>
                )}
            </div>
        </>
    );
}