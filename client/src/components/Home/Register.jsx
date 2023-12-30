import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {

    const [ values, setvalue ] = useState({
        username: "",
        email: ""
    });

    const navigate = useNavigate();

    function handlechange (event) {
        const { name, value} = event.target;
        
        setvalue({
            ...values,
            [name]: value
        })
    }
    
    async function handlesubmit (event) {
        event.preventDefault();

        try {
            const response = await axios({
                url: "auth/signup",
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({
                    name: values.username,
                    email: values.email
                })
            });
            setvalue({
                username: "",
                email: ""
            })
            if(response.status === 201) {
                toast.success("register succesfully!");
                navigate("/");
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    
    return(
        <div class="wrapper">

            <div class="login-box">
                <form onSubmit={handlesubmit}>
                    <h2>Register</h2>
                    <div class="input-box">
                        <span class="icon">
                            <ion-icon name="lock-closed"></ion-icon>
                        </span>
                        <input type="text" name="username" value={values.username} onChange={handlechange} required />
                        <label>Name</label>
                    </div>

                    <div class="input-box">
                        <span class="icon">
                            <ion-icon name="mail"></ion-icon>
                        </span>
                        <input type="email" name="email" value={values.email} onChange={handlechange} required />
                        <label>Email</label>
                    </div>

                    <button type="submit">Register</button>

                    <div class="register-link">
                        <p>Haven't Login yet? <a href="/">Login</a></p>
                    </div>
                </form>
            </div>

        </div>
    );
}