import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

export default function Navbar() {
    const navigate = useNavigate();

    const {user, setUser} = useContext(UserContext);

    const logoutHandler = () => {
        setUser(null);
        navigate("/login");
    };

    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link className="navbarItem" to="/">
                                Main page
                            </Link>
                        </li>
                        <li>
                            <Link className="navbarItem" to="/movies">
                                Movies
                            </Link>
                        </li>
                        {user ? (
                            <>
                                <li>
                                    <Link className="navbarItem" to="/profile">
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        className="navbarItem"
                                        onClick={logoutHandler}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link className="navbarItem" to="/login">
                                        Log in
                                    </Link>
                                </li>
                                <li>
                                    <Link className="navbarItem" to="/register">
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>
        </>
    );
}
