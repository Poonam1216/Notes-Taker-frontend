import { useEffect, useState } from "react";
import Navbar from "../header/header";
import "./homepage.css"

const HomePage = () => {

    const [newList, setNewList] = useState([]);
    const [searchedVal, setSearchedVal] = useState("");
    const [loader, setloader] = useState("loading...")
    const handleDelete = (id) => {
        fetch(`https://backend-notes-3jgf.onrender.com/api/notes/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(res => {
            return res.json();
        }).then((data) => {
            // console.log(data, "serverlist");
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        let Token = localStorage.getItem("token");

        fetch("https://backend-notes-3jgf.onrender.com/api/notes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(res => {
            return res.json();
        }).then((data) => {
            // console.log(data, "serverlist");
            setNewList(data.notesList.filter(val => val.title.includes(searchedVal)))
        }).catch(err => {
            console.log(err)
        })

    }, [searchedVal, newList])

    // console.log(List)


    return (

        <>
            <Navbar />
            <div className="home-container">

                <label htmlFor="search">
                    <input type="search" name="search" id="search" onChange={(e) => { setSearchedVal(e.target.value) }} />
                    🔍
                </label>


                <div >
                    {!newList.length && loader}
                    {newList.map((ele, i) => {
                        return (
                            <>
                                <div className="noteslist" key={`${i}`} >
                                    <div className="time">{ele.createdTime}</div>
                                    <div style={{ display: "flex", justifyContent: "end", cursor: "pointer" }} >
                                        <div style={{ marginRight: "1em", cursor: "pointer" }} onClick={() => handleDelete(ele._id)}>🗑️</div>
                                        <div onClick={() => console.log(ele._id)}>✏️</div>
                                    </div>

                                    <div className="title">
                                        {ele.title}
                                    </div>
                                    <div className="content">
                                        {ele.content}
                                    </div>
                                </div>
                            </>
                        )
                    })}

                </div>
            </div>
        </>
    )
}
export default HomePage;