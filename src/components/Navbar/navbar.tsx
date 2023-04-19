import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { UserContextProps } from "../../context/userContext";
import { Link } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
    const { handleShowLogin, handleShowRegister, activeUser } = useContext(UserContext) as UserContextProps;
    console.log('activeUser :>> ', activeUser);
    return (
        <div className="navbar-container">
            <div className="left_navbar">
                <Link className="link" to="/">Home</Link>
                <Link className="link" to="/monitoring">Monitoring</Link>
                <Link className="link" to="/settings">Settings</Link>
            </div>
            {
                activeUser ?
                    <div className="right_navbar">
                        <h6>{activeUser.email}</h6>
                        <h6 onClick={handleLogout}>Logout</h6>
                    </div>
                    :
                    <div className="right_navbar">
                        <h6 onClick={handleShowLogin}>Login</h6>
                        <h6 onClick={handleShowRegister}>Register</h6>
                    </div>
            }
        </div>
    );
}

export default Navbar;