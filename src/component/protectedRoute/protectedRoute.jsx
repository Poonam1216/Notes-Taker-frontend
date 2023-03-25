import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    let Token = localStorage.getItem("token");

    return (
        <>

            {Token.length ? children : < Navigate to="/" />}

        </>
    )
}
export default ProtectedRoute;