import axios from "axios"
import toast from "react-hot-toast"

export default function DeletePost(props) {
    return(
        <>
            <button style={{ width: "60%" }} type="submit"
                onClick={() => {
                    axios({
                        url: "blog/post",
                        method: "delete",
                        headers: {
                            "Authorization": "bearer " + localStorage.getItem("jwt_token"),
                            "Content-Type": "application/json"
                        },
                        data: JSON.stringify({
                            post_id: props.id,
                        })
                    })
                    .then((res) => {
                        if(res) {
                            toast.success("deleted succesfully!");
                            window.location.reload(true);
                        }
                    })
                }}
            >Delete Post</button>
        </>
    )
}