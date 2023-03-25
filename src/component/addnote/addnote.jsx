import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../header/header";
import "./adnote.css";

const Addnote = () => {
    const [formValue, setFormValue] = useState({
        title: "",
        content: "",
        user: localStorage.getItem("id")
    })
    const navigate = useNavigate();

    const handleChnage = (event) => {
        const { name, value } = event.target;
        setFormValue({ ...formValue, [name]: value })

    }

    const handleSubmition = async (e) => {
        let Token = localStorage.getItem("token")
        e.preventDefault();
        await fetch("https://backend-notes-3jgf.onrender.com/api/notes", {
            method: "POST",
            headers: {
                Authorization: Token,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formValue)
        }).then(res => {
            return res.json();
        }).then(data => {
            console.log(data)
            navigate("/homepage");
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            <Navbar />
            <div>
                <form onSubmit={handleSubmition} className="addnote-form">
                    <label htmlFor="title" className="title">Title</label>
                    <br />
                    <input type="text" name="title" id="title" onChange={(e) => { handleChnage(e) }} />
                    <br />

                    <label htmlFor="content" className="content">Content</label>
                    <br />
                    <input type="text" name="content" id="content" onChange={(e) => { handleChnage(e) }} />
                    <br />
                    <div className="addnote">
                        <button type="submit" >ADD NOTE</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Addnote;