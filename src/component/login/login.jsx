import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css"
const Login = () => {

    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate();
    const [serverError, setError] = useState("");

    const handleChnage = (event) => {
        const { name, value } = event.target;
        setFormValue({ ...formValue, [name]: value })

    }

    const handleSubmition = async (e) => {
        e.preventDefault();
        await fetch("https:localhost:3004/api/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formValue)
        }).then(res => {
            return res.json();
        }).then(data => {
            if (data.message == "Wrong password") {
                setError(data.message);
                return;
            }
            localStorage.setItem("token", data.token);
            localStorage.setItem("id", data.id);
            console.log(data, "data")
            navigate("/homepage");
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            <section className="login-container">
                <div className="login-box">
                    <form onSubmit={handleSubmition}>
                        <h2>Sign In</h2>
                        <label htmlFor="email">Email</label>
                        <br />
                        <input type="email" name="email" id="email" required onChange={(e) => { handleChnage(e) }} />
                        <br />
                        <label htmlFor="password">Password</label>
                        <br />
                        <input type="password" name="password" id="password" required onChange={(e) => { handleChnage(e) }} />
                        <br />
                        <input type="checkbox" name="checkbox" id="checkbox" required />
                        <label htmlFor="checkbox">Remember me</label>
                        <div>
                            <button type="submit"> Submit </button>
                        </div>
                        <Link to="/signup" style={{ float: "right", color: "blue" }}> Signup</Link>
                        <div className="error-res">{serverError}</div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Login;