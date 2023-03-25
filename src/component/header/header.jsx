import { Link, useNavigate } from "react-router-dom";
import "./header.css"

const Navbar = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.setItem("token", "");
        navigate("/")
    }

    return (
        <>

            <nav>
                <ul className="nav-ul">
                    <Link to="/homepage"><li> Home</li></Link>
                    <Link to="/addnote"><li>+ Addnote</li></Link>
                    <li>x DeleteAll</li>
                    <li>⬇️Export</li>
                    <li >
                        <button className="logout-btn" onClick={handleLogout}>LOGOUT</button>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;