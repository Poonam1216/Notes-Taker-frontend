import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./signup.css";

const Signup = () => {
    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
        confirmpassword: ""
    })
    const navigate = useNavigate();

    const [serverError, setError] = useState("");
    const [loader, setLoader] = useState("")
    const handleChnage = (event) => {
        const { name, value } = event.target;
        setFormValue({ ...formValue, [name]: value })

    }

    const handleSubmition = async (e) => {
        e.preventDefault();
        setLoader("Verfying...")
        await fetch("https://backend-notes-3jgf.onrender.com/api/signup", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formValue)
        }).then(res => {
            return res.json();
        }).then(data => {
            if (data.message == "success") {
                setError(data.message);
                navigate("/")
            } else {
                setLoader("")
                setError(data.message)

            }

        }).catch(err => {
            console.log(err)
        })
    }


    return (
        <>
            <section className="login-container">
                <div className="login-bo">
                    <form onSubmit={handleSubmition}>
                        <h2>Sign Up</h2>
                        <label htmlFor="email">Email</label>
                        <br />
                        <input type="email" name="email" id="email" required onChange={(e) => { handleChnage(e) }} />
                        <br />
                        <label htmlFor="password">Password</label>
                        <br />
                        <input type="password" name="password" id="password" required onChange={(e) => { handleChnage(e) }} />
                        <br />
                        <label htmlFor="confirmpassword">Confirm Password</label>
                        <br />
                        <input type="confirmpassword" name="confirmpassword" id="confirmpassword" required onChange={(e) => { handleChnage(e) }} />
                        <div>
                            <button type="submit"> Continue </button>
                        </div>
                        <Link to="/">Login</Link>
                        <div className="error-result">{serverError}{loader}</div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Signup;